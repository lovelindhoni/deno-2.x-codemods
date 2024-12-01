This codemod updates the usage of TLS certificate loading in Deno by replacing
deprecated properties with their new counterparts. In Deno V2, loading
certificates directly from files is now deprecated. Instead, you should read the
certificates yourself.

### Before

```ts
const caCert = await Deno.readTextFile("./certs/my_custom_root_CA.pem");
const conn = await Deno.connectTls({
  hostname: "192.0.2.1",
  port: 80,
  caCerts: [caCert],
  certChain: Deno.readTextFileSync("./server.crt"),
  key: Deno.readTextFileSync("./server.key"),
});
```

### After

```ts
const caCert = await Deno.readTextFile("./certs/my_custom_root_CA.pem");
const conn = await Deno.connectTls({
  hostname: "192.0.2.1",
  port: 80,
  caCerts: [caCert],
  cert: Deno.readTextFileSync("./server.crt"),
  key: Deno.readTextFileSync("./server.key"),
});
```
