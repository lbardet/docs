# Encryption

The idOS uses asymmetric encryption by default to secure user data. For encryption, the user's public key is used that he or she [derived](encryption.md#derived-key-generation) when setting up an idOS profile. 

In the absence of a stronger, more recent recommendation, we follow [Latacora’s 2018 standards](https://latacora.micro.blog/2018/04/03/cryptographic-right-answers.html) using the asymmetric encryption methods NaCl/libsodium (Curve25519 + ChaPoly AEAD).

{% hint style="info" %}
As users are in control of their idOS profile, they can also choose to add data without encryption, even though this is highly discouraged.
{% endhint %}

## When is data encrypted?

Data encryption happens when 1) [identity verification providers](system-architecture/roles-main-stakeholders.md#issuers) issue to users Verifiable Credentials that are then added to the idOS in a guided process or 2) the user adds data through the [User Data Dashboard](functionality/user-data-dashboard.md) or 3) when [data access is granted](functionality/granting-data-access.md). The idOS is open source and provides [SDKs](../developer-docs/dapp-sdk-integration.md) to enable third parties to perform these actions. As a default encryption will be built into these components.

The initial identity verification provider, Fractal ID, will encrypt the content of all credential records before writing them in the idOS. The idOS [User Data Dashboard](functionality/user-data-dashboard.md) will encrypt by default when creating an attribute record. 

## Derived key generation

The idOS uses passwords as a common non-technical approach to derive keys that can be used for encryption by employing a [key derivation function](https://en.wikipedia.org/wiki/Key\_derivation\_function) like [scrypt](https://en.wikipedia.org/wiki/Scrypt). The following process is deployed to derive the key: 

1. User is asked to choose a password
2. Password is [normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/String/normalize) it for consistency
3. Password is used with [Scrypt-js](https://github.com/ricmoo/scrypt-js) to derive a 32-byte key
4. Password is used with [tweetnacl-js](https://github.com/dchest/tweetnacl-js) to generate a new asymmetric keypair (x25519-xsalsa20-poly1305)

To ensure determinism, scrypt parameters are kept constant (CPU/memory cost, block size, parallelization costs, and salt), but using the same salt across all users would weaken this method beyond any reasonable standards because it would easily enable rainbow table attacks, which is why we scope determinism to each user. For mitigation, we start by using the user’s idOS ID as a salt by default and will upgrade the idOS by generating a [bip39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonic seed phrase for each user.

## Encryption flows

Let us walk through two of the encryption flows: 

**Encryption flow #1: Using derived keys (from seed or password)**

<img src="/assets/idOS_Gitbook_encryption flow 1.png" alt=""><figcaption><p>Legend: PK = Public Key   |    SK = Secret Key (AKA Private Key)</p></figcaption>

**Encryption flow #2: Creating a data access grant (using re-encryption)**

<img src="/assets/idOS_Gitbook_encryption flow 2.png" alt=""><figcaption><p>Legend: PK = Public Key   |    SK = Secret Key (AKA Private Key)</p></figcaption>
