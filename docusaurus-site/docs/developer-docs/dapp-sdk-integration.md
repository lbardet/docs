# dApp SDK integration

The idOS Software Development Kit (SDK) has been developed to make it easier for dApps and other providers to interact with idOS. Any web3 developer should be able to run the idOS SDK on their own and be able to ask users to share access to their idOS credentials, create new credentials for users, among others.

As of today, idOS is only available in Ethereum, NEAR, Arbitrum, and Etherlink. If you are building in another ecosystem, please check the [new ecosystem integration docs](https://idos-association.notion.site/New-ecosystem-integration-11388c585fe0808f8119f88c4fd43783).

Please also bear in mind the overview below is for Ethereum dApps. For more information on how to integrate the SDK in other available ecosystems or further details, please check the [detailed idOS SDK Documentation in GitHub](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js#installation).   

## 1. Install the idOS SDK and initialize it

First, install [our NPM package](https://www.npmjs.com/package/@idos-network/idos-sdk) with the following command (or the equivalent of your package manager of choice):

```bash
pnpm add @idos-network/idos-sdk ethers
```

Then, add the following JavaScript to your application:

```javascript
import { idOS } from "@idos-network/idos-sdk";

// connect your user's wallet however you do it today, for example:
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();

// initialize SDK
const idos = await idOS.init({enclaveOptions: {container: "#idos-container"}});
```

Finally, you'll need to add a small piece of HTML to your page:

```html
<div id="idos-container"></div>
```

## 2. Redirect users without an existing idOS profile

To be able to query a user's idOS profile, they need to have a profile first.

```javascript
const hasProfile = await idos.hasProfile(await signer.getAddress());
```

If your user doesn't have an idOS profile, you'll need to send them to an issuer. You can use [Fractal ID](https://fractal.id/) to get an idOS profile and receive a Proof-of-Personhood credential using the [idOS Data Dashboard](https://dashboard.idos.network/). If you need a dedicated user onboarding journey (e.g. KYC with a Proof of Address), please [contact Fractal ID](mailto:sales@fractal.id).

More identity issuers will be listed in the near future once they integrate with idOS.

```javascript
if (!hasProfile) window.location = "http://kyc-provider.example.com/enroll";
```

## 3. Connect and query the SDK 

To authenticate the current user, call:

```javascript
await idos.setSigner("EVM", signer);
```

The SDK offers an interface to manage access grants and data, such as:

```javascript
// see, get data/credentials from a connected user's idOS profile
idos.data.list()
idos.data.get()

// create, update, delete, validate data/credentials from a connected user's idOS profile
idos.data.create()
idos.data.update()
idos.data.delete()
idOS.verifiableCredentials.verify()

// see, create, revoke an access grant from the user
idos.grants.list()
idos.grants.create()
idos.grants.revoke()
```

By default, idOS stores user data in the form of [W3C Verifiable Credentials](../how-it-works/system-architecture/decentralized-storage/w3c-verifiable-credentials.md). To see, get, validate data from a connected user's idOS profile and their credentials, you can use queries such as:

```javascript
// example of credential-related queries
const credentials = await idos.data.list("credentials");
const { id } = credentials.find(c => c.credential_type === "basic");
const { content } = await idos.data.get("credentials", id);
const isValid = await idOS.verifiableCredentials.verify(content).catch(e => false)
```

Each identity verifier may use a different credential schema. A more comprehensive list of attributes from credentials issued by Fractal ID can be found [here](https://github.com/trustfractal/claim-schemas/blob/master/verifiable\_credential/fractal\_id.json-ld).

## Additional reading

If you have any additional questions on how to integrate the idOS SDK, please check the [SDK detailed guide in GitHub](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js#credentials). You can also see [the README](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js) for a complete interface description and more usage examples, and try the [idOS SDK dApp example](https://github.com/idos-network/idos-sdk-js/tree/main/apps/idos-example-dapp) to demo how the SDK could work with your dApp.
