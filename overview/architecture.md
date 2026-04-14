# Architecture overview

idOS is composed of two principal layers: the **Storage Network** and the **Economy Network**, connected by client-side SDKs and an encryption enclave.

<figure><img src="../.gitbook/assets/idOS Architecture – Simplified.jpg" alt="idOS Architecture"><figcaption><p>idOS system architecture</p></figcaption></figure>

## Storage Network

A decentralized, privacy-aware database network built on [Kwil](https://www.kwil.com/), a Byzantine Fault Tolerant (BFT) relational database platform. The Storage Network:

- Stores end-to-end encrypted user data (credentials, profile attributes, access grants)
- Serves authenticated read/write requests
- Replicates data across all validator nodes using [Kwil's Roadrunner consensus](https://docs.kwil.com/docs/node/consensus/roadrunner/) (CometBFT-inspired)
- Supports real data deletion — unlike append-only blockchains, enabling GDPR Article 17 compliance

For details, see [Storage Network](../how-it-works/storage-network.md).

## Economy Network

Smart contracts deployed on **Arbitrum One** implementing the protocol's economic layer:

- Access grant fee settlement (currently set to zero during early adoption)
- Write gas fee escrow and streaming
- IDOS token staking for node operators
- Bridge between Arbitrum and the Storage Network (Kwil)

For details, see [Economy Network](../how-it-works/economy-network.md).

## Gateway

A load-balancing RPC gateway that sits in front of Storage Network nodes. The Gateway:

- Routes client requests to available nodes
- Manages authenticated sessions (SIWE-based wallet sign-in, HTTP-only cookie sessions)
- Is currently a single instance; architecture supports multiple instances natively (stateless)
- Decentralization planned: each node operator runs one, with DNS round-robin

## SDK

Client-side and server-side libraries that handle:

- Wallet authentication across supported chains
- Encryption and decryption at the edge (data never leaves the client unencrypted)
- Access grant creation and management
- Credential issuance and retrieval

The SDK is distributed as npm packages:

| Package | Purpose | Runtime |
|---------|---------|---------|
| `@idos-network/client` | User authentication, profile management, credential access, access grant creation | Browser |
| `@idos-network/issuer` | Credential issuance, profile creation, credential management | Server (Node.js) |
| `@idos-network/consumer` | Credential retrieval, decryption, and verification | Server (Node.js) |
| `@idos-network/enclave` | Key derivation, encryption/decryption in secure context | Browser |
| `@idos-network/credentials` | W3C Verifiable Credential building and verification | Both |

A [Kotlin multiplatform SDK](https://github.com/idos-network/idos-sdk-kotlin) is also available for mobile.

## Enclave

The secure context where encryption/decryption keys are derived and used. The Enclave ensures that integrating applications never have direct access to a user's encryption keys.

**Current implementation**: A sandboxed cross-origin iframe. Same-origin policy prevents the host page from accessing enclave contents. Communication is via `postMessage` with strict origin validation.

**Roadmap**: Migration to AWS Nitro Enclaves (TEE) for stronger isolation guarantees. For wallets like MetaMask that are already a trusted execution environment, the wallet itself can serve as the enclave.

## Component decentralization status

| Component | Status | Roadmap |
|-----------|--------|---------|
| Storage Network | Decentralized — BFT consensus among validator set | Currently permissioned; moving to permissionless via IDOS staking |
| Access Grants | Decentralized — managed natively within Storage Network | Distributed across all nodes via BFT consensus |
| Gateway | Centralized — single instance | Multiple instances planned; stateless design supports it natively |
| Economy Network | Decentralized — Arbitrum One L2 | Governed by IDOS token holders and the idOS Association |
| SDK / Enclave | Client-side — no central server dependency | TEE migration for enclave |

## Hard dependencies

| Dependency | Impact if failed |
|------------|-----------------|
| DNS | SDK connections to `nodes.idos.network` would fail |
| Gateway | SDK clients cannot route requests. Stateless design enables quick failover |
| Storage Nodes | Loss of individual nodes does not affect availability as long as quorum (2f+1) is maintained |
| Cloud providers | Nodes primarily use AWS. Architecture is not AWS-specific and can migrate to any provider |

**Key property**: Even in the worst case (all infrastructure down), no user data is exposed. Data remains encrypted at rest, and encryption keys are held exclusively by users.
