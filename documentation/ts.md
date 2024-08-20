---
layout: default
title: Typescript Loader
nav_order: 7
parent: Documentation
---

### Typescript Loader
import TypeScript into your js files, or use TypeScript exclusively.
Example:
create a new file `/src/add.ts`:
```
export function add(a: number, b: number) : number {
    return a + b;
}
```
in `/src/index.js`:
```
import { add } from "./add.ts";
const result = add(1, 2); // -> 3

```