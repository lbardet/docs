# Database overview

## Table structure

The following diagram describes the structure of the relational database within idOS nodes, as well as the data types for all columns.



![](/assets/idOS_Gitbook_Database structure.png)

## Data schema

The following table describes the data schema for all table columns.

<table><thead><tr><th>Table</th><th>Column</th><th width="197">Schema</th><th>Example</th></tr></thead><tbody><tr><td><code>humans</code></td><td><code>id</code></td><td>UUIDv4</td><td>fd227c4f-59db-4bf7-853a-203f162e2eb6</td></tr><tr><td><code>attributes</code></td><td><code>id</code></td><td>UUIDv4</td><td>b9cce79d-ef5b-4d78-bfbb-0c3778162d34</td></tr><tr><td></td><td><code>human_id</code></td><td>UUIDv4</td><td>fd227c4f-59db-4bf7-853a-203f162e2eb6</td></tr><tr><td></td><td><code>key</code></td><td>short string</td><td>email_address</td></tr><tr><td></td><td><code>value</code></td><td>long string</td><td>foo@bar.com</td></tr><tr><td><code>wallets</code></td><td><code>id</code></td><td>UUIDv4</td><td>8c365c0d-023d-41ea-b257-f77e6e3c2ed4</td></tr><tr><td></td><td><code>human_id</code></td><td>UUIDv4</td><td>fd227c4f-59db-4bf7-853a-203f162e2eb6</td></tr><tr><td></td><td><code>address</code></td><td>short string (blockchain address)</td><td>0xae972e214f2cb6b14cff509bac60c5501788d871</td></tr><tr><td></td><td><code>message</code></td><td>short string</td><td>My idOS ID is fd227c4f-59db-4bf7-853a-203f162e2eb6 and I own 0xae972e214f2cb6b14cff509bac60c5501788d871</td></tr><tr><td></td><td><code>signature</code></td><td>short string (cryptographic signature)</td><td>0xe3854867634cbc2ccd45fbe568b4c197ba096757a23cccf12bbaddd3ed1aa3a944f90c9544f9f62ee1aa2e987db37b558adc9e912259f55dea5e3d85b44440631c</td></tr><tr><td><code>credentials</code></td><td><code>id</code></td><td>UUIDv4</td><td>a2c77161-9b9f-4935-b532-adaabe7b505e</td></tr><tr><td></td><td><code>human_id</code></td><td>UUIDv4</td><td>fd227c4f-59db-4bf7-853a-203f162e2eb6</td></tr><tr><td></td><td><code>issuer</code></td><td>short string</td><td>KYC Issuer name</td></tr><tr><td></td><td><code>type</code></td><td>short string</td><td>KYC</td></tr><tr><td></td><td><code>content</code></td><td>long base64 string</td><td>(ciphertext)</td></tr></tbody></table>

