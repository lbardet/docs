# Data flows

This page walks through the key user journeys in idOS, from first-time onboarding to credential sharing.

## User onboarding (cold start)

A brand-new user who has never used idOS:

```
User connects wallet
       │
       ▼
App checks for idOS profile ──── Profile exists? ──── Yes ──► Skip to "Sharing"
       │
       No
       │
       ▼
App redirects to KYC provider (Issuer)
       │
       ▼
Issuer creates idOS profile
  • User ID generated
  • Encryption key pair derived in Enclave
  • Public key recorded on profile
  • Wallet address linked
       │
       ▼
User completes identity verification
       │
       ▼
Issuer builds W3C Verifiable Credential
       │
       ▼
Credential encrypted with user's public key
       │
       ▼
Encrypted credential written to idOS via Delegated Write Grant
       │
       ▼
User returns to original app with valid credential
```

### Delegated write grants

When verification takes time (e.g., manual document review), the user signs a **Delegated Write Grant (DWG)** upfront. This authorizes the issuer to write the credential later without requiring the user to be present. The DWG is a one-time-use authorization.

## Credential sharing

A user with an existing credential shares it with a consumer (e.g., a fiat on-ramp):

```
Consumer app checks user's credentials
       │
       ▼
App filters for adequate credential
  • Accepted issuers
  • Required credential level
  • Required fields (liveness, address proof, etc.)
       │
       ▼
Credential found? ──── No ──► Redirect to KYC provider for verification
       │
       Yes
       │
       ▼
App requests Access Grant from user
  • Consumer's auth public key
  • Consumer's encryption public key
  • Optional: time-lock duration (for AML retention)
       │
       ▼
User approves (wallet signature)
       │
       ▼
SDK decrypts credential locally (in Enclave)
       │
       ▼
SDK re-encrypts with consumer's public key
       │
       ▼
Re-encrypted copy stored on idOS as Shared Credential
       │
       ▼
Access Grant record created
       │
       ▼
Consumer notified — can retrieve at any time
```

This entire flow takes seconds. The user does not re-upload documents or repeat verification.

## Credential retrieval (consumer side)

A consumer backend retrieves a shared credential:

```
Consumer backend queries access grants for user
       │
       ▼
Access Grant found
       │
       ▼
Consumer retrieves shared credential by data_id
       │
       ▼
Consumer decrypts with their private key
       │
       ▼
Consumer verifies issuer signature on the W3C VC
       │
       ▼
Consumer checks credential status:
  • Expiry date (cleartext metadata)
  • Revocation status (cleartext metadata)
       │
       ▼
Consumer makes their own compliance decision
```

The user does not need to be online for any of this. Once an access grant exists, the consumer can retrieve the credential at any time.

## User managing data

A user reviewing and managing their credentials:

```
User connects wallet to idOS Dashboard (or any integrating app)
       │
       ▼
User signs SIWE message → session established
       │
       ▼
Enclave establishes encryption key (via MPC or password)
       │
       ▼
SDK retrieves credential list
       │
       ▼
User selects credential → SDK decrypts content in Enclave
       │
       ▼
User can view, share, or request deletion
```

## Access grant revocation

```
User requests revocation of access grant
       │
       ▼
System checks for time-lock
       │
       ├── Time-lock active ──► Revocation denied until lock expires
       │
       └── No time-lock ──► BFT consensus enforces deletion across all nodes
```

## Credential deletion

```
User requests credential deletion
       │
       ▼
System checks for active access grants with time-locks
       │
       ├── Time-locked grants exist:
       │     • User's own encrypted copy: deleted immediately
       │     • Consumer's re-encrypted copy: retained until lock expires
       │
       └── No time-locked grants:
             • Credential deleted across all nodes via BFT consensus
```

## Enhanced due diligence

When a consumer needs data beyond what an existing credential contains:

```
Consumer identifies missing data (e.g., expired proof-of-address)
       │
       ▼
Consumer redirects user to KYC provider
  • Pre-loaded with idOS context
  • Only missing data is collected
       │
       ▼
KYC provider issues new credential for the delta
       │
       ▼
New credential shared with consumer via new Access Grant
```
