# Example use cases

These examples show how different types of organizations use idOS to solve specific identity problems. Each maps a real business need to the idOS integration that addresses it.

***

## Neobank & Wallet Integration

**The problem**: Your users need to complete KYC for every financial module you add — on-ramps, off-ramps, card providers, lending. Each new vendor means another verification flow, another data silo, another compliance integration.

**How idOS solves it**: Users verify once through your app. That credential is stored encrypted in idOS and can be shared with any downstream provider in a single signature. You control the UX. Each provider makes their own compliance decision based on the shared credential.

→ [Full neobank/wallet guide](neobank-wallet-integration.md)

***

## Financial Module Integration

**The problem**: You're a financial service provider (debit cards, lending, investment) and every new user needs to be verified. Running your own KYC is expensive and creates a data honeypot you need to secure and maintain.

**How idOS solves it**: Accept existing verified credentials from users who already completed KYC elsewhere. As a consumer, you request access, retrieve the encrypted credential, decrypt it, and verify the issuer's signature. No re-verification, no new data silo.

→ [Full financial module guide](financial-module-integration.md)

***

## TradFi → Onchain Integration

**The problem**: You're a traditional financial institution or centralized exchange. Your users want to use onchain services, but each one requires a separate KYC. You can't share your existing verification data without building custom integrations for every provider.

**How idOS solves it**: Issue your existing KYC data as encrypted credentials into idOS. Your users can then share those credentials with any onchain service that accepts idOS — turning your compliance infrastructure into a competitive advantage.

→ [Full TradFi integration guide](tradfi-onchain-integration.md)
