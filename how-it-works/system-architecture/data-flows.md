# Data flows

The idOS offers many possibilities on how users can access and manage their data. We want to provide four general user flows:

## A new user joins the idOS

**Flow A:** A new user (in this case Alice) joins the idOS by (1) going to any node provider (in this case Fractal ID). She (2) verifies her wallet. (3) Fractal creates Alice’s idOS entry and adds her wallet to her data store. Alice proceeds to the (4) data dashboard. She (5) signs a message for authentication with an idOS node and (6) the node authenticates and authorizes Alice and sends back her data.

<mark style="background-color:green;">**Flow B**</mark>**:** Alice adds her first credential by (1) generating an idOS keypair for her, which she backs up using [derived keys](../encryption.md#derived-key-generation). The dashboard then (2) sends Alice the idOS public key. (3) Fractal ID then adds Alice's credential to the idOS.

<figure><img src="../../.gitbook/assets/idOS_Gitbook_user flow 1.png" alt=""><figcaption></figcaption></figure>

## **A user manages data on a data dashboard**

**Flow A:** For Alice to see her data on a dashboard (e.g. the [User Data Dashboard](../functionality/user-data-dashboard.md)), she needs to (1) go to a data dashboard and (2) sign a message transaction with her wallet for the dashboard (3) to display her idOS data.

<mark style="background-color:green;">**Flow B**</mark>: To change data on the dashboard, Alice (1) signs a message through her wallet (2) the dashboard then creates or updates her idOS data according to her input and (3) reloads Alice’s data from the idOS.

<figure><img src="../../.gitbook/assets/idOS_Gitbook_user flow 2.png" alt=""><figcaption></figcaption></figure>

## **Granting another user access to data**

**Flow A:** Alice grants Bob access to her data by (1) going to a data dashboard, creating an access grant and (2) approving the transaction in her wallet. The Access Management Protocol (smart contract for access control) is (3) updated, which in turn updates the idOS nodes. Bob can now see Alice’s data on a dashboard, and/or get it from a node.

<mark style="background-color:green;">**Flo**</mark><mark style="background-color:purple;">**w B**</mark>**:** Bob can now (1) go to his data dashboard, (2) sign a message in his wallet and (3) see Alice's data that the dashboard dApp retrieved from the idOS (unless Alice revokes the grant or deletes the data before).

<figure><img src="../../.gitbook/assets/idOS_Gitbook_user flow 3.png" alt=""><figcaption></figcaption></figure>

## **A user grants a dApp data access**

**Flow A:** (1) Alice goes to a dApp and (2) approves the transaction in her wallet to grant the dApp data access. (3) The Access Management Protocol (smart contract for access control) is updated, which in turn updates the idOS nodes. The dApp can now request Alice’s data from an idOS node at any time.

<mark style="background-color:green;">**Flow B**</mark>**:** The dApp can query the idOS for Alice’s data, idOS nodes authenticate and authorize the dApp and send back (1) Alice’s data (until Alice revokes the grant or deletes the data).

<figure><img src="../../.gitbook/assets/idOS_Gitbook_user flow 4.png" alt=""><figcaption></figcaption></figure>
