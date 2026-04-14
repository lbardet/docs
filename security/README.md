# Security overview

This section describes the idOS security model, threat model, completed audits, and deployed smart contracts.

## Design principles

idOS is designed so that **compromising infrastructure does not reveal user data**. This is achieved through:

1. **End-to-end encryption**: All credential content is encrypted client-side before reaching the network. Storage nodes only hold ciphertext.
2. **User-held keys**: Encryption keys are never persisted on any server or node. They are derived on-demand in the user's secure context (Enclave).
3. **Separation of concerns**: Storage nodes hold encrypted data but not keys. MPC nodes hold key shares but not data. Compromising either alone yields nothing useful.

## Threat model

### Security goals

idOS aims to ensure that:

- Compromise of storage nodes or interception of network traffic does not reveal plaintext user data
- Consumers only accept credentials signed by trusted issuers and explicitly granted to them
- Integrating applications cannot directly read the user's long-term encryption key when Enclave isolation holds

### Adversaries considered

| Adversary | Capabilities |
|-----------|-------------|
| Passive network attacker | Can read stored ciphertext and inspect network traffic |
| Compromised node operator | Can access stored encrypted data and protocol metadata |
| Compromised gateway | Can inspect or modify traffic between clients and nodes |
| Malicious issuer | Can submit malformed credentials or attempt unauthorized writes |
| Malicious consumer | Can attempt replay, rollback, or unauthorized sharing flows |
| Malicious integrating application | Can attempt to extract encryption keys from the Enclave |
| Colluding infrastructure operators | Limited collusion among node operators |

### Assumptions

Security guarantees rely on:

- Soundness of the underlying cryptography (NaCl/libsodium)
- Correct implementation of the Enclave and SDKs
- Correct wallet-based consent flows
- Correct issuer signature verification by consumers
- Current permissioned-operator model

### Out of scope / residual risks

The threat model does not fully protect against:

- A fully compromised user endpoint
- A malicious integrating app that tricks the user into approving harmful flows
- Metadata leakage from access patterns and protocol interactions
- Denial-of-service attacks
- Failure of browser Enclave / TEE isolation boundary

Because idOS is currently permissioned and still hardening incrementally, operator trust and implementation bugs remain material risks.

## Scenario: compromised storage node

If a storage node is compromised:

- **No plaintext data is exposed** — all credential content is encrypted
- **No encryption keys are on nodes** — the attacker gains only encrypted blobs and metadata
- **Metadata exposure**: The attacker could learn which wallet addresses are associated with which profiles, and observe access patterns
- **Network consensus is unaffected** if quorum is maintained
- The Node Operator Agreement covers data exfiltration as a liability that can lead to slashing

## Scenario: multiple compromised nodes

- **Credential data confidentiality is preserved** regardless of the number of compromised nodes
- A true breach requires both compromising nodes AND individual user encryption keys (independent attack surfaces)
- Consensus failure (>f Byzantine nodes in 2f+1) would halt writes but not expose data
- If enough MPC nodes are also compromised, they could reconstruct user keys — but this is a separate, independent attack surface

## Scenario: malicious KYC issuer

Mitigations:

- Issuer authentication and identity are transparent in credential metadata
- Consumers define their own trust lists (e.g., accept only specific issuers)
- Cryptographic credential signatures allow verification
- Issuers have revocation capabilities for compromised credentials

## Anti-replay, anti-MITM, anti-phishing

| Attack | Protection |
|--------|-----------|
| Replay | Session-establishing SIWE messages include nonce and timestamp. Write transactions require sequential nonces. |
| Man-in-the-middle | TLS + application-layer encryption. CAA records prevent BGP + compromised TLS root cert attacks. |
| Phishing | Access grants require explicit wallet signature including recipient identity. TEE migration planned to replace iframe enclaves. Issuer/consumer key validation planned. |

## Further reading

- [Audits and testing](audits.md)
- [Smart contract security](smart-contracts.md)
- [Bug bounty program](bug-bounty.md)
- [idOS Security and Privacy blog post](https://www.idos.network/blog/idos-security-privacy)
