This codemod helps migrate JavaScript/TypeScript files from using the deprecated **import assertions** syntax to the updated **import attributes** syntax. 
The change aligns with the updated proposal for import attributes and ensures compatibility with newer versions of runtimes like **Deno 2** and modern browsers that have already removed support for import assertions.


This codemod turns import statements using `assert` into `with` for import attributes.

### Before

```ts
import data from "./data.json" assert { type: "json" };
```

### After

```ts
import data from "./data.json" with { type: "json" };
```

