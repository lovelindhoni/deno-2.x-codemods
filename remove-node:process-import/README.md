This codemod removes redundant import process from 'node:process'; statements, as process is now globally available in Deno v2

### Before

```ts
import process from "node:process";
console.log(process.env.NODE_ENV);
```

### After

```ts
console.log(process.env.NODE_ENV);
```

