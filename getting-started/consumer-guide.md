# Consumer SDK guide

The Consumer SDK (`@idos-network/consumer`) enables regulated services to retrieve, decrypt, and verify credentials that users have shared with them via access grants.

A consumer integration has two parts: a **frontend** (user-facing, handles wallet connection and access grant requests) and a **backend** (server-side, retrieves and decrypts credentials).

## Installation

```bash
pnpm add @idos-network/client    # frontend
pnpm add @idos-network/consumer  # backend
```

## Prerequisites

### Encryption and signing keys

You need two keys. Store the secret keys securely (HSM or cloud KMS recommended). idOS recommends using threshold secret sharing (TSS) to emulate multisig keys for minimizing leakage risk.

| Key | Type | Purpose |
|-----|------|---------|
| `recipientEncryptionPrivateKey` | NaCl box secret key (base64) | Decrypt credential copies shared with you |
| `consumerSigner` | Ed25519, ethers Wallet, Stellar Keypair, or XRPL keypair | Sign RPC calls to idOS nodes |

### Compliance decisions

Before integrating, decide with your compliance team:

- **Which issuers you trust** — you'll filter credentials by issuer public key
- **Retention period** — how long you need access to user data (for AML requirements)
- **Additional verification** — whether you require extra checks beyond the shared credential

## Backend initialization

```ts
import { idOSConsumer } from "@idos-network/consumer";

const consumer = await idOSConsumer.init({
  consumerSigner, // see signer options below
  recipientEncryptionPrivateKey: "BASE64_ENCODED_SECRET_KEY",
  nodeUrl: "https://nodes.idos.network", // optional, this is the default
});
```

### Signer options

The consumer SDK supports multiple signer types:

**Ed25519 (NaCl)**:
```ts
import nacl from "tweetnacl";
const signer = nacl.sign.keyPair.fromSecretKey(hexDecode(SECRET_KEY));
```

**EVM (ethers.js)**:
```ts
import { ethers } from "ethers";
const signer = new ethers.Wallet(PRIVATE_KEY);
```

**Stellar**:
```ts
import { Keypair } from "@stellar/stellar-sdk";
const signer = Keypair.fromSecret(SECRET_KEY);
```

**XRPL**:
```ts
import { deriveKeypair } from "ripple-keypairs";
const { privateKey, publicKey } = deriveKeypair(SEED);
const signer = { privateKey, publicKey };
```

## Frontend initialization

```ts
import { createIDOSClient } from "@idos-network/client";

const client = await createIDOSClient({
  enclaveOptions: { container: "#idOS-enclave" },
}).createClient();
```

## Integration flow

### 1. Check user profile and credentials (frontend)

```ts
// Connect the user's wallet
const clientWithSigner = await client.withUserSigner(signer);

// Check for an idOS profile
const hasProfile = await clientWithSigner.hasProfile();
if (!hasProfile) {
  // User needs to create a profile and get verified first
  // Redirect to an issuer's onboarding flow
  return;
}

// Log in and check credentials
const loggedIn = await clientWithSigner.logIn();

const filtered = await loggedIn.filterCredentials({
  acceptedIssuers: [
    { authPublicKey: "TRUSTED_ISSUER_PUBLIC_KEY_HEX" },
  ],
  credentialLevelOrHigherFilter: {
    userLevel: "basic",
    requiredAddons: ["liveness"],
  },
});

if (filtered.length === 0) {
  // User has no adequate credentials
  // Redirect to KYC provider for verification
  return;
}
```

### 2. Request an access grant (frontend)

```ts
const credential = filtered[0]; // or let the user choose

const grant = await loggedIn.requestAccessGrant(credential.id, {
  consumerAuthPublicKey: "YOUR_AUTH_PUBLIC_KEY_HEX",
  consumerEncryptionPublicKey: "YOUR_ENCRYPTION_PUBLIC_KEY_BASE64",
  lockedUntil: Math.floor(Date.now() / 1000) + 5 * 365 * 24 * 60 * 60, // 5-year lock for AML
});

// Send grant details to your backend
```

### 3. Retrieve and decrypt the credential (backend)

Once an access grant exists, the consumer backend can retrieve the credential at any time — the user does not need to be online.

```ts
// List access grants
const grants = await consumer.getAccessGrants({
  user_id: userId,
  page: 1,
  size: 10,
});

// Retrieve and decrypt a specific shared credential
const credential = await consumer.getCredentialSharedContentDecrypted(grant.data_id);
```

### 4. Verify the credential (backend)

Always verify the credential signature before trusting its contents:

```ts
const isValid = await consumer.verifyCredential(credential, [
  "TRUSTED_ISSUER_PUBLIC_KEY_MULTIBASE",
]);

if (!isValid) {
  // Credential failed verification — do not trust
}
```

### 5. Check credential status

Credential expiry and revocation are stored as cleartext metadata, queryable without decryption and without user interaction:

- **Expiry**: Check the `expiry_date` field in the credential's public notes
- **Revocation**: Check the `credential_status` field — issuers can mark credentials as `"revoked"`

### 6. Request additional data (if needed)

If the shared credential doesn't contain all required fields (e.g., you need a proof-of-address and the existing credential only has basic KYC), you can direct the user through an additional KYC flow. The new flow can be pre-loaded with idOS context so that only the missing data is collected. On completion, a new credential is issued and shared.

## Rescinding shared credentials

If you no longer need access to a shared credential:

```ts
await consumer.rescindSharedCredential(credentialId);
```

## Full API reference

See the [Consumer SDK source](https://github.com/idos-network/idos-sdk-js/tree/main/packages/consumer) for complete type definitions.
