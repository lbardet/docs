# Access control

## Authentication

Anyone attempting to perform any query on an idOS node must authenticate with a wallet signature. In order to prevent replay attacks, the message to be signed must include an incrementing nonce.

## Authorization

All queries must include a wallet signature, which establishes that the caller controls that wallet. The address recovered from that signature can be injected into SQL queries. This is one of the ways in which authorization works in idOS nodes.

**Node operators** can create, update, delete and read any record.

**Humans** can create any record associated to themselves; they can update, delete and read any record they own.

A human is said to own a record if they control an associated `wallet` record. This means node operators must necessarily create the first `wallet` record associated with a `human` record. Here's an example of what this means under the hood:

```sql
action get_credentials ($type, $issuer) public {
    SELECT * FROM credentials
    INNER JOIN wallets ON credentials.human_id = wallets.human_id
    WHERE wallets.address = @caller
        AND credentials.type = $type
        AND credentials.issuer = $issuer
}
```

**Grantees** can read any record they’ve been granted access to. This is configurable on a smart contract that nodes monitor. See [on-chain-access-grants.md](../on-chain-access-grants.md "mention") for more information.
