# Encryption and key management

All credential data in idOS is end-to-end encrypted. This page describes the encryption scheme, key derivation, and the re-encryption flow used when sharing data.

## Encryption scheme

### Data at rest

Credential contents are encrypted with **NaCl boxes** ([x25519-xsalsa20-poly1305](https://nacl.cr.yp.to/)):

| Component | Algorithm | Purpose |
|-----------|-----------|---------|
| Key agreement | x25519 (Curve25519 ECDH) | Derive a shared secret between sender and recipient |
| Symmetric cipher | xsalsa20 | Stream cipher for encrypting the payload |
| Authentication | poly1305 | Message authentication code (AEAD) |

Each credential is encrypted with an **ephemeral key** — the SDK generates a one-time encryption key pair and uses only the recipient's public key for the key agreement. This prevents even the issuer from decrypting the credential after writing it.

### Data in transit

Two layers of protection:

1. **TLS 1.2+** at the transport layer
2. **Application-layer encryption** — data is already encrypted with the user's key before leaving the client

No intermediary (gateway, node, or network observer) ever has access to plaintext data.

## Key derivation

The user's encryption key pair is derived within the **Enclave** — a secure, isolated browser context.

### Current: password-based

The current default uses [scrypt](https://github.com/idos-network/idos-sdk-js/blob/94061418ce15413191f5049d7bb3a71ec6d65d63/packages/utils/src/encryption/idOSKeyDerivation.ts#L4) as the key derivation function. A user-chosen password seeds TweetNaCl key pair generation inside the enclave.

### Recommended: MPC-based

The recommended approach uses **Multi-Party Computation** for key generation. No password or passkey is needed — only a signature from one of the user's known wallets. See [MPC key management](mpc-key-management.md) for details.

### Wallet-as-enclave

Wallets like MetaMask can serve as the enclave itself, managing key derivation within the wallet's own secure context. This eliminates the need for a separate enclave entirely.

## Enclave architecture

The Enclave is the secure context where encryption keys are derived and cryptographic operations are performed. It is designed to prevent integrating applications from accessing user encryption keys.

### Browser enclave (current default)

- Sandboxed cross-origin iframe
- Same-origin policy prevents the host page from accessing contents
- Encryption key never leaves the iframe; kept obfuscated in localStorage
- Communication via `postMessage` with strict origin validation and no arbitrary code execution

### TEE enclave (roadmap)

Migration to AWS Nitro Enclaves is planned for general encryption operations. The TEE provides stronger isolation guarantees than the browser sandbox. See [FaceSign](biometrics-and-idos-facesign-beta.md) for the TEE architecture already in production for biometrics.

### Custom enclave

The SDK's `LocalEnclave` base class can be extended to implement custom enclave behavior — useful for wallets that want to manage keys internally.

## Re-encryption flow (data sharing)

When a user shares a credential with a consumer, the SDK performs a **client-side decrypt-and-re-encrypt** flow. idOS deliberately does not use proxy re-encryption.

1. The SDK decrypts the credential locally using the user's encryption key (inside the Enclave)
2. Re-encrypts the plaintext with the consumer's public key
3. Stores the re-encrypted copy on idOS as a shared credential
4. Creates an access grant record linking the consumer to the shared copy

**No trusted third party ever sees plaintext.** The entire operation happens client-side.

Once the shared credential is stored, the consumer can retrieve and decrypt it at any time using their own private key — even when the user is offline.

## Key rotation

- User-initiated at any time (no mandatory schedule)
- Existing data is re-encrypted with the new key (client-side)
- Existing access grants are unaffected — they were encrypted with the consumer's key, not the user's
- With MPC/TEE, keys can be rotated without requiring user presence

## Compromised key recovery

If a user's encryption key is compromised:

1. The user generates a new key pair
2. All credentials are re-encrypted with the new key
3. Existing access grants remain unaffected (encrypted with consumer's key)
4. After rotation, new credentials are secure

## Provider key management

Data consumers (providers) generate and manage their own x25519 key pairs:

- **Public key**: Registered with idOS for the re-encryption flow
- **Private key**: Stored securely by the provider (HSM or cloud KMS recommended)

idOS recommends that providers use **threshold secret sharing (TSS)** to emulate multisig keys, minimizing single-key compromise risk.

## Post-quantum roadmap

Post-quantum cryptography is actively planned, coupled with the TEE migration and cipher agility:

- TEE provides a trusted, unobservable environment for re-encrypting credentials with quantum-resistant keys
- Evaluating ML-KEM (CRYSTALS-Kyber) and ML-DSA (CRYSTALS-Dilithium)
- Timeline: in conjunction with TEE migration (2026)
