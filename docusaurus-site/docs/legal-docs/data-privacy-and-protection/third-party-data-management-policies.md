
# Third-party data management policies

### Identity verification providers

During the idOS initial phase, where Fractal ID acts as the issuer for users’ data being stored on the idOS, Fractal ID will store such users’ data. However, once the initial phase is completed, existing users at that point in time will be able to choose to store their information in the idOS network or not, at their will, within their Fractal ID user dashboard, and all new users’ information will be stored on the idOS and not live within Fractal ID systems.

Then, Fractal ID will only keep user information necessary to maintain the service provisioning it has agreed with its users and clients, including data that is essential for notification purposes (i.e. email address).

For users’ data being stored on the idOS where another issuer is responsible for verifying the users’ data, Fractal ID will not have access to nor keep any users’ personal data. 

Such issuers may have their own policies and procedures in place, meaning the type and amount of data they may centrally store, outside of the idOS, can vary accordingly and is outside of the idOS' control. Their corresponding retention or deletion practices are governed by their own policies and any applicable regulations. 

### Node operators 

One of the security features of the idOS is that data is replicated across multiple nodes, ensuring that even if one node is compromised, the availability of the data across the network remains intact. 

Additionally, node operators are tied to a consensus mechanism to ensure data consistency and harmonization across the network, allowing for all nodes to have the same data and for any discrepancies to be addressed, including for the purposes of ensuring the implementation of [The right to be forgotten](the-right-to-be-forgotten.md) within the network. 

They play a crucial role in storing and replicating encrypted user data, but they do not have the capability to decrypt or interpret the actual content of the data if they are not the encryptor, fostering user privacy and data security within the idOS network. 

As mentioned under the [Data processing location](data-processing-location.md) section, node providers in the context of the idOS federation at launch will adhere to standard terms for alignment with data protection laws. 

### dApps (and other third parties)

Third parties, like dApps, can access the idOS' user data through [access grants](../../how-it-works/functionality/granting-data-access.md). These permissions given by the user are stored on a smart contract across any blockchain and the idOS monitors these contracts for when a valid access grant is detected, it shares the corresponding encrypted data with the authorized party. Upon an access grant, a copy of the users' data being shared is created and re-encrypted with the dApp's key, ensuring that only the authorized dApp can decrypt it and only for as long as the grant is valid.

Once the third party decrypts and accesses the corresponding data, it can decide whether to keep it stored internally or not, especially considering the existence of any grants given with an associated time log. Once the dApp downloads the data, its usage is outside of the idOS' control. 

While the idOS aims to ensure data privacy and security within its ecosystem, it's crucial also for dApps to have their own data protection measures in place post-download if they choose to keep data internally stored, including if in parallel to the idOS, in cases of time-bound access grants where accessibility to user data is assured for the duration of the grant.

This means that even though the idOS proposes a framework for data retention based on access grants, it's essential to note that once the dApp has the underlying data outside of the idOS, any retention or deletion practices are governed by the dApp's policies and any applicable regulations. If a user wishes to revoke or modify access to their personal data, the idOS will enforce this within its system, but it cannot control data already downloaded that is being internally stored by the dApp.
