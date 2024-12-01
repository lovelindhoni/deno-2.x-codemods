This codemod helps developers migrate their deno.json configuration files to the
new flattened schema format, making them easier to read and write. It automates
the transformation of nested properties to their new top-level structure as
outlined in recent Deno updates.

### Before

```json
{
  "lint": {
    "files": {
      "exclude": ["gen.ts"]
    }
  },
  "fmt": {
    "options": {
      "lineWidth": 80,
      "useTabs": false
    }
  }
}
```

### After

```json
{
  "lint": {
    "exclude": ["gen.ts"]
  },
  "fmt": {
    "lineWidth": 80,
    "useTabs": false
  }
}
```

The codemod handles the following transformations on the config file

| Before                    | After             |
| ------------------------- | ----------------- |
| `bench.files.include`     | `bench.include`   |
| `bench.files.exclude`     | `bench.exclude`   |
| `fmt.files.include`       | `fmt.include`     |
| `fmt.files.exclude`       | `fmt.exclude`     |
| `fmt.options.useTabs`     | `fmt.useTabs`     |
| `fmt.options.lineWidth`   | `fmt.lineWidth`   |
| `fmt.options.indentWidth` | `fmt.indentWidth` |
| `fmt.options.singleQuote` | `fmt.singleQuote` |
| `fmt.options.proseWrap`   | `fmt.proseWrap`   |
| `fmt.options.semiColons`  | `fmt.semiColons`  |
| `lint.files.include`      | `lint.include`    |
| `lint.files.exclude`      | `lint.exclude`    |
| `test.files.include`      | `test.include`    |
| `test.files.exclude`      | `test.exclude`    |
