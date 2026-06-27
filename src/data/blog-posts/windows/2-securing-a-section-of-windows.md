---
title: "Securing a Section of Windows: Part 2"
slug: securing-a-section-of-windows-part-2
publishDate: 21 June 2026
draft: true
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
- [Name Squatting](#name-squatting)
- [SYSTEM Process](#system-process)
---

# <a name="recap"></a>Recap?

In the [last part](https://karthikuj.github.io/blog/securing-a-section-of-windows-part-1/) we learnt what sections are, how they are made, and how they can be insecure if not created properly. If you don't know any of it please go back and read the [previous blog](https://karthikuj.github.io/blog/securing-a-section-of-windows-part-1/) first because we will be building up on that knowledge in this one. 

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

# <a name="name-squatting"></a>Name Squatting

https://www.exploit-db.com/docs/english/15672-escaping-from-microsoft%E2%80%99s-protected-mode-internet-explorer.pdf

---
