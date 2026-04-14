# Audits and testing

## Completed audits

Various components of idOS have been audited by independent security firms. All completed audit reports are public.

| Component | Auditor | Report |
|-----------|---------|--------|
| IDOS Token, Vesting & Staking smart contracts | [Nethermind](https://www.nethermind.io/) | [Report](https://github.com/idos-network/contracts/blob/master/NM0731-FINAL_IDOS.pdf) |
| idOS Enclave | [Resonance Security](https://resonance.security/) | [Report](https://github.com/user-attachments/files/22494008/Audit_Report_IDOS-ENC_FINAL_1.1.pdf) |
| idOS Community Sale smart contract | [Subvisual](https://subvisual.com/) | [Report](https://github.com/idos-network/idos-sale/blob/audit/idOS%20Community%20Sale%20Smart%20Contract%20Audit_Subvisual.pdf) |
| Economy ↔ Storage IDOS bridge | [HashEx](https://hashex.org/) | [Report](https://github.com/trufnetwork/rewards_contracts/blob/51b6a302fb8462b50cfa1707c4a153ab97ac7c1a/docs/RewardDistributor_HashEx_Audit.pdf) |

Additional components will be audited as the system decentralizes further and component maturity increases.

## Bug bounty program

idOS has an active bug bounty program on [HackenProof](https://hackenproof.com/programs/idos-apps-and-sc-1).

## Internal security practices

- Security is a shared function across all engineering team members, owned by the CTO
- Cross-member code review approval required for production deployments
- Only CTO and co-founders have access to multisig wallets
- CXO management offsites include routine security education sessions
- Biannual penetration testing is a near-term priority

## Incident history

idOS has not suffered any security incidents or data breaches to date.

For transparency: the team that built idOS founded Fractal ID in 2017. Fractal ID suffered a data breach in July 2024. This experience directly informed idOS's architecture — end-to-end encryption ensures that even if infrastructure is compromised, no plaintext data is exposed. Full details are available in the [Fractal ID post-mortem](https://web.fractal.id/fractal-id-data-breach-post-mortem/).
