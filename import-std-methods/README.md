This codemod updates removed Deno function calls in Deno v2 to their new equivalents from the standard library
It also automatically adds the necessary import statements from the appropriate modules.

### Before

```ts
function example() {
  const buffer = Deno.Buffer.from("Hello, World!");
  Deno.copy(source, destination);
}```

### After

```ts
import { Buffer } from "jsr:@std/io/buffer";
import { copy } from "jsr:@std/io/copy";

function example() {
  const buffer = Buffer.from("Hello, World!");
  copy(source, destination);
}
```
### The following Deno functions are replaced:

- `Deno.Buffer` → `Buffer`
- `Deno.copy` → `copy`
- `Deno.iter` → `iterateReader`
- `Deno.iterSync` → `iterateReaderSync`
- `Deno.writeAllSync` → `writeAllSync`
- `Deno.writeAll` → `writeAll`
- `Deno.readAllSync` → `readAllSync`
- `Deno.readAll` → `readAll`
