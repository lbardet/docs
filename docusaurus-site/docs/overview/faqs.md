# FAQs

## _Is idOS live?_

Yes it is! You can access your idOS profile at [dashboard.idos.network](https://dashboard.idos.network) and integrate [idOS SDK](../developer-docs/dapp-sdk-integration.md) today. Follow us on [socials](../community-and-marketing/community-and-social.md) and visit [idos.network](https://www.idos.network) for updates!

## _What types of data can be added to idOS?_

In practice, idOS can hold any types of data the user wants, but it is specifically designed to deal with user identity data. To be more specific: 1) KYC/AML credentials (verified), 2) Proof-of-Personhood credentials (verified), 3) Linked wallet addresses (verified) and 4) User inputs like social profiles, game high scores (unverified).

## _**How is my data secure in idOS?**_

User identity data is user-encrypted before being added to idOS. idOS distributes all encrypted data among its node providers in the dStorage Network of Nodes and uses a [consensus mechanism](../how-it-works/system-architecture/decentralized-storage/#consensus) to harmonize the dataset state. This way, only the user can access the actual information stored, and the data is always available as long as any node is live.

## _**How can idOS be accessed / how can dApps integrate with it?**_

idOS is an open-source, composable, and chain-agnostic identity management infrastructure. While anyone can build tools on top of it, on its inception idOS offers a [User Data Dashboard](../how-it-works/functionality/user-data-dashboard.md) for users to manage their private idOS profile, and an [SDK for dApps](../developer-docs/dapp-sdk-integration.md) to easily connect to idOS.  

## _How is idOS different from other <mark style="background-color:blue;">decentralized identity infrastructure solutions</mark>?_

The most common decentralized identity solutions in web3 are in the form of Identity wallets and Soul-bound tokens (SBTs). While these solutions have contributed to the development of decentralized identity, and the goal of idOS is not to replace them fully, they have some caveats. To be specific, identity wallets require users to download one more plug-in to their browser, and also the data, hosted in the users device, is not available while the user is offline (or if the user deletes it), which may make it harder to comply with main regulations. In the case of SBTs, they are not privacy-preserving, as the data is often stored in the metadata of the SBT, and anyone can see it, profiling the user’s wallet and limiting the technology for use cases that require Personal Identifiable Information (PII) to be shared. idOS offers constant data access to granted parties while preserving the user’s privacy and allowing them to share only what they want with each specific third party.

## _How is idOS different from existing <mark style="background-color:blue;">decentralized storage (dStorage) solutions</mark>?_

We created idOS as we saw a gap in the web3 space that was directly affecting several of the founding partners - the lack of compliant and secure decentralized storage for identity use cases. As far as we could see, none of the well-established decentralized storage providers in web3 could offer compliant identity data storage nor ensure the data availability needs required for identity data consumers (e.g. location of the nodes, permanent accessibility, access and revocation grants, data mutability, etc.).

## _How is idOS different from <mark style="background-color:blue;">Identity verification providers</mark>?_

idOS is a web3 open-source identity management infrastructure. The goal of idOS is to enable different identity and user data management solutions to become more decentralized and gain user adoption while giving data control back to the user. Identity verification providers (e.g. Fractal ID, BrightID, Worldcoin) play a critical role in the idOS ecosystem by issuing Verifiable Credentials, often in the form of attestations (e.g. KYC, Proof-of-personhood, etc.). In the foreseeable future, Identity verification providers will always be needed to onboard user data at scale into the internet, and idOS will enable them to issue credentials, and then allow users to store them and share access anywhere around web3. More information on the role of the idOS in the identity value chain can be found in [The idOS in the identity value chain](what-is-idos.md#the-idos-in-the-identity-value-chain).

## What is coming next for idOS?

idOS has a plan for [progressive decentralization](../how-it-works/progressive-decentralization.md). We plan to deploy it across multiple blockchain ecosystems and ensure data is always secure and managed by the user. More details on the product roadmap for idOS can be found in the [Product Roadmap](../how-it-works/product-roadmap.md) (subject to change).
