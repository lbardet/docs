
# Data and concepts

## Self-sovereignty

At the heart of the idOS lies the principle of self-sovereignty, fostering that users have complete autonomy over their personal data. The idOS achieves this by implementing a user-centric control, meaning that users decide what data they store on the idOS and with whom they share it. They have the power to add, edit, or delete their data at any time via the [User Data Dashboard](../how-it-works/functionality/user-data-dashboard.md). At the same time, the [dStorage Network of Nodes](../how-it-works/system-architecture/decentralized-storage/) in the idOS distributes data storage.

This not only enhances security but also ensures that users' data isn't under the control of a single centralized entity. [The Access Management Protocol](../how-it-works/system-architecture/decentralized-storage/access-control.md), backed by blockchain technology, records data access permissions transparently. As a result, users issue access grants (the permissions stored on a smart contract across any blockchain) and these grants define who can access their data (and in certain cases, for how long). The only information available on-chain is encrypted data-sharing between wallet addresses, allowing for user privacy.

Additionally, data within the idOS is encrypted using unique user self-generated keys. This means that even if a third party besides the user or the encryptor were to access the data, they wouldn't be able to decipher it without the user's unique key. Another factor is the interface that allows users to manage their data actively. They can view their stored data, manage sharing permissions, and delete their data if they choose to. Also worth remembering is that users can update their account details, add new wallet addresses, or modify credentials anytime. If they've shared certain data with a third party and later updated that data, they can issue a new access grant to share the subsequent updates.

In essence, the idOS is designed to empower users, giving them the tools and framework to be truly self-sovereign in the digital realm. It aims to ensure that users have the final say over their data, from storage to sharing, aligning with common standards of data protection and user autonomy.

## Central vs. decentralized data storage

The idOS aims to serve as a platform for self-sovereign identity data storage, leveraging distributed nodes to store data encrypted with the user’s unique key pair, usually in the format of a [W3C Verifiable Credential](../how-it-works/system-architecture/decentralized-storage/w3c-verifiable-credentials.md). It is possible to store any information on the idOS, since users are the ones who have control over their idOS private profiles, meaning that users have the autonomy to determine the type of data stored in their idOS private profile, managed via the [User Data Dashboard](../how-it-works/functionality/user-data-dashboard.md).

In general, when data is centrally stored, it may still provide a satisfactory level of security but if an unauthorized party is able to gain access to an entire database, personal data may be compromised and unavailable, subject to unwanted leaking, and users’ privacy might be at risk. 

The idOS' dStorage Network of Nodes was designed so that this vulnerability doesn't extend to node operators within the idOS framework. One of the elements that contribute to the idOS’ security is that data is replicated across nodes, which in turn means that if one happens to be compromised, the availability of data across the network is still assured. 

This allows users to continuously rely on the idOS for personal data storage and management while third parties (e.g. dApps) can store their onboarding users' data on the idOS without having to trust a single central authority.     

Complementing the dStorage Network of Nodes, [encryption](../how-it-works/encryption.md) is performed on users' data while the dataset is harmonized via a Consensus Mechanism, meaning that no unauthorized party can interpret the stored data unless the user actively decides to allow it. 
