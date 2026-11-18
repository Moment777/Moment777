---
title: "How Kerberos authentication works"
categories: [notes]
tags: [active-directory, kerberos, theory]
description: A template for a technical learning article: concept first, then a hands-on check.
---
## The idea

Explain the concept in plain language before showing any tooling.

## The three exchanges

1. **AS-REQ / AS-REP:** the client proves who it is and receives a TGT.
2. **TGS-REQ / TGS-REP:** the client trades the TGT for a service ticket.
3. **AP-REQ:** the client presents the service ticket to the service.

### Seeing it on the wire

```console
$ sudo tcpdump -i eth0 -n port 88
```

## Further reading

Link the specifications and posts that helped you.
