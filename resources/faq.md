# Frequently asked questions

## General

### What is idOS?

idOS (identity operating system) is a decentralized storage and access management network for identity data. It enables users to store encrypted personal data once and share it across applications and blockchains.

### What problem does idOS solve?

Every regulated onchain application requires identity verification, forcing users to repeat KYC for each service. idOS enables KYC re-usability — one verification can be shared with any number of downstream providers, each making their own compliance decisions.

### Is idOS a blockchain?

The idOS Storage Network is its own chain built on Kwil (a BFT relational database platform). The Economy Network uses smart contracts on Arbitrum One. idOS connects to any blockchain ecosystem via its SDK.

### Do I need IDOS tokens to use idOS?

No. SDK integration, credential storage, and data sharing are independent of token ownership. Gas fees (paid in IDOS) are currently set to zero during early adoption.

## For users

### What do I need to use idOS?

A blockchain wallet (EVM, NEAR, Stellar, or XRPL). No separate account, password, or sign-up is required.

### Can I use multiple wallets?

Yes. You can link multiple wallet addresses across different chains to a single idOS profile. All linked wallets have equal access to your data.

### Can I delete my data?

Yes. You can delete credentials and revoke access grants at any time (unless time-locked for regulatory retention). Deletion is enforced across all storage nodes via BFT consensus.

### Who can see my data?

Only you and parties you explicitly grant access to. All data is end-to-end encrypted. Storage node operators, the gateway, and idOS itself cannot read your data.

### What happens if I lose my wallet?

If you have multiple wallets linked to your profile, any of them can recover access. If you use MPC-based key management, any linked wallet can reconstruct your encryption key. If you have FaceSign enabled, it provides device-independent recovery. If all authentication methods are lost, the encrypted data remains on the network but is inaccessible.

## For developers

### Which chains are supported?

EVM (Ethereum, Arbitrum, Polygon, Linea, BNB Chain, Gnosis, and all EVM-compatible chains), NEAR, Stellar, and XRPL are live. Solana is scheduled. The SDK's signer abstraction makes adding new chains straightforward.

### What credential format does idOS use?

The recommended format is W3C Verifiable Credentials. The storage layer is format-agnostic — you can store any content including binary data (passport scans, selfies, videos).

### Can I use other credential frameworks (SD-JWT, mDL)?

The storage layer is format-agnostic at the encryption level. Support for SD-JWT, mDL, and other formats can be added as demand arises. The SDK is built with W3C VCs in mind.

### How do access grants work?

They are managed natively within the Storage Network (not on a separate chain). The user signs a message authorizing a specific consumer to access a specific credential. The SDK handles the re-encryption flow automatically.

### Do I need a backend?

For client-only integrations (wallet/dApp), no backend is needed. For issuers and consumers that need to write/retrieve credentials server-side, a Node.js backend with the respective SDK is required.

### What about uniqueness — can one person have multiple profiles?

Uniqueness is enabled at the protocol level but not enforced globally. This is deliberate. Applications can require uniqueness credentials (e.g., FaceSign biometric attestations or proof-of-uniqueness from Billions) as preconditions for specific features. Users can attach FaceSign to only one account.

### Does idOS support zero-knowledge proofs?

idOS is deliberately ZK-proof agnostic — it stores and manages the underlying data that ZK proofs are based on. This is intentional: instead of coupling to a specific proof system, idOS provides the composable data layer that feeds into ZK solutions.

Current ZK work:
- Integration with [Billions](https://billions.network/) for ZK-ready credentials (90k+ users verified). Users can generate and share ZK proofs from their idOS credentials.
- Collaboration with [Horizen Labs](https://horizenlabs.io/) for ZK proofs of access grant searches — proving that credentials meet criteria without revealing the data.

idOS's position is that ZK proofs alone don't satisfy compliance requirements without the guarantee of access to underlying data. Access grants provide the fallback for litigation, audit, and regulatory requests.

### Does idOS support selective disclosure?

Selective disclosure is supported within the ecosystem but not implemented natively by idOS. It depends on the credential format and proof mechanism. For example, Billions supports selective disclosure for credentials issued through its app. If you use W3C Verifiable Credentials with appropriate proof mechanisms, holder apps can generate Verifiable Presentations revealing only requested claims.

### How is encryption handled?

All credential content is encrypted with NaCl boxes (x25519-xsalsa20-poly1305) before leaving the user's device. The SDK handles encryption and decryption transparently. See [Encryption and key management](../how-it-works/encryption-and-key-management.md).

### What's the SDK size/performance impact?

The Client SDK has a 2 MB size limit. Core operations (profile check, credential listing, access grant creation) are subsecond.

### How do I integrate idOS if I don't use TypeScript?

On the browser side, you can `npm install` the idOS Client SDK regardless of your stack. On the server side, you have options: repackage the Consumer or Issuer SDK as a microservice or CLI tool and call it from your language, or re-implement the RPC calling and cryptography natively (not recommended due to complexity).

### Can I access a user's credentials from a smart contract?

Smart contracts cannot make external API calls, and idOS credentials contain personal data that should not be on a public chain. If you need on-chain authorization, maintain an address allowlist: when you successfully receive an access grant to a valid credential, add the user's wallet address(es) to the allowlist.

### What are the ongoing costs of integrating idOS?

Currently there are no ongoing costs — gas fees are set to zero during early adoption. See [Pricing and costs](../getting-started/pricing-and-costs.md) for the full cost model including future gas fees, KYC provider costs, and node operator economics.

### How does credential revocation work?

Issuers cannot delete a credential from a user's profile without permission. They can update the credential's metadata to mark it as revoked. Consumers checking the credential will see the revocation status and can reject it. The user retains the credential data but it is no longer considered valid by consumers who check revocation status.

### How do timelocks work?

A timelock is an optional add-on to an access grant. When a consumer requests access, they can specify a retention period. If the user accepts, they cannot revoke that specific access grant or delete the underlying credential until the timelock expires. This supports AML regulations that require obliged entities to maintain access to KYC data for a defined period.

## For compliance teams

### What is idOS's GDPR role?

idOS Association does not act as a data controller or processor for end users' encrypted personal data — it has no access to decryption keys. Data issuers and consumers integrating with idOS typically act as controllers or processors for the data they collect and consume.

### How is the right to be forgotten supported?

Users can request deletion. If no time-locked access grants exist, BFT consensus enforces deletion across all nodes. Node operators that fail to comply risk losing validator status and staked tokens.

### How does idOS support AML retention?

Through time-locked access grants and retention periods. When a regulated entity receives an access grant, it can specify a retention period enforced at the protocol level. Even if the user deletes their own copy, the consumer's re-encrypted copy remains accessible for the retention duration.

### Has idOS been legally assessed?

Yes. Taylor Wessing conducted an independent legal assessment focused on UK AML compliance with alignment to EU and international standards. Additional legal counsel includes MME (Switzerland/EU) and Vectra Advisors (Swiss law). See [Compliance](../compliance/legal-assessment.md).
