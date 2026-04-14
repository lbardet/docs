# Issuer SDK guide

The Issuer SDK (`@idos-network/issuer`) enables KYC/IDV providers to create user profiles and write signed, encrypted credentials to idOS.

An issuer integration has two parts: a **frontend** (user-facing, handles wallet connection and consent) and a **backend** (server-side, writes credentials and manages profiles).

## Installation

```bash
pnpm add @idos-network/client   # frontend
pnpm add @idos-network/issuer   # backend
```

## Prerequisites

### Encryption and signing keys

You need three key pairs. Store the secret keys securely (HSM or cloud KMS recommended).

| Key | Type | Purpose |
|-----|------|---------|
| `encryptionSecretKey` | NaCl box key (base64) | Encrypt credentials written to user profiles |
| `signingKeyPair` | Ed25519, NEAR KeyPair, or ethers Wallet | Sign RPC calls to idOS nodes |
| `multibaseSigningKeyPair` | Ed25519 (multibase-encoded) | Sign W3C Verifiable Credentials |

Generate a multibase signing key pair:

```ts
import { Ed25519VerificationKey2020 } from "@digitalcredentials/ed25519-verification-key-2020";

const key = await Ed25519VerificationKey2020.generate();
console.log(key.privateKeyMultibase); // z...
console.log(key.publicKeyMultibase);
```

### Permissioned issuer status

Profile creation requires **permissioned issuer** status. Generate an Ed25519 signing key and send the public key (hex) to [engineering@idos.network](mailto:engineering@idos.network) to register.

## Backend initialization

```ts
import { idOSIssuer } from "@idos-network/issuer";
import nacl from "tweetnacl";
import { decode } from "@stablelib/base64";

const issuer = await idOSIssuer.init({
  nodeUrl: "https://nodes.idos.network",
  signingKeyPair: nacl.sign.keyPair.fromSecretKey(decode(ISSUER_SIGNING_SECRET_KEY)),
  encryptionSecretKey: decode(ISSUER_ENCRYPTION_SECRET_KEY),
});
```

## Frontend initialization

```ts
import { createIDOSClient } from "@idos-network/client";

const client = await createIDOSClient({
  enclaveOptions: { container: "#idOS-enclave" },
}).createClient();
```

## Integration flow

### 1. Check if the user has a profile

On the frontend, connect the wallet and check:

```ts
const address = await signer.getAddress();
const hasProfile = await client.addressHasProfile(address);

if (!hasProfile) {
  // Proceed to profile creation (step 2)
} else {
  // Check for existing credentials, or request a write grant
}
```

### 2. Create a user profile (if needed)

This is a backend operation. Only permissioned issuers can create profiles.

```ts
// Backend: decide on a user ID
const userId = crypto.randomUUID();

// Frontend: get the user's encryption public key from the enclave
const clientWithSigner = await client.withUserSigner(signer);
const { userEncryptionPublicKey } = await clientWithSigner.createUserEncryptionProfile(userId);

// Backend: create the profile
await issuer.createUser(
  { id: userId, recipient_encryption_public_key: userEncryptionPublicKey },
  { address: walletAddress, public_key: walletPublicKey, wallet_type: "EVM" }
);
```

### 3. Request a delegated write grant

The user must consent to the issuer writing a credential. This happens on the frontend:

```ts
const loggedIn = await clientWithSigner.logIn();

const dwgMessage = await loggedIn.requestDWGMessage({
  consumer_auth_public_key: CONSUMER_AUTH_PUBLIC_KEY,
  issuer_auth_public_key: ISSUER_AUTH_PUBLIC_KEY,
  access_grant_timelock: LOCK_TIMESTAMP, // optional
});

// Send dwgMessage to your backend
```

### 4. Build and write the credential

On the backend, after identity verification completes:

```ts
// Build a W3C Verifiable Credential
const credential = await issuer.buildCredential(
  {
    credential_type: "human",
    credential_level: "basic",
    credential_status: "approved",
    // ... additional fields
  },
  {
    // Credential subject fields (the verified user data)
    firstName: "Alice",
    lastName: "Smith",
    dateOfBirth: "1990-01-15",
    country: "US",
    // ... additional fields per your schema
  },
  {
    // Issuer identity
    publicKeyMultibase: ISSUER_PUBLIC_KEY_MULTIBASE,
    privateKeyMultibase: ISSUER_PRIVATE_KEY_MULTIBASE,
    issuerName: "Your KYC Provider",
  },
  true // validate against schema (optional)
);

// Write to idOS using the delegated write grant
await issuer.createCredentialByDelegatedWriteGrant(
  credential,
  dwgMessage // the signed DWG from step 3
);
```

### 5. Revoke a credential (if needed)

Issuers can mark credentials as revoked by updating the public notes:

```ts
await issuer.editCredentialAsIssuer(publicNotesId, {
  ...existingPublicNotes,
  credential_status: "revoked",
});
```

Revocation status is stored as cleartext metadata — consumers can check it without decrypting the credential.

## Credential schema

idOS recommends using W3C Verifiable Credentials with the [idOS KYC schema](https://github.com/idos-network/idos-schema). Pre-built schemas exist for common data types in collaboration with Sumsub and Persona:

- Full KYC/AML verification
- Document verification
- Liveness and uniqueness checks
- KYB (Know Your Business)

The storage layer is format-agnostic — you can store any content, including binary data (passport scans, selfies).

## Full API reference

See the [Issuer SDK source](https://github.com/idos-network/idos-sdk-js/tree/main/packages/issuer) for complete type definitions.
