In Deno v2, resource IDs are being deprecated. Most users do not directly interact with resource IDs, so we are moving towards a model where resources are referenced by native JavaScript objects. This codemod automates the process of updating your code to align with this change.

This codemod turns old Deno method calls that takes resource ID's as a argument to their new equivalents. 

### Before

```ts
Deno.flock(resource.rid, ...args);
Deno.fsyncSync(resource.rid);
Deno.writeSync(resource.rid, data);
```

### After

```ts
Deno.lock(resource.rid, ...args);
Deno.syncSync(resource.rid);
Deno.writeSync(resource.rid, data);
```


### Method Mappings

The following mappings are applied by the codemod:

- `Deno.flock` → `Deno.lock`
- `Deno.flockSync` → `Deno.lockSync`
- `Deno.fsync` → `Deno.sync`
- `Deno.fsyncSync` → `Deno.syncSync`
- `Deno.ftruncate` → `Deno.truncate`
- `Deno.ftruncateSync` → `Deno.truncateSync`
- `Deno.funlock` → `Deno.unlock`
- `Deno.funlockSync` → `Deno.unlockSync`
- `Deno.fdatasync` → `Deno.syncData`
- `Deno.fdatasyncSync` → `Deno.syncDataSync`
- `Deno.futime` → `Deno.utime`
- `Deno.futimeSync` → `Deno.utimeSync`
- `Deno.fstat` → `Deno.stat`
- `Deno.fstateSync` → `Deno.statSync`
- `Deno.seek` → `Deno.seek`
- `Deno.seekSync` → `Deno.seekSync`
- `Deno.read` → `Deno.read`
- `Deno.readSync` → `Deno.readSync`
- `Deno.write` → `Deno.write`
- `Deno.writeSync` → `Deno.writeSync`
- `Deno.close` → `Deno.close`
- `Deno.shutdown` → `Deno.closeWrite`

