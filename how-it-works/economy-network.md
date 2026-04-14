# Economy Network

The idOS Economy Network is a set of smart contracts deployed on **Arbitrum One** that implements the protocol's economic layer.

## Responsibilities

| Function | Description |
|----------|-------------|
| Fee settlement | Gas fees for write operations on the Storage Network |
| Token staking | Node operators stake IDOS tokens to participate in the validator set |
| Bridge | Transfers IDOS tokens between Arbitrum One and the Storage Network (Kwil) |
| Governance | Future on-chain governance via IDOS token holders |

## Smart contracts

All contracts are deployed on Arbitrum One and are **not upgradeable**:

| Contract | Address | Audit |
|----------|---------|-------|
| [IDOS ERC-20 token](https://arbiscan.io/address/0x68731d6f14b827bbcffbebb62b19daa18de1d79c) | `0x6873...d79c` | [Nethermind](https://github.com/idos-network/contracts/blob/master/NM0731-FINAL_IDOS.pdf) |
| [IDOS node staking](https://arbiscan.io/address/0x6132f2ee66dec6bdf416bda9588d663eaceec337) | `0x6132...c337` | [Nethermind](https://github.com/idos-network/contracts/blob/master/NM0731-FINAL_IDOS.pdf) |
| [Economy ↔ Storage bridge](https://arbiscan.io/address/0xbe34524b5cceb47eef931d71c77156f5eea4d677) | `0xbe34...d677` | [HashEx](https://github.com/trufnetwork/rewards_contracts/blob/51b6a302fb8462b50cfa1707c4a153ab97ac7c1a/docs/RewardDistributor_HashEx_Audit.pdf) |

## Write gas fees

Write gas fees compensate node operators for providing storage and compute. They are designed to cover cost, with fees lowering as the network scales.

Gas fees are currently set to zero during the early adoption phase. The fee model uses two components:

### Upfront escrow

Paid at write time. This is not a cost — it is escrowed and reimbursed on deletion.

```
gas_upfront = MAX(F, S_mb / 1024 × R × N × T × M)
```

The upfront fee covers a minimum of 12 months but is bound to the retention period set by the data consumer. If a consumer requires 5 years of data retention, the upfront fee covers 5 years.

### Streaming rate

Ongoing cost per month for data storage:

```
gas_stream = S_mb / 1024 × R × N × M
```

This model ensures the network can host data even if the streaming fee is not paid, without causing disruption.

## Staking

Node operators must stake a minimum of **2.5M IDOS tokens** to participate as validators. Token holders can delegate stake to node operators.

- 100% of gas fees are distributed to node operators
- 15% of total IDOS supply is dedicated to staking rewards (distributed over 120 months)
- Node operators will be able to set a fee on staking rewards from delegated stake (feature in development)
- Slashing is currently manual based on idOS Association criteria for breaches of the Node Operator Agreement

## IDOS token

| Property | Value |
|----------|-------|
| Standard | ERC-20 |
| Chain | Arbitrum One |
| Total supply | 1,000,000,000 (fixed) |
| Token launch | March 5, 2026 |
| Exchanges | OKX Boost, Revolut, Kraken, Gate, KuCoin, MEXC, Uniswap |

No token holdings are required to integrate idOS. SDK integration, credential storage, and data sharing are fully independent of token ownership (gas fees are paid in IDOS).

For token allocation details, see [Token allocation & distribution](../idos-token-launch/token-allocation-and-distribution.md).
