---
title: "ffuf cheatsheet"
categories: [cheatsheets]
tags: [ffuf, recon, cheatsheet]
description: The nmap flags I use most, grouped by what I am trying to do.
---

---
layout: default
title: FFUF
permalink: /ffuf/
---

# FFUF - Web Fuzzing

FFUF (Fuzz Faster U Fool) is a fast web fuzzer written in Go. It is commonly used during penetration testing and CTFs to discover hidden directories, files, virtual hosts, parameters, and endpoints.

## 1. Basic Syntax

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt
```

| Option | Description |
|---|---|
| `-u` | Target URL |
| `-w` | Wordlist |
| `-fc` | Filter HTTP status codes |
| `-fs` | Filter response size |
| `-fw` | Filter word count |
| `-fl` | Filter line count |
| `-mc` | Match HTTP status codes |
| `-ac` | Automatic calibration |
| `-recursion` | Enable recursion |
| `-t` | Number of threads |
| `-o` | Save output |
| `-of` | Output format |

## 2. Directory Enumeration

Discover hidden directories and files.

```bash
ffuf -u http://TARGET/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt
```

Using a larger wordlist:

```bash
ffuf -u http://TARGET/FUZZ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
```

Filter 404 responses:

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt -fc 404
```

## 3. File Extension Enumeration

Discover files with common extensions.

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt -e .php,.txt,.html,.bak,.zip
```

## 4. Virtual Host Enumeration

Discover virtual hosts using the HTTP Host header.

```bash
ffuf -u http://TARGET/ -H "Host: FUZZ.example.com" -w subdomains.txt
```

Filter responses by size:

```bash
ffuf -u http://TARGET/ -H "Host: FUZZ.example.com" -w subdomains.txt -fs SIZE
```

## 5. Subdomain Enumeration

Fuzz subdomains:

```bash
ffuf -u http://FUZZ.example.com/ -w subdomains.txt
```

## 6. Parameter Discovery

Find hidden GET parameters.

```bash
ffuf -u "http://TARGET/page.php?FUZZ=test" -w parameters.txt
```

Find hidden POST parameters:

```bash
ffuf -u http://TARGET/login.php -X POST -d "FUZZ=test" -H "Content-Type: application/x-www-form-urlencoded" -w parameters.txt
```

## 7. POST Request Fuzzing

Test login passwords:

```bash
ffuf -u http://TARGET/login.php -X POST -d "username=admin&password=FUZZ" -w passwords.txt -H "Content-Type: application/x-www-form-urlencoded"
```

Fuzz multiple parameters:

```bash
ffuf -u http://TARGET/login.php -X POST -d "username=USER&password=PASS" -w users.txt:USER -w passwords.txt:PASS
```

## 8. Filtering Results

Filter status codes:

```bash
-fc 404
```

Filter response size:

```bash
-fs 1234
```

Filter word count:

```bash
-fw 20
```

Filter line count:

```bash
-fl 10
```

Automatic calibration:

```bash
-ac
```

## 9. Recursion

Enable directory recursion:

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt -recursion -recursion-depth 2
```

## 10. Save Results

Save output as JSON:

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt -o results.json -of json
```

Save output as CSV:

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt -o results.csv -of csv
```

## 11. Useful Wordlists

| Wordlist | Purpose |
|---|---|
| `common.txt` | Common directories |
| `directory-list-2.3-medium.txt` | Directory discovery |
| `raft-medium-directories.txt` | Directory fuzzing |
| `raft-medium-files.txt` | File discovery |
| `subdomains-top1million-5000.txt` | Subdomain discovery |

SecLists directory:

```bash
/usr/share/seclists/
```

Install SecLists:

```bash
sudo apt install seclists
```

## 12. HTB Enumeration Workflow

### Step 1 - Identify the Web Server

```bash
whatweb http://TARGET
```

### Step 2 - Discover Directories

```bash
ffuf -u http://TARGET/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt -ac
```

### Step 3 - Discover Extensions

```bash
ffuf -u http://TARGET/FUZZ -w common.txt -e .php,.txt,.bak,.html
```

### Step 4 - Discover Virtual Hosts

```bash
ffuf -u http://TARGET/ -H "Host: FUZZ.example.com" -w subdomains.txt -ac
```

### Step 5 - Investigate Endpoints

Use a browser, Burp Suite, or curl to inspect interesting responses.

## 13. Important Tips

- Inspect baseline responses before filtering.
- Use `-ac` when the server returns unusual responses.
- Pay attention to HTTP 200, 301, 302, 401, and 403 responses.
- Try different file extensions.
- Check virtual hosts when DNS enumeration is limited.
- Start with smaller wordlists.
- Adjust threads carefully.
- Only fuzz systems you own or are authorized to test.

## References

- [FFUF GitHub](https://github.com/ffuf/ffuf)
- [Hack The Box](https://www.hackthebox.com/)
- [SecLists](https://github.com/danielmiessler/SecLists)
