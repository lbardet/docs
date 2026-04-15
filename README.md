# What is idOS?

**idOS** (identity operating system) is a decentralized storage and access management network for identity data. It enables users to store encrypted personal data (such as KYC credentials) once and share it with any application or service provider — across any blockchain ecosystem.

## The problem

Every regulated onchain application requires identity verification. Today, users repeat KYC for each new service. Providers each build and maintain their own identity data silos. This is slow, expensive, and creates honeypots of sensitive data.

## How idOS solves it

idOS provides a shared, privacy-preserving data layer where:

- **Users** store encrypted identity credentials and control who can access them.
- **Issuers** (KYC providers) verify users and write signed, encrypted credentials.
- **Consumers** (fintechs, on-ramps, neobanks) request access to existing credentials — no re-verification needed.

All data is end-to-end encrypted. The user holds the encryption keys. No storage node, gateway, or operator can read plaintext data.

<figure><img src=".gitbook/assets/idOS Architecture – Simplified.jpg" alt="idOS Architecture"><figcaption><p>idOS high-level architecture</p></figcaption></figure>

## Core components

| Component | Role |
|-----------|------|
| [Storage Network](how-it-works/storage-network.md) | Decentralized, BFT-replicated database storing encrypted user data |
| [Economy Network](how-it-works/economy-network.md) | Smart contracts on Arbitrum One for fee settlement, staking, and governance |
| [SDK](getting-started/README.md) | Client-side and server-side libraries for authentication, encryption, and data access |
| [Enclave](how-it-works/encryption-and-key-management.md) | Secure context for key derivation and cryptographic operations |

## Chain support

idOS is chain-agnostic. Users authenticate with any supported wallet, and a single idOS profile can link wallets across chains.

| Ecosystem | Status |
|-----------|--------|
| EVM (Ethereum, Arbitrum, Polygon, Linea, BNB, Gnosis, and all EVM chains) | Live |
| NEAR Protocol | Live |
| Stellar | Live |
| XRPL | Live |
| Solana | Scheduled |

## Key properties

- **Self-custodial**: Users control their data with their own encryption keys. Even if all storage nodes are compromised, data remains encrypted.
- **Compliant**: Supports AML retention periods, time-locked access grants, credential revocation, and GDPR-compliant deletion.
- **Reusable**: One KYC verification can be shared with any number of downstream providers, each maintaining their own compliance decisions.
- **Open source**: SDKs are MIT-licensed. All core repositories are public at [github.com/idos-network](https://github.com/idos-network).

## Live demo

See idOS in action with a [KYC re-usability demo](https://demo.idos.network/) showing a stablecoin neobank sharing verified credentials with a fiat on-ramp provider.

## Next steps

- **I need to onboard users** → [Getting started](getting-started/README.md) — choose your integration path
- **I need to understand the cost** → [Pricing and costs](getting-started/pricing-and-costs.md) — what idOS costs to use
- **I'm evaluating for compliance** → [Compliance officer guide](compliance/compliance-guide.md) — reading path for compliance teams
- **I want to understand the architecture** → [Architecture overview](overview/architecture.md) — how the system fits together
- **I want to see real examples** → [Example use cases](example-use-cases/README.md) — neobank, fintech, and TradFi flows
