# FAQs - Developers

**1. Architecture & Technical Design**

* What does "decentralized" mean for idOS and why is it not permissionless to become an idOS Operator? Why does it need its own blockchain?
  * Because storing dangerous PII, even if encrypted, should not be taken lightly. To start, the only node operators that we're letting "join the club" are people who we vetted and can enforce consequences (economical, legal, or as appropriate) if there's demonstrable bad faith or negligence in operating the nodes.
* What chains are currently supported by idOS and what does it mean to be a supported chain?
  * EVM ([ERC-191](https://github.com/ethereum/ercs/blob/master/ERCS/erc-191.md) with secp256k1) and NEAR ([NEP-413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md) with ed25519) are currently supported. To be a supported chain mostly means that we have "taught" our nodes how to verify signatures the same way that the target chain does. Data Issuers will use vanilla ed25519. 
* Can idOS enable proof-based attestations?
  * Yes. If you're working with W3C VCs, you can easily implement W3C Verifiable presentations and other forms of proof-based attestations. 
* How do access grants work in idOS? Are they onchain?
  * The idOS Data Network is a [Kwil](https://docs.kwil.com/) deployment, and that's where Access Grants live.
* Is an idOS profile another wallet? If so, what chain does it live on?
  * No. idOS profiles are cross-wallet profiles accessed via a private encryption key. There is no "idOS wallet" separate and apart from a user's wallet that they use to sign. 
* Do I need a wallet as an application integrating idOS, or as a fintech supporting idOS identity?
  * Yes. Not only do you need a signer that's currently supported by idOS, you also need to securely store a NaCl encryption key. 
* How does a user access their idOS profile from multiple devices?
  * By using wallet addresses that are associated with their idOS profile, and by inserting the right password when prompted by the idOS Enclave. When we add our TSS key abstraction Native Module, users will be able to sign a message with their wallet on any device and access their idOS profile. 
* What wallet signatures does idOS support? 
  * pkoch: sekp256k1 and ed25519.
* Why are there multiple SDKs? Which one should I use? 
  * To contain complexity and scope for developers. There are 3 SDKs:
    * idOS Client (for browser usage)
    * idOS Consumer Server
    * idOS Issuer Server
* How do I integrate idOS if I don't use TypeScript?
  * pkoch: On the browser side, you can just `npm install` the idOS Client. On the server side, you have a few options:
    * Re-implement the RPC calling and cryptography in your own language (laborious, error-prone; we recommend against this)
    * Package the idOS Consumer Server or the idOS Issuer Server as a microservice and call it (to get started, a few days of engineering work; For maintenance, it'll be mostly package bumps and maybe adding new end-points for new functionality).
    * Package the idOS Consumer Server or the idOS Issuer Server as a CLI tool, and call it (roughly the same burden as before).
* What is Kwil and what role does it play in the idOS system? 
  * It's the foundation of our Data Network, and idOS is deployment of it. We've added the NEAR authenticator and a precompile with some auxiliary functions. Our schema definition lives on [https://github.com/idos-network/idos-schema/](https://github.com/idos-network/idos-schema/)

## 2. Data Storage & Interoperability

* Where is user data actually stored, and in what format is it stored?
  * In the node operator's disks, encrypted. As for formats, idOS doesn't control the format of the contents since it can't read it. The SDK encourages issuers to use W3C VCs, but you could store anything. 
* Is idOS compatible with my preferred credential framework?
  * Yes. However, the SDK is build with W3C VCs in mind. You might need to re-implement some last-mile features on your own.
* Is idOS compatible with the EU ARF spec, DIF and OWF?
  * Not yet. We designed the system to be as interoperable as possible whilst also supporting global compliance need. We haven't yet made any pointed efforts for any of those specific specs. Given our ethos, as soon as we see market demand, implementation will follow.
* Does idOS work with DIDs?
  * Depends on your setup. idOS doesn't need them to work, but it'd be reasonably trivial to define a DID method and respective resolver. As soon as there's market demand, we'll add more turn-key tools into our SDKs.
* What ensures that there are not duplicate entries of the same user on idOS?
  * There is no enforcement of uniqueness at the idOS network layer. We don't have visibility into the data that we store, as it reaches the nodes encrypted. If you need Sybil resistance, you should consume credentials from an issue that enforces human uniqueness.
* Who verifies the authenticity of data in idOS?
  * There are typically 3 parties involved in a KYC flow on idOS:
    * an Identity Verifier (IdV) that attests that the provided documents are legitimate, and produces a machine-readable version of them;
    * an Issuer, who takes the information given by its IdV service and turns it into a credential. It then signs it and asks the user to insert it into their idOS profile (or does that on the user's behalf, if given a Delegated Write Grant). An IdV can choose to integrate with idOS and fulfill both roles at once;
    * a Consumer, that trusts only a well-defined set of issuers. They start by asking the user for credentials that were emitted by trusted Issuers and follow their compliance needs (the user must/can't live in a specific country, etc). The Consumer and the User do the "for which credentials should I ask for an AG" dance, the Consumer fetches their copy of the credentials, and then verifies it was signed by the Issuer.
* Can I access a user's idOS credentials from a smart contract? 
  * Smart contracts can only access data that either lives within their host chain, or is sent directly to them — they don't make external API calls. Since an idOS credential contains personal information, it should neither be hosted on a public chain, or be sent to a public smart contract. If you require authorization at the smart contract level, a tried and true mechanism is to maintain an address allowlist: for example, when you've successfully received an access grant to a valid idOS credential, you could add the user's address(es) to this allowlist.

***

## 3. Security & Cryptography

* How is user data encrypted? What cryptographic protocols do you use?
  * Data is encrypted and decrypted at the edge — before being written to the idOS, and after being read from the idOS. The idOS data store itself is encryption-agnostic and can this support any cryptographic protocol. Currently, our SDKs implement authenticated asymmetric encryption with x25519-xsalsa20-poly1305, a modern and proven ECIES Hybrid Encryption Scheme.
* How are idOS nodes secured? What happens if an idOS Operator leaks a copy of the database?
  *  Data is encrypted at the edge before being stored in idOS nodes. This means that a database leak would yield only encrypted data, an an attacker would still require user encryption keys to be able to decrypt data belonging to a particular user. Note also that becoming an idOS Operator and syncing a node with the idOS network is a permissioned operation, requiring authorization from the idOS Association.
* Is idOS audited, and what was the scope of the audit?
  * We engaged Resonance to audit our v1 release, which should be completed by the end of May 2025. The scope of the audit is limited to our SDKs and implementation of KwilDB, not KwilDB itself.  We are exploring options to have KwilDB itself independently audited in the future. 
* What is your plan for post-quantum security?
  * Currently, our SDKs implement authenticated asymmetric encryption with x25519-xsalsa20-poly1305. While it is a modern and proven ECIES Hybrid Encryption Scheme, it's not quantum-resistant. Since the idOS Storage Network is encryption-agnostic, it can trivially support any cryptographic protocol, and we want to get way ahead of NIST's ECC deprecations, and follow their Post-Quantum Cryptography Standardization effort towards lattice-based cryptography. We're currently leaning towards a classic McEliece scheme given the relative abundance of supporting libraries. Because of our goal of eventual full decentralization of idOS, we have the ambition to  engage with the cryptography community to cooperate on getting to a cyphering scheme that'll let us accept anybody to become a node operator (and, therefore, have a copy of the cyphertext) without putting users at risk. 

***

## 4. Cost & Incentives

* What are the ongoing costs as an application integrating idOS, and who pays for what? Who pays for gas?
  * There are currently no ongoing costs, gas or otherwise, involved in integrating idOS. That will change in Q4 2025 when the idOS Economy Network and progressive node decentralization are live, where issuers and consumers will pay gas to node operators for reads and writes, and pay for access grants amongst each other to incentivize the issuance and re-use of verified credentials. When the idOS Economy Network is live, the idOS protocol will take a 25% cut of any access grant fees paid to network participants. 



***

## 5. Ecosystem & Partnerships

* What is the idOS Consortium and do I need to become a member in order to use idOS?
* How does idOS work with KYC/Identity-verification-providers? How and when is data pulled or pushed to KYC providers and how do I manage that in the idOS SDK? 
  * The idOS does not work directly with KYC/Identity-verificaton-providers. Instead, our Issuer SDK enables both said providers and/or their clients to transform KYC verification data into verifiable idOS KYC Credentials.
* How do I deal with different KYC schemas for different fintechs, i.e. an on-ramp and a card provider who require slightly different fields/additional documents? 
  * The idOS is format-agnostic, and can store Credentials using any KYC schema. There is likely to be normalization required across providers, and the SDK will implement functionality to make this simpler in the future. 
