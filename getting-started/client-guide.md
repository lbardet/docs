# Client SDK guide

The Client SDK (`@idos-network/client`) is the user-facing browser SDK. It handles wallet authentication, profile management, credential access, and access grant creation.

## Installation

```bash
pnpm add @idos-network/client
```

## Client state machine

The client follows a linear state progression:

```
Configuration → Idle → WithUserSigner → LoggedIn
```

Each state unlocks additional methods. For example, `logIn()` is available after attaching a signer, and credential operations are available after login.

## Step 1: Initialize the client

```ts
import { createIDOSClient } from "@idos-network/client";

const idOS = await createIDOSClient({
  nodeUrl: "https://nodes.idos.network",
  enclaveOptions: {
    container: "#idos-enclave", // DOM element for the enclave iframe
  },
}).createClient();
```

Your HTML page must include a container element:

```html
<div id="idos-enclave"></div>
```

## Step 2: Attach the user's wallet signer

Connect the user's wallet and pass the signer to the client. Any supported wallet library works.

**EVM (ethers.js)**:

```ts
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();

const idOSWithSigner = await idOS.withUserSigner(signer);
```

**NEAR**:

```ts
import { connect, keyStores } from "near-api-js";

const near = await connect({
  networkId: "mainnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.mainnet.near.org",
});
const wallet = await near.walletConnect();
const idOSWithSigner = await idOS.withUserSigner(wallet);
```

## Step 3: Check for a profile and log in

```ts
const hasProfile = await idOSWithSigner.hasProfile();

if (!hasProfile) {
  // Redirect to your onboarding/KYC flow
  // The issuer will create the profile
  window.location.href = "https://your-kyc-provider.example.com/enroll";
  return;
}

const loggedIn = await idOSWithSigner.logIn();
// loggedIn.user contains the user's idOS profile metadata
```

## Step 4: Read and filter credentials

### List all credential headers

Returns metadata (public notes) without decrypting private content:

```ts
const credentials = await loggedIn.getAllCredentials();
```

### Filter credentials

Find credentials matching specific criteria — useful when checking if a user has adequate verification:

```ts
const filtered = await loggedIn.filterCredentials({
  acceptedIssuers: [
    { authPublicKey: "ISSUER_AUTH_PUBLIC_KEY_HEX" },
  ],
  credentialLevelOrHigherFilter: {
    userLevel: "basic",
    requiredAddons: ["email", "liveness"],
  },
  publicNotesFieldFilters: {
    pick: { type: ["human"] },
    omit: {},
  },
});
```

### Decrypt a specific credential

```ts
const content = await loggedIn.getCredentialContent("CREDENTIAL_ID");
```

The SDK decrypts through the enclave — plaintext stays within the user's browser session.

## Step 5: Share a credential (create access grant)

To share a credential with a consumer, create an access grant. This triggers the client-side re-encryption flow: the SDK decrypts the credential locally, re-encrypts it with the consumer's public key, and stores the re-encrypted copy.

```ts
const grant = await loggedIn.requestAccessGrant("CREDENTIAL_ID", {
  consumerAuthPublicKey: "CONSUMER_AUTH_PUBLIC_KEY_HEX",
  consumerEncryptionPublicKey: "CONSUMER_ENCRYPTION_PUBLIC_KEY_BASE64",
  lockedUntil: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60, // optional: 90-day lock
});
```

The `lockedUntil` parameter creates a time-locked grant that cannot be revoked before the specified Unix timestamp. This supports AML retention requirements.

## Step 6: Manage wallets

Users can link multiple wallets to a single idOS profile:

```ts
// Add a wallet
await loggedIn.addWallet({
  id: crypto.randomUUID(),
  address: "0x...",
  public_key: "0x...",
  message: "Sign this message to prove wallet ownership",
  signature: "0x...",
  wallet_type: "EVM",
});

// List linked wallets
const wallets = await loggedIn.getWallets();

// Remove a wallet
await loggedIn.removeWallet("WALLET_ID");
```

## Step 7: Log out

```ts
await loggedIn.logOut();
```

## Delegated write grants

If a user needs to go through identity verification that takes time (e.g., manual document review), you can request a delegated write grant (DWG). This allows the issuer to write the credential later without requiring the user to be present:

```ts
const dwgMessage = await loggedIn.requestDWGMessage({
  consumer_auth_public_key: "CONSUMER_AUTH_PUBLIC_KEY",
  issuer_auth_public_key: "ISSUER_AUTH_PUBLIC_KEY",
  access_grant_timelock: "LOCK_TIMESTAMP",
});
// Send dwgMessage to your backend for the issuer to use later
```

## Full API reference

For complete type definitions and all available methods, see the [SDK source code](https://github.com/idos-network/idos-sdk-js/tree/main/packages/client).
