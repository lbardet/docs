---
description: Introducing the Identity Operating System
---

# What is idOS?

**idOS (Identity Operating System) is the identity layer of web3.** We are building an open-source, composable and chain-agnostic solution to enable true decentralized identity across the web3 space. idOS is made up of two key elements:

1. A compliant **dStorage Network of Nodes**, managed by [Node operators](the-idos-consortium.md) that host user-encrypted data, usually in the form of [W3C Verifiable Credentials](../how-it-works/system-architecture/decentralized-storage/w3c-verifiable-credentials.md) 
2. An **Access Management Protocol**, allowing users to manage their own data and [grant/revoke access](../how-it-works/functionality/granting-data-access.md) to third parties like dApps 

**In the idOS...** 

* **Users** own, edit, grant/revoke access to their identity data to interact with dApps
* **Node operators** safely store encrypted user data 
* **dApps** (and other third parties) request read or write access to user data/credentials
* **Identity verification providers** check user data, issue credentials and may add them to their idOS profile

![idOS as the identity layer of web3](/assets/idOS_Gitbook_Identity_Layer_Web3.png)

## How is idOS different from existing identity solutions? 

**idOS is a joint effort by** [**the idOS Consortium**](the-idos-consortium.md) **designed to spark the widespread implementation of decentralized identity across web3**. 

In the last decade, we have seen many projects launch decentralized identity systems with great technical frameworks that failed to gain substantial user adoption. As active builders in web3, we owe to our users the ability to adopt decentralized and self-sovereign identity systems as a way to process user information. idOS is different in a few, but crucial guiding principles, that unlock user adoption:

1. idOS is **chain-agnostic**. We are building the identity layer of web3 collaboratively with great [building partners](the-idos-consortium.md)[ and ecosystems](the-idos-consortium.md) that are leveraging the infrastructure from day one. Additionally, idOS is open-source and composable, aiming to attract existing and new identity solution providers. Identity rails need to be available on-chain and cross-chain. Building local ecosystem solutions doesn't scale and disregards that users are active across multiple chains across web3. With idOS, users can access their data wherever they are, and dApps can easily integrate using native private/public key pair access mechanisms across multiple ecosystems    
2. idOS is built to be **compliant** with the main user data protection regulations. P2P storage systems clash with the user's right to be forgotten. idOS uses  a [state consensus](../how-it-works/system-architecture/decentralized-storage/) to enforce deletion requests.  It also allows for regulated entities to ask the user for a temporarily unrevocable [access grant](../legal-docs/data-privacy-and-protection/user-identification-and-on-chain-data.md) to comply with financial regulations. Identity is much more than compliance, but we need to build solutions that are aligned with today's laws if we want to break into mainstream, real-world adoption. Let's tackle the sticky challenges head-on!
3. idOS allows user to manage their data in a **self-sovereign** way. Empowering users to fully control their data without the intermediation of third parties, like they control their tokens, is one of the main promises of web3. Unfortunately, self-sovereign identity management is not yet a widespread practice in the digital world. Users should decide who has access to their information, and be able to revoke access if they wish. User data belongs with users and it's time we request a change
4. idOS is a **decentralized** storage network. Unlike identity wallets, decentralized storage solutions allow dApps to process users' information even if users are offline. With idOS, dApps don't need to store a copy of user data on their server anymore, since they can rely on [access grants](../how-it-works/functionality/granting-data-access.md). Decentralized storage allows users to only selectively disclose parts of their profile, and keep the underlying data on file, something that is not possible with other identity solutions like soul-bound tokens (SBTs). All in all, relying on a dStorage network of multiple nodes increases flexibility for users  and reduces platform risk for dApps and other data consumers

Web3 requires an identity layer. It's time we adopt decentralized identity for good!

## idOS in the identity value chain {#the-idos-in-the-identity-value-chain}

**The identity value chain is complex and has multiple interconnected steps**. We are referring to the process of verifying a user's identity, issuing identifiers, and allowing them to use these identifiers for authentication. 

1. **Onboarding and issuance:** verifying a human being and/or their attributes, and creating a proof (credential) of it. Think your government, KYC providers (e.g. [Fractal ID](https://web.fractal.id/)), biometric AI scanners (e.g. [Facetec](https://www.facetec.com/)) or trust-based social networks (e.g. [BrightID](https://www.brightid.org/))
2. **Data storage & availability:** securely and privately saving information or credentials, and limiting its availability to approved parties. As far as we know, and outside of idOS, an identity-focused, regulation-compliant sufficiently-decentralized solution doesn't exist today
3. **Access management:** checking that a credential is valid and belongs to a specific human (authentication) and granting access or not based on pre-defined criteria (authorization). Some identity-focused examples are [Polygon ID (mobile app)](https://polygon.technology/polygon-id) and [Sign-in with Ethereum](https://login.xyz/)

**idOS is not the single magic solution to all decentralized identity problems, but a composable, open-source layer for storing identity data**. We can't and won't re-invent the identity stack. We acknowledge that there are many great identity solutions out there we want and need to collaborate with. If you are one of them, come build with us!

The table below shows idOS focus and where there is room to develop composable solutions: 

<table><thead><tr><th width="151.33333333333331">Step</th><th width="309">idOS MVP focus</th><th>Potential built-on use cases</th></tr></thead><tbody><tr><td><strong>Onboarding &#x26; issuance</strong></td><td><ul><li><del>No focus on data onboarding</del></li><li>Allow anyone to issue &#x26; sign  W3C-compliant credentials</li><li>Ability to link attributes and credentials to a user profile</li></ul></td><td><ul><li>Personhood verification</li><li>Document verification</li><li>AML/Source of Wealth checks</li><li>User analytics</li><li>Social profiles, gaming scores &#x26; Reputation</li><li>...</li></ul></td></tr><tr><td><strong>Data storage &#x26; availability</strong></td><td><ul><li>Compliant dStorage of user data</li><li>Encryption of data (through idOS SDK for dApps)</li><li>User access and availability (through idOS User Data Dashboard) </li></ul></td><td><ul><li>Delegated key management (e.g. Account Abstraction and SMPC)</li><li>Public profiles &#x26; Self-hosted DNS</li><li>...</li></ul></td></tr><tr><td><strong>Access management</strong></td><td><ul><li>Selective data access grants to third parties</li><li>Time-locked secured access and revocations</li></ul></td><td><ul><li>Enhanced privacy solutions (e.g. ZKPs)</li><li>CRM &#x26; messaging applications</li><li>...</li></ul></td></tr></tbody></table>



