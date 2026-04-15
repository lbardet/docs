# Getting started

This section covers how to integrate idOS into your application. Start from what you need to accomplish, then drill into the technical details.

## What do you need to do?

### "I need to onboard users with KYC"

You want users to complete identity verification and store their credentials for re-use across your ecosystem.

**Fastest path**: Use [idOS Relay](https://github.com/idos-network/relay) — an embeddable iframe that handles account creation, KYC provider integration, credential issuance, and access grant logic. → [Integration overview](integration-overview.md)

**Full control**: Use the Issuer SDK to build your own verification flow. → [Issuer SDK guide](issuer-guide.md)

### "I need to verify a user's existing credentials"

Your users already have KYC credentials in idOS (from another provider or service). You want to request access, retrieve, and verify them — no re-verification needed.

**You need**: `@idos-network/client` (frontend) + `@idos-network/consumer` (backend)

→ [Consumer SDK guide](consumer-guide.md)

### "I need to add identity management to my wallet or dApp"

Your users connect wallets, manage their idOS profiles, and share credentials with third parties through your UI.

**You need**: `@idos-network/client`

→ [Client SDK guide](client-guide.md)

### "I need to issue credentials as a KYC provider"

You run an identity verification business and want to write signed credentials to idOS on behalf of your users.

**You need**: `@idos-network/client` (frontend) + `@idos-network/issuer` (backend)

→ [Issuer SDK guide](issuer-guide.md)

### "I need to evaluate idOS for compliance"

You're a compliance officer assessing whether idOS meets your regulatory requirements.

→ [Compliance officer guide](../compliance/compliance-guide.md)

## SDK packages

All packages are published on [npm](https://www.npmjs.com/org/idos-network) under the `@idos-network` scope.

| Package | Purpose | Runtime |
|---------|---------|---------|
| [`@idos-network/client`](https://www.npmjs.com/package/@idos-network/client) | User auth, profiles, credentials, access grants | Browser |
| [`@idos-network/issuer`](https://www.npmjs.com/package/@idos-network/issuer) | Write credentials, create profiles | Server (Node.js) |
| [`@idos-network/consumer`](https://www.npmjs.com/package/@idos-network/consumer) | Retrieve and decrypt shared credentials | Server (Node.js) |
| [`@idos-network/enclave`](https://www.npmjs.com/package/@idos-network/enclave) | Key derivation, encryption in secure context | Browser |
| [`@idos-network/credentials`](https://www.npmjs.com/package/@idos-network/credentials) | W3C VC building and verification | Both |
| [`@idos-network/utils`](https://www.npmjs.com/package/@idos-network/utils) | Encryption, codecs, cryptographic utilities | Both |

For mobile, use the [Kotlin multiplatform SDK](https://github.com/idos-network/idos-sdk-kotlin).

## Prerequisites

- **Node.js** 22.19.0+ (for server-side packages)
- **A blockchain wallet** for authentication (EVM, NEAR, Stellar, or XRPL)
- **Encryption keys**: Each issuer and consumer needs their own NaCl key pair. See the relevant guide for generation instructions.

## Quick example: check if a user has an idOS profile

```ts
import { createIDOSClient } from "@idos-network/client";
import { ethers } from "ethers";

// 1. Initialize and create the client
const idOS = await createIDOSClient({
  nodeUrl: "https://nodes.idos.network",
  enclaveOptions: { container: "#idos-enclave" },
}).createClient();

// 2. Connect the user's wallet
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();

const idOSWithSigner = await idOS.withUserSigner(signer);

// 3. Check for an existing profile
const hasProfile = await idOSWithSigner.hasProfile();

if (hasProfile) {
  const loggedIn = await idOSWithSigner.logIn();
  const credentials = await loggedIn.getAllCredentials();
  console.log("User credentials:", credentials);
} else {
  // Redirect to onboarding / KYC flow
}
```

Your HTML page needs a container element for the enclave:

```html
<div id="idos-enclave"></div>
```

## Source code and examples

- [SDK monorepo](https://github.com/idos-network/idos-sdk-js) — all TypeScript packages
- [Kotlin SDK](https://github.com/idos-network/idos-sdk-kotlin) — mobile / multiplatform
- [Live demo](https://demo.idos.network/) — KYC re-usability flow
