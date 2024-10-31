This codemod updates deprecated Deno typescript interfaces in your codebase. It automatically imports the necessary typscript interfaces from the standard library

### Before

```ts
function foo(closer: Deno.Closer) {
  // ...
}
```

### After

```ts
import { Closer } from "jsr:@std/io/types";

function foo(closer: Closer) {
  // ...
}
```

### The following Typescript tinterfaces are replaced:

- `Deno.Reader` → `Reader`
- `Deno.ReaderSync` → `ReaderSync`
- `Deno.Seeker` → `Seeker`
- `Deno.SeekerSync` → `SeekerSync`
- `Deno.Writer` → `Writer`
- `Deno.WriterSync` → `WriterSync`
- `Deno.Closer` → `Closer`
