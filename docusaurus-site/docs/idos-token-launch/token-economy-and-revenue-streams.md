# Token Economy & Revenue Streams

![](/assets/image (28).png)



Tokens are not just “fundraising mechanisms” or “incentive machines”. A token is how a decentralized protocol/network coordinates access, captures, and distributes value to become a self-sustainable system. We carefully designed the IDOS Token to become a key part of the protocol and contribute to the long-term vision of idOS: becoming the decentralized identity layer for the stablecoin economy.

### The IDOS Token

* Token: IDOS
* Type: ERC-20
* Network: Arbitrum One
* Total Supply: 1,000,000,000 (fixed)
* Security Audits: Nethermind ([see details](https://docs.idos.network/how-it-works/security))

#### Utility, Key actors & Flows

The IDOS Token serves three main purposes:

* **Staking:** Securing the idOS Storage Network, which is composed of multiple storage nodes
* **Protocol Value capture/distribution:** Powering the idOS Economy Network, and enabling a self-sustainable economy through capturing and distributing gas fees and facilitating Access Grant (AG) payments in stablecoins across protocol actors.
* **Progressive decentralization:** Enabling decentralization of the protocol and open access for its users

IDOS plays an important role in aligning interests across **four key actors**:

1. **Users.** Individuals with an idOS Profile who can add data and grant or revoke access to it through **Access Grants**.
2. **Node Operators.** Entities that run storage nodes, helping to secure the network by storing encrypted data and serving requests.
3. **Data Issuers.** Apps and verification providers that issue Verifiable Credentials for users into idOS.
4. **Data Consumers.** Apps that request Access Grants to user data, usually to be able to provide specific services.

The IDOS token secures the **idOS Storage Network** by coordinating participation and distributing fees among these actors:

* **Node Operators** stake a **minimum amount of IDOS** to become part of the validator set, and operate nodes that hold **end-to-end encrypted** user data. **Token holders** (e.g. users) can delegate IDOS to Node Operators to participate indirectly in network security.
* **Data Issuers** pay gas fees to **write** Verifiable Credentials into user-controlled storage.
* **Data Consumers** pay gas fees to **write** Access Grant requests and to **read** from storage after a user grants access.

These interactions are depicted in the flows below:

![](/assets/IDOS Token diagram - Full.jpg)

### Revenue streams

First, it’s important to make something clear: idOS is not “creating” a new market - it’s drastically improving efficiency for the existing financial services user onboarding, verification & compliance market.

**Global financial institutions spend an estimated** [**$200–$280 billion annually**](https://risk.lexisnexis.co.uk/-/media/files/business/white-paper/lnrs_true_cost_of_financial_crime_compliance_2024_wp_uk%20pdf?utm_source=chatgpt.com) **on compliance-related activities**. This translates into 5-8% of annual budget spending for large banks, but already 13% or $250m for the average financial service company. For smaller fintechs and stablecoin–native players, these costs represent an even larger percentage of budget and growth capacity, constraining product innovation and customer acquisition, with 20–25% of their total operating budgets going to compliance and identity infrastructure.

**Compliance is a regressive tax that hits stablecoin startups especially hard**. Thanks to DeFi’s composability, stablecoin neobanks benefit from combining different services, such as onramps, card providers, virtual accounts, and other financial modules under the same front end. This enables stablecoin neobanks to grow faster and more efficiently than their fintech counterparts building on traditional finance rails. However, **DeFi’s composability breaks the moment users cannot move between those modules**.

People _loved_ neobanks for their UX. Going back to KYC’ing for each perceived ‘feature’ \*\*\*\*in one single app is not acceptable for mainstream users. If we want to scale beyond the niche, we need to solve the identity problem. **The inability to bridge people seamlessly from one provider to another without having to re-KYC each time is poised to become the biggest blocker for the stablecoin economy**.

The solution is clear: **seamless, compliant KYC re-usability**. This is the main focus of idOS today, our beachhead into the wider financial services user onboarding, verification & compliance market.

idOS revenue streams are split between Protocol fees and Service fees.

#### Protocol Fees

Protocol fees are directly generated, captured, and distributed at the protocol level within the idOS Economy Network.

* **Gas fees** capture the value of ‘compute’ and ‘storage’. Write and read actions to the idOS Storage Network carry a gas fee. This gas fee is based on the amount of compute needed to carry out an action plus the amount of data that is stored. 100% of these fees go to Storage Network node operators. To become node operators, verified entities need to stake a minimum amount of IDOS tokens - users can also delegate their IDOS to node operators.

![](/assets/IDOS Token diagram - Staking &#x26; Gas fees.jpg)

* **Access Grant** **fees** (paid in stablecoins) capture the value of the ‘content’. Through idOS, Data Consumers can request Data Owners (Users) to share access to a Verifiable Credential they hold in their idOS profile. When Data Issuers issue a credential for a user, they can set a price to access the credential. Data Consumer pay this price upon receiving a (read) Access Grant from a user. There is a protocol-defined mark-up (25% at inception) on the price of each credential that is allocated to the idOS Association to support the protocol, its development, and ecosystem sustainability.

![](/assets/IDOS Token diagram - USDC.jpg)

#### Service Fees

Beyond protocol fees, other institutions, such as Data Issuers, can generate revenue from leveraging the idOS protocol. idOS Services, through its idOS Relay product, is the first organization to 1) aggregate and standardize outputs across different identity verification providers, 2) issue Verifiable Credentials for users inside idOS, and 3) enforce data deletion across verification providers.

![](/assets/idOS Architecture – Simplified (1).jpg)

**idOS Relay** is live and currently generating $500k+ Annual Recurring Revenue from its clients. Thanks to the idOS Economy Network architecture, products like idOS Relay can benefit from revenue models that go beyond one-off identity verification, and can progressively become on-chain revenue drivers. Some examples are:

* **Subscription fees:** Verifying certain data about someone goes beyond a one-off check, especially for regulated use cases. Identity documents expire over time, people change addresses, and international sanctions evolve. Therefore, it’s important to keep individual data up to date every time a human onboards onto a new app. Likewise, on the internet it’s critical to verify that the person behind a profile, is the same person that originally created that profile. idOS enables users to store several data points about themselves and reuse them across apps. This opens the opportunity for service providers to move from one-off verification to continuous user onboarding across applications, therefore opening up a new revenue stream.
* **Transaction fees:** By analyzing [onchain revenue data](https://defillama.com/fees), it’s clear that platforms that manage to capture a % of transacted value (e.g. DEXs, prediction markets, yield aggregators) are clear winners when it comes to fee and revenue generation. Identity verification unlocks a lot of value for financial institutions, however, identity verification providers are naturally excluded from accessing transaction fees. Thanks to its composability, providers that leverage idOS can offer services, such as aggregating crypto-fiat on/off-ramps, to users without requiring users to verify their data again with a new provider, even allowing them to choose from different providers depending on their fees, and charging a fee on top for the added convenience. Another example would be to create a specific [NEAR Intents](https://www.near.org/intents) front end that requires identity verification for cross-chain transactions above a certain value, making it a more feasible solution for regulated institutions.
* **Extended applications:** As a programmable access management layer, infrastructure providers can also leverage idOS to offer other services on top that require rules-based access to data. One example is generating zero-knowledge proofs on top of data stored in idOS, to offer privacy-preserving solutions to regulated entities, without sacrificing compliance. We will share more about the work we are doing with our partners [Billions](https://billions.network/) and [Horizen Labs](https://horizenlabs.io/) in the near future.

idOS is a composable and permissionless network. Issuing and consuming Verifiable Credentials through idOS only requires the authorization of the user, and the idOS Association actively encourages other service providers to participate in the ecosystem.

### Closing remarks

The digital identity market already generates over [$50bn annually](https://www.marketsandmarkets.com/PressReleases/digital-identity-solutions.asp), spanning KYC, biometrics, authentication, fraud prevention, and onboarding. Crucially, this figure reflects spending merely to _patch_ trust gaps in outdated architectures. As finance becomes modular and programmable, the number of “identity events” grows faster than the number of users - creating a compounding market dynamic rather than a linear one.

The stablecoin economy cannot scale without identity portability. Stablecoin transactions reached $35 trillion in 2025, however [only approximately 1% of that volume represented payments](https://www.linkedin.com/pulse/stablecoins-payments-what-raw-transaction-numbers-4qjke/). The stablecoin economy has a huge potential to disrupt TradFi, but for stablecoins and onchain rails to become viable for everyday use cases, we need to drastically improve UX.

idOS, and the IDOS Token economy, drastically improve user onboarding for regulated financial applications by establishing identity verification as a core infrastructure element, rather than one-off checks that just create friction and increase compliance costs through fragmentation and data duplication.

_The IDOS Tokens are designed as utility tokens within the Ecosystem, only providing access to the functions as described in the_ [_White Paper_](https://www.idos.network/blog/token-legal-white-paper)_. They do not represent an investment, security, equity, profit right, revenue share, or claim against any entity. References to a “token economy,” “fees,” or “incentives” describe protocol-level technical mechanisms only and do not imply value appreciation or secondary markets. This content is not investment or financial advice and is not directed at persons in restricted jurisdictions. Participation in token-related activities involves risk and may be subject to eligibility, jurisdictional restrictions, and other requirements._
