---
title: "Sample CTF: decoding a layered cipher"
categories: [ctf]
tags: [crypto, python, ctf]
difficulty: Easy
description: A template CTF solution with challenge text, approach and solver script.
---
## Challenge

> Paste the challenge description here and note the event, category and points.

## Approach

Look at the ciphertext before you reach for tools.

```console
$ echo 'ZmxhZ3t0ZW1wbGF0ZX0=' | base64 -d
flag{template}
```

## Solver

```python
import base64

blob = "ZmxhZ3t0ZW1wbGF0ZX0="
print(base64.b64decode(blob).decode())
```
