# Reliability and availability

## Uptime

Based on conservative estimates of maintenance and incident-related downtime, idOS targets 99.9% uptime.

### idOS Protocol (September 2025 – March 2026)

| Period | Total hours | Downtime | Uptime |
|--------|------------|----------|--------|
| **Total** | **5,088** | **5h** | **99.99%** |
| 2026-03 | 744 | 0 | 100.00% |
| 2026-02 | 672 | 0 | 100.00% |
| 2026-01 | 744 | 0 | 100.00% |
| 2025-12 | 744 | 0 | 100.00% |
| 2025-11 | 720 | 5h* | 99.3% |
| 2025-10 | 744 | 0 | 100.00% |
| 2025-09 | 720 | 0 | 100.00% |

\* Block production halted but read operations continued.

### idOS Relay (September 2025 – March 2026)

| Period | Total hours | Downtime | Uptime |
|--------|------------|----------|--------|
| **Total** | **5,088** | **7h** | **99.86%** |
| 2026-03 | 744 | 1h | 99.87% |
| 2026-02 | 672 | 0 | 100.00% |
| 2026-01 | 744 | 4h | 99.46% |
| 2025-12 | 744 | 0 | 100.00% |
| 2025-11 | 720 | 0 | 100.00% |
| 2025-10 | 744 | 0 | 100.00% |
| 2025-09 | 720 | 2h | 99.72% |

Programmatic uptime monitoring implementation is on the roadmap.

## Data replication and consistency

- **Full replication** across all validator nodes via BFT consensus
- **Strong consistency** — deterministic finality, no eventual consistency window
- Details: [Kwil consensus documentation](https://docs.kwil.com/docs/node/consensus)

## Network partition behavior

| Scenario | Behavior |
|----------|----------|
| Majority partition (quorum maintained) | Operates normally |
| No quorum | Writes halt (safety over liveness), reads may still be served |
| Partition heals | Nodes re-synchronize automatically |

No data loss occurs in any partition scenario.

## Disaster recovery

- **Primary DR mechanism**: Full replication means loss of any individual node(s) does not cause data loss
- **Primary DR concern**: Correlated failure affecting all nodes simultaneously, mitigated by geographic and provider diversity (expanding)
- **RTO**: One block (in case the leader produces a block validators reject)
- **Snapshots**: Daily snapshots of data storage disks as an opportunistic RPO reduction measure

## Minimum nodes

Kwil's consensus requires **2f+1 nodes** to tolerate f failures. Minimum: technically 1, practically 3.

## Maintenance and upgrades

- No planned downtime for the Storage Network since the current architecture (March 2026)
- Node releases are forward and backward compatible, enabling rolling deployments
- idOS Relay uses rolling deployments via ECS with monitoring of response rates and error logs
- Planned maintenance communicated to clients at least 5 days in advance (historically only 2 upgrades in the past year, taking 2-4 hours each)
