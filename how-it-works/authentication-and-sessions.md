# Authentication and sessions

idOS uses blockchain wallet signatures as the sole authentication method. No separate account, password, or platform-specific login is required.

## Authentication flow

Authentication has two phases:

### Phase 1: Wallet authentication

1. The user connects their wallet (e.g., MetaMask, NEAR wallet, Stellar wallet)
2. The server generates a [SIWE](https://eips.ethereum.org/EIPS/eip-4361) (Sign-In With Ethereum) message containing the user's address, a nonce, and a domain
3. The user signs this message — this proves wallet ownership and establishes an authenticated session

The signature authorizes an idOS session only. It does not authorize any on-chain transaction or token transfer.

### Phase 2: Encryption key establishment (deferred)

When the user first needs to access encrypted data, the SDK establishes encryption/decryption keys:

- **MPC-based (recommended)**: The user signs a message with their wallet, and the MPC network returns the encryption key shares. No password needed.
- **Password-based (legacy)**: The user enters a password in the enclave iframe, which derives the encryption key via scrypt.
- **Wallet-as-enclave**: The wallet manages key derivation directly within its own secure context.

## Supported signature standards

| Chain | Standard | Status |
|-------|----------|--------|
| EVM | EIP-191 / EIP-4361 (SIWE) | Live |
| NEAR | NEP-413 (via near-api-js) | Live |
| Stellar | Native wallet signatures (Stellar SDK) | Live |
| XRPL | Native signatures (XRPL library) | Live |

Any signature method that can be verified offline is supported. The SDK's signer abstraction makes adding new chain support straightforward.

### Smart contract wallets

Smart contract wallets (e.g., Safe, ERC-4337 accounts) are a current limitation because signature verification requires network I/O, which conflicts with Kwil's authentication design assumptions. The current approach requires smart wallets to declare a surrogate key using offline cryptography for idOS interactions.

## Session management

- Sessions are established via SIWE message signing
- Kept through an HTTP-only cookie
- Default session lifetime: **30 days** (configurable)
- Multiple browser tabs share the same session — no re-authentication needed
- Sessions can persist across browser restarts within the cookie lifetime

## Cross-chain identity

A single idOS profile can hold multiple wallet addresses across different chains:

1. User creates a profile with any supported wallet
2. Links additional wallets by signing an authentication message with each
3. All linked wallets have equal access to the user's encrypted data

The idOS profile acts as the canonical identity anchor, with wallet addresses as authentication endpoints.

## FaceSign (biometric authentication)

[FaceSign](biometrics-and-idos-facesign-beta.md) is an optional biometric signer that acts as an additional authentication method:

- Device-independent facial biometric authentication
- Runs in AWS Nitro Enclave (TEE)
- Enforces liveness detection
- Can serve as 2FA, account recovery mechanism, or uniqueness proof
- Users can attach FaceSign to only one idOS account (uniqueness enforcement)

## Account recovery

### Authentication key recovery

On the **protocol layer**, idOS does not enforce uniqueness or biometric verification — any wallet can create an account. Recovery options:

- **Multiple wallets**: Link additional wallets to your profile as backup authentication methods
- **Smart wallet**: Use a multi-signature smart wallet for redundancy
- **FaceSign**: Add a biometric signer that is device-independent

On the **application layer**, builders can create sophisticated recovery tools by combining these primitives (e.g., multi-sig setup with email confirmation and passkey, or FaceSign as recovery fallback).

### Encryption key recovery

Managed via MPC with threshold secret sharing:

- No single party holds the complete encryption key
- Any registered wallet can trigger key reconstruction from MPC shares
- If a user has multiple wallets, any of them can recover the encryption key
- FaceSign signers provide additional recovery resilience

**Trust assumptions**: Users trust their wallet's recoverability. If all wallet keys are lost and no FaceSign signer exists, the encrypted data remains inaccessible. The MPC network (using Partisia's libraries) is trusted for secure key share management.
