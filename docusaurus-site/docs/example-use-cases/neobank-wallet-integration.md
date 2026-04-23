---
description: Applications that are directly in control of UX
---

# Neobank/wallet integration

## Neobank & Wallet Integration with idOS

### Overview

Integrating idOS into neobanks and wallets provides secure identity verification, credential management, and compliance, delivering a streamlined and user-friendly experience. With idOS, neobanks and wallets can enhance onboarding, regulatory compliance, and data privacy while maintaining complete control over user interactions.

### Wallet Integration

Wallets integrating idOS directly embed the idOS Enclave, enabling secure, wallet-managed credential handling. This approach empowers wallets to manage identity credentials securely, keeping user data encrypted and under the wallet’s direct control.

Wallet integration supports:

* Account creation and identity management via existing wallet keys.
* Direct credential management within the wallet’s interface.
* Seamless transaction authorization using wallet-managed cryptographic signatures.
* Cross-chain credential support for wide interoperability.

Wallets control all interactions, enhancing security, privacy, and user convenience.

### Neobank Integration

Neobanks integrating idOS retain complete control over user experiences, directly embedding idOS components like the Isle UI. They manage identity flows, credential handling, and interactions with third parties, enabling simplified KYC processes, efficient onboarding, and enhanced compliance.

Neobank integration allows:

* Custom user onboarding flows leveraging existing wallet infrastructure.
* Secure retrieval and management of identity credentials.
* Self-sovereign sharing of identity data with third parties

#### Neobank Workflow

1. Users authenticate through their existing wallets or establish new idOS profiles.
2. The idOS Isle UI is embedded within neobank applications, offering seamless credential management.
3. Neobanks securely request and handle credentials for compliance and identity verification.
4. Changes in access grants or credential status are proactively communicated to subscribed third parties.

### idOS Integration Components

Integration typically leverages:

* **idOS Enclave:** Embedded directly into wallets for secure cryptographic operations.
* **idOS Isle:** iFrame-based user interface integrated into neobank platforms for intuitive credential management.
* **idOS SDKs:** Advanced, customizable integration for neobanks and wallets requiring deeper functionality.

### Integration Benefits

Integrating idOS delivers:

* Streamlined user experience through seamless onboarding and credential handling.
* Simplified regulatory compliance via encrypted credential storage and transparent access management.
* Privacy-focused infrastructure with user-controlled encryption.
* Interoperability across chains and applications for broader ecosystem compatibility.

