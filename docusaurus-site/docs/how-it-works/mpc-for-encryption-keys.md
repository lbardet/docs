# MPC for encryption keys

Each user in idOS has their own encryption keys. This is one of the hallmarks of our defense in depth approach, and ensures that even if it were to happen, a data leak would leave an attacker holding on to a bunch of nothing.

We built the idOS Enclave to help users create and manage these keys. The idOS Enclave is a browser wallet for encryption: a secure browser-based environment for handling sensitive operations such as password input, key derivation, encryption, decryption, and looking through credentials' encrypted content.

Just like e.g. MetaMask does regarding signatures, the Enclave ensures the user’s private key isn’t accessible by dapps. Whenever data needs to be decrypted, we ask the user to “unlock” the Enclave. As such, the Enclave operates in isolation from the host application, ensuring that plaintext data remains inaccessible to unauthorized parties. This component is critical for maintaining the end-to-end encryption guarantees of the idOS system.

When a new user is added to the idOS, we help them create an encryption keypair, and record the public key on their idOS profile. This is the public key that everything will be encrypted to for this user, so the user will always need its corresponding private key whenever decrypting data.

This keypair (or at least its private key) needs to be stored somewhere, which is particularly difficult to do reliably for a web app. An extension like MetaMask can keep it safe indefinitely, but the Enclave will inevitably forget it.

This means the Enclave must be ready to recreate it at any time. To do this, it must use a key generation process that reliably arrives at the same key, again and again, for the same user — whether they’re new or existing.

The first such process we rolled out used passwords. Passwords “just work” and are a familiar option for most users. It works by asking new users to choose a password, and using it as input to a mechanism called key derivation.

Key derivation is what happens when your operating system asks you for a password to unlock your laptop, perform updates, etc. The diagram below illustrates how this process works differently for new vs existing users.

![](/assets/image-7.png)

idOS keys are derived using [scrypt](https://en.wikipedia.org/wiki/Scrypt) (an industry standard [PBKDF](https://en.wikipedia.org/wiki/Key_derivation_function)) to derive a keypair for a user given their seed and user ID.

1. Take a seed (e.g. a user’s password)
2. [Normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) the seed for consistency across platforms
3. Use [scrypt-js](https://github.com/ricmoo/scrypt-js) to derive a 32-byte private key from a combination of
   1. the normalized seed
   2. the user’s ID, which acts as a [salt](https://en.wikipedia.org/wiki/Salt_\(cryptography\)) with to help thwart [rainbow table](https://en.wikipedia.org/wiki/Rainbow_table) attacks
4. Use [tweetnacl-js](https://github.com/dchest/tweetnacl-js) to derive the public key from this private key

Voilà, the Enclave now has an encryption keypair (private key + public key), and is now ready to serve encryption and decryption requests coming from the idOS SDK.

Passwords, however, have a nasty habit of being poorly chosen and/or forgotten. This puts users unfamiliar with password managers would at risk of forgetting their password, which would lock them out of being able to decrypt their own idOS data. And so, with the help of our partner Partisia, we rolled out a new mechanism: MPC.

Instead of asking users to input a password, the Enclave uses high-quality entropy to generate a random key for them. It then splits this key into several shares using Shamir's Secret Sharing (which ensures each share is not only useless but also undecipherable in isolation). These shares are distributed among several MPC nodes, along with a list of the user's wallets that can sign a message authorizing their retrieval.

![](/assets/image-6.png)

1. **Key generation**
   1. A random key is generated from high quality entropy
   2. This key is split into shares using Shamir’s Secret Sharing
2. **Payload creation**
   1. One payload per MPC node is created, each including a key share and the list of wallets that can retrieve it
   2. The user signs a message for authentication
   3. The node URLs and keys are discovered by querying the PBC idOS smart contract
   4. Each payload is sent to its node
3. **Key share storage**
   1. Each node validates the signature, and stores a key share

***

Afterwards, whenever the Enclave needs to retrieve the user's key for decryption operations, it asks the user to sign a message to authorize the retrieval of their key shares. These shares are then recombined into the user's decryption key.

![](/assets/image-8.png)

1. **The key recovery process is initiated**
2. **Payload creation**
   1. One payload per MPC node is created, each requesting its key share
   2. The user signs a message for authentication using one their authorized wallets
   3. The node URLs and keys are discovered by querying the PBC idOS smart contract
   4. Each payload is sent to its node
3. **Key share retrieval**
   1. Each node validates the signature and returns its key share
4. **Key assembly**
   1. The key shares are assembled into a functioning key
