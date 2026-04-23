# idOS & Regulatory frameworks

This section explores in further detail how idOS implements certain key selected regulatory frameworks presented under the [Compliance overview](./). 

| Regulatory Frameworks      | idOS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data Protection Frameworks | <ul><li>Allows for profile creation, Credential issuance, and access to be grounded on a valid legal basis for data processing. </li><li>Implements personal data flows in alignment with data transfer principles. </li><li>Allows for Users' data to be stored self-encrypted. </li><li>Data deletion is made possible through a consensus mechanism, in alignment with the right to be forgotten. </li><li>Users can manage their Credentials and decide with whom to share their data, aligning with a user-centric approach. </li></ul> |
| AML Frameworks             | <ul><li>KYC Re-usability through Data Ingestion.</li><li>Data remains accessible to Data Consumers for the applicable retention period, through "Time Locks". </li><li>Data availability with high redundancies through the dStorage Network of Nodes.</li><li>Access to Users' data even if Users are offline or data has been deleted.</li></ul>                                                                                                                                                                           |

### Data Protection Frameworks 

Within the evolving domain of web3, characterized by its emphasis on decentralization and digital autonomy, the imperative of data privacy and protection cannot be understated. The digital sphere, while filled with potential, also presents unique challenges in safeguarding individual identities and personal information. As the identity layer of web3, the idOS commitment to data protection and privacy means those are part of its foundational principles.

Below we lay down key functionalities, mechanisms, and measures that the idOS has implemented to embed data privacy and protection in its design.

#### **Roles**

Because idOS has no access to any decryption keys in connection with Users' self-encrypted data, idOS is a service provider that transmits such encrypted data, not a Data Processor or Controller in this case, for example, under the GDPR. 

Data consumers and Data Issuers may be considered Data Controllers or Processors under data protection laws, depending on the specific data processing operation, use case and integration. More information for Data Issuers and Data Consumers can also be found under [Legal Considerations](../../legal-considerations.md). 

**Profile creation, Credential issuance, and access**

idOS allows for data processing operations to take place based on a clear and valid legal basis for data processing, in line, for example, with Article 6 of the GDPR. This is meant to allow relevant stakeholders to comply with data protection regulations applicable to them. 

Access to Users’ data stored on the idOS is provided by the idOS' Access Management Protocol. 

**Data flows**

It is always a User's choice to store or not their personal data within idOS. Regardless, idOS’ relevant stakeholders adhere to General Terms and Conditions for Data Protection that include, for example, all five versions of the EU Standard Contractual Clauses, the UK International Data Transfer Agreement, and other relevant Data Protection Agreements, to allow for, when and if that is the case, compliant data flows. 

**Self-encrypted data**

When data is stored on the idOS using the idOS SDK, such data is encrypted with the User’s self-generated unique key. As a consequence, Users' self-encrypted data is not accessible to any third parties besides the User (and the encryptor) until decryption access is provided by the User. Encryption is also explicitly mentioned as one possible technical and organizational measure to secure data under the GDPR (see [Art. 32(1)](https://gdpr-info.eu/art-32-gdpr/) of the GDPR).

**Right to be forgotten**

The 'right to be forgotten' is established under [Article 17](https://gdpr-info.eu/art-17-gdpr/) of the GDPR at an EU level but is also present in other data protection laws around the globe, such as the CCPA. Although the idOS in itself is merely a platform that allows for data processing operations to take place, it has an embedded mechanism in place to allow Users to delete the data being stored on their private profiles. 

When a deletion request is made, idOS first checks for any active Access Grants linked to the data. If no valid grants exist, the consensus mechanism enforces deletion, ensuring all nodes remain synchronized—non-compliant nodes risk losing their validator status and stake. However, if an active Access Grant is found, the User can delete only the encrypted data they control, while any data encrypted with a Data Consumer’s key remains accessible to that third party until the grant expires.

**User-centric approach**

idOS is built on the principle of Users’ self-sovereignty, meaning they have full control over their data, and also decide with whom to share it. Users are able to view, add, share, and revoke access to their Credentials stored within idOS. 

Such a design aligns well with data protection regulations, as for example, under Recital 7 of the GDPR, it is directly highlighted that “natural persons should have control of their own personal data”.

### AML Frameworks 

In an increasingly regulated financial landscape, organizations must ensure compliance with AML/CTF to mitigate financial crime risks. idOS is designed to assist organizations in meeting their AML obligations, including, for example, Crypto-Asset Service Providers ("CASPs") under the scope of MiCA. By enabling, for example, KYC Re-usability, privacy-conscious data sharing aligned with possible retention obligations, and supporting the storage of KYC/AML data in the form of Credentials that follow the W3C Verifiable Credentials standard, idOS aims to provide a compliant infrastructure for regulated use cases. 

This section explores how idOS implements key AML regulations, ensuring that organizations can seamlessly comply with those frameworks while maintaining the core principles of decentralization and data sovereignty.

**KYC Re-usability**

KYC Re-usability can be a powerful mechanism to allow for compliance with AML regulations while reducing redundancies, improving efficiency and user experience. 

Through [Data Ingestion](../kyc-re-usability/data-ingestion.md), idOS aims to reduce data duplication, lower costs related to the implementation of Customer Due Diligence measures, and improve compliance workflows. It aims to offer a secure and privacy-preserving approach, ensuring that compliance efforts are both effective and scalable in an evolving financial and regulatory landscape.

Data Ingestion allows users to share existing identity data without repeatedly resubmitting the same information. Data Consumers may still need to perform additional verification steps, but the approach can materially reduce onboarding friction while preserving flexibility for different regulatory contexts. 

By leveraging these solutions, obliged entities and other organizations may navigate regulatory complexities with greater ease, ensuring that compliance efforts are both efficient and scalable.

**Data Availability** **and Security**

The decentralized architecture of idOS, powered by its dStorage Network of Nodes, ensures high data availability and resilience. Even if a node becomes unavailable or compromised, the network preserves access to data. This redundancy, combined with self-encryption and a robust consensus mechanism, upholds both data security and accessibility.

In the context of AML compliance, data cannot be arbitrarily deleted. Even if a User deletes their Credentials, idOS' built-in mechanisms ensure that Data Consumers retain access for the legally mandated retention periods, while also aligning with data protection standards. Once access is granted, Data Consumers can retrieve and decrypt the relevant encrypted data, and can effectively treat the dStorage Network of Nodes as a redundant storage layer, though they may also store it internally too.

Through [Access Grants](/broken/pages/bZgdunkYCZkU5W8i8dI1), the duration of Credential access can be set through "Time Locks." This ensures Data Consumers can remain compliant with applicable retention periods resulting from e.g. AML regulations.

Although idOS empowers Users and is built on the principle of User self-sovereignty, it also incorporates built-in safeguards to ensure compliance with record-keeping obligations. If a user requests data deletion while an active Time Lock exists, idOS prevents the removal of the re-encrypted Credential for the Data Consumer until the Time Lock expires. This guarantees that data remains accessible for the necessary period, even if the user is offline.

While the idOS empowers users with control over their data, it recognizes also the importance of regulatory compliance and aims to strike a balance between these concepts.

**Data Consistency**

The idOS uses CometBFT, which aims to ensure that all Node Operators in the network maintain a consistent state of data, fostering an environment where the KYC/AML data accessed by Data Consumers is consistent across the network.
