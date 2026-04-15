# Key concepts

This page defines the core data model, actor roles, and mechanisms that underpin idOS.

## Self-custodial data

idOS applies the principle of self-custody — familiar from crypto wallets — to identity data. Users hold their own encryption keys, and all data is encrypted before it leaves their device. This means:

- **No central data honeypot**: Even if all storage nodes are compromised, attackers get only ciphertext.
- **User-controlled sharing**: Data is only accessible to parties the user explicitly authorizes via signed access grants.
- **Portability**: Users can export their credentials in standard formats (W3C Verifiable Credentials) and use them outside idOS.
- **Deletion**: Users can delete their data and it is purged from all nodes via BFT consensus.

This differentiates idOS from centralized identity providers (where the provider holds your data) and from pure proof-based systems (which can attest facts but don't guarantee data availability for compliance).

## Actors

### User (Owner)

The individual whose identity data is stored. Users:

- Create an idOS profile by connecting a blockchain wallet and signing an authentication message
- Hold the encryption keys that protect their data — no one else can read it
- Control who can access their data by creating and revoking **access grants**
- Can link multiple wallet addresses across different chains to a single profile

### Issuer (Data Issuer)

An entity that verifies user information and writes credentials to idOS. Typically a KYC/IDV provider (e.g., Sumsub, Persona). Issuers:

- Receive a **write grant** from the user (consent to write data)
- Transform verification results into signed, encrypted **Verifiable Credentials**
- Can revoke credentials they issued (e.g., if verification is later found invalid)
- Never hold user encryption keys — they encrypt using the user's public key

### Consumer (Data Consumer)

An entity that needs to access user data (e.g., a fiat on-ramp, neobank, or card issuer). Consumers:

- Request an **access grant** from the user
- Receive a re-encrypted copy of the credential (encrypted specifically for the consumer's key)
- Can retrieve shared credentials at any time without the user being online
- Define their own trust requirements (which issuers they accept, credential freshness, etc.)

## Data model

### User profile

The canonical identity anchor in idOS. A profile contains:

- **User ID**: Internal identifier (UUID)
- **Recipient encryption public key**: The user's public encryption key, used by issuers and the sharing flow
- **Linked wallets**: One or more blockchain wallet addresses across any supported chain
- **Attributes**: Key-value metadata pairs

A user creates a profile with any supported wallet, then links additional wallets by signing with each. All linked wallets have equal access to the user's encrypted data.

### Credential

A piece of verified data stored in the user's profile. Each credential contains:

| Field | Description |
|-------|-------------|
| `id` | Unique credential identifier |
| `user_id` | Owner's profile ID |
| `content` | Encrypted payload (only decryptable by the user or authorized recipients) |
| `public_notes` | Cleartext metadata — issuer identity, credential type, expiry date, revocation status |
| `encryptor_public_key` | Public key used during encryption (issuer's ephemeral key) |
| `issuer_auth_public_key` | Issuer's signing key for signature verification |

The recommended format is [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/), but idOS is format-agnostic at the storage layer. Any content can be stored: structured JSON, binary documents (passport scans, selfies), proof-of-uniqueness attestations, or custom formats.

### Access grant

A permission record that allows a consumer to access a specific credential. When a user creates an access grant:

1. The SDK decrypts the credential locally using the user's key
2. Re-encrypts it with the consumer's public key
3. Stores the re-encrypted copy on idOS as a **shared credential**
4. Creates the access grant record linking the consumer to the shared credential

Access grants include:

| Field | Description |
|-------|-------------|
| `ag_owner_user_id` | User who granted access |
| `ag_consumer_wallet_identifier` | Consumer's wallet address |
| `data_id` | Reference to the shared (re-encrypted) credential |
| `locked_until` | Optional time-lock: grant cannot be revoked before this date |
| `content_hash` | Hash of the shared credential content for integrity verification |

**Time-locks and retention periods**: Access grants can be time-locked, meaning the user cannot revoke them before a specified date. This supports AML retention requirements where regulated entities must retain records for a defined period. The Storage Network enforces time-locks at the consensus level.

### Delegated write grant (DWG)

A user-signed message that authorizes an issuer to write a credential on the user's behalf. Used when verification is not instantaneous — the user signs consent upfront, and the issuer writes the credential once verification completes.

### Delegated access grant (DAG)

A user-signed message that pre-authorizes a consumer to create an access grant. Enables programmatic credential sharing without requiring the user to be present at the exact moment of sharing.

## Key mechanisms

### End-to-end encryption

All credential content is encrypted with [NaCl boxes](https://nacl.cr.yp.to/) (x25519-xsalsa20-poly1305) before leaving the user's device. The storage network only ever sees ciphertext. See [Encryption and key management](../how-it-works/encryption-and-key-management.md) for details.

### Client-side re-encryption

When sharing data, the SDK performs a decrypt-and-re-encrypt flow entirely on the client side. The credential is decrypted with the user's key and re-encrypted with the consumer's public key. No trusted third party ever sees plaintext. This is deliberate — idOS does not use proxy re-encryption.

### Credential lifecycle

| Phase | Who performs | Description |
|-------|-------------|-------------|
| Issuance | Issuer (with user consent) | User grants a write grant. Issuer writes a signed, encrypted Verifiable Credential. |
| Storage | Storage Network | Encrypted credential replicated across all nodes via BFT consensus. |
| Sharing | User | User creates access grant. SDK re-encrypts for the consumer. |
| Revocation | Issuer | Issuer marks credential as revoked via cleartext metadata. |
| Expiry | Automatic | Credentials can have expiry dates in cleartext metadata. Consumers can check without user interaction. |
| Deletion | User | User requests deletion. If no active time-locks, BFT consensus enforces deletion across all nodes. |

### Credential updates

Old credentials are deliberately not deleted when new ones are issued — this preserves version history. New credentials are issued alongside existing ones. Existing access grants point to specific credential IDs and are not automatically updated. To share updated data, a new access grant is needed.
