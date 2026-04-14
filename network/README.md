# Node infrastructure

This section describes the physical infrastructure, node requirements, and operational details of the idOS network.

## Current node operators

The network is currently operated by four entities:

1. idOS Association
2. idOS Relay
3. Horizen Labs
4. Meta Pool

The network is transitioning to permissionless operation via IDOS token staking. Node operation currently requires idOS Association approval.

## Node operator requirements

| Requirement | Detail |
|-------------|--------|
| Minimum stake | 2,500,000 IDOS tokens |
| Agreement | [Node Operator Agreement](https://docs.google.com/document/d/1_EV7M0DkwxjLItI7pDDz2WmGSBEY9viudnsEHYqIGMQ/edit) |
| KYB | Required for all operators |
| Infrastructure | Currently AWS-only; provider diversification on roadmap |
| Starter kit | [AWS node operator starter kit](https://github.com/idos-network/node-operator-aws-starter-kit) |

## Storage Network nodes

Each node is a dedicated Amazon EC2 instance running the Kwil daemon and holding chain state.

**Recommended sizing**: t3.xlarge instances with 200GB data disk.

**Storage architecture**: Each node has a dedicated EBS volume for Kwil data (chain state, databases, persistent files), separate from the root disk. This volume can be independently snapshotted, resized, and backed up.

**Network configuration**:

| Port | Protocol | Purpose |
|------|----------|---------|
| 8484 | TCP | Application JSON-RPC — used by the Gateway to forward client requests |
| 6600 | TCP | Consensus traffic between Kwil peers (node-to-node) |

Ingress is restricted to these ports. Everything else is outbound-only or mediated through AWS APIs and private VPC connectivity.

**Partner connectivity**: Partner organizations run their own VPCs in separate AWS accounts, connected via AWS Transit Gateway. Partner CIDR blocks are allow-listed on node security groups for ports 8484 and 6600.

## Gateway

The Gateway is the HTTP entry point for all client traffic:

- Load-balances requests across Storage Network nodes
- Manages SIWE-based authenticated sessions
- Currently a single instance; stateless design supports multiple instances
- Target health checks via ALB

## MPC nodes

idOS uses Partisia off-chain execution nodes as a threshold secret-sharing cluster:

- Operated by idOS and partner infrastructure (currently idOS Relay)
- Each node independently reaches public Partisia network nodes
- No mesh between MPC instances required
- Partners can run MPC nodes on their own infrastructure

## Partisia reader node

A dedicated Partisia reader node follows Partisia network state locally, providing chain data to MPC engines without relying on external public RPC endpoints.

## Arbitrum One node

A dedicated Arbitrum full node provides:

- Private, capacity-controlled RPC with stable latency
- WebSocket endpoint for chain listeners (token/escrow contracts, bridge/oracle ingestion)
- Avoids rate limits and provider outages from shared/metered public endpoints

Nitro JSON-RPC and WebSocket (ports 8547-8548) are accessible from the VPC CIDR and partner CIDR ranges via the transit gateway.

## Monitoring and observability

### Infrastructure monitoring

- CloudWatch metrics and logs for all nodes and services
- Alarms for CPU utilization >75%, memory utilization >75%, disk space <25%
- CloudWatch alarms routed via SNS to GoAlert for on-call and escalation

### Synthetic health checks

A Lambda function runs every 5 minutes, checking:

- idOS Kwil nodes
- Partner/node-operator Kwil backends
- Partisia off-chain (MPC) nodes (idOS and partner)
- Partisia reader node
- Arbitrum RPC
- Listener sync vs. Arbitrum head
- Poster wallet balance

### TEE monitoring

A [Node.js agent service](https://github.com/idos-network/nitro-enclave-experiment/blob/master/facesign-service/providers/agent.ts) inside the TEE sends CPU, memory, and disk metrics to CloudWatch via vsock communication.

### Application monitoring

- idOS Relay integrated with New Relic for performance visibility and PII endpoint alerting
- NRQL queries for anomalous request spike detection and unique identifier tracking
- Sentry integration across services
- All alerts forwarded to Slack and Telegram channels

### Health endpoints

Most services expose `GET /health` or `GET /up` endpoints. These are publicly routed and available for partner monitoring. A public status page (Uptime Kuma) is planned.

## Node incentives

| Incentive | Detail |
|-----------|--------|
| Gas fees | 100% distributed to node operators (currently zero during early adoption) |
| Staking rewards | 15% of IDOS supply over 120 months |
| Delegation fees | Nodes will set fees on delegated stake rewards (in development) |
| Slashing | Currently manual; based on idOS Association criteria for Node Operator Agreement breaches |
