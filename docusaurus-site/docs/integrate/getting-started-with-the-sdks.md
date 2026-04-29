
# Getting Started With the SDKs

## Getting Started Guides

### Getting started with the idOS Client SDK 

### Installation

Get [our NPM package](https://www.npmjs.com/package/@idos-network/idos-sdk) and its dependencies with pnpm or the equivalent of your package manager of choice:

```
pnpm add @idos-network/idos-sdk ethers near-api-js
```

Only add `ethers` or `near-api-js` in accordance with the chains your dApp uses.

> 💡 Tip
>
> If you use `near-api-js`, make sure you have a `Buffer` polyfill. See [near/near-api-js#757](https://github.com/near/near-api-js/issues/757).

### Quickstart



Create a container anywhere on your page, and ensure it's displayed when assigned the `visible` class.

```
<div id="idos-container"></div>
```

```
div#idos-container {
  display: none;
}

/* Style this however you like. */
div#idos-container.visible {
  display: block;
  width: 160px;
}
```

Import the SDK and initialize it with a selector for the container:

```
import { idOS } from "@idos-network/idos-sdk";

const idos = await idOS.init({enclaveOptions: {container: "#idos-container"}});
```

Get your user's address and confirm they have an idOS profile. If not, redirect them to your Issuer.

```
const hasProfile = await idos.hasProfile(address);
if (!hasProfile) window.location = "https://kyc-provider.example.com/enroll";
```

Connect your user's signer to complete the setup.

```
await idos.setSigner("EVM", signer); // e.g. ethers.Signer
```

You're all set!

```
const credentials = await idos.data.list("credentials");
console.log(credentials);
// [{ id: "4f4d...", issuer: "Fractal ID", type: "human" }, ...]

const { id } = credentials[0];
const { content } = await idos.data.get("credentials", id);
const isValid = await idOS.verifiableCredentials
  .verify(content)
  .catch((e) => false);
```

> 💡 Tip
>
> For more examples and data queries, see:
>
> * the [quick reference](https://github.com/idos-network/idos-sdk-js/tree/feat/docs-v1/packages/idos-sdk-js#quick-reference) below
> * [`📁 idos-example-dapp`](https://github.com/idos-network/idos-sdk-js/tree/main/examples/idos-example-dapp) for a simple implementation
> * [`📁 idos-data-dashboard`](https://github.com/idos-network/idos-sdk-js/tree/main/apps/idos-data-dashboard) for a thorough example

> 🛟 Help available
>
> Would you benefit from support or clarification from our team? Please follow [our support process](https://github.com/idos-network/.github/blob/main/profile/README.md).

### Diving deeper



#### Initialization and the `#idos-container`



```
import { idOS } from "@idos-network/idos-sdk";

const idos = await idOS.init({enclaveOptions: {container: "#idos-container"}});
```

After importing the SDK, you initialize it with a selector string for a DOM node. Make sure to add it to your page:

```
<div id="idos-container"></div>
```

This container will be used by the SDK to load the idOS secure enclave during initialization. The [`📁 idos-enclave`](https://github.com/idos-network/idos-sdk-js/tree/main/apps/idos-enclave) is a sandboxed browser context, used to safekeep a keyring for cryptographic operations users need to perform. When the enclave requires user interaction, it uses this container to render UI such as the **`🔓 Unlock idOS`** button.

[![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-container-1.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-container-1.png)

To avoid surprising your UI, the SDK doesn't make itself visible and sets no CSS properties. Instead, it toggles the `visible` class on this container. This means you retain control over your UI, and need to define what "visible" means, for example:

```
#idos-container {
  display: none;
}

#idos-container.visible {
  display: block;
}
```

This barebones setup is enough to get you started, but you can naturally style and animate the container as you like, for example within a toast component.

Our [`📁 idos-example-dapp`](https://github.com/idos-network/idos-sdk-js/tree/main/examples/idos-example-dapp) shows an example of blending this into a UI. It wraps the container and floats it over the page, and animates its opacity when the `visible` class is applied. You can see it below (pulsating forcefully to illustrate the point):

[![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-container-2.gif)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-container-2.gif)

The main reason the SDK controls this HTML element is to remove the burden of opening up a new top-level window without being blocked by the browser because it was identified as an unwanted pop-up. Since all SDK users would need to go through the delicate process of getting these details right, we implemented it in the SDK.

#### Other initialization options



The `enclaveOptions`'s `container` is the only required option, but there are a few other aspects of the SDK you're able to control during initialization.

**`nodeUrl`**



The most obvious one is to which network to connect: production, or playground. These can be found, respectively, at:

* [https://nodes.idos.network](https://nodes.idos.network/) (default)
* [https://nodes.playground.idos.network](https://nodes.playground.idos.network/)

Here's an example of using the playground network:

```
const idos = await idos.init({
  nodeUrl: "https://nodes.playground.idos.network",
  enclaveOptions: {container: "#idos-container"},
});
```

**`enclaveOptions`**



So far, we've only used `container` from `enclaveOptions`. There are a few more fields that you can set:

* `theme?: "light" | "dark"`: Forces a specific theme for the enclave pop-up. By default, this is discovered through the media query `prefers-color-scheme`.
* `mode?: "new" | "existing"`: Forces a specific verbiage to be shown on the enclave pop-up. The default is `existing`, but issuers can set it to `new` to show messages that are more helpful for new users. Unless you're an issuer, this should not be supplied.
* `url?: string`: URL of the enclave pop-up. Unless you're developing your own enclave, this should not be supplied.
* `throwOnUserCancelUnlock?: boolean`: Controls the SDK's reaction to the user closing the enclave pop-up. The default, `false`, keeps the **🔓 Unlock idOS** button visible so the user can click it again and finish the unlocking process. If this value is `true`, the SDK will hide the button and raise whatever error it got from the enclave pop-up.

#### Using `hasProfile`



You can check if your user has an idOS profile associated with their address by using `await idos.hasProfile(address)`. This can be done without a signature, and confirms that calls to `setSigner` should succeed.

```
const hasProfile = await idos.hasProfile(address);
```

If your user does not have an idOS profile, you'll have to first redirect them to your credential provider. Here's an example:

```
if (!hasProfile) window.location = "https://kyc-provider.example.com/enroll";
```

#### The `setSigner` flow and supported wallets



```
const { userId } = await idos.setSigner("EVM", signer);
```

Besides `hasProfile`, all other queries to idOS nodes require a valid signature. These are performed by your user's wallet, whose signer must be passed to the SDK via the `setSigner` method. Your user's wallet might need to be triggered, so you should be mindful of when in your user's journey you call this method.

When called, `setSigner` will try to connect to the idOS nodes, sign a [Sign-In With Ethereum](https://eips.ethereum.org/EIPS/eip-4361) (SIWE) message for authentication, and make a call to get some basic information about the user.

> 🛈 Note about NEAR
>
> Because idOS thinks in terms of signing keys, but NEAR thinks in terms of accounts that can be controlled by multiple signing keys, the SDK needs to discover the signing key that's currently being used. This requires a signed message from the user.
>
> Here's an example of what that looks like with Meteor:
>
> [![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-sign-near.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-sign-near.png)

Here's an example of what signing a SIWE message looks like with Metamask:

[![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-sign-siwe.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-sign-siwe.png)

During this whole process, the SDK tries to use the browser's local storage to remember this signer's address (and public key, for NEAR signers) to avoid repeating this process unless necessary.

The idOS currently supports two classes of signers:

* Ethereum/EVM wallets (like MetaMask or Trust Wallet) producing [EIP-191](https://eips.ethereum.org/EIPS/eip-191) `secp256k1` signatures (aka `personal_sign`)
* NEAR/NVM wallets (like MyNearWallet or Meteor) producing [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md) `ed25519` signatures (aka `signMessage`)

#### Exploring the user's data



Now that we're successfully authenticated on idOS, we can now perform operations on user data. The entities that a user controls are:

* **Wallets**: the wallets that the user has declared as being able to control their idOS profile.
* **Credentials**: the credentials of a user. Their contents are encrypted (for the user's encryption key), but it also has some public fields for inspection.
* **Attributes**: free form key-value entries. You can use this to store public attribute about the user.

All of these can be created, retrieved, updated, or deleted. The only notable exceptions is deleting shared credentials with timelocks still active (more on this when we explain Access Grants).

Here's an example of listing a user's credentials:

```
const credentials = await idos.data.list("credentials");
console.log(credentials);
// [{ id: "4f4d...", issuer: "FractalID", type: "human" }, ...]
```

#### Decrypting the user credential content



> ⚠️ Warning
>
> This is only meant to be used on admin-like dApps (like [https://dashboard.idos.network/](https://dashboard.idos.network/)).
>
> If the user hasn't granted you an Access Grant, the user hasn't consented to you getting a copy of the data. We'll be covering Access Grant in a following section.
>
> For now, please use idOS responsibly and respect the user's will and data sovereignty. In order to protect the user, we're planning on changing how this admin-like access works in the near future, so please don't rely on it.

Today, as a shortcut, we decrypt the credential's content on `get`:

```
const { content } = await idos.data.get("credentials", credentials[0].id);
```

The manual version on this shortcut looks like this:

```
const credential = await idos.data.get(
  "credentials",
  credentials[0].id,
  false, // `false` here means "don't ask the user to decrypt the contents"
);

const content = await idos.enclave.decrypt(
  credential.content,
  credential.encryptor_public_key,
)
```

This call needs to operate with the user's encryption key. This is a responsibility of the Enclave, which we'll explain in the next section.

Now you have access to the decrypted credential contents. If it's a [W3C Verifiable Credential](https://www.w3.org/TR/vc-data-model-2.0/), you can check it's authenticity with:

```
await idOS.verifiableCredentials.verify(content)
```

This function always returns `true` or raises an Error detailing what went wrong with the verification process.

#### Unlocking the idOS enclave



Credential contents stored in the idOS are encrypted such that only its owner (your user) can make sense of it. Since key management is neither a common nor an expectable practice among non-technical folks, this key is derived from the user's password/passkey. The key derivation process is handled by the idOS secure enclave to enable users to perform [authenticated asymmetric ECC encryption / decryption](https://cryptobook.nakov.com/asymmetric-key-ciphers/elliptic-curve-cryptography-ecc#curve25519-x25519-and-ed25519).

Since the SDK does not have access to this key, it delegates decryption workloads to the enclave when responding to data requests involving encryption/decryption. This happens transparently when you use the SDK to read encrypted data from the idOS.

After the user clicks the **🔓 Unlock idOS** button, a secure dialog opens for the user to choose their preferred unlocking method.

| _The unlock dialog_                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-auth-dialog.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-auth-dialog.png) |

If the user chooses **Password**, they'll be prompted to enter it.

| _The password dialog_                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-dialog-password.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-dialog-password.png) |

If they choose **Passkey**, we'll use their platform authenticator (you can learn more about passkeys [here](https://developers.google.com/identity/passkeys)).

| _A passkey dialog_                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-dialog-passkey.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-dialog-passkey.png) |

The selected auth method will not have a bearing on the encryption capabilities.

#### Intermission: who are you?



Like mentioned before, in order to lawfully obtain a copy of the user's credentials, the user must grant you an Access Grant. We'll expand on that concept next, but first you need to have some preparation measures in place.

There are two things that a dApp needs to have setup:

* A `consumer`: a key for a chain account you control. It's used both to identify you as the recipient of an Access Grant and to authenticate you when making calls to idOS nodes. On EVM chains, this is an EOA (Externally-Owned Account, controlled by anyone with its private key), and on NEAR this is a full access public key. For now, the idOS doesn't support having contract wallets as consumers.
* An `encryptionPublicKey`: a key you control that'll be used to decrypt credential contents shared with you. This should be a [nacl.box.keyPair](https://github.com/dchest/tweetnacl-js/blob/master/README.md#naclboxkeypair).

> 🛑 DANGER 🛑
>
> Make sure you don't lose access to either secret keys. Otherwise, you won't be able to authenticate or decrypt credential contents. The idOS team won't be able to help you.

#### Access Grants



An Access Grant means: I, `owner` (the user), have given you, `consumer` (the dApp), access to the record identified by `dataId`, and I understand I won't be able to revoke said access before `lockedUntil` has passed. The contents of `dataId` are a copy of the credential/attribute that has its contents encrypted to the encryption key provided (by the dApp) during its creation.

By acquiring an Access Grant, a dApp ensures that it'll have a copy of the user's data (either a credential or an attribute) until the UNIX timestamp on `lockedUntil` has passed. This is especially relevant to be able to fulfill compliance obligations.

To avoid any doubts, let's go over the Access Grant fields:

* `ownerUserId`: the grant owner idOS id.
* `consumerAddress`: on EVM chains this is the dApp's consumer address (like explained in the previous section), and on NEAR this is a full access public key.
* `dataId`: the `id` of the record copy (either a credential or an attribute) that is going to be shared.
* `lockedUntil`: the earliest UNIX timestamp when the contract will allow the Access Grant to be revoked. Any timestamp in the past, notably "0", means it's revocable at any time.

#### Filtering credentials



One common problem about credentials is: if the dApp can only access a credential's contents after it has an Access Grant for it, how does the dApp know which credential will fulfill its compliance needs?

`idos.enclave.filterCredentials` is a function that allows you to ask the user's enclave to filter all the user's credentials to only return the ones your dApp is interested in asking an Access Grant for. A filtering criteria for `pick` and `omit` should be passed. This should be the paths of the private fields by which a credential should be matched. `pick` requires the path to have the provided value, `omit` requires the path to not have the provided value.

```
const entries = await idos.enclave.filterCredentials(credentials, {
  pick: {
    "credentialSubject.identification_document_country": "DE"
  },
  omit: {
    "credentialSubject.identification_document_type": "passport",
  },
});
```

In this example, `entries` will be a list of credentials where the `"credentialSubject.identification_document_country"` is `"DE"` and `"credentialSubject.identification_document_type"` is not `"passport"`.

#### Checking Access Grant contents



By now, we have used the idOS to secure a copy of the data we need to operate.

If you wish to consult it, you'll need to use the `consumer` and [`nacl.box.keyPair`](https://github.com/dchest/tweetnacl-js/blob/master/README.md#naclboxkeypair) we've prepared before. Because these are secret, we need call some code in a private place (i.e., a backend, or maybe scripts you run locally).

Here's an example of how you could achieve that with [`📁 idos-sdk-server-dapp`](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-server-dapp) for an EVM consumer:

```
import { idOSConsumer } from "@idos-network/consumer-sdk-js";

const idosConsumer = await idOSConsumer.init({
  chainType: "EVM",
  consumerSignerPrivateKey: process.env.EVM_CONSUMER_PRIVATE_KEY,
  encryptionSecret: process.env.ENCRYPTION_SECRET_KEY,
  nodeUrl: process.env.EVM_IDOS_NODE_URL,
});

// This assumes we got `dataId` (from a request body, a script argument, etc).
const contents = await idosConsumer.getSharedCredentialContentDecrypted(dataId);
```

> 💡 Tip
>
> See a working example backend on [idos-example-dapp/api](https://github.com/idos-network/idos-sdk-js/tree/main/examples/idos-example-dapp/api). It has two flavors:
>
> * [EVM](https://github.com/idos-network/idos-sdk-js/blob/main/examples/idos-example-dapp/api/EVM.ts)
> * [NEAR](https://github.com/idos-network/idos-sdk-js/blob/main/examples/idos-example-dapp/api/NEAR.ts)

#### Delegated Access Grants



A delegated Access Grant (dAG) is a way of creating / revoking an Access Grant by somebody else other than the user. This is especially relevant for dApps who want to subsidize the cost of transaction necessary to create an AG.

Here's a diagram comparing the two cases side-by-side:

[![](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-ag-vs-dag.png)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/idos-sdk-js/assets/readme-ag-vs-dag.png)

This is accomplished by sharing the user's credential using `shareCredentialByGrant` which is described in detail in this [example](https://github.com/idos-network/idos-sdk-js/tree/feat/docs-v1/packages/idos-sdk-js#creating-an-access-grant).

### Quick reference



#### Importing and initializing



```
import { idOS } from "@idos-network/idos-sdk";

const idos = await idOS.init({ enclaveOptions: {container: "css selector"} });
```

#### EVM signer setup



```
const CHAIN_TYPE = "EVM";
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();
const address = await signer.getAddress();
```

#### NEAR signer setup



```
const contractId = process.env.VITE_IDOS_NEAR_DEFAULT_CONTRACT_ID;
const network = process.env.DEV ? "testnet" : "mainnet";

const CHAIN_TYPE = "NEAR";

const selector = await setupWalletSelector({
  network,
  modules: [setupMeteorWallet()],
});

!selector.isSignedIn() &&
  (await new Promise((resolve) => {
    const modal = setupModal(selector, { contractId, methodNames:[] });

    modal.on("onHide", resolve);
    modal.show();
  }));

const signer = selector.wallet();
const address = (await signer.getAccounts())[0].accountId
```

#### Profile checking and `setSigner`



```
const hasProfile = await idos.hasProfile(address);
if (!hasProfile) window.location = "https://kyc-provider.example.com/enroll";
const { userId } = await idos.setSigner(CHAIN_TYPE, signer);
```

#### Credentials



```
// Get all credentials
const credentials = await idos.data.list("credentials");

//Get all credentials that match a condition
const credentials = await idos.data.list("credentials", { issuer: "Fractal ID" });

// Get the credential details
const { id } = credentials.find(c => c.credential_type === "basic");
const { content } = await idos.data.get("credentials", id);

// Validate that a credential is well signed
const isValid = await idOS.verifiableCredentials.verify(content).catch(e => false);
```

#### Creating / updating / deleting data



```
const { id } = await idos.data.create("attributes", {
  attribute_key: "highScore",
  value: "10",
});

await idos.data.update("attributes", { id, value: "1000" });

await idos.data.delete("attributes", id);
```

#### Access Grant creation / revocation / list



#### Creating an Access Grant



Sharing a credential will create an Access Grant for the passed consumer. We're using some variables from `createCredentialByGrant` example. so make sure to check it out at [issuer-sdk-js's README](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js#readme)

```
/*
 * Server side.
 */

import { shareCredentialByGrant } from "@idos-network/issuer-sdk-js";
import issuerConfig from "./issuer-config.js";

await shareCredentialByGrant(issuerConfig, {
  ...credentialPayload,
  consumerAddress: "CONSUMER_WALLET_ADDRESS",
  recipientEncryptionPublicKey: new Uint8Array([ /* consumer public encryption key (in bytes) */]),
  lockedUntil: Math.floor(Date.now() / 1000) + LOCKED_UNTIL_SECONDS,
  originalCredentialId: credentialPayload.id,
  publicNotes: "", // make sure to pass an empty string
})
```

**Revoke an Existing Access Grant**



```
// Get the grantId of the grant you want to revoke
const grantId = grants[0].id;

// Revoke the grant
await idos.grants.revokeGrant(grantId);
```

**List All Grants You Granted to Other Consumers**



```
await idos.grants.getGrantsOwned();
```

**List All Grants Granted to You by Grantors**



```
const page = 1; // Page number for pagination
const size = 10; // Number of grants per page

await idos.grants.getGrantsGranted(page, size);
```

**Check if a Grant is Still Locked**



```
// Check if a grant is still locked (i.e., the locked until date has not passed yet)
await idos.grants.hasLockedGrants(grantId);
```

### Developing the SDK locally



Create an `.env.development.local` file in the root folder of the SDK package and add the needed environment variables (you can reference `.env` for the variable names). The SDK will use these variables for the development environment.

Run:

```
pnpm dev
```

This will run the compiler in watch mode that will rebuild every time any of the source files are changed.

You can also create a production build by running the following command in the root folder of the SDK package:

```
pnpm build
```

This will create a PRODUCTION build of the SDK using the `.env` file.

### Getting started with the idOS Consumer Server SDK 

The idOS Consumer Server SDK is designed for application developers who need to access user credentials through access grants and verify them. This package caters specifically to backend needs. It provides an implementation for decrypting and processing credentials, and managing access grants.

### What you’ll need



#### Secrets



> 🛑 DANGER 🛑
>
> Make sure you don't lose access to either secret keys. Otherwise, you won't be able to authenticate or decrypt credential contents. The idOS team won't be able to help you.

You'll need:

* `recipientEncryptionPrivateKey`: base64-encoded `nacl.BoxKeyPair` secret key. It'll be used to decode the credential copies that the owners (users) share with you by creating access grants.
* `consumerSigner`: this can be a NEAR `KeyPair`, a `nacl.SignKeyPair`, or an `ethers.Wallet`. This will be used to sign RPC calls to the idOS nodes.

#### Code



Get [our NPM package](https://www.npmjs.com/package/@idos-network/idos-sdk) and its dependencies with pnpm (or your package manager of choice):

```
pnpm add @idos-network/consumer-sdk-js
```

### Usage



#### Server-side



**Import and initialization**



```
import { idOS } from "@idos-network/consumer-sdk-js/server";
import nacl from "tweetnacl";

/**
 * Initializes the idOS SDK with the provided options.
 *
 * @async
 * @function init
 * @param {Object} options - Configuration options for initializing the SDK.
 * @param {string} options.recipientEncryptionPrivateKey - The recipient's encryption private key.
 * @param {KeyPair | SignKeyPair | ethers.Wallet} options.granteeSigner - The grantee's wallet or key pair for signing transactions.
 * @param {string} [options.nodeUrl="https://nodes.idos.network"] - The URL of the idOS node.
 * @param {string} [options.chainId] - The chain ID for the network (optional).
 * @returns {Promise<idOSGrantee>} - A promise that resolves to an instance of the idOS SDK.
 */

export const idos = await idOS.init({
  nodeUrl: process.env.IDOS_NODE_URL,
  recipientEncryptionPrivateKey: process.env.CONSUMER_ENCRYPTION_SECRET_KEY,
  // TODO require less crap from the user. This is way too much functions.
  consumerSigner: nacl.sign.keyPair.fromSecretKey(base64Decode(process.env.CONSUMER_SIGNING_SECRET_KEY))
});
```

**List grants**



Here's how you can paginate through all the grants that all users have granted you.

TODO: I should be able to filter by owner, at least.

```
const grants: IdosCredentials[] = await idos.getGrants({
  page: 1,
  size: 7,
})
```

**Get grants total count**



Here's how you can count all the grants that all users have granted you. Especially useful for pagination.

TODO: I should be able to filter by owner, at least.

```
const grantsTotalCount: number = await idos.getGrantsCount()
```

**Get the shared credential with a consumer (encrypted content)**



Here's how you can get a credential you have access to (with the _content still encrypted_) by its id.

TODO signature feels iffy. I should get into it and make sure that it returns something like a `Result<Maybe<IdosCredential>, Error>`. Either:

* The target credential
* `null` when we don't find anything
* raise an exception on network errors and such

```
const credential: IdosCredentials[] = await idos.getSharedCredentialFromIDOS('GRANT_DATA_ID')
```

**Get the decrypted shared credential's content**



Here's how you can get a credential's contents you have access to by its credential id.

```
const credentialContents: string = await idos.getSharedCredentialContentDecrypted('GRANT_DATA_ID')
```

**Get the credential id using grant hash**



Here's how you can get a credential's id you have access to by its content hash.

This is useful when you need to correlate a shared credential with related grant metadata.

```
const credentialId: id | null = await idos.getCredentialIdByContentHash('GRANT_HASH')
```

**Get the Access Grant that gave access to a credential**



```
const grant: idOSGrant = await idos.getCredentialAccessGrant('CREDENTIAL_ID')
```

### Getting started with the idOS Issuer Server SDK 

### Installing



Get [our NPM package](https://www.npmjs.com/package/@idos-network/issuer-sdk-js) and its dependencies with pnpm or the equivalent of your package manager of choice:

```
pnpm add @idos-network/issuer-sdk-js
```

### Before you start



When using this package, you're going to need to be familiar with how a dApp works with the idOS. Make sure you read [idos-sdk-js's README](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js#readme) before you proceed.

### Setting up



Create an issuer config with your secret key. This config will be used to interact with the idOS.

```
// issuer-config.js
import { createIssuerConfig } from "@idos-network/issuer-sdk-js";
import * as Base64 from "@stablelib/base64";
const signingKeyPair = nacl.sign.keyPair.fromSecretKey(ISSUER_SIGNING_SECRET_KEY);
const encryptionSecretKey = Base64.decode(ISSUER_ENCRYPTION_SECRET_KEY);

const issuerConfig = await createIssuerConfig({
  // To use a non-prod environment, pass in "nodes.playground.idos.network".
  nodeUrl: "https://nodes.idos.network/",
  signingKeyPair,
  encryptionSecretKey
});
```

### Creating a user profile



This procedure can only be done by a Permissioned Issuer. Get in touch with us at [engineering@idos.network](mailto:engineering@idos.network) if you're interested in being one.

To create a user profile in idOS, you need:

1. **A wallet address** associated with the user.
2. **A public encryption key** derived from either a password or a passkey chosen by the user in the idOS enclave app.

#### User Creation Process



[![User Creation Process](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/issuer-sdk-js/assets/add-user.drawio.svg)](https://raw.githubusercontent.com/idos-network/idos-sdk-js/main/packages/issuer-sdk-js/assets/add-user.drawio.svg)

**Step 1: Decide on a user id**



Deciding on a user id for a user is an issuer decision. You can use whichever you want, as long as it's an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier).

```
// Server side

const userId = crypto.randomUUID();

// Remember it on your database
session.user.update({ userId })

// Return it to the front-end to be used in the next step
return { userId }
```

**Step 2: Derive the Public Key**



Use the `idos.discoverUserEncryptionPublicKey` function to derive a public key for the user. This key will be used to encrypt and decrypt user's credential content.

```
// Client side

import { idOS } from "@idos-network/idos-sdk-js";

// Arguments are described on idos-sdk-js's README. Be sure to read it.
// Note: make sure to set mode to "new" since you're creating a new idOS profile
const initParams = { ...YOUR_IDOS_INIT_PARAMS, mode: "new" };
const idos = await idOS.init(...);

// Get userId associated with this user from your server
const { userId } = await yourServer.getIdosInformation();

// Discover user encryption key
const { userEncryptionPublicKey } = await idos.discoverUserEncryptionPublicKey(userId);

// Report it back to your server
await yourServer.reportIdosEncryptionPublicKey(userEncryptionPublicKey);
```

**Step 3: Creating a User Profile**



Once the public key is derived, you can create the user profile in idOS by passing it to the `createUser` function alongside with user id and the wallet the user's going to use to drive their idOS profile.

```
// Server side

import { createUser } from "@idos-network/issuer-sdk-js";
import issuerConfig from "./issuer-config.js";

// Get this from the user's request, and remember it
const currentPublicKey = request.params['userEncryptionPublicKey']
session.user.currentPublicKey = currentPublicKey

// Get the stored user id
const userId = session.user.userId

// Build the user object
const user = {
  id: userId,
  recipient_encryption_public_key: currentPublicKey,
}

// Build the wallet object
const walletPayload = {
  // The user's wallet address (e.g., an Ethereum address)
  address: "0x0",
  // The type of user wallet (e.g., "EVM", "NEAR")
  wallet_type: "EVM",
  // The message that was signed by the address
  message: "app wants you to sign this message...",
  // The derived signature for the message, created with the user wallet
  signature: "0x3fda8a9fef767d974ceb481d606587b17c...",
  // The user wallet's public key
  public_key: "RxG8ByhoFYA6fL5X3qw2Ar9wpblWtmPp5MKtlmBsl0c=",
}

// Create the user on idOS nodes, and get some information back.
const [profile, wallet] = await createUser(issuerConfig, user, walletPayload);
```

### Writing credentials



In order to write a credential to idOS, the issuer needs to obtain permission from the user. This can be done in two ways: using Delegated Write Grant (DWG), or using Permissioned Credential Creation. Below are the two methods for writing credentials.

#### Building credential content



First option is to build credentials (and sign) manually:

```
const credentialContent = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
  ],
  id: "https://vc-issuers.cool-issuer.id/credentials/33ce045b-19f8-4f5a-89d9-4575f66f4d40",
  type: ["VerifiableCredential"],
  issuer: "https://vc-issuers.cool-issuer.id/",
  level: "human",
  credentialSubject: {
    id: "uuid:33ce045b-19f8-4f5a-89d9-4575f66f4d40",
    name: "John Doe",
    email: "johndoe@example.com",
    country: "USA",
  },
  issuanceDate: "2022-06-01T12:00:00Z",
  expirationDate: "2022-06-30T12:00:00Z",
  proof: {
    type: "Ed25519Signature2020",
    created: "2022-06-01T12:00:00Z",
    verificationMethod: "https://vc-issuers.fractal.id/idos/keys/1",
    proofPurpose: "assertionMethod",
    proofValue: "z22DAdBQgJXUh69e4y9a7t7n9f6c7m7b8a6v6w5z4x3y2x1w",
  },
};
```

Secondly you can use a credentials-builder, which help you to create a proper `VerifiableCredentials` object:

```
import { buildCredentials } from "@idos-network/issuer-sdk-js/server";

const id = "z6MkszZtxCmA2Ce4vUV132PCuLQmwnaDD5mw2L23fGNnsiX3";
const issuer = "https://vc-issuers.cool.id/idos";

const credentialFields = {
  id: `${issuerName}/credentials/${id}`,
  level: "human",
  issued: new Date(),
  approvedAt: new Date(),
}

const credentialSubject = {
  id: `uuid:${id}`,
  firstName: "John",
  familyName: "Doe",
  dateOfBirth: new Date(),
  placeOfBirth: "New York",
  idDocumentCountry: "US",
  idDocumentNumber: "293902002",
  idDocumentType: "ID",
  idDocumentDateOfIssue: new Date(),
  idDocumentDateOfExpiry: new Date(),
  idDocumentFrontFile: Buffer.from("SOME_IMAGE"),
  selfieFile: Buffer.from("SOME_IMAGE"),
  residentialAddress: {
    street: "Main St",
    houseNumber: "123",
    additionalAddressInfo: "Apt 1",
    city: "New York",
    postalCode: "10001",
    country: "US",
  },
  residentialAddressProofFile: Buffer.from("SOME_IMAGE"),
  residentialAddressProofCategory: "UTILITY_BILL",
  residentialAddressProofDateOfIssue: new Date(),
}

const issuer = {
  id: `${issuer}/keys/1`,
  controller: `${issuer}/issuer/1`,
  publicKeyMultibase: "PUBLIC_MULTIBASE_KEY",
  privateKeyMultibase: "PRIVATE_KEY_MULTIBASE",
}

const credentialSubject = await buildCredentials(
  credentialFields,
  credentialSubject,
  issuer,
);
```

#### Using Delegated Write Grant



The first method involves getting permission from the user via a Delegated Write Grant

A Delegated Write Grant (DWG) is a permission given by the user that allows a specific issuer to create a credential and it's copy for the issuer itself on the user's behalf. This is particularly relevant to not require the user to come back to your website if you want to add data to their profile. A DWG is a ERC-191 message that the user signs. The message contains fields:

* operation: delegatedWriteGrant
* owner: _user\_wallet\_identifier_
* consumer: _grantee\_wallet\_identifier_
* issuer public key: _ed25519\_public\_key\_hex\_encoded_
* id: \_DWG\_identifier
* access grant timelock: _RFC3339\_date\_time\_till\_access\_grant\_will\_be\_locked_
* not usable before: _RFC3339\_date\_time\_DWG\_can\_not\_be\_used\_before_
* not usable after: _RFC3339\_date\_time\_DWG\_can\_not\_be\_used\_after_

To do this, you must first to ask a user to sign DWG message:

```
// Client side

import { idOS } from "@idos-network/idos-sdk-js";
import * as Utf8Codec from "@stablelib/utf8";
import { ethers } from "ethers";

// Typical wallet setup
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Arguments are described on idos-sdk-js's README. Be sure to read it.
const idos = await idOS.init(...);

// This is a placeholder for your signer's address. You could get it from
// some endpoint you expose. But, to keep it simple, we're using a constant.
const CONSUMER_WALLET_IDENTIFIER = "0xc00ffeec00ffeec00ffeec00ffeec00ffeec00ff";
const ISSUER_SIGNER_PUBLIC_KEY = "6d28cf8e17e4682fbe6285e72b21aa26f094d8dbd18f7828358f822b428d069f"; // ed25519 public key

const currentTimestamp = Date.now();
const currentDate = new Date(currentTimestamp);
const notUsableAfter = new Date(currentTimestamp + 24 * 60 * 60 * 1000);
const delegatedWriteGrant = {
  owner_wallet_identifier: await signer.getAddress(),
  grantee_wallet_identifier: CONSUMER_WALLET_IDENTIFIER,
  issuer_public_key: ISSUER_SIGNER_PUBLIC_KEY,
  id: crypto.randomUUID(),
  access_grant_timelock: currentDate.toISOString().replace(/.\d+Z$/g, "Z"),  // Need to cut milliseconds to have 2025-02-11T13:35:57Z datetime format
  not_usable_before: currentDate.toISOString().replace(/.\d+Z$/g, "Z"),
  not_usable_after: notUsableAfter.toISOString().replace(/.\d+Z$/g, "Z"),
};

// Get a message to sign
const message: string = await idos.data.requestDWGMessage(delegatedWriteGrant);

// Ask a user to sign the message.
const signature = await signer.signMessage(message);
```

Be sure you have the DWG message parameters and it's signature kept. You need to use them on server side later.

Now that the user has created a DWG for us, the issuer, we can create a credential for the user and the credential copy to ourselves:

```
// Server side

import { createCredentialsByDelegatedWriteGrant } from "@idos-network/issuer-sdk-js";
import issuerConfig from "./issuer-config.js";

const publicNotesId = crypto.randomUUID();

const credentialsPublicNotes = {
  // `id` is required to make `editCredential` work.
  id: publicNotesId,
  type: "human",
  level: "human",
  status: "approved",
  // make yourself discoverable by dApps.
  issuer: "MyCoolIssuer",
}

const credentialContent = JSON.stringify("Content from previous section");

const credentialPayload = {
  id: crypto.randomUUID(),

  // user id of the user who is creating the credential.
  user_id: session.user.userId,

  // The verifiable credential content should be passed as it's seen in the example at https://verifiablecredentials.dev/ usually a stringified JSON object.
  // credential content is encrypted, using the Issuer's secret encryption key, along with the receiver's public encryption key.
  // plaintextContent should be passed as a Uint8Array.
  plaintextContent: Utf8Codec.encode(credentialContent),

  // The public encryption key of the user who is creating the credential. also passed as a Uint8Array.
  recipientEncryptionPublicKey: Utf8Codec.encode(session.user.userEncryptionPublicKey),

   // These notes will be publicly disclosed and accessible without needing to decrypt the credential.
  publicNotes: JSON.stringify(credentialsPublicNotes),
}

// Reconstruct DWG params sent from the client in the previous step
const {
  owner_wallet_identifier,
  grantee_wallet_identifier,
  issuer_public_key,
  id,
  access_grant_timelock,
  not_usable_before,
  not_usable_after,
} = request.body.delegatedWriteGrant;

const delegatedWriteGrant = {
  owner_wallet_identifier,
  grantee_wallet_identifier,
  issuer_public_key,
  id,
  access_grant_timelock,
  not_usable_before,
  not_usable_after,
  signature,
}

const credential = await createCredentialsByDelegatedWriteGrant(issuerConfig, credentialPayload, delegatedWriteGrant);
```

This will create a credential for user in the idOS and copy for the issuer.

> ⚠️ Notice
>
> The credential content should be passed as is. It will be encrypted for the recipient before being stored on the idOS.

#### Using Permissioned Credential Creation



The second method allows the issuer, by virtue of being a Permissioned Issuer, to create a credential without a Write Grant. Get in touch with us at [engineering@idos.network](mailto:engineering@idos.network) if you're interested in being one.

For this method, use the `createCredentialPermissioned` function to write the credential with the necessary encryption.

Example:

```
// Server side

import { createCredentialPermissioned } from "@idos-network/issuer-sdk-js";
import issuerConfig from "./issuer-config.js";

// See the previous example for more details on these fields
await createCredentialPermissioned(issuerConfig, credentialPayload);
```

### Sharing credentials



The SDK provides issuer to share credentials with other consumers. This function is called `shareCredentialByGrant`.

```
// Server side
import issuerConfig from "./issuer-config.js";

await shareCredentialByGrant(issuerConfig,{
  ...credentialPayload,
  consumer: "CONSUMER_WALLET_ADDRESS",
  recipientEncryptionPublicKey: new Uint8Array([/* consumer public encryption key (in bytes) */]),
  lockedUntil: Math.floor(Date.now() / 1000) + 1000,
  originalCredentialId: credentialPayload.id,
});
```

### Editing credentials



The `editCredential` function allows issuers to update the public notes associated with a credential in the idOS. This is useful for actions like marking credentials as revoked or updating metadata.

In order for `editCredential` to work, the credential's `public_notes` field needs to be a valid JSON object with an `id` field, and the `public_notes_id` argument needs to have that value.

> ⚠️ Warning
>
> If the new `public_notes` value doesn't have an `id` field, you'll stop being able to edit that credential.

```
// Server side
import issuerConfig from "./issuer-config.js";
await editCredential(issuerConfig, {
  public_notes_id: publicNotesId,
  public_notes: JSON.stringify({
    ...credentialsPublicNotes,
    status: "revoked",
  }),
});
```

#### Revoking a credential



A previously created credential can be revoked by the issuer by calling the `editCredential` function. When creating a credential, the `publicNotes` field needs to have an `id` field that will be used to identify the credential to be revoked. Pass this `id` to the `editCredential` function to revoke the credential.

```
// Server side

import { editCredential } from "@idos-network/issuer-sdk-js";
import issuerConfig from "./issuer-config.js";

await editCredential(issuer, {
    publicNotesId: id, // the `id` of the credential to be revoked that is stored in the `publicNotes` field.
    publicNotes: JSON.stringify({
      ...publicNotes,
      status: "revoked" // updating the credential status to revoked
    }),
  });
```

### Developing the SDK locally



Run:

```
pnpm dev
```

This will start the compiler in watch mode that will rebuild every time any of the source files are changed.

You can also create a production build by running the following command in the root folder of the SDK package:

```
pnpm build
```
