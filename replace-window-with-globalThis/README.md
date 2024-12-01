This codemod transforms instances of the `window` identifier into `globalThis`.

### Before

```ts
const value = window.location.href;
```

### After

```ts
const value = globalThis.location.href;
```
