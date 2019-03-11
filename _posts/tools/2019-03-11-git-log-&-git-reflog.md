---
layout: post
title:  "git log 和 git reflog"
description: 
categories: code
author: Tim Gao
tags: [tools]
---

# git log

`git log`命令可以用来查看commit历史，但无法查看撤销的提交.

    $ git log --pretty=oneline
    7a2de88fa028908548875f6155866458ea2a3522 (HEAD -> branch-A, branch-B) C4
    22b506465230adbd00a592e2a84ececc43e3c385 C2
    9366a1de0f9485ae6e95461c43e08d73b6a916fa (master) add readme

    $ git reset --hard HEAD^
    HEAD is now at 22b5064 C2

    $ git log --pretty=oneline
    22b506465230adbd00a592e2a84ececc43e3c385 (HEAD -> branch-A) C2
    9366a1de0f9485ae6e95461c43e08d73b6a916fa (master) add readme

# git reflog

`git reflog`类似于上面的`git log`，但它能记录的操作更加详细，包含几乎所有本地仓库的改变。相比`git log`可以看到，当reset之后，git log只显示了两条记录(7a2de88不可见)，但git reflog显示了更多的本次操作。

    $ git reflog
    22b5064 (HEAD -> branch-A) HEAD@{0}: reset: moving to HEAD^
    7a2de88 (branch-B) HEAD@{1}: reset: moving to HEAD^^
    67eb0b1 HEAD@{2}: commit: Revert "C4"
    63f895f HEAD@{3}: checkout: moving from branch-B to branch-A
    7a2de88 (branch-B) HEAD@{4}: checkout: moving from master to branch-B
    ...

更多git操作可参考：[Git Book](https://git-scm.com/book/zh/v2)