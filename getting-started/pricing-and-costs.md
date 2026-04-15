# Pricing and costs

This page breaks down what it costs to use idOS, from free SDK integration to network gas fees and third-party services.

## SDK integration

**Free.** All idOS SDK packages (`@idos-network/client`, `@idos-network/issuer`, `@idos-network/consumer`) are MIT-licensed and free to use. No token holdings are required to integrate.

## Network gas fees

Gas fees compensate node operators for storing and serving encrypted data. They are paid in IDOS tokens.

**Currently set to zero** during the early adoption phase. When enabled, the fee model has two components:

### Upfront escrow (refundable)

Paid at credential write time. This amount is escrowed — not spent — and reimbursed when the credential is deleted.

```
gas_upfront = MAX(F, S_mb / 1024 × R × N × T × M)
```

Where `S_mb` = credential size in MB, `R` = replication factor, `N` = number of nodes, `T` = retention period in months (minimum 12), `M` = multiplier.

If a consumer requires a 5-year retention period, the upfront escrow covers those 5 years.

### Streaming rate (ongoing)

A monthly fee for continued storage:

```
gas_stream = S_mb / 1024 × R × N × M
```

**Example at current pricing**: a 10 MB Verifiable Credential costs ~$0.0944 upfront (refundable on deletion) + $0.007870/month streaming.

### Fee distribution

- 100% of gas fees go to node operators
- Gas fees make spam economically prohibitive
- Future: read operations may also incur gas costs for read-attack protection

## KYC provider costs

idOS does not perform identity verification itself. KYC/IDV is handled by external providers (e.g., Sumsub) that issue credentials into idOS. KYC provider costs depend on the provider you choose and your verification requirements.

When using [idOS Relay](https://github.com/idos-network/relay), KYC orchestration is handled for you. Contact [engineering@idos.network](mailto:engineering@idos.network) for current provider pricing through Relay.

## FaceSign (biometrics)

FaceSign is an optional biometric signer that runs in AWS Nitro Enclaves. If you enable FaceSign for your users, costs depend on usage volume. Contact [engineering@idos.network](mailto:engineering@idos.network) for FaceSign pricing.

## Running a node

If you want to run your own idOS storage node, you become a participant in the network economy:

| Requirement | Details |
|-------------|---------|
| Minimum stake | 2,500,000 IDOS tokens |
| KYB | Required |
| Agreement | Node Operator Agreement with idOS Association |
| Infrastructure | AWS (currently); ~$400-600/month for recommended instance types |
| Revenue | 100% of gas fees + share of staking rewards (15% of total supply over 120 months) |

Running your own node means your data writes go through infrastructure you control, which can significantly change the cost model for high-volume integrators.

## Cost comparison

| Approach | Typical KYC cost per user | Notes |
|----------|--------------------------|-------|
| Traditional (each service runs own KYC) | $2-15 per verification | Repeated for every service |
| idOS (KYC re-usability) | One-time verification cost, shared across consumers | Consumers pay only gas fees to access existing credentials |

The core value proposition: users verify once, and that verification is re-used across any number of downstream providers. Each provider avoids the full cost of running their own verification.

## What's free today

During early adoption:
- SDK integration: **free** (always)
- Gas fees: **zero** (early adoption)
- Access grant creation: **zero** (early adoption)
- Profile creation: **zero** (early adoption)

## Contact

For volume pricing, node operator inquiries, or partnership discussions: [engineering@idos.network](mailto:engineering@idos.network)
