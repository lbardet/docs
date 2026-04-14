# Performance and scalability

## Current throughput

Core operations (`has_profile`, `get_credentials`, `get_credential_owned`) are subsecond. The Storage Network is optimized for structured read/write operations, with throughput characteristics closer to PostgreSQL than a blockchain.

## Load testing results

Stress testing focused on the worst case for writes: user onboarding (4 transactions, approximately 0.3 KiB ± 0.1 MiB per user).

| Metric | Value |
|--------|-------|
| Sustained throughput | 18 transactions/second |
| New users per second | ~4.5 |
| New users per month (theoretical) | ~11 million |

This throughput is bounded by Kwil's consensus design trade-offs for writes. Migration to IPFS for blob storage is expected to bring throughput on par with PostgreSQL with approximately 20% overhead from consensus.

Read performance has not been a bottleneck. Additional read replicas can be added behind the load balancer at any time.

## Scaling model

| Dimension | Approach |
|-----------|----------|
| **Read scaling** | Horizontal — additional nodes serve read requests via gateway load balancing |
| **Write scaling** | Vertical — bounded by consensus, optimized for single leader |
| **Storage scaling** | Effectively unlimited credential sizes; gas fees as economic governor |

## Current usage metrics

| Metric | Value |
|--------|-------|
| Total users | 150,000+ |
| Unique humans onboarded (app.idos.network) | 88,000+ |
| Fully KYC'd users | 20,000+ |
| Verifiable Credentials issued | 125,000+ |
| Access Grants shared | 110,000+ |

### Monthly operation averages (last 7 months)

| Operation | Average/month |
|-----------|--------------|
| Add User | 20,857 |
| Add Wallet | 27,404 |
| Create Credentials | 15,206 |
| Share Credential | 3,421 |
| Revoke Access Grant | 243 |
| Remove Wallet | 229 |
| Remove Credential | 133 |

## Credential sizes

The median KYC-thorough credential size is approximately **10 MB**. There are no artificial caps on credential or binary content size. The gas fee model charges proportionally to data size, naturally discouraging bloat.

## Load management

| Mechanism | Detail |
|-----------|--------|
| Gateway | Load-balances traffic across nodes |
| Gas fees | Make spam economically prohibitive (currently zero for adoption; non-zero once Economy Network activates) |
| BFT consensus | Provides natural back-pressure on writes |
| DDoS protection | AWS default DDoS protection (sufficient to date) |
| Future: read gas | Planned to protect against read-based attacks |

No circuit breakers or queues are currently implemented. These have not been needed at current scale.
