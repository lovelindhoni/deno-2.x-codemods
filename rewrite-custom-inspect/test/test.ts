class Foo {
  // Old method of defining custom inspection
  [Symbol.for("Deno.customInspect")]() {
    return "This is Foo!";
  }
}
