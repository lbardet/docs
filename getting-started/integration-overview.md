# Integration overview

This page describes the different integration approaches and helps you choose the right one for your use case.

## Integration approaches

### Option 1: idOS Relay (minimum effort)

[idOS Relay](https://github.com/idos-network/relay) is a service that can be embedded as an iframe. It handles:

- idOS account creation and login
- KYC provider integration (currently Sumsub)
- Verifiable Credential creation and encryption
- Access grant and data sharing logic

This is the fastest path to a working integration. The embedding application handles wallet connection; Relay handles everything else.

**Best for**: Applications that want KYC re-usability without building custom credential management flows.

### Option 2: SDK with Relay backend

A hybrid approach where your application uses the idOS Client SDK directly for wallet connection, profile management, and access grant creation, while idOS Relay handles credential issuance and data processing on the backend.

This gives you more control over the user experience while delegating the complex credential management to Relay.

**Best for**: Applications that need a custom UX but don't want to implement credential issuance themselves.

### Option 3: Full SDK integration

Use the idOS SDKs directly for complete control over the entire flow. Your frontend uses the Client SDK, and your backend uses the Issuer and/or Consumer SDKs.

**Best for**: KYC providers building issuer integrations, or applications with specific requirements around credential handling.

## What each role needs

### Wallet / dApp (Client)

| Component | What to implement |
|-----------|-------------------|
| Frontend | Wallet connection, profile check, credential listing, access grant creation |
| Backend | None required (client-side only) |
| SDK packages | `@idos-network/client` |

The Client SDK is headless — it provides APIs, not UI. You control the entire user experience.

### KYC provider (Issuer)

| Component | What to implement |
|-----------|-------------------|
| Frontend | Wallet connection, profile check, write grant request, IDV journey |
| Backend | Profile creation, credential building and writing, revocation |
| SDK packages | `@idos-network/client` (frontend), `@idos-network/issuer` (backend) |

Issuers must be registered as permissioned issuers to create user profiles. Contact [engineering@idos.network](mailto:engineering@idos.network).

### Regulated service (Consumer)

| Component | What to implement |
|-----------|-------------------|
| Frontend | Wallet connection, profile check, credential filtering, access grant request |
| Backend | Credential retrieval, decryption, signature verification |
| SDK packages | `@idos-network/client` (frontend), `@idos-network/consumer` (backend) |

### No server-side requirements

For wallet integrations using Relay, there are no additional server-side requirements. Relay handles all data processing and issuance.

## Typical user flow

Here's the end-to-end flow for a user onboarding to a stablecoin neobank that uses a fiat on-ramp provider:

1. **User connects wallet** → App checks for idOS profile
2. **No profile exists** → App redirects to KYC provider (issuer)
3. **User completes verification** → Issuer writes encrypted credential to idOS
4. **User returns to app** → App sees valid credential, access is granted
5. **User wants to use on-ramp** → On-ramp (consumer) requests access grant
6. **User approves sharing** → SDK re-encrypts credential for the on-ramp
7. **On-ramp retrieves credential** → Decrypts, verifies, completes onboarding

Steps 5-7 take seconds and require no manual document upload or re-verification.

For an existing user who already has a verified credential, the flow starts at step 5 — the "warmer start" journey.

## White-labeling

The SDK is headless (APIs only, no UI). Integrating applications control the entire user experience. Even the enclave component can be customized — wallets like MetaMask can serve as the enclave itself, eliminating the iframe entirely.

## Support

- **Documentation**: [GitHub SDK guides](https://github.com/idos-network/idos-sdk-js/tree/main/docs)
- **Technical support**: Dedicated Slack/Telegram channel with assigned engineer
- **Contact**: [engineering@idos.network](mailto:engineering@idos.network)
