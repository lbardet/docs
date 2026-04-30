---
hidden: true
---

# Copy of idOS SDKs

The idOS SDK provides developers with a comprehensive toolkit for interacting with the idOS node network, allowing seamless integration of identity verification, access management, and encrypted data handling into applications. It is designed to be modular and flexible, enabling developers to choose which functionalities they need without unnecessary overhead.

The SDK is broken into four parts, one of which is a core dependency with all necessary base functionality, and the other three of which are intended for integration by the relevant system actors.

1. **idOS Consumer SDK** - SDK for web applications (frontend or backend) that need to request access to and read idOS user data
2. **idOS Issuer SDK: Frontend** - SDK for frontend applications that need to issue idOS credentials, optimized for front-end-driven use cases.
3. **idOS Issuer SDK: Server** - SDK for server-side applications that need to issue idOS credentials, optimized for backend-driven use cases.

## Core SDK

***

The Core SDK is the fundamental module of the idOS SDK ecosystem. It provides core functionalities needed to interact with the idOS infrastructure, making it an essential dependency for the Data Consumer SDK and Data Issuer SDK.

### Core Features & Functionalities

#### Authentication & Authorization

The Core SDK ensures secure wallet-based authentication using cryptographic signatures. To prevent replay attacks, authentication requests include an incrementing nonce. Authorization is managed through signed queries, verifying that the request originates from a valid wallet.

#### Encryption & Decryption

The SDK leverages NaCl/libsodium (Curve25519 + ChaPoly AEAD) encryption to protect user data. Encryption is applied at multiple stages, ensuring that only the user or explicitly authorized parties can access decrypted data.

#### Node Interaction & API Calls

The Core SDK provides secure API connections to idOS nodes, allowing applications to store, retrieve, and update encrypted identity data. It also supports querying the relational database structure of the idOS network.

For most use-case it is not required or recommended to include the idOS Core SDK directly, since it is part of the more targeted Issuer and Consumer SDKs.

### Core SDK resources

Github: [https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js](https://github.com/idos-network/idos-sdk-js/tree/main/packages/idos-sdk-js)

NPM: [https://www.npmjs.com/package/@idos-network/idos-sdk](https://www.npmjs.com/package/@idos-network/idos-sdk)

```
pnpm add @idos-network/idos-sdk ethers near-api-js
```

## Data Consumer SDK

The Data Consumer SDK is designed for applications, institutions, and services that need permissioned access to user identity data while ensuring privacy-first authentication and encryption. Built on the Core SDK, it enables seamless requesting and retrieving of user data without compromising decentralization, and allows applications to request access to and retrieve personal data from idOS.

### Key Features

#### Requesting Access to User Data

Applications can send permission requests through the SDK, which users must approve before data can be accessed. The SDK supports different access control levels, including read-only, time-limited, and delegated access.

#### Retrieving Encrypted User Data

Once a user grants access, the SDK retrieves encrypted Verifiable Credentials from the idOS node network. Data is then decrypted using the requesting entity’s private key, ensuring secure and controlled access.

### Data Consumer SDK resources

Technical documentation:

Github: [https://github.com/idos-network/idos-sdk-js/tree/main/packages/consumer-sdk-js](https://github.com/idos-network/idos-sdk-js/tree/main/packages/consumer-sdk-js)

NPM: [https://www.npmjs.com/package/@idos-network/idos-sdk-server-dapp](https://www.npmjs.com/package/@idos-network/idos-sdk-server-dapp)

```
pnpm add @idos-network/idos-sdk-server-dapp ethers near-api-js
```

## <mark style="color:red;">Data Issuer SDK: Frontend</mark>

The Data Issuer SDK: Frontend is designed for applications which are writing credentials into the idOS, such as regulated crypto neobanks, on-ramps, card issuers, and embedded bank account providers.

### Key Features

#### Issuing Verifiable Credentials

Identity providers can use the SDK to generate and sign credentials, ensuring that each issued credential is cryptographically verifiable and immutable.

#### Encryption & Signing for Privacy-Preserving Storage

The SDK encrypts credentials using randomly generated keys for issuers rather than a static public key, enhancing forward secrecy and privacy protection.

#### Credential Revocations

Issuers can revoke credentials based on changes in a user’s status (e.g., expired KYC documents, employment verification updates). The SDK allows credentials to be issued with automatic expiration dates.

### Data Issuer SDK: Frontend resources

Technical documentation:

Github: [https://github.com/idos-network/idos-sdk-js/tree/main/packages/issuer-sdk-js](https://github.com/idos-network/idos-sdk-js/tree/main/packages/issuer-sdk-js)

NPM: [https://www.npmjs.com/package/@idos-network/issuer-sdk-js](https://www.npmjs.com/package/@idos-network/issuer-sdk-js)

```
pnpm add @idos-network/issuer-sdk-js ethers near-api-js
```

## <mark style="color:red;">Data Issuer SDK: Server</mark>

The Data Issuer SDK: Server is designed for applications which are writing credentials into the idOS, such as regulated crypto neobanks, on-ramps, card issuers, and embedded bank account providers. In some flows, an identity verification provider (IVP, or otherwise just known as a KYC provider i.e. Sumsub, Veriff) will be the issuer on the backend, and so this SDK is designed for those server-side operations.

### Key Features

#### Issuing Verifiable Credentials

Identity providers can use the SDK to generate and sign credentials, ensuring that each issued credential is cryptographically verifiable and immutable.

#### Encryption & Signing for Privacy-Preserving Storage

The SDK encrypts credentials using randomly generated keys for issuers rather than a static public key, enhancing forward secrecy and privacy protection.

#### Credential Revocations

Issuers can revoke credentials based on changes in a user’s status (e.g., expired KYC documents, employment verification updates). The SDK allows credentials to be issued with automatic expiration dates.

### Data Issuer SDK: Frontend resources

Technical documentation:

Github: [https://github.com/idos-network/idos-sdk-js/tree/main/packages/issuer-sdk-js](https://github.com/idos-network/idos-sdk-js/tree/main/packages/issuer-sdk-js)

NPM: [https://www.npmjs.com/package/@idos-network/issuer-sdk-js](https://www.npmjs.com/package/@idos-network/issuer-sdk-js)

```
pnpm add @idos-network/issuer-sdk-js ethers near-api-js
```
