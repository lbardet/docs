---
description: Data Issuer and Consumers without direct User Experience requirements
---

# Financial module integration

## Overview

Financial Modules, typically API-driven or SaaS-based solutions, provide essential financial services integrated within broader applications such as neobanks, fintech apps, or digital wallets. Integrating these modules with idOS ensures seamless, secure, and compliant management of identity and credential data, without the complexity of direct user experience interactions.

This guide explains how API-based financial modules can easily connect to the idOS ecosystem using a simplified integration approach, minimizing implementation effort while gaining robust decentralized identity capabilities.

### Integration Approach

Financial modules integrating with idOS generally do not manage user interactions directly. Instead, user experiences and interactions related to identity verification and credential management are controlled by the primary application (e.g., a neobank or wallet provider). Financial modules simply focus on securely writing to and reading from the idOS network, based on delegated write and access grants provided by the user through the main application.

### How Financial Module Integration Works

1. **Delegated Access and Write Grants:**

   Users grant permissions via the primary application's interface (e.g., neobank or wallet), authorizing the financial module to securely read or write identity credentials to idOS.
2. **API-based Data Interaction:**

   The financial module uses idOS SDKs to interact programmatically, securely reading or writing credentials from idOS nodes without needing dedicated UI or UX implementation.
3. **Compliance and Auditability:**

   Financial modules leverage built-in idOS security and compliance features, ensuring that credential management and data handling align with regulatory requirements.

### Key Benefits

* **Minimal Integration Effort:** Lightweight, API-based interaction simplifies technical implementation.
* **Delegated Permissions:** Financial modules rely on delegated access, reducing complexity and clearly separating responsibilities.
* **Built-in Compliance:** Immediate alignment with privacy and regulatory standards through idOS secure infrastructure.
* **Scalable and Secure:** Leverages decentralized infrastructure, ensuring secure data handling and high availability.

