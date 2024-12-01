This codemod renames Deno typscript interface names in your codebase to their
new names.

### Before

```ts
function handleRecord(record: Deno.MXRecord) {
  // Handle the MX record
}
```

### After

```ts
function handleRecord(record: Deno.MxRecord) {
  // Handle the MX record
}
```

### The following Deno types are replaced:

- `Deno.CAARecord` → `Deno.CaaRecord`
- `Deno.MXRecord` → `Deno.MxRecord`
- `Deno.NAPTRRecord` → `Deno.NaptrRecord`
- `Deno.SOARecord` → `Deno.SoaRecord`
- `Deno.SRVRecord` → `Deno.SrvRecord`
- `Deno.File` → `Deno.FsFile`
- `Deno.Sever` → `Deno.HttpServer`
