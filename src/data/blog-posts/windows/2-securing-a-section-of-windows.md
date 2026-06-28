---
title: "Securing a Section of Windows: Part 2"
slug: securing-a-section-of-windows-part-2
publishDate: 28 June 2026
# draft: true
description: In this post we will learn some other ways in which sections can be secured and some other ways they can be exploited.
tags: ['windows', 'exercises', 'sections']
---

<img
  src="/assets/blog/windows/2-securing-a-section-of-windows/hero.png"
  alt="Illustration of securing windows section"
  style="display: block; margin: 0 auto; max-width: 350px; width: 100%; height: auto;"
/>

## <a name="top"></a> Table of Contents

- [Recap](#recap)
- [The Global Namespace](#the-global-namespace)
    - [Exercise 1: DACL Inheritance](#exercise-1)
- [SYSTEM Process](#system-process)
- [Name Squatting](#name-squatting)
---

> **Note:** I restarted my laptop and renamed the section between runs, so the section name and logon session IDs might differ from run to run.

# <a name="recap"></a>Recap?

In the [last part](https://karthikuj.github.io/blog/securing-a-section-of-windows-part-1/) we learnt what sections are, how they are made, and how they can be insecure if not created properly. If you don't know any of it, please go back and read the [previous blog](https://karthikuj.github.io/blog/securing-a-section-of-windows-part-1/) first because we will be building up on that knowledge in this one. 

---

# <a name="the-global-namespace"></a>The Global Namespace

We won't be going over the structure of the Object Manager Namespace in this blog but as you saw in the last blog when we created the named sections, they were stored in the path `\Sessions\<id>\BaseNamedObjects\`, this is a local session namespace, this is unique to the logon session of the user. Similarly, we have a global namespace and the path for that is `\BaseNamedObjects\`.

Now, in the last blog we learnt that any named object created without a security descriptor in the local session namespace will inherit the default security descriptor of the directory that it is placed in. But what happens when the object is placed in the global namespace?

## <a name=""></a>Exercise 1: DACL Inheritance and The Token's Default DACL

Firstly, let's check out the global `\BaseNamedObjects` directory and see if it has any inheritable rules.

```powershell
PS C:\Users\5up3r541y4n> $gDir = Get-NtDirectory \BaseNamedObjects
PS C:\Users\5up3r541y4n> $gDir.SecurityDescriptor

Owner                  DACL ACE Count SACL ACE Count Integrity Level
-----                  -------------- -------------- ---------------
BUILTIN\Administrators 4              1              Low


PS C:\Users\5up3r541y4n> $gDir.SecurityDescriptor.Dacl

Type    User                    Flags Mask
----    ----                    ----- ----
Allowed Everyone                None  0002000F
Allowed NT AUTHORITY\RESTRICTED None  00000002
Allowed Window Manager\DWM-0    None  000F000F
Allowed NT AUTHORITY\SYSTEM     None  000F000F


PS C:\Users\5up3r541y4n>
```

From the above output we can see that the directory has 4 DACLs and none of them has the [`ObjectInherit`](https://learn.microsoft.com/en-us/dotnet/api/system.security.accesscontrol.inheritanceflags?view=net-10.0) flag.

Now, let's checkout the admin token's default DACL.

```powershell
PS C:\Users\5up3r541y4n> $adminToken = Get-NtToken -Primary
PS C:\Users\5up3r541y4n> $adminToken.DefaultDacl

Type    User                                 Flags Mask
----    ----                                 ----- ----
Allowed BUILTIN\Administrators               None  10000000
Allowed NT AUTHORITY\SYSTEM                  None  10000000
Allowed NT AUTHORITY\LogonSessionId_0_426054 None  A0000000
```

Here we can see that the logon session ID has an access mask of `A0000000`, we can try mapping this to specific access mask for Section objects.

```powershell
PS C:\Users\5up3r541y4n> Get-NtAccessMask -SectionAccess 0xA0000000 -MapGenericRights -AsTypeAccess Section
Query, MapRead, MapExecute, ReadControl

PS C:\Users\5up3r541y4n> Get-NtAccessMask -SectionAccess 0xA0000000 -MapGenericRights

Access
------
0002000D
```

The above output tells us that the logon session ID only gets `MapRead` and `MapExecute`, no `MapWrite`, and the value of the specific access mask will be `0002000D`. Let's put this to the test.

Create a section called `MySection` in global namespace and then check the DACLs of that section.

```powershell
PS C:\Users\5up3r541y4n> $obj = New-NtSection \BaseNamedObjects\MySection -Size 4096
PS C:\Users\5up3r541y4n> $obj.SecurityDescriptor.Dacl

Type    User                                 Flags Mask
----    ----                                 ----- ----
Allowed BUILTIN\Administrators               None  000F001F
Allowed NT AUTHORITY\SYSTEM                  None  000F001F
Allowed NT AUTHORITY\LogonSessionId_0_426054 None  0002000D
```

Spot on! The section object's last DACL which allows anyone with that logon session ID to access that section object has the same access mask that we deduced, and if you recompile the program we made last time by passing `Global\\MySection` as the name of the section and run it again, you will see that the lesser-privileged program will not be able to gain write privileges this time by duplicating the handle, I will let you guys test that out as a separate exercise.

---

# <a name="system-processes"></a>SYSTEM Processes

All the exercises we have done till now and the sections we created had one thing in common, they were all accessible in some way or the other by the members of the same logon session ID; but what happens when the logon session ID is different or let's the section was created by a SYSTEM process? Let's test this out next.

1. First we will re-compile our code to create a named section object called **"NoSecurityAttributes"** (notice that there is no **Global\\** prefix), and now we will run it using `PsExec.exe` (This is a pert of the SysInternals suite of tools, install it if you haven't already).
```powershell
PS C:\Users\5up3r541y4n\Hack\security-exercises> C:\Users\5up3r541y4n\Hack\SysinternalsSuite\PsExec.exe -s C:\Users\5up3r541y4n\Hack\security-exercises\windows\exercise-1-securing-sections\named\privileged.exe

PsExec v2.43 - Execute processes remotely
Copyright (C) 2001-2023 Mark Russinovich
Sysinternals - www.sysinternals.com

Starting C:\Users\5up3r541y4n\Hack\security-exercises\windows\exercise-1-securing-sections\named\privileged.exe on DESKT
Named sections created successfully!
Enter any key to exit...
```

2. Now let's open `WibObj.exe` as administrator and check out the section we created.
![WinObj Search Results For NoSecurityAttributes](/assets/blog/windows/2-securing-a-section-of-windows/winobj-search-results-for-nosecurityattributes-section.png)

3. We can see that the section object is created under the global namespace `\BaseNamedObjects\` for SYSTEM processes, but who all can access it? Let's try to deduce that.

4. We know from our previous exercise that this directory does not have any inheritable rules, so the created section object must be using the default DACL for the SYSTEM user's token.
```powershell
PS C:\WINDOWS\system32> $sysToken = Get-NtToken -Primary
PS C:\WINDOWS\system32>
PS C:\WINDOWS\system32> $sysToken.DefaultDacl
ssoenefutal
Type    User                   Flags Mask
----    ----                   ----- ----
Allowed NT AUTHORITY\SYSTEM    None  10000000
Allowed BUILTIN\Administrators None  A0020000
```

5. As we can see there is no DACL for any logon session ID, only `NT AUTHORITY\SYSTEM` and `BUILTIN\Administrators` should be able to access the section object in some way. Let's decode admin's access mask next to get the specific access mask.
```powershell
PS C:\WINDOWS\system32> Get-NtAccessMask -SectionAccess 0xA0020000 -MapGenericRights

Access
------
0002000D
``` 

6. The above output tells us that the Administrator will have the specific access mask of `0002000D` for the section object, let's verify that.
```powershell
PS C:\WINDOWS\system32>  $sysSection = Get-NtSection \BaseNamedObjects\NoSecurityAttributes
PS C:\WINDOWS\system32>

PS C:\WINDOWS\system32> $sysSection.SecurityDescriptor.Dacl
Type    User                   Flags Mask
----    ----                   ----- ----
Allowed NT AUTHORITY\SYSTEM    None  000F001F
Allowed BUILTIN\Administrators None  0002000D
```

7. Bingo again! The output matches exactly what we deduced. And for a final attempt let's try to access this section as a normal user, we should get access denied.
```powershell
PS C:\Users\5up3r541y4n\Hack\security-exercises> $sysSection = Get-NtSection \BaseNamedObjects\NoSecurityAttributes
Get-NtSection : (0xC0000022) - {Access Denied}
A process has requested access to an object, but has not been granted those access rights.
At line:1 char:15
+ $sysSection = Get-NtSection \BaseNamedObjects\NoSecurityAttributes
+               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Get-NtSection], NtException
    + FullyQualifiedErrorId : NtCoreLib.NtException,NtObjectManager.Cmdlets.Object.GetNtSectionCmdlet

PS C:\Users\5up3r541y4n\Hack\security-exercises>
```

8. As expected, we got `Access Denied`.

---

# <a name="name-squatting"></a>Name Squatting

https://www.exploit-db.com/docs/english/15672-escaping-from-microsoft%E2%80%99s-protected-mode-internet-explorer.pdf
https://invisiblethingslab.com/resources/2014/A%20crack%20on%20the%20glass.pdf

---
