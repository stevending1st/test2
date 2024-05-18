---
title: How to Install Python on a Mac
author: Daniel Kehoe
authorURL: https://www.freecodecamp.org/news/author/danielkehoe/
originalURL: https://www.freecodecamp.org/news/how-to-install-python-on-a-mac/
translator: ""
reviewer: ""
---

May 9, 2024 / [#Python][1]

<!-- more -->

# How to Install Python on a Mac

![Daniel Kehoe](https://www.freecodecamp.org/news/content/images/size/w60/2021/05/daniel-kehoe-gravatar.jpeg)

[Daniel Kehoe][2]

  ![How to Install Python on a Mac](https://www.freecodecamp.org/news/content/images/size/w2000/2024/05/python-shop.png)

Python is the most popular first language for programmers on a Mac.

Until recently, the language's lack of standard development tooling, plus competing optional-but-essential development tools, meant a rocky start for Python beginners.

To cut through the confusion, I'll show you an up-to-date approach to install Python and set up a programming project, using a single tool named Rye, to install Python versions and software libraries.

[Rye][3] is an all-in-one project management tool for Python, written in Rust (for speed) and inspired by Cargo, Rust's comprehensive package manager, from Armin Ronacher, the creator of the Python web framework Flask. It's ideal for beginners, borrowing a folder-based approach to development from other languages such as JavaScript and Ruby.

## Contents

You'll want to save the URL for this guide for future reference. Here's what is covered here:

-   [Before You Get Started][4]
-   [Python Installation with Rye][5]  
    \- [Check for Python][6]  
    \- [Install Rye][7]  
    \- [Set the PATH for Rye][8]  
    \- [Verify Rye installation][9]  
    \- [Verify Python installation][10]
-   [Version and Package Management with Rye][11]  
    \- [Create a project with Rye][12]  
    \- [Set a version][13]  
    \- [Add packages][14]  
    \- [Sync to set up the project][15]  
    \- [Run Python][16]
-   [Python Workflow with Rye][17]
-   [Conclusion][18]

## Before You Get Started

You'll need a terminal application, either [Mac Terminal][19] or an alternative such as [Warp Terminal][20] (a tool I call, "the fastest way to become a command-line power user").

Before you get started, check if you need to [update macOS][21].

You may have heard that Python is pre-installed on your Mac. Older Macs (prior to macOS 12.3) came with Python 2.7. That's an older version, not the Python 3 that you need. Newer Macs don't come with a pre-installed Python.

You'll need to install [Xcode Command Line Tools][22] before you begin programming on a Mac. You should check if [Xcode Command Line Tools are installed][23] before you proceed further. When you install Xcode Command Line Tools, Apple includes Python 3.9.6. You might be tempted to use it but that's an older version, intended only for system software, which is why you should install a new version of Python, as shown here.

## Python Installation with Rye

There are several ways to set up [Mac Python][24]. Here are your options, in a nutshell, with a critique.

On the [Python.org website][25], there's an installer application for the most recent Python version. Most Python developers avoid using it because it clutters a Mac in ways that are difficult to manage.

If you [install Homebrew][26] for software development, it's easy to ["brew install python."][27] However, the Homebrew-installed Python is not well-suited to managing multiple Python projects and development can be cumbersome.

Some tutorials suggest to [install Pyenv][28], a Python version manager. Pyenv is a good choice for managing multiple Python versions, but it requires familiarity with [Pip][29], a package manager, and [Venv][30] or [Virtualenv][31], environment managers. Multiple tools make development more complex.

I recommend installing Python with [Rye][32]. With this all-in-one tool, you'll manage multiple Python versions, set up project-based environments, and install Python packages without dependency conflicts. I'll show you how to install Python using Rye, the easy way, with a self-install script.

### Check for Python

It's best to start with no previous Python version installed, except for the Python version installed by Xcode Command Line Tools.

Try `python3 --version` and `which -a python3` to check if Python was installed with Xcode Command Line Tools:

```bash
$ python3 --version
Python 3.9.6
$ which -a python3
/usr/bin/python3
```

You won't use the Python installed by Xcode Command Line Tools, but it's important to know that Xcode Command Line Tools is already there. Otherwise, [install Xcode Command Line Tools][33].

Check if another version of Python is already installed:

```bash
$ python --version
zsh: command not found: python
```

You'll see `zsh: command not found: python` if Python is not available. I've written elsewhere about how to [update Python][34] if you think you already have Python, as well as a guide to resolving the error "[command not found: python][35]" if you are sure Python is installed but not available.

If you have more than one version of Python installed, it's not a problem because you'll set the [Mac PATH][36] after installing Rye to make the correct Python version available.

### Install Rye

Homebrew is not needed. Rye has a self-install script so you can install Rye with a `curl` command.

```bash
$ curl -sSf https://rye-up.com/get | bash
```

[Curl][37] is a command-line tool that makes HTTP requests from the terminal, useful for tasks like downloading and running installation scripts.

```bash
$ curl -sSf https://rye-up.com/get | bash
This script will automatically download and install rye (latest) for you.
####################################################################### 100.0%
Welcome to Rye!

This installer will install rye to /Users/username/.rye
This path can be changed by exporting the RYE_HOME environment variable.

Details:
  Rye Version: 0.26.0
  Platform: macos (aarch64)

? Continue? (y/n)
```

Enter `y` to continue. Rye will ask questions to customize the installation.

```bash
? Select the preferred package installer ›
❯ uv (fast, recommended)
  pip-tools (slow, higher compatibility)
```

By default, Rye offers `uv`, a faster and newer package installer. I recommend choosing `pip-tools` for compatibility. If you're a beginner, it will be easier to follow tutorials that refer to `pip`. Select `pip-tools` with the arrow keys.

Next, the self-installer asks which Python version you'll use as a default, offering the Rye-installed version or previously-installed versions.

```bash
? What should running `python` or `python3` do when you are not inside a Rye managed project? ›
❯ Run a Python installed and managed by Rye
  Run the old default Python (provided by your OS, pyenv, etc.)
```

It's best to use the Rye-installed version. Accept the default `Run a Python installed and managed by Rye` by pressing "Enter". Then the self-installer asks which Python version to install as a default.

```bash
? Which version of Python should be used as default toolchain? (cpython@3.12) ›
```

Accept the default and Rye will install the latest Python version. Installation begins when you press "Enter."

```bash
Installed binary to /Users/username/.rye/shims/rye
Bootstrapping rye internals
Downloading cpython@3.12.1
Checking checksum
Unpacking
Downloaded cpython@3.12.1
Updated self-python installation at /Users/username/.rye/self

The rye directory /Users/username/.rye/shims was not detected on PATH.
It is highly recommended that you add it.
? Should the installer add Rye to PATH via .profile? (y/n) ›
```

Notice that Rye installs its Python files to `~/.rye/shims/rye`.

Rye offers to set the `$PATH` to give precedence to its Python version by modifying the `.profile` file.

Use of the `.profile` file is a Linux convention. On the Mac, it's preferred to set the `$PATH` in `.zprofile` or `.zshrc` files, preferably `.zprofile`. Enter `n` to skip this automatic step. Later, you'll set the `$PATH` manually.

```bash
✔ Should the installer add Rye to PATH via .profile? · no
note: did not manipulate the path. To make it work, add this to your .profile manually:

    source "$HOME/.rye/env"

To make it work with zsh, you might need to add this to your .zprofile:

    source "$HOME/.rye/env"

For more information read https://rye-up.com/guide/installation/

All done!
```

Rye explains how to complete the installation manually by editing the `.zprofile` file. I'll show you how do it.

### Set the PATH for Rye

There's one final **important** step before Rye works correctly. You must set the Mac PATH to make sure Rye finds the correct Python version. Otherwise, entering the command `python` will trigger `zsh: command not found: python` and the command `python3` will access the older Xcode-installed Python version.

Edit the `~/.zprofile` file. The `~/.zprofile` file is used for setting the `$PATH`. Alternatively, you can modify the `~/.zshrc` file (see [How Do Zsh Configuration Files Work?][38] for an explanation of the differences). You can use TextEdit, the default macOS graphical text editor, opening a file from the terminal:

```bash
$ open -e ~/.zprofile
```

You also can use the command line editors `nano` or `vim` to edit the shell configuration files. See [Zsh Shell Configuration][39] for more about editing shell configuration files.

Add this command as the last line of your configuration file to configure the Z shell for Rye:

```bash
source "$HOME/.rye/env"
```

When your terminal session starts, Z shell will run the `~/.rye/env` script to set [shims][40] to intercept and redirect any Python commands. You'll need double quotes because the command contains special characters.

Rye adds the shims to your `$PATH` so that running the command `python` or `python3` will run a Rye-installed Python version.

Changes to the `~/.zprofile` file will not take effect in the Terminal until you've quit and restarted the terminal. Alternatively (this is easier), you can use the `source` command to reset the shell environment:

```bash
$ source ~/.zprofile
```

The `source` command reads and executes a shell script file, in this case resetting the shell environment with your new `$PATH` setting.

After resetting your shell, you can check the `$PATH` setting.

```bash
$ echo $PATH
/Users/username/.rye/shims:/opt/homebrew/bin:/opt/homebrew/sbin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin
```

The `~/.rye/shims` directory should be leftmost, taking precedence over other directories.

### Verify Rye installation

After installing Rye, use `rye --version` to verify that it has been installed.

```bash
$ rye --version
rye 0.26.0
commit: 0.26.0 (d245f625e 2024-02-23)
platform: macos (aarch64)
self-python: cpython@3.12
symlink support: true
uv enabled: false
```

### Verify Python installation

Check that Python is available:

```bash
$ python --version
Python 3.12.1
```

Yay! You've installed Python. If you see `zsh: command not found: python`, check that the Mac PATH is set correctly.

The `python3` command should give you the Rye-installed version, not the Xcode-installed version.

```bash
$ python3 --version
Python 3.12.1
```

The `which` command shows the Rye shims directory when you try to see where Python is installed. Keep in mind that you've set the `~/.zprofile` file to use Rye shims to intercept the `python` command and deliver the Rye-installed versions.

```bash
$ which python
/Users/username/.rye/shims/python
```

You've successfully installed Python with Rye.

## Version and Package Management with Rye

You can use Rye to:

1.  Set up a Python project.
2.  Install a specific Python version for a project.
3.  Install Python packages for the project.

Other languages adopt a project-based approach to package management (for example, Rust's Cargo, Ruby's Bundler, and JavaScript's npm). Python has been slow to adopt this approach, but Rye is changing that, eliminating the need for separate tools such as Pyenv, Pip, and Venv for managing versions, software libraries, and environments.

With Rye, you'll start by creating a new project and choosing a Python version. You can then install packages for that project. Rye will manage the Python version and packages for you.

### Create a project with Rye

Make a folder for a Python project. Then change directories to the project root:

```bash
$ mkdir myproject
$ cd myproject
```

Specify a Python version for your project:

```bash
$ rye pin 3
pinned 3.12.1 in /Users/username/workspace/myproject/.python-version
```

The command `rye pin 3` will create a `.python-version` file specifying the newest Python version for your project.

You must run the command `rye init` to create a `pyproject.toml` file in your project root directory. This is a project-specific configuration file that Rye uses to manage Python versions and packages.

```bash
$ rye init
success: Initialized project in /Users/username/workspace/myproject/.
Run `rye sync` to get started
```

Now you can fetch a Python version and install packages.

### Set a version

Rye can install and switch among different Python versions.

Rye uses the term "toolchains" to refer to installed Python versions. To install a Python version, you can [fetch a toolchain][41] using Rye.

```bash
$ rye fetch
$
```

If you've specified the default Python with `rye pin`, `rye fetch` does nothing. If you specified a different Python version, `rye fetch` will install the specified version.

```bash
$ rye fetch
Downloading cpython@3.12.1
Checking checksum
success: Downloaded cpython@3.12.1
```

By default, Rye installs all Python executables in a hidden folder in your user home directory `~/.rye/py/`. The Rye shims in the Mac `$PATH` will select the correct Python version you've specified in your project directory,

### Add packages

Package managers allow you to download, install, and update software libraries and their dependencies. Most packages depend on other external software libraries—the package manager will fetch and install any dependencies required by that package.

Experienced Python developers are familiar with [Pip][42], the standard package manager for Python, included with any version of Python since Python 3.3.

The command `pip install` installs packages "globally" into a system Python or shared Python versions, creating potential conflicts.

To safely install Python packages for a specific project with `pip`, you have to use a Python environment manager such as [Venv][43] to create and activate a virtual environment to avoid dependency conflicts.

When you use Rye as an all-in-one tool, you won't need `venv` for environment management, installing packages directly with Rye.

Before you try to install a package with Rye, be sure you've created a `pyproject.toml` file in your project root directory with `rye init`.

You can install any Python package from the [Python Package Index][44]. Here we'll install the [cowsay][45] utility.

```bash
$ rye add cowsay
Added cowsay>=6.1 as regular dependency
```

If you see `error: did not find pyproject.toml`, you need to run `rye init`.

### Sync to set up the project

Before you can use a package in a Rye project, you must run `rye sync` to update lockfiles and install the dependencies into the virtual environment.

```bash
$ rye sync
Initializing new virtualenv in /Users/username/workspace/python/myproject/.venv
Python version: cpython@3.12.3
Generating production lockfile: /Users/username/workspace/python/myproject/requirements.lock
Creating virtualenv for pip-tools
Generating dev lockfile: /Users/username/workspace/python/myproject/requirements-dev.lock
Installing dependencies
Looking in indexes: https://pypi.org/simple/
Obtaining file:///. (from -r /var/folders/ls/g23m524x5jbg401p12rctz7m0000gn/T/tmp06o05xiq (line 2))
  Installing build dependencies ... done
  Checking if build backend supports build_editable ... done
  Getting requirements to build editable ... done
  Installing backend dependencies ... done
  Preparing editable metadata (pyproject.toml) ... done
Collecting cowsay==6.1 (from -r /var/folders/ls/g23m524x5jbg401p12rctz7m0000gn/T/tmp06o05xiq (line 1))
  Using cached cowsay-6.1-py3-none-any.whl.metadata (5.6 kB)
Using cached cowsay-6.1-py3-none-any.whl (25 kB)
Building wheels for collected packages: myproject
  Building editable for myproject (pyproject.toml) ... done
  Created wheel for myproject: filename=myproject-0.1.0-py3-none-any.whl size=1074 sha256=0b34a41cbb517a78e5b60593c75e93a37df0bf7958e8921be5f6f6e24a26b5d1
  Stored in directory: /private/var/folders/ls/g23m524x5jbg401p12rctz7m0000gn/T/pip-ephem-wheel-cache-m03jgkok/wheels/8b/19/c8/73a63a20645e0f1ed9aae9dd5d459f0f7ad2332bb27cba6c0f
Successfully built myproject
Installing collected packages: myproject, cowsay
Successfully installed cowsay-6.1 myproject-0.1.0
Done!
```

Rye displays all its operations but you don't have to read all the details.

### Run Python

After installing a package and running `rye sync`, you can use the Python interpreter interactively (the REPL or Read-Eval-Print Loop).

```bash
$ python
Python 3.12.1 (main, Jan  7 2024, 23:31:12) [Clang 16.0.3 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import cowsay
>>> cowsay.cow('Hello World')
___________
| Hello World |
  ===========
           \
            \
              ^__^
              (oo)\_______
              (__)\       )\/\
                  ||----w |
                  ||     ||
>>>
```

Enter `quit()` or type `Control + D` to exit the Python interpreter.

Now you're ready to develop any Python project with Rye! You can read the [Rye User Guide][46] to learn more.

## Python Workflow with Rye

As you code in Python, you'll want to add software libraries to your project. Let's look at an example.

[Requests][47] is an HTTP library that you'll likely use in many projects. If you visit the [Requests page on PyPI][48], you'll see the installation instructions:

```bash
$ python -m pip install requests
```

The `python -m pip` command is a bit cumbersome, and if you use Pip, you have to precede it with `python -m venv .venv` (to set up a virtual environment) and `source .venv/bin/activate` (to activate a virtual environment).

With Rye, you can add Requests to your `pyproject.toml` file.

```bash
$ rye add requests
```

Then run `rye sync` to install the package.

```bash
$ rye sync
```

Now you can use the Requests library in your Python project, including it with an `import` statement.

Remember, when you see `pip install` in a tutorial, you can use `rye add` and `rye sync` instead, without additional commands for a virtual environment.

Beginners using [pip install][49] often encounter headaches with [command not found: pip][50] and [error: externally-managed-environment][51]. Rye eliminates these problems.

## Conclusion

This article is based on a guide that offers additional details about how to [install Python on Mac][52].

Rye is the new favorite for installing and managing Python because it offers a single coherent setup and packaging system, eliminating the need for separate tools such as Pyenv, Pip, and Venv for managing versions, software libraries, and environments.

Python is the first programming language for most beginners. As it grows in popularity for machine learning and data science, you'll want Python on your Mac for many of the tutorials you'll find on freeCodeCamp.

---

![Daniel Kehoe](https://www.freecodecamp.org/news/content/images/size/w60/2021/05/daniel-kehoe-gravatar.jpeg)

[Daniel Kehoe][53]

Author of the book "Learn Ruby on Rails.” Frequent contributor to mac.install.guide.

---

If you read this far, thank the author to show them you care. Say Thanks

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started][54]

[1]: /news/tag/python/
[2]: /news/author/danielkehoe/
[3]: https://rye-up.com/
[4]: #before-you-get-started
[5]: #python-installation-with-rye
[6]: #check-for-python
[7]: #install-rye
[8]: #set-the-path-for-rye
[9]: #verify-rye-installation
[10]: #verify-python-installation
[11]: #version-and-package-management-with-rye
[12]: #create-a-project-with-rye
[13]: #set-a-version
[14]: #add-packages
[15]: #sync-to-set-up-the-project
[16]: #run-python
[17]: #python-workflow-with-rye
[18]: #conclusion
[19]: https://mac.install.guide/terminal/
[20]: https://mac.install.guide/more/download-warp
[21]: https://mac.install.guide/commandlinetools/1
[22]: https://mac.install.guide/commandlinetools/
[23]: https://mac.install.guide/commandlinetools/2
[24]: https://mac.install.guide/python/
[25]: https://www.python.org/downloads/
[26]: https://mac.install.guide/homebrew/3
[27]: https://mac.install.guide/python/brew
[28]: https://mac.install.guide/python/install-pyenv
[29]: https://pip.pypa.io/en/stable/
[30]: https://docs.python.org/3/library/venv
[31]: https://virtualenv.pypa.io/en/latest/
[32]: https://rye-up.com/
[33]: https://mac.install.guide/commandlinetools/4
[34]: https://mac.install.guide/python/update
[35]: https://mac.install.guide/python/command-not-found-python
[36]: https://mac.install.guide/terminal/path
[37]: https://curl.se/
[38]: https://www.freecodecamp.org/news/how-do-zsh-configuration-files-work/
[39]: https://mac.install.guide/terminal/configuration
[40]: https://rye-up.com/guide/shims/
[41]: https://rye-up.com/guide/toolchains/
[42]: https://pip.pypa.io/en/stable/
[43]: https://docs.python.org/3/library/venv
[44]: https://pypi.org/
[45]: https://pypi.org/project/cowsay/
[46]: https://rye-up.com/guide/
[47]: https://pypi.org/project/requests/
[48]: https://pypi.org/project/requests/
[49]: https://mac.install.guide/python/pip-install
[50]: https://mac.install.guide/python/command-not-found-pip
[51]: https://mac.install.guide/python/externally-managed-environment
[52]: https://mac.install.guide/python/install
[53]: /news/author/danielkehoe/
[54]: https://www.freecodecamp.org/learn/