## Deno Custom Inspect Codemod
This codemod replaces occurrences of Deno.customInspect with Symbol.for("Deno.customInspect"). 
This change aligns with the new standard for defining custom inspection behavior in Deno, providing better interoperability with JavaScript's built-in features.


### Before

```ts
class Foo {
  // Old method of defining custom inspection
  [Deno.customInspect]() {
    return "This is Foo!";
  }
}```

### After

```ts
class Foo {
  // New method of defining custom inspection
  [Symbol.for("Deno.customInspect")]() {
    return "This is Foo!";
  }
}```

