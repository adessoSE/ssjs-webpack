---
layout: default
title: Environment Variables
nav_order: 4
parent: Documentation
---

### environment variables
Example:
create a new file `/.env`:
```
FOO=BAR
```
in `/src/index.js`:
```
Write(Stringify(process.env.FOO));
```