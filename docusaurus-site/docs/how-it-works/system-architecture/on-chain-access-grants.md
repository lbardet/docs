# On-chain access grants

Access grants allow their grantees to retrieve data at a later point in the future without requiring user interaction, as described in [granting-data-access.md](../functionality/granting-data-access.md "mention"). These grants are:

* Managed by the data owners themselves
* Recorded on-chain
* Observed by idOS nodes for [#authorization](decentralized-storage/access-control.md#authorization "mention")

## Smart contracts

These grants are configurable by the data owners using any of the smart contracts that idOS nodes check. The contract functionality is straightforward:

* **A grant** is an idOS object representing a data access grant from an owner to a grantee for a given data ID (optionally with a timelock)
* The contract **stores a collection of grants**
* **Anyone** can **list grants**
* A **signer** can
  * **create a grant** that they own
  * **delete (revoke) a grant** that they own (unless timelocked)

Below is a simplified Solidity interface.

```solidity
struct Grant {
    address owner;
    address grantee;
    string dataId;
    uint256 lockedUntil;
}

function insertGrant(
    address grantee,
    string memory dataId,
    uint256 lockedUntil
) external

function deleteGrant(
    address grantee,
    string memory dataId,
    uint256 lockedUntil
) external

function findGrants(
    address owner,
    address grantee,
    string memory dataId
) public view returns (Grant[] memory)
```

[Our GitHub repo](https://github.com/idos-network/idos-access-grants) has more information, as well as tested implementations for the EVM (in Solidity) and the NEAR VM (in TypeScript and in Rust).

## idOS nodes

When receiving a signed request for data not owned by the signer, idOS nodes use these smart contracts as the source of truth for authorizing (or denying) the request. Here's an example of how they're used:

```sql
action get_shared_credential ($id) public {
    $can_access = grants.has_grants(@caller, $id);
	  
    SELECT CASE WHEN $can_access != 1
      THEN ERROR('caller does not have access')
    END;
    
    SELECT * FROM credentials
    WHERE id = $id;
}
```

### Timelocks

A request for an access grant can include an optional timelock. If accepted, it restricts the data owner's ability to revoke the access grant or delete the underlying data until said timelock expires.

Timelocks are particularly relevant for AML/KYC compliance. For example, at an international level, FATF recommends a retention period on financial institutions of at least 5 years. The relevant EU directive states also 5 years. The same is true for the US and China, but for Brazil and Switzerland, for example, that is 10 years.

Contracts enforce timelocks by checking whether a timelock is present and active before agreeing to delete a grant.

```solidity
require(grant.lockedUntil < block.timestamp, "Grant is timelocked");
```

On its end, the idOS checks whether an active timelock exists when receiving deletion requests.

```sql
action delete_credential ($id) public {
    $has_timelock = idos.has_timelock($id)

    SELECT CASE WHEN $has_timelock = 1 THEN ERROR("data is timelocked") END
	
    DELETE FROM credentials
    WHERE //...
}
```
