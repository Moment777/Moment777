---
title: "burpsuite cheatsheet"
categories: [cheatsheets]
tags: [burpsuite, recon, cheatsheet]
description: burpsuite cheatsheat
---

# Burp Suite Cheat Sheet

> Web Application Penetration Testing | HTB | OWASP | Bug Bounty

Burp Suite is a web application security testing platform used to intercept, inspect, modify, and replay HTTP/HTTPS requests.

---

# 1. Main Burp Suite Tools

| Tool | Purpose |
|---|---|
| Proxy | Intercept HTTP/HTTPS traffic |
| Repeater | Manually modify and resend requests |
| Intruder | Automate payload testing |
| Decoder | Encode/decode Base64, URL, HTML, etc. |
| Comparer | Compare two requests or responses |
| Sequencer | Analyze token randomness |
| Target | Map website structure and scope |
| Logger | View HTTP traffic history |
| Scanner | Find vulnerabilities (Professional) |

---

# 2. Proxy

**Purpose:** Intercept browser traffic and inspect requests.

### Workflow

1. Open Burp Suite.
2. Navigate to Proxy → Intercept.
3. Turn Intercept on.
4. Visit a website through your configured proxy browser.
5. Inspect the HTTP request.
6. Modify parameters if needed.
7. Click Forward.

### Common Proxy Address

```bash
127.0.0.1:8080
```

### Useful Tabs

- HTTP history - Previously captured traffic.
- Intercept - Requests waiting for your action.
- WebSockets history - WebSocket communications.
- Proxy settings - Listener configuration.

---

# 3. Repeater

**Purpose:** Manually manipulate HTTP requests.

### Workflow

1. Capture a request in Proxy.
2. Right-click the request.
3. Select Send to Repeater.
4. Open Repeater.
5. Modify the request.
6. Click Send.
7. Analyze the response.

### Example Request

```http
GET /profile?id=1 HTTP/1.1
Host: example.com
Cookie: session=abc123
```

### Test Different Parameter Values

```http
GET /profile?id=2 HTTP/1.1
```

```http
GET /profile?id=admin HTTP/1.1
```

```http
GET /profile?id=1' HTTP/1.1
```

### Look For

- HTTP status codes
- Response length
- Error messages
- Changes in returned data
- Authentication behavior

---

# 4. Intruder

**Purpose:** Automate testing with payload lists.

### Attack Types

| Attack | Description |
|---|---|
| Sniper | One payload position at a time |
| Battering Ram | Same payload in all positions |
| Pitchfork | Multiple payload sets matched by position |
| Cluster Bomb | Tests combinations of payload sets |

### Example Request

```http
GET /login?username=§admin§&password=§password§ HTTP/1.1
Host: example.com
```

The `§` symbols identify payload positions.

### Common Uses

- Username enumeration
- Password policy testing
- Parameter fuzzing
- Directory discovery

---

# 5. HTTP Request Methods

| Method | Purpose |
|---|---|
| GET | Retrieve information |
| POST | Submit information |
| PUT | Replace a resource |
| PATCH | Modify a resource |
| DELETE | Delete a resource |
| OPTIONS | Discover supported methods |
| HEAD | Retrieve headers only |

---

# 6. HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 301 | Permanent redirect |
| 302 | Temporary redirect |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 500 | Internal server error |
| 502 | Bad gateway |
| 503 | Service unavailable |

---

# 7. Important HTTP Headers

```http
Host: example.com
User-Agent: Mozilla/5.0
Cookie: session=abc123
Authorization: Bearer TOKEN
Content-Type: application/json
Content-Length: 25
Referer: https://example.com/
Origin: https://example.com
```

### Headers to Examine

| Header | Purpose |
|---|---|
| Cookie | Session management |
| Authorization | Authentication |
| Origin | Cross-origin behavior |
| Referer | Request origin information |
| Host | Host header handling |
| X-Forwarded-For | Proxy-related IP information |

---

# 8. Common Web Vulnerabilities

| Vulnerability | What to Investigate |
|---|---|
| SQL Injection | Database input handling |
| XSS | Untrusted input rendered in HTML |
| IDOR | Access to another user's resources |
| CSRF | Unauthorized state-changing requests |
| SSRF | Server-side URL fetching |
| LFI | Local file inclusion |
| Authentication Bypass | Authentication logic |
| Path Traversal | File path validation |
| Command Injection | Unsafe OS command execution |
| File Upload | Upload validation and storage |

---

# 9. Useful Payloads for Authorized Labs

## SQL Injection

```sql
'
''
' OR '1'='1'--
admin'--
```

## Cross-Site Scripting (XSS)

```html
<script>alert(1)</script>
```

```html
<img src=x onerror=alert(1)>
```

## Path Traversal

```text
../../../etc/passwd
```

## SSRF

```text
http://127.0.0.1/
```

## Command Injection

```bash
; id
&& whoami
| id
```

---

# 10. Burp Suite Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl + R | Send to Repeater |
| Ctrl + I | Send to Intruder |
| Ctrl + F | Forward intercepted request |
| Ctrl + T | Toggle interception |

> Note: Shortcuts may vary by operating system and Burp configuration.

---

# 11. Linux Tools Used Alongside Burp

## FFUF - Directory Discovery

```bash
ffuf -u http://TARGET/FUZZ -w wordlist.txt
```

## CURL - HTTP Requests

```bash
curl -i http://TARGET/
```

## CURL - Response Headers

```bash
curl -I http://TARGET/
```

## NMAP - Web Service Detection

```bash
nmap -sV -p 80,443 TARGET
```

## Gobuster - Directory Discovery

```bash
gobuster dir -u http://TARGET -w wordlist.txt
```

---

# 12. Recommended Resources

- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [Burp Suite Documentation](https://portswigger.net/burp/documentation)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Hack The Box](https://www.hackthebox.com/)

---

# 13. Recommended Burp Suite Workflow for HTB

1. **Discover** - Browse the target and capture traffic in Proxy.
2. **Enumerate** - Review HTTP history and identify interesting endpoints.
3. **Inspect** - Examine cookies, parameters, headers, and authentication.
4. **Test** - Send interesting requests to Repeater.
5. **Fuzz** - Use Intruder to test parameters and inputs.
6. **Validate** - Confirm vulnerabilities and document findings.

---

# 14. Important Reminders

- Always inspect HTTP requests before testing.
- Pay attention to cookies and session tokens.
- Compare response status codes and lengths.
- Test parameters individually.
- Understand how authentication works.
- Document successful findings.
- Only test systems you own or have permission to assess.

---

**Tip:** Master Proxy and Repeater before moving into Intruder. These are fundamental tools for web application penetration testing.

