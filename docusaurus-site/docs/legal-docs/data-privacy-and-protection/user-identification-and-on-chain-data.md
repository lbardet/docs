
# User identification and on-chain data

In the context of access grants, third parties can only access users' data if the user decides so, and this is where the blockchain plays its role. The way a user gives somebody else permission to access their data is via the access grant governed by the Access Management Protocol: a statement from the user giving access to information they control for a pre-defined amount of time or until revocation by the user, which is in turn stored in a list in a smart contract on any chain.

The above means that a record is created in the smart contract that the idOS monitors and the idOS will check such contracts for the existence of an access grant and it will act accordingly, sharing the corresponding data with the authorized party if such a grant exists. The way the idOS works is by looking at the blockchain, which provides a reliable source, to understand who has access to what, fostering transparency and enforceability.

Blockchain usage only comes to the surface in the context of the Access Management Protocol. On-chain records are created within a list in a smart contract on any blockchain, carrying the information about the access grant.

As a result, the information available on-chain is only that a certain wallet address has shared certain encrypted data with another wallet address, just like with any on-chain transaction, and therefore on-chain information in itself is unlikely to allow for the identification of any individuals.
