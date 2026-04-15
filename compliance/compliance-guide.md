# Compliance officer guide

This page is a reading guide for compliance officers evaluating idOS. It maps common compliance questions to the relevant documentation sections.

## Quick answers

| Question | Answer | Details |
|----------|--------|---------|
| Who is the data controller? | Not idOS. Issuers and consumers are controllers for data they collect/consume. idOS Association has no access to decryption keys. | [Legal assessment](legal-assessment.md) |
| Is data encrypted? | Yes, end-to-end with NaCl (x25519-xsalsa20-poly1305). Node operators cannot read plaintext. | [Encryption](../how-it-works/encryption-and-key-management.md) |
| Can users delete their data? | Yes. GDPR Article 17 is supported via BFT consensus-enforced deletion. | [Legal docs](../legal-docs/data-privacy-and-protection/the-right-to-be-forgotten.md) |
| How are AML retention periods handled? | Time-locked access grants. Consumer's re-encrypted copy persists for the retention period even if the user deletes their own copy. | [Data flows](../how-it-works/data-flows.md) |
| Has idOS been legally assessed? | Yes. Taylor Wessing (UK AML focus), MME (Switzerland/EU), Vectra Advisors (Swiss law). | [Legal assessment](legal-assessment.md) |
| Are smart contracts audited? | Yes. Four audits: Nethermind, Resonance, Subvisual, HashEx. | [Audits](../security/audits.md) |
| What credential format is used? | W3C Verifiable Credentials (recommended). Storage is format-agnostic. | [Key concepts](../overview/key-concepts.md) |

## Reading path for compliance evaluation

### 1. Understand the architecture

Start with [Architecture overview](../overview/architecture.md) to understand the separation between the Storage Network (encrypted data), Economy Network (smart contracts on Arbitrum), and the SDK layer. The key insight: no single party — including idOS — can access plaintext user data.

### 2. Review the legal framework

- [Legal assessment](legal-assessment.md) — Independent assessment by Taylor Wessing focused on UK AML compliance
- [idOS regulatory approach](idos-regulatory-approach.md) — How idOS maps to regulatory requirements
- [Compliance overview](compliance-overview/README.md) — GDPR, CCPA, AML frameworks and how idOS relates
- [idOS & regulatory frameworks](compliance-overview/idos-and-regulatory-frameworks.md) — Detailed regulatory mapping

### 3. Understand data privacy

- [Data privacy and protection](../legal-docs/data-privacy-and-protection/README.md) — Legal basis for processing
- [Legal basis for sharing data](../legal-docs/data-privacy-and-protection/legal-basis-for-sharing-data.md) — How consent and access grants work
- [The right to be forgotten](../legal-docs/data-privacy-and-protection/the-right-to-be-forgotten.md) — Deletion mechanism
- [Data retention obligations](../legal-docs/identity-data-for-obligated-entities/data-retention-obligations.md) — How retention periods are enforced

### 4. Review KYC re-usability

- [KYC re-usability](kyc-re-usability/README.md) — How one KYC verification can be shared compliantly
- [Case studies](kyc-re-usability/case-studies-for-kyc-re-usability.md) — Real-world examples
- [Data ingestion](kyc-re-usability/data-ingestion.md) — How credentials enter the system

### 5. Evaluate security

- [Security overview](../security/README.md) — Threat model, adversary analysis, residual risks
- [Audits](../security/audits.md) — Completed audits and bug bounty program
- [Encryption and key management](../how-it-works/encryption-and-key-management.md) — Cryptographic design

## Key compliance properties

### Data minimization
Consumers request access to specific credentials. They receive only what the user explicitly shares — not the full profile.

### Consent management
Access grants are cryptographic, user-signed authorizations. Each grant specifies exactly which consumer can access which credential. Users can revoke grants at any time (subject to retention locks).

### Audit trail
Access grants are recorded on the Storage Network with BFT consensus. The Economy Network on Arbitrum provides additional on-chain records for fee settlement.

### Cross-border considerations
idOS is chain-agnostic and jurisdiction-agnostic. Data is encrypted and replicated across nodes. The [data processing location](../legal-docs/data-privacy-and-protection/data-processing-location.md) documentation covers where data is physically stored.

### Credential verification
Each consumer independently verifies the issuer's signature on retrieved credentials. idOS does not make compliance decisions — each obliged entity maintains its own compliance judgment based on the credential data it retrieves.

## Frequently asked questions

See the [FAQ](../resources/faq.md) for compliance-related questions, including GDPR roles, deletion support, and AML retention.

## Contact

For compliance-specific inquiries: [engineering@idos.network](mailto:engineering@idos.network)
