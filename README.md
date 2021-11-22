# deno_ssm

Amazon SSM SDK for Deno

> ⚠️ This project is work in progress. Expect breaking changes.

## Examples

```ts
import { SSM } from "https://deno.land/x/ssm@0.1.4/mod.ts";

// Initialize the SSM client.
const ssm = new SSM({
  accessKeyID: Deno.env.get("AWS_ACCESS_KEY_ID")!,
  secretKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
  region: "us-east-2",
});

// Retrieve a parameter.
const res = await queue.getParameter({ Name: "MyParam" });
```
