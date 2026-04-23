# System design

## Overview

idOS is a decentralized identity system that enables secure storage, verification, and sharing of personal data through blockchain technology. It provides a framework for users to own their data while allowing trusted entities to store, access, and verify it in a privacy-preserving manner. It is composed of the idOS Storage Network, the idOS Economy Network, and a set of SDKs and application-layer tools for developers and users. 

Note that idOS is (currently) a permissioned network. While it's (almost) fully open-source, only authorized operators can participate in it. This ensures that consequences (economical, legal, or as appropriate) can be pursued for ill-behaving nodes, ensuring that all node operators are well-incentivized to protect users' privacy and data sovereignty.

> 🚧 Will change soon 🚧
>
> That `(almost) fully open source` qualifier will disappear soon. We're in the process of preparing some repositories to become public.

> 🔭 Will change later on 🔭
>
> We'd rather not be a permissioned network. However, because storing encrypted text publicly is dangerous, until we find a secure way to do it, we're going to keep the network permissioned. When the idOS Economy Network is live, prospective node operators will be KYB'd by the idOS Association and added to the operator set based on stake-weight, and we are exploring ways to shard the idOS Storage Layer to enable fully permissionless validation of idOS. 

### Key Actors

* **Owner (User)**: The individuals whose data is securely managed by idOS. Users authenticate using their native blockchain wallets (EVM or NEAR-compatible). For data encryption and decryption operations, users use the idOS Enclave, a webapp running on its own browser origin, ensuring host apps cannot access plaintext data.
* **Issuer**: Organizations that verify user-provided data and issue credentials. Issuers are often responsible for ensuring the accuracy, authenticity, and compliance of the information contained in credentials they issue. Examples include financial institutions, insurance companies, educational institutions, healthcare providers, government agencies, and other obliged entities and regulated service providers.
* **Consumer**: Applications or services that request access to user credentials. They can only access credential data after the user explicitly grants permission through creating an Access Grant. Consumers could be dApps, financial services, or any entity requiring verified data.

_Note that in many use cases, the Issuer and Consumer are the same entity, i.e. a Neobank._

### Other stakeholders

These are other parties that bear influence in the system, even though they're not directly represented.

* **Data network node operators**: These are responsible for maintaining the idOS Storage Network Nodes. They ensure the decentralized storage and retrieval of user data, adhering to the predefined schema for data consistency and integrity. They are the stewards of idOS data, and are incentivized accordingly.
* **Legislative bodies and regulators**: These define the legal frameworks and regulations that govern how citizen data should be handled. They ensure compliance with data protection laws, privacy standards, and other relevant legal requirements to safeguard user rights. idOS is designed to try to cater to as many regulatory frameworks as possible.
* **Compliance officers**: These play a critical role in making sure their organization executes all operations in compliance with applicable laws and guidelines. This way, they guarantee everyone's rights and ensure data safety. idOS expects every consumer and issuer to be under the counsel of a compliance officer.
* **idOS Consortium**: It brings together leading ecosystems and projects in web3 to collaborate on creating a user-centric and widely adopted decentralized identity framework. By pooling expertise, resources, and innovation, the Consortium focuses on addressing three main areas for the project's development: Product, Growth, and Compliance. Read more about it at [https://docs.idos.network/the-idos-consortium](https://docs.idos.network/the-idos-consortium).

## Network Layer

### idOS Storage Network

User data in idOS is stored the idOS Storage Network, a decentralized layer 1 blockchain secured and run by the idOS Operators to ensure data privacy, security, and availability. The storage network handles authentication, consensus, data storage, encryption & signing and RPC load balancing for idOS, and consists of two major core components: 

* **idOS Storage Network Nodes**: These nodes form the backbone of the idOS system, providing decentralized storage and retrieval of user data. They are built on [Kwil](https://www.kwil.com/), a decentralized database platform, and include idOS-specific extensions to support the system's unique requirements. These nodes operate according to a predefined schema, ensuring data consistency and integrity. Deployed behind a KGW controlled by the idOS Association, node operators talk to each other through AWS VPC peering. We're also open to supporting WireGuard.
  * **Relevant repos**:
    * [https://github.com/idos-network/idos-kwild](https://github.com/idos-network/idos-kwild) (🚧 not yet public 🚧)
    * [https://github.com/idos-network/idos-schema](https://github.com/idos-network/idos-schema)
* **KGW (Kwil GateWay)**: A load balancer and RPC gateway that sits in front of all idOS Storage Network Nodes. It also holds access cookies, which make it possible for logged in users to not have to sign every read request to the nodes.
  * **Relevant repos**:
    * [https://github.com/idos-network/kgw](https://github.com/idos-network/kgw) (🚧 not yet public 🚧): idOS's kgw Docker image
  * **Deployments**:
    * _Production_: [https://nodes.idos.network/](https://nodes.idos.network/)
    * _Playground_: [https://nodes.playground.idos.network/](https://nodes.playground.idos.network/)
* **Native modules (**� Coming soon 🚧): idOS nodes will have specialized "sidecar" components implemented alongside the core network functionality for additional features like TSS-MPC based encryption/decryption and TEE-secured biometric authentication.  

#### **Storage Network Data Architecture**

Here's an abridged visual representation of the key concepts and relationships in idOS:

![](/assets/Screenshot 2025-05-05 at 18.32.01.png)

#### **Fundamental Data Structures**

* **User**: The central identity entity in the system, representing a unique person or organization. Users control their profiles through their blockchain wallets and manage how their data is shared.
  * **User Profile**: This is an informal, nebulous, term to refer generally to all the information a user controls.
* **Wallet**: Blockchain wallets that authenticate a user. A user can link multiple wallets across different chains (EVM, NEAR, etc) to their idOS profile to provide flexible authentication options.
* **Credential**: Verified claims or attestations about a user. 
  * Notable credential fields are:
    * **User**: The individual to whom this credential was issued and whose information the credential verifies.
      * **Public Notes**: Readable metadata that is visible to any platform where the user logs in to idOS. Issuers can update these notes, for example, to reflect the credential's revocation status.
      * **Encrypted Content**: The credential's core data, securely encrypted so that only the user and explicitly authorized parties can access it.
      * **Issuer Address**: The public key of the issuer's signer, which issued and signed the credential to ensure its authenticity and integrity.
  * Because credential content data arrives at idOS already encrypted, it cannot enforce any structure to it. However, we strongly encourage Issuers to use W3C Verifiable Credentials, and provide functionality to support them.
  * An unintuitive aspect of credentials is that they're encrypted specifically for one recipient. To share credential data, the user (or their authorized delegate) must retrieve their encrypted credential, decrypt it using their keys, re-encrypt it for the new recipient, and store this as a new credential that references the original using **SharedCredential**. This process ensures end-to-end encryption while enabling controlled sharing.
* **Access Grant**: A user-authorized permission that allows a specific Consumer to access a credential's encrypted content:
  * **Owner**: The user who issued the grant
  * **Data ID**: ID of the specific credential being shared
  * **Consumer Address**: The recipient's address authorized to access the data
  * **Timelock**: An optional lock date before which the access grant can't be revoked. Useful for some compliance scenarios.
* **Attributes**: Additional public (to applications where the user logs in to idOS) key-value pairs associated with a user profile, providing configurable metadata.

While Issuers and Consumers are key actors in the system, they are primarily represented by their blockchain addresses, rather than as separate entity types in the data model.

#### **Secondary Data Structures**

* **User Creators**: A designated set of trusted Issuers that have permission to create new idOS Users. This concept will be phased out after we deploy and mature the idOS Economy.
*   **Delegated Write Grants**: A Delegated Write Grant (dWG) is a mechanism that allows a user to delegate powers for a specific issuer to create a credential, its copy, and an access grant on behalf of a user. This is particularly useful for scenarios where the user does not need to revisit the issuer's platform for it to add data to their profile.

    A dWG is implemented as a message signed by the user. The message includes the following fields:

    * **Operation**: Specifies the operation type, always being `delegatedWriteGrant`.
    * **Owner**: The user's wallet identifier.
    * **Consumer**: The consumer's wallet identifier.
    * **Issuer Public Key**: The issuer's Ed25519 public key (hex-encoded).
    * **ID**: A unique identifier for the dWG.
    * **Access Grant Timelock**: A timestamp (RFC3339 format) indicating until when the access grant will be locked.
    * **Not Usable Before**: A timestamp (RFC3339 format) indicating when the dWG becomes valid.
    * **Not Usable After**: A timestamp (RFC3339 format) indicating when the dWG expires.

    Whoever transmits the dWG to idOS also needs to provide the original and copy credentials' fields (including the encrypted content). Check the schema for more details.

    dWGs can only be used once.
*   **Delegated Access Grants**:

    Delegated Access Grants (dAGs) are a mechanism that allows entities other than the user to create Access Grants on their behalf.

    A dAG is implemented as a signed message containing the following fields:

    * **Data ID**: The identifier of the credential or data being shared.
    * **Owner Wallet Identifier**: The wallet address of the user who owns the data.
    * **Grantee Wallet Identifier**: The wallet address of the entity receiving access.
    * **Locked Until**: A timestamp indicating when the Access Grant can be revoked.
    * **Content Hash**: A hash of the data being shared to help verify integrity across credential copy and access grant flows.

    Whoever transmits the dAG to idOS also needs to provide the copy credential's fields (including the encrypted content). Check the schema for more details.

    dAGs can be used multiple times.

    > 🚧 Will change soon 🚧
    >
    > dAG being multi-use is a remnant of the previous Access Grant architecture. Given how the usefulness of dAGs has been evolving, we're going to make them single-use.
    >
    > If you want to rely on multi-use, please get in touch with us first, so we can properly guide you and evolve the system accordingly.

#### Granting Access to Third Parties

Once authentication and authorization are confirmed, users can grant access to their data to third parties, such as neobank apps, regulated financial modules or other individuals and entities. If access is requested through an app, the idOS SDK simplifies the process by automatically inserting the correct recipient’s wallet address. If the user grants access manually via the idOS Dashboard, they must input the recipient’s details themselves.

In both cases, the process remains secure and private: the user decrypts their own data, re-encrypts it using the recipient’s public key, and then uploads the encrypted data back to the idOS network. This ensures that only the intended recipient can access the data, preventing unauthorized parties from intercepting or decrypting it.

#### Continuous Data Availability, Even When Users Are Offline

A major advantage of the idOS access management system is that data remains continuously available, even if the original user is offline. Once an access grant has been issued, the recipient can retrieve the authorized data at any time, provided that the grant remains active. This eliminates reliance on user availability and allows businesses and services to securely access user data without requiring permanent downloads or redundant storage.

This persistent availability enables organizations to use the idOS as a decentralized, privacy-preserving customer relationship management (CRM) tool for verified users. Businesses and service providers can access user data on demand, maintaining a live and up-to-date identity verification process without storing unnecessary copies of user data, reducing compliance risks.

#### Revoking Access and Time-Locked Permissions

At any time, users retain full control over their data and can revoke access, immediately disabling the recipient’s ability to retrieve or decrypt the information. If a data recipient no longer requires access, or if a user changes their mind, revocation ensures that data permissions are always dynamic and adjustable.

For cases where regulatory compliance requires specific retention periods, access grants can be time-locked, ensuring that data remains accessible for a predefined duration before revocation is possible. For example, a financial institution may require a five-year data retention period due to compliance regulations. In such cases, revocation will only be possible once the time lock expires, ensuring compliance with data governance policies.

#### Storage and Consensus

The idOS Storage Network utilizes [Kwil](https://www.kwil.com/), a decentralized relational database, for storing and managing identity data, and each idOS node run a customized implementation of Kwil's storage and consensus. This design enables key features for idOS as a decentralized personal identity cloud:

* **Compliance with GDPR’s Right to Be Forgotten** – Unlike traditional immutable blockchain-based storage, Kwil-powered decentralized storage on idOS enables us to operate with a limited history of nodes. This allows us to ensure that data deletion requests don't simply unincentivize the storage of data or change state on a public blockchain transparently, but that they truly and verifiably delete data from all idOS nodes, giving idOS the ability to comply with right-to-be-forgotten privacy laws like GDPR. 
* **Performant permissioned consensus:** Because not all specialized networks need fully permissionless validator sets (idOS Association will KYB all idOS Operators for the forseeable future until we progressively decentralize), our consensus mechanism, Kwil's [Roadrunner](https://docs.kwil.com/docs/node/consensus/motivation), is tailored towards validator sets that are selected by governance mechanisms, shedding overhead that traditional blockchain BFT algorithms require. It's inspired by both CometBFT and more classical distributed system consensus algorithms, taking the best from both and tailoring it for personal storage use cases like identity. 

#### Become a Node Operator

Currently, all idOS nodes are operated by the idOS Association and a few trusted node operators ([Horizen](https://www.horizen.io/), [Meta Pool](https://www.metapool.app/)), ensuring stability and security in the early stages. We are actively onboarding more node operators, with a long-term goal of fully decentralizing the network. Initially the network will run an auction for 20 operator slots, and all operators will be KYB'd by the idOS Association. 

If you are interested in running a node and contributing to the privacy-preserving identity ecosystem, reach out to us to learn more about technical requirements and incentives for operators.

### idOS Economy Network

#### idOS Economy Network Components

The idOS Economy Network is a collection of smart contracts on Arbitrum One. There are:

* [$IDOS token](https://arbiscan.io/address/0x68731d6F14B827bBCfFbEBb62b19Daa18de1d79c)
* [Staking](https://arbiscan.io/address/0x6132f2ee66dec6bdf416bda9588d663eaceec337): allows people to vote for nodes operators, and allows slashing of misbehavior
* [$IDOS Kwil Escrow](https://arbiscan.io/address/0xBe34524b5CcEb47eEf931D71c77156F5EeA4d677): moves $IDOS from Arbitrum One to Kwil
* [USDC Kwil Escrow](https://arbiscan.io/address/0x8444FC33A0c6135B829d020821D42F2E7E81151f): moves USDC from Arbitrum One to Kwil

The idOS Economy Network is still under active development, with the objective of making the economy self-sustainable for all participants.

## Integration Layer

The idOS Association provides a number of ways for developers to interact with idOS. 

### SDKs

The idOS SDKs provide developers with a comprehensive toolkit for interacting with the idOS node network, allowing seamless integration of identity verification, access management, and encrypted data handling into applications. They are designed to be modular and flexible, enabling developers to choose which functionalities they need without unnecessary overhead.

* **idOS Client SDK**: the browser SDK. Enables websites to integrate with idOS.
  * [https://www.npmjs.com/package/@idos-network/client](https://www.npmjs.com/package/@idos-network/client)
* **idOS Consumer Server SDK**: helps a consumer integrate their backend with idOS.
  * [https://www.npmjs.com/package/@idos-network/consumer](https://www.npmjs.com/package/@idos-network/consumer)
* **idOS Issuer Server SDK**: helps a consumer integrate their backend with idOS.
  * [https://www.npmjs.com/package/@idos-network/issuer](https://www.npmjs.com/package/@idos-network/issuer)

### Direct RPC calls

🚧 idOS nodes can also be interacted with directly without the SDK via an RPC API. This is not recommended, but possible for extremely advanced use cases.  Because this is not the happy path for integrations, we have not yet documented this flow. 🚧

## Application Layer Tools

idOS provides several application-layer tools that serve different stakeholders in the ecosystem. These applications offer intuitive interfaces for managing identity data, access permissions, and Verifiable Credentials, ensuring that users, data consumers, and issuers can efficiently interact with the idOS network.



* **User Dashboard**: A user-facing interface that allows users to manage their idOS profiles. Users can view their credentials, manage access grants, and add or remove controlling wallets.
  * **Relevant repo folder**:
    * [apps/idos-data-dashboard](https://github.com/idos-network/idos-sdk-js/blob/main/apps/idos-data-dashboard)
  * **Deployments**:
    * _Production_: [https://dashboard.idos.network/](https://dashboard.idos.network/)
    * _Playground_: [https://dashboard.playground.idos.network/](https://dashboard.playground.idos.network/)
*   **Dashboard for dApps**: A tool designed for Consumer dApps to access data shared by users to a Consumer's wallet, and to decrypt shared credentials.

    > ⚠️ Warning ⚠️
    >
    > There's no such thing as an Enclave for dApps. You will be asked for your password. This application is provided as a complimentary service, not as something to be used seriously.
    >
    > Please consider deploying your own copy of this application in an environment that enforces user safety and prevents accidental data leaks.

    * **Relevant repo folder**:
      * [apps/dashboard-for-dapps](https://github.com/idos-network/idos-sdk-js/blob/main/apps/dashboard-for-dapps)
    * **Deployments**:
      * _Production_: [https://dashboard-for-dapps.idos.network/](https://dashboard-for-dapps.idos.network/)
      * _Playground_: [https://dashboard-for-dapps.playground.idos.network/](https://dashboard-for-dapps.playground.idos.network/)
* **idOS Enclave**: A secure browser-based environment for handling sensitive operations such as password input, key derivation, encryption, decryption, and looking through credentials' encrypted content. The Enclave operates in isolation from the host application, ensuring that plaintext data remains inaccessible to unauthorized parties. This component is critical for maintaining the end-to-end encryption guarantees of the idOS system.
  * **Technical deep-dive:** [**https://github.com/idos-network/idos-sdk-js/blob/main/docs/enclave.md**](https://github.com/idos-network/idos-sdk-js/blob/main/docs/enclave.md)
  * **Relevant repo folder**:
    * [apps/idos-enclave](https://github.com/idos-network/idos-sdk-js/blob/main/apps/idos-enclave)
  * **Deployments**:
    * _Production_: [https://enclave.idos.network/](https://enclave.idos.network/)
    * _Playground_: [https://enclave.playground.idos.network/](https://enclave.playground.idos.network/)
* 🚧 **Network explorer:** In the future, idOS will provide an open-source, hosted explorer for low-level idOS network activity. 🚧

### Demos

* **Financial modules**: This is branded generally as "NeoFinance". It's meant to demonstrate how a neobank can integrate with financial modules.
  * We're currently showcasing:
    * [Transak](https://transak.com/) for on-ramping with Bank cards, Apple Pay, Google Pay, etc.
    * [Due](https://www.opendue.com/) for off-ramping to a SEPA account.
  * **Relevant repo folder**:
    * [examples/pay-demo](https://github.com/idos-network/idos-sdk-js/tree/main/examples/pay-demo)
  * **Deployments**:
    * Production: [https://demo.idos.network](https://demo.idos.network/)

## Wallets/signers and signature schemes

idOS was designed to support any type of authenticators, as long as they're deterministic and self-contained. This enables us to quickly become compatible with chains that decided to have their own signing schemes. We currently have support for EVM (secp256k1) and NEAR (ed25519), and adding a new one is fairly straightforward. If you have a use case on an unsupported chain, please reach out to us at contact@idos.network. 

Currently supported by the SDK, and verifiable for auth with the idOS network (others to be added in the future):

* EVM wallets
  * producing [EIP-191](https://eips.ethereum.org/EIPS/eip-191) `secp256k1` signatures (aka `personal_sign`)
  * e.g. MetaMask, Rainbow, Rabby
* NEAR wallets
  * producing [NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md) `ed25519` signatures (aka `signMessage`)
  * e.g. Meteor, Sender, MyNearWallet
* arbitrary signers
  * producing vanilla `ed25519` signatures (for Issuers only)
  * e.g. [https://github.com/dchest/tweetnacl-js](https://github.com/dchest/tweetnacl-js)

### Typical usage

See the [Long Tour](https://github.com/idos-network/idos-sdk-js/blob/main/docs/long-tour.md) for a thorough end-to-end walkthrough.

If you're looking for actor-specific guides, take a look at:

* [Consumer guide](https://github.com/idos-network/idos-sdk-js/blob/main/docs/guide-consumer.md)
* [Issuer guide](https://github.com/idos-network/idos-sdk-js/blob/main/docs/guide-issuer.md)
