---
title: "gobuster cheatsheet"
categories: [cheatsheets]
tags: [gobuster, recon, cheatsheet]
description: gobuster cheatsheat
---


# Gobuster Cheat Sheet

Gobuster is a directory/file, DNS, virtual host, and cloud storage enumeration tool used during penetration testing and HTB labs.

---

## 1. Installation

### Kali Linux
```bash
sudo apt update
sudo apt install gobuster
```

### Verify Installation
```bash
gobuster version
```

---

## 2. Directory and File Enumeration (dir)

### Basic Directory Scan
```bash
gobuster dir -u http://TARGET -w /usr/share/wordlists/dirb/common.txt
```

### Scan with Extensions
```bash
gobuster dir -u http://TARGET -w wordlist.txt -x php,txt,html,js
```

### Specify Status Codes
```bash
gobuster dir -u http://TARGET -w wordlist.txt -s 200,204,301,302,307,401,403
```

### Exclude Status Codes
```bash
gobuster dir -u http://TARGET -w wordlist.txt -b 404
```

### Increase Threads
```bash
gobuster dir -u http://TARGET -w wordlist.txt -t 50
```

### Follow Redirects
```bash
gobuster dir -u http://TARGET -w wordlist.txt -r
```

### Verbose Output
```bash
gobuster dir -u http://TARGET -w wordlist.txt -v
```

### Save Results
```bash
gobuster dir -u http://TARGET -w wordlist.txt -o results.txt
```

### Skip TLS Certificate Verification
```bash
gobuster dir -u https://TARGET -w wordlist.txt -k
```

---

## 3. DNS Enumeration (dns)

Find subdomains associated with a domain.

### Basic DNS Scan
```bash
gobuster dns -d example.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
```

### Show IP Addresses
```bash
gobuster dns -d example.com -w wordlist.txt -i
```

### Show CNAME Records
```bash
gobuster dns -d example.com -w wordlist.txt -c
```

---

## 4. Virtual Host Enumeration (vhost)

Find virtual hosts hosted on the same IP address.

### Basic VHost Scan
```bash
gobuster vhost -u http://TARGET -w wordlist.txt
```

### Specify Domain
```bash
gobuster vhost -u http://example.com -w wordlist.txt
```

### Exclude Status Codes
```bash
gobuster vhost -u http://TARGET -w wordlist.txt -b 404
```

---

## 5. S3 Bucket Enumeration

Discover publicly accessible AWS S3 buckets.

```bash
gobuster s3 -w wordlist.txt
```

---

## 6. Useful Wordlists

| Wordlist | Location |
|---|---|
| Dirb Common | `/usr/share/wordlists/dirb/common.txt` |
| Dirbuster | `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt` |
| SecLists Common | `/usr/share/seclists/Discovery/Web-Content/common.txt` |
| SecLists DNS | `/usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt` |
| Raft Medium | `/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt` |

### Install SecLists
```bash
sudo apt install seclists
```

---

## 7. Important Flags

| Flag | Description |
|---|---|
| `-u` | Target URL |
| `-w` | Wordlist |
| `-x` | File extensions |
| `-t` | Number of threads |
| `-o` | Output file |
| `-s` | Include status codes |
| `-b` | Exclude status codes |
| `-r` | Follow redirects |
| `-v` | Verbose output |
| `-k` | Skip TLS certificate verification |
| `-a` | Custom User-Agent |
| `-H` | Custom HTTP header |
| `-c` | Cookies |
| `-q` | Quiet mode |
| `-n` | Hide status codes |
| `-e` | Print full URLs |
| `-f` | Append `/` to directory requests |

---

## 8. HTB Enumeration Workflow

### Step 1: Identify Web Services
```bash
nmap -sC -sV -p 80,443 TARGET
```

### Step 2: Run Gobuster
```bash
gobuster dir -u http://TARGET -w /usr/share/seclists/Discovery/Web-Content/common.txt -x php,txt,html
```

### Step 3: Investigate Discovered Directories

Common discoveries:
```text
/admin
/login
/uploads
/backup
/config
/dev
```

### Step 4: Investigate Interesting Files

Look for:
- Configuration files
- Backup files
- Login pages
- Database files
- Source code
- Exposed credentials
- Development directories

### Step 5: Enumerate Further

If you discover a directory:
```bash
gobuster dir -u http://TARGET/admin/ -w wordlist.txt
```

---

## 9. Common Troubleshooting

### 403 Forbidden
The resource exists, but access is denied.

### 404 Not Found
The requested resource was not found.

### Too Many Errors
Reduce the number of threads:
```bash
-t 10
```

### TLS Certificate Error
```bash
-k
```

### Missing Wordlist
```bash
sudo apt install seclists
```

### Check Gobuster Options
```bash
gobuster help
gobuster dir --help
gobuster dns --help
gobuster vhost --help
```

---

## 10. Quick Reference Commands

### Standard HTB Directory Scan
```bash
gobuster dir -u http://TARGET -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

### Directory Scan with Extensions
```bash
gobuster dir -u http://TARGET -w /usr/share/seclists/Discovery/Web-Content/common.txt -x php,txt,html,bak
```

### Larger Wordlist Scan
```bash
gobuster dir -u http://TARGET -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -t 50 -x php,txt,html
```

### Virtual Host Scan
```bash
gobuster vhost -u http://TARGET -w subdomains.txt
```

### DNS Subdomain Scan
```bash
gobuster dns -d example.com -w subdomains.txt
```

---

## 11. Important Reminders

- Gobuster is an enumeration tool, not an exploitation tool.
- Always investigate discovered directories and files.
- Try multiple wordlists if initial scans return limited results.
- Check HTTP status codes and response sizes.
- Use extensions relevant to the target's technology.
- Always enumerate before attempting exploitation.

**HTB Tip:** Start with `common.txt` for quick scans. If you don't find anything, try `raft-medium-directories.txt` or `directory-list-2.3-medium.txt`.
