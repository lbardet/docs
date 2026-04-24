---
description: What is happening with my data?
---

# What data? How is it stored?

idOS is a place to store your identity data and credentials in a self-sovereign and [decentralized](../how-it-works/progressive-decentralization.md) way. The data is stored across multiple distributed nodes and is [encrypted](../how-it-works/encryption.md) using the user's public keys. 

## **What data is being stored in idOS?**   

Users decide which data is stored in their idOS profile. In general, any data can be stored in idOS, but the main initial use cases that idOS will support at launch are:

* KYC/AML (verified) 
* Proof-of-personhood (verified) 
* Linked wallet addresses (verified)
* User inputs, like social profiles, gaming achievements, participation certificates, etc. (verified/unverified) 

Users are in full control and can choose to add data to their idOS profile using the [User Data Dashboard](../how-it-works/functionality/user-data-dashboard.md) for unverified data. For verified data such as identity data (KYC/AML, Proof-of-personhood), [Identity verification providers](../how-it-works/system-architecture/roles-main-stakeholders.md#issuers) are needed to verify the data and potentially support the user in the process of adding it to idOS. 

At the idOS' inception, [Fractal ID](https://fractal.id) will be the first issuer to provide [W3C-compliant Verifiable Credentials](../how-it-works/system-architecture/decentralized-storage/w3c-verifiable-credentials.md). More issuers, like identity verification providers, will be able to leverage the idOS tech stack in the upcoming months.

## **How is the data stored?**

By default, all identity data is [user-encrypted](../how-it-works/encryption.md#derived-key-generation) before being added to idOS. idOS distributes all encrypted data among its Node providers and uses a [consensus mechanism](../how-it-works/system-architecture/decentralized-storage/#consensus) to harmonize the dataset state. Following the idOS [table structure](../how-it-works/system-architecture/decentralized-storage/database-overview.md), the following guidelines show the encryption state of the data being added to idOS:     

<table><thead><tr><th width="194">Table</th><th>Encryption guidelines</th></tr></thead><tbody><tr><td>humans</td><td>no field should be encrypted</td></tr><tr><td>attributes</td><td>key and/or value should be encrypted if they hold sensitive content</td></tr><tr><td>wallets</td><td>no field should be encrypted</td></tr><tr><td>credentials</td><td>only the content field should be encrypted</td></tr></tbody></table>

## **Identity verification providers data handling**

[Identity verification providers](../how-it-works/system-architecture/roles-main-stakeholders.md#issuers) are service providers that confirm the validity of information added to idOS and/or issue Verified Credentials. Identity verification providers usually provide onboarding flows to allow users to input data that is later manually and/or technically reviewed. idOS is built to support Identity verification providers that perform KYC/AML and Proof-of-personhood checks in the beginning. These providers have their own data management processes and may choose to delete or store the user data on central premises. Data minimization is highly encouraged when picking an identity verification provider to add data to the idOS.  

During the idOS beta phase, [Fractal ID](https://fractal.id) will be the only identity verification provider available due to a temporary lack of other providers interoperable with idOS. idOS is permissionless and we encourage other identity providers to become interoperable with the idOS. During the [introduction phase](../how-it-works/progressive-decentralization.md), Fractal ID will temporarily keep users' data in its central systems. This data redundancy acts as a safety net during idOS' infancy. Afterwards, Fractal ID will delete the main content (actual user information) for all new users automatically and for existing idOS users on request through the Fractal ID's [user dashboard](https://app.fractal.id/login). Fractal ID will keep user contact information to be able to notify users (e.g. when their credential has expired), metadata like timestamps, and process logs. 

For more information on decentralization and data handling, please check the idOS' path to [progressive decentralization](../how-it-works/progressive-decentralization.md).

## **Risk factors**

idOS is an open-source, self-sovereign and [gradually permissionless](../how-it-works/progressive-decentralization.md) system. This gives participants far-reaching abilities to perform actions that are highly discouraged: 

* Users might choose to upload data to idOS that is not encrypted and visible to all node providers 
* dApps might implement the [User Data Dashboard](../how-it-works/functionality/user-data-dashboard.md) and amend it in a way that intercepts the user's data
* dApps might amend the [access grant SDK](../how-it-works/functionality/granting-data-access.md) to not encrypt data again after it's shared with them 

We have opted against limiting the user's rights or only allowing curated dApps to participate in the idOS in favor of a more open, self-sovereign system. We will closely monitor these risk factors together with all Node providers and keep making the idOS better and safer for users. As with any decentralized tech in web3, please beware when connecting and interacting with services that connect to the idOS. 
