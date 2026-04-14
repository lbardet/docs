# MPC key management

idOS uses Multi-Party Computation (MPC) with threshold secret sharing to manage user encryption keys. This eliminates the need for passwords or passkeys while providing robust key recovery.

## Why MPC

Each idOS user has their own encryption key pair. The private key must be stored somewhere recoverable. The original approach — password-derived keys — creates a UX burden and a new loss vector (forgotten passwords).

MPC solves this by:

- Generating a high-quality random encryption key (not derived from a low-entropy password)
- Splitting the key into shares using Shamir's Secret Sharing
- Distributing shares across independent MPC nodes
- Allowing key reconstruction using any of the user's registered wallets

No single MPC node holds the complete key. No password or passkey is required.

## How it works

### Key generation

1. The Enclave generates a random encryption key pair
2. The private key is split into shares via Shamir's Secret Sharing
3. Shares are distributed to MPC nodes, along with the user's registered wallet addresses
4. The user's public key is recorded on their idOS profile

### Key recovery

1. User signs a message with any registered wallet
2. The signed message is sent to MPC nodes as proof of identity
3. Each node verifies the signature and returns its key share
4. The Enclave recombines the shares to reconstruct the private key

Any wallet linked to the user's idOS profile can trigger key reconstruction. If a user has multiple wallets, any of them works.

## MPC infrastructure

idOS uses [Partisia](https://partisia.com/) off-chain execution nodes as a threshold secret-sharing cluster:

- Multiple independent nodes store and release key shares
- Governed by EIP-712 policies and on-chain assignment
- A Partisia reader node supplies chain data to the MPC engines
- Nodes are operated by idOS and partners (currently idOS Relay)

### Node placement

MPC nodes do not form a mesh — each node only needs to reach public Partisia network nodes. Placement relative to Storage Network nodes is an operational detail, not a protocol requirement.

Partners can run their own MPC nodes on their own infrastructure. This increases decentralization of the key management layer.

## Security model

- **No single point of compromise**: An attacker must compromise multiple independent MPC nodes to reconstruct a key
- **Wallet-gated access**: Key shares are only released to wallets registered on the user's idOS profile
- **Independent attack surface**: Compromising Storage Network nodes does not help — they hold encrypted data but not encryption keys. Compromising MPC nodes requires a separate attack path
- **Collusion resistance**: No single operator controls enough nodes to reconstruct keys unilaterally

### Risk: sufficient MPC node compromise

If enough MPC nodes are compromised simultaneously, the attacker could reconstruct user keys. This is mitigated by:

- Distributing nodes across independent operators and infrastructure
- Requiring different access credentials per node
- Users who prefer maximum security can opt out of MPC and use self-managed key derivation

## Comparison to password-based keys

| Property | Password-based | MPC-based |
|----------|---------------|-----------|
| Key entropy | Limited by password quality | High-quality random generation |
| Recovery | Requires remembering password | Any registered wallet |
| UX | Password prompt in enclave | Wallet signature only |
| Loss risk | Forgotten password = lost access | Only if all wallets are lost |
| Recommended | No (legacy support) | Yes (default) |

## Relationship to the Enclave

The MPC network stores and recovers key **shares**. The actual reconstruction and all encryption/decryption operations happen inside the Enclave (browser sandbox or TEE). The reconstructed key never leaves the user's secure context.
