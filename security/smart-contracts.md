# Smart contract security

## Deployed contracts

All smart contracts are deployed on Arbitrum One:

| Contract | Address | Purpose |
|----------|---------|---------|
| [IDOS ERC-20 token](https://arbiscan.io/address/0x68731d6f14b827bbcffbebb62b19daa18de1d79c) | `0x68731d6f14b827bbcffbebb62b19daa18de1d79c` | IDOS utility token |
| [IDOS node staking](https://arbiscan.io/address/0x6132f2ee66dec6bdf416bda9588d663eaceec337) | `0x6132f2ee66dec6bdf416bda9588d663eaceec337` | Node operator staking |
| [Economy ↔ Storage bridge](https://arbiscan.io/address/0xbe34524b5cceb47eef931d71c77156f5eea4d677) | `0xbe34524b5cceb47eef931d71c77156f5eea4d677` | IDOS token bridge between Arbitrum and Kwil |

## Upgradeability

**Smart contracts are not upgradeable.** This is a deliberate design choice to minimize trust assumptions. Contract behavior cannot be changed after deployment.

## Audits

All deployed contracts have been audited:

- **Token, Vesting & Staking**: Audited by [Nethermind](https://github.com/idos-network/contracts/blob/master/NM0731-FINAL_IDOS.pdf)
- **Economy ↔ Storage bridge**: Audited by [HashEx](https://github.com/trufnetwork/rewards_contracts/blob/51b6a302fb8462b50cfa1707c4a153ab97ac7c1a/docs/RewardDistributor_HashEx_Audit.pdf)

## Source code

Smart contract source code is available at [github.com/idos-network/contracts](https://github.com/idos-network/contracts).
