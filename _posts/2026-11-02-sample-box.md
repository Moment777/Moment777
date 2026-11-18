---
title: "Sample Box: foothold through a forgotten backup"
categories: [htb]
tags: [nmap, web, linux, enumeration]
difficulty: Easy
description: A template walkthrough showing every feature of this blog. Replace it with your first retired machine.
---
Only publish walkthroughs for **retired** machines. Hack The Box's rules forbid sharing solutions for active ones.

## Summary

State the machine, the vulnerability chain and the end result in three lines, so readers can decide whether to read on.

## Enumeration

Start with a full TCP scan, then go deeper on the open ports.

```console
$ nmap -p- --min-rate 5000 -oN nmap/all 10.10.10.10
$ nmap -sC -sV -p 22,80 -oN nmap/targeted 10.10.10.10
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1
80/tcp open  http    nginx 1.18.0
```

{% include figure.html src="/assets/img/sample-box/nmap.svg" caption="Targeted nmap scan showing SSH and a web server." %}

### Web content discovery

```bash
ffuf -u http://10.10.10.10/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-small-words.txt -mc 200,301
```

## Foothold

Explain what you found, **why** it worked, and what you tried first that failed. That reasoning is the most valuable part of a writeup.

```python
import requests

r = requests.get("http://10.10.10.10/backup.zip", timeout=10)
open("backup.zip", "wb").write(r.content)
```

## Privilege escalation

```console
user@box:~$ sudo -l
user@box:~$ find / -perm -4000 -type f 2>/dev/null
```

## Lessons learned

- Always enumerate every port before deep-diving one.
- Backups and old files are worth a wordlist run.
