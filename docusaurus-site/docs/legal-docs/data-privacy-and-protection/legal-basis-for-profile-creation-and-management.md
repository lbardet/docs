
# Legal basis for profile creation and management

## Profile creation

Within the dStorage Network of Nodes, the users are the ones who actively push their data into the idOS, in line with self-sovereignty principles built in the idOS: initially, a “human” record is created on the idOS by user action and instruction, only with the assistance of the identity verification provider, and the idOS is merely the interface that allows such operation to take place.

This means that even though an identity verification provider, such as Fractal ID, at first technically creates the “human” record associated with a wallet address on the idOS, such creation is by user action and instruction only via the provided interfaces (e.g. the [User Data Dashboard](../../how-it-works/functionality/user-data-dashboard.md), where users are then redirected to identity verification providers for creation of their idOS account), and in accordance with the applicable terms of service. At an early stage, this mechanism is mainly to avoid spam and assure uniqueness throughout the network but will very likely change as the idOS evolves, moving users even further in the self-sovereignty spectrum.

Additionally, when data is stored on the idOS using the idOS SDK, such data is encrypted with the user’s self-generated unique key. As a consequence, users' self-encrypted data is not accessible to any third parties besides the user and the encryptor until decryption access is provided by the user. The encryptor may be the users themselves or, for example, an identity verification provider who encrypted and uploaded the data into idOS upon user instruction and who naturally knows what is being encrypted. This means that if a user edits an encrypted record stored in idOS like a Verifiable Credential, for example, to add information that the identity verification provider didn't already know, then such user will be encrypting from themselves to themselves, meaning the identity verification provider can no longer read such record.

Encryption is also explicitly mentioned as one possible technical and organizational measure to secure data under the GDPR (see [Art. 32(1)](https://gdpr-info.eu/art-32-gdpr/) of the GDPR).

## User private profile management

After a “human” record is created, associated with a wallet address, users can freely manage their data as they choose, directly through the User Data Dashboard. This implies users can add, edit, or delete new wallet addresses, attributes, or credentials into their idOS records, as further detailed under the [Data rectification](data-rectification.md) section. Moreover, the idOS is built on the principle of users’ self-sovereignty, meaning they have full control over their data, and also decide with whom to share it. This aligns with data protection laws' emphasis on user control over personal data and is developed further in the section [Data and concepts](../data-and-concepts.md).

Later in the development of the idOS, any other third party will also be able to request an idOS user to add information to their idOS private profile. This functionality will be governed by the Access Management Protocol and will operate in the same way an Access Grant does, also in a technical sense.

In line with data protection best practices, this means that data is only added within a request by a third party to add information to users' accounts where such users would be prompted to approve a transaction in their wallets to confirm the operation, which only takes place with the user confirmation. Additionally, any added data would be encrypted with users’ unique keypair before being stored on the idOS. 
