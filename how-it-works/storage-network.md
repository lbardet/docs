# Storage Network

The idOS Storage Network is a decentralized, privacy-aware database that stores end-to-end encrypted user data and serves authenticated read/write requests.

## Technology

The Storage Network is built on [Kwil](https://www.kwil.com/), a Byzantine Fault Tolerant (BFT) relational database platform. Unlike general-purpose blockchains, Kwil is purpose-built for high-throughput, data-intensive networks — its performance characteristics are closer to PostgreSQL than to a typical L1 chain.

Key properties:

- **Privacy-aware**: An immutable ledger that supports culling. Unlike blockchain-based storage, Kwil supports real data deletion — a critical requirement for GDPR's "right to be forgotten" (Article 17).
- **Full replication**: Every validator node holds a complete replica of the (encrypted) dataset, synchronized via BFT consensus.
- **End-to-end encryption**: All credential content is encrypted before reaching the network. Storage nodes never see plaintext. An attacker would need individual user encryption keys to access any data.

## Consensus

The Storage Network uses [Kwil's Roadrunner consensus](https://docs.kwil.com/docs/node/consensus/roadrunner/), a BFT mechanism inspired by CometBFT and classical distributed systems consensus algorithms.

| Property | Detail |
|----------|--------|
| Fault tolerance | Tolerates up to f Byzantine nodes in a 2f+1 validator set |
| Finality | Deterministic — once a block is committed, it is final. No probabilistic confirmation period |
| Throughput | Optimized for structured read/write operations, not general-purpose smart contract execution |

### Node types

| Node type | Role |
|-----------|------|
| **Validator** | Approves blocks proposed by the Leader. A block becomes part of the chain only when a supermajority approves it |
| **Leader** | Produces blocks with minimal coordination to reduce latency on high-throughput load spikes. Analogous to EVM sequencers. Currently a static idOS node; will rotate proportionally to staked IDOS |
| **Sentry** | Observer and/or archival node. Not currently used by idOS |

## Data architecture

The Storage Network stores five fundamental data structures:

| Entity | Description |
|--------|-------------|
| **User** | Profile with UUID, recipient encryption public key |
| **Wallet** | Blockchain wallet address linked to a user profile |
| **Credential** | Encrypted verified data (content + cleartext metadata) |
| **Access Grant** | Permission record linking a consumer to a shared credential copy |
| **Attribute** | Key-value metadata on a user profile |

### Credentials

Each credential has two parts:

- **Content**: The encrypted payload — only decryptable by the credential owner or authorized recipients. Typically a W3C Verifiable Credential, but the storage layer is format-agnostic.
- **Public notes**: Cleartext metadata including issuer identity, credential type, expiry date, and revocation status. Queryable without decryption.

Credentials are encrypted for one specific recipient (the user). When sharing with a consumer, the SDK creates a **shared credential** — a re-encrypted copy specifically for that consumer's key.

### Access grants

Access grants are managed natively within the Storage Network (not on a separate chain). They include:

- Owner and consumer identifiers
- Reference to the shared credential
- Optional time-lock (enforced at the consensus level)
- Content hash for integrity verification

## Gateway

The Kwil Gateway (KGW) is the HTTP entry point for clients:

- Load-balances traffic across Storage Network nodes
- Manages authenticated sessions (SIWE-based wallet sign-in, HTTP-only cookie sessions)
- Default session lifetime: 30 days (configurable)
- Sessions are shared across browser tabs — no re-authentication needed

The gateway is currently a single instance. Architecture supports multiple instances natively (stateless load balancer). Redundancy is on the near-term roadmap.

## Deletion

When a user requests deletion of a credential:

1. The system checks for active time-locked access grants
2. If none exist, BFT consensus enforces deletion across all nodes
3. If a time-lock is active, the shared credential copy is retained for the consumer until the lock expires
4. The user can delete their own copy immediately regardless of time-locks

Node operators that fail to comply with deletion requests risk losing validator status and staked tokens.

## Upgrades

Storage Network upgrades are coordinated through the validator set:

- Validators must adopt new versions; BFT consensus ensures the network only advances when a supermajority agrees
- Each release must be forward and backward compatible, enabling rolling deployments across operators with different response times
- Users are never required to take action during upgrades — their encrypted data and access grants persist

The SDK follows semantic versioning and is distributed via npm. SDK updates never require user action.
