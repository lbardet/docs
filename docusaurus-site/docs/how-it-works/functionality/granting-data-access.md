
# Granting data access

The **Access Management Protocol** is the access rights management system of the idOS. It requires access requests to be authenticated and authorized. It governs who has access to data on the idOS. 

## Authentication and Authorization

Users can grant access to their data to others. These other parties can be _dApps_ (e.g. when the data access is directly requested by the dApp using the SDKs) or any other _person or entity_ (e.g. when the user sends a Data Grant directly in the [User Data Dashboard](user-data-dashboard.md)).

Before users can grant access rights, they need to establish that they own the right to perform the action: **Authentication** (represents “Who are you?”) consists on verifying a user is who they say they are. Anyone attempting to perform any query on an idOS node must authenticate with a wallet signature. In order to prevent replay attacks, the message to be signed must include an incrementing nonce. All queries must **authorize** (which represents “What can you do?”.) the request with a wallet signature, which establishes that the caller controls that wallet. The address recovered from that signature can be injected into SQL queries. This is how authorization works in idOS nodes.

## Granting access

After establishing address ownership and ownership of the idOS, users can grant others access to their data. The [SDK](../../developer-docs/dapp-sdk-integration.md) automates some steps of the access grant process like inserting the right receiving wallet address of the dApp, while this needs to be filled in by the user when using the [User Data Dashboard](user-data-dashboard.md). In both cases, the actual verifiable data is decrypted by the user, and encrypted using the receiver's public key. It is then re-uploaded to the idOS nodes.

## Continuous, offline data availability and revocations

Users have now established that they want the receiver to have access. This fact is written into an access grant smart contract on the [respective blockchain](../system-architecture/on-chain-access-grants.md). This access grant allows receivers to retrieve data at any point in the future, even if the user is offline, as long as the access grant is still active. This enables a data receiver to use the idOS as a customer relationship management tool (CRM), as they may keep the data in the idOS without downloading it as they have continuous data availability guarantees. 

A user has the right to _revoke_ access at any time, disabling the ability of the receiver to access the data. Data grants can be time-locked in case regulatory reasons require data retention for five years. In these cases, an access grant can only be revoked after the time lock has expired.  

