---
description: Protecting personal data, in a secure and compliant way.
---

# What is self-custodial data?

## Your data, your control.

idOS has been designed to store user data securely in a [distributed network of nodes](how-it-works/system-design.md#idos-storage-network), ensuring privacy and control for end users. Unlike traditional centralized databases, which require users to trust a single entity, idOS implements [end-to-end encryption](how-it-works/key-flows/encryption-flows.md) using user-controlled keys. This means that in order for a third party to access stored data for a specific user, they would need to obtain both the node’s private key and the user’s private key—a highly improbable scenario that significantly enhances security.

## Why Decentralized Storage?

Traditional identity solutions often rely on either local storage in identity wallets or centralized cloud databases. The idOS takes a different approach by using a decentralized network of nodes, offering key advantages:

* **100% Data Availability** – Data is always accessible, even if a single node or service provider goes offline.
* **Crypto Wallet Compatibility** – Users can manage access to their data using supported cryptographic wallet, ensuring seamless interaction with web3 applications without needing to download additional software.
* **Advanced Data-Sharing Rules** – idOS allows users to define access permissions, enabling transparent sharing with third parties while maintaining full control.
* **Enhanced Security & Privacy** – Data is stored end-to-end encrypted with the User key pair, ensuring that even node operators cannot access user data.

This approach strikes a balance between sovereign control (as seen in self-hosted wallets) and real-world usability (as expected in enterprise-grade identity solutions).

## KYC Reusability, and beyond

idOS has been specifically designed with a concrete use case in mind today: to facilitate the reuse of Know Your Customer (KYC) credentials. However, its architecture allows for the secure storage of any type of user data. Businesses and individuals can leverage idOS to store structured data while maintaining full control over who has access and for what purpose. This makes it an ideal solution for decentralized identity verification, personal data management, and compliance-driven industries.

All stored data is encrypted and structured in a format compatible with W3C Verifiable Credentials (VCs). These credentials are stored in a relational database format, allowing for structured and efficient querying while maintaining compliance with open standards.

By using Verifiable Credentials, idOS ensures that data remains portable, interoperable, and tamper-proof, making it a more robust solution than traditional identity verification systems that rely on static, centrally stored records.

## idOS vs Centralized Storage Solutions

Traditional identity and user data management systems rely on centralized storage, making them prime targets for hacks, leaks, and unauthorized access. The idOS mitigates these risks by:

* Decentralizing storage across multiple nodes, eliminating single points of failure.
* Encrypting data end-to-end, ensuring that even if a database is compromised, the information remains inaccessible without the matching user-owned private keys.
* Leveraging Verifiable Credentials, making data cryptographically secure and verifiable without needing to trust idOS.

This approach makes idOS fundamentally more secure than centralized alternatives, where a single breach can expose millions of records.

## idOS vs user-owned storage solutions

While wallet-based and personal agent storage solutions allow users to maintain full control over their data, they come with significant usability, security, and interoperability challenges. idOS is designed to bridge the gap between user sovereignty and real-world usability, providing a more scalable, structured, and accessible alternative.

### Permissioned Access vs. Direct Data Sharing:

Purely local wallet-based storage requires users to manually sign and share data every time a third party requests it. This can be cumbersome and lead to poor UX. The idOS introduces persistent Access Grants, where users can predefine access policies for specific entities, reducing friction while maintaining full control over who can access their data.

### Cross-Platform Usability vs. Siloed Data:

Personal agent solutions often require specific integrations per application, leading to fragmented ecosystems where each service has to implement custom logic for user data retrieval. idOS standardizes data portability using standardized interfaces with a permanent uptime, ensuring that users can seamlessly reuse their data across multiple applications without relying on custom implementations.

## Decentralized Storage vs. Pure Proof/Attestation-Based Identity Systems

Pure proof-based identity systems rely solely on cryptographic attestations managed locally by users or wallets, offering high privacy but posing usability, redundancy, and integration challenges. In contrast, idOS combines decentralized storage and user-controlled encryption, improving data availability, resilience, and seamless integration with regulated services. Additionally, idOS publicly logs only access permissions (not user data), providing transparency and auditability that pure attestation systems typically lack. This hybrid approach makes idOS uniquely scalable, secure, and practical for real-world identity use cases.

## Access Control: Public Access Grants

To ensure transparency while preserving privacy, only Access Grants are public in idOS, not the actual user data. This allows users and third parties to verify who has been given permission to access specific data without exposing any private information.

Access Grants will be publicly accessible via Network Explorer services in the idOS Private network.

## Permissioned Network

The idOS Storage Network operates as a permissioned network, meaning that only authorized nodes can participate in storing and processing data. This ensures that:

• Data integrity is maintained, preventing unauthorized modifications.

• Network participants meet security and compliance requirements, making it viable for regulated industries.

• Users retain control over their information, with access granted on a need-to-know basis.

## Future Considerations: Progressive Decentralization

We are actively exploring methods to further decentralize the network and enhance security and efficiency by exploring locality-based storage and sharding mechanisms. These approaches would allow data to be stored in geographically relevant regions while minimizing attack surfaces and improving performance. Sharding, in particular, enables distributed data segmentation, ensuring that even if one segment is compromised, the entire dataset remains secure.

With these innovations, we aim to progressively decentralize the network while ensuring user data remains safe.
