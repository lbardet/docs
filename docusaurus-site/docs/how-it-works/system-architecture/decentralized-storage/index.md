# Decentralized storage

The **dStorage Network of Nodes** is a key part of the idOS. The idOS' data is stored in a decentralized relational database, thanks to [Kwil](https://www.kwil.com/), one of the building partners. Nodes synchronize data using CometBFT. 

Kwil is a byzantine fault tolerant relational database with which developers can build high-throughput, data-intensive decentralized networks.  By handling problems like consensus, non-determinism, and access control out-of-the-box, Kwil provides data security, fair value accrual and interoperability with existing web3 tooling.

The idOS utilizes Kwil to offer unparalleled privacy and compliance.

## Nodes and dStorage Network of Nodes

While there’s no technical argument against running a permissionless network of such nodes, we’re choosing to move carefully to ensure GDPR compliance. This means that idOS will run a dStorage Network of Nodes at launch.

![](/assets/image-3.png)

## Authentication

An idOS node's database is capable of authenticating users for both writing and reading to the network based on their key pairs. By supporting multiple key types, address formats, and signature digests, the idOS is easily capable of validating user access across a wide variety of network standards.

All incoming users are identified by their public key, preferred signature and address format, and key type. The idOS supports both secp256k1 and ed25519 keys, as well as many signature standards common amongst different blockchains.  It is very easy for the idOS to add more signature standards.

## Consensus

The idOS utilizes [CometBFT](https://cometbft.com/) to provide byzantine fault tolerant consensus. As the successor to [Tendermint](https://github.com/tendermint/tendermint), CometBFT has a track record of robustness, and is currently used in production by world-class products, including the [Cosmos SDK](https://github.com/cosmos/cosmos-sdk), [Celestia](https://celestia.org/), [Sei](https://www.sei.io/), and more.

After the initial phase, idOS nodes will all have equal weight as validators. Validators join the network through a system of approvals. When a new validator wishes to join, it can submit a "join request" to the network. Existing validators can submit an "approval" for a join request, voting for the validator to be added.  If a join request receives enough votes before its expiration time (measured in blocks), the validator is allowed to join the network. The expiration time has not yet been set, and will be set at the network genesis.

In the future, idOS validator weight will be determined by token stake, similar to many PoS networks.

## idOS Smart Contract Adapter

Each idOS node contains functionality for reading [access grants](../on-chain-access-grants.md) from existing blockchains. This allows each idOS node to independently decide whether or not an end user should be able to perform a certain CRUD action against the database.

This poses two concerns:

1. Non-determinism can occur due to decentralized networks being eventually consistent.
2. Different smart contract standards require slightly different access grant implementations.

To account for this, the idOS exposes a basic interface for how the network should interact with different chains, and utilizes different drivers for each chain + access grant implementation.  Each driver also specifies a finality time, where data on the external chain can be considered "valid".  This is conceptually similar to how a centralized exchange waits for block confirmations before giving access to incoming funds.

Currently, the smart contract adapter supports the following chains:

* EVM-compliant chains (Ethereum, Arbitrum, Etherlink...)
* NEAR
* XRPL (coming soon)

## Relational Database

All state in an idOS node is stored in a relational database.  Unlike most blockchains, old blocks get periodically pruned from the idOS; only database state is persisted indefinitely.

The idOS uses a custom SQL database engine that is based on PostgreSQL. The engine contains features like default guaranteed ordering, deterministic aggregates, and advanced cost-based query estimates, making it suitable for usage on a byzantine network.

In order to either propose or validate a block, a validator must prove that it can correctly apply a set of proposed changes to its local state. This is achieved by generating a changeset containing the result of all proposed changes for all changed records, applying a deterministic ordering scheme to the record changes, and generating a resulting hash. The resulting hash is included in the next block's hash.

All changes are identified by the primary key(s) on which they change. Changes are tracked differently depending on the operation:

* Insert: Includes the new value for each column, ordered by the column index.
* Update: Includes the new value for any column which has changed, ordered by the column index.
* Delete: Delete only specifies the primary key(s) that should be deleted.

This mechanism serves an important purpose for the idOS. Since valid changesets can only be generated if a node holds the previous state, it acts as a guarantee of storage _and_ deletion.  Furthermore, it also acts as a guarantee of compute, since it is only possible to generate the correct changeset if changes have been applied properly.

### Example:

To simply illustrate how this system works, imagine a hypothetical table `users`:

| id (primary key) | username          | age |
| ---------------- | ----------------- | --- |
| 1                | satoshi           | 32  |
| 2                | link\_marine      | 54  |
| 3                | bored\_ape\_degen | 51  |

On this table, we will execute the following statements in order:

1. `INSERT INTO users VALUES (4, 'eth_maxi', 44);`
2. `UPDATE users SET age = age + 1 WHERE username = 'satoshi';`
3. `DELETE FROM users WHERE age > 50;`

The resulting ordered changeset would be:

<table><thead><tr><th width="126.33333333333331">Operation</th><th width="133">Primary Key</th><th>Column_Position_1</th><th>Column_Position_2</th></tr></thead><tbody><tr><td>UPDATE</td><td>1</td><td></td><td>33</td></tr><tr><td>DELETE</td><td>2</td><td></td><td></td></tr><tr><td>DELETE</td><td>3</td><td></td><td></td></tr><tr><td>INSERT</td><td>4</td><td>eth_maxi</td><td>44</td></tr></tbody></table>

The simple example above illustrates that, in order for an idOS node to generate a valid changeset (and therefore be a validator), it has to have the previous set of data.  If the validator chose to either include their own records, or not delete specific records, they would likely be unable to generate valid changesets for future blocks.
