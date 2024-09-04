---
layout: default
title: Environment Variables
nav_order: 4
parent: Documentation
---

### Environment Variables
Increase portability of your projects by using environment variables to manage configuration settings across different environments without changing the code.\
The framework uses [dotenv](https://github.com/mrsteele/dotenv-webpack) for environment variables.
#### Example:
create a new file `/.env`:
```
FOO=BAR
```
in `/src/index.js`:
```
Write(Stringify(process.env.FOO));
```

{: .note }
**Recommended**\
Add .env to your .gitignore file.