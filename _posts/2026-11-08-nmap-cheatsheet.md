---
title: "Nmap cheatsheet"
categories: [cheatsheets]
tags: [nmap, recon, cheatsheet]
description: The nmap flags I use most, grouped by what I am trying to do.
---
## Scan types

| Goal | Command |
|------|---------|
| Quick top ports | `nmap --top-ports 1000 TARGET` |
| All TCP ports | `nmap -p- --min-rate 5000 TARGET` |
| Default scripts + versions | `nmap -sC -sV TARGET` |
| UDP top ports | `sudo nmap -sU --top-ports 50 TARGET` |

## Typical workflow

```bash
nmap -p- --min-rate 5000 -oN all.txt 10.10.10.10
ports=$(grep -oP '^\d+(?=/tcp\s+open)' all.txt | paste -sd,)
nmap -sC -sV -p "$ports" -oN targeted.txt 10.10.10.10
```

## Output formats

```bash
nmap -oA scan TARGET   # writes .nmap, .gnmap and .xml
```
