# FAQs - Users

Everything you need to know as an idOS user. If you happen to have any other questions, feel free to join our idOS Community Telegram group to talk directly to our team. Please check out [official-links.md](../idos-token-launch/official-links.md "mention").

## General

<details>

<summary>What is idOS and why would I use it?</summary>

idOS is a decentralized network for storing and managing personal data. It lets you keep your identity documents and credentials in an encrypted, portable form that you control, rather than scattered across different apps. You would use idOS to simplify onboarding to new services, for example reusing a past KYC verification so you don’t have to resubmit documents over and over. It’s designed to be user-centric: your data stays self-custodial, meaning you decide who gets access and can revoke it anytime. In short, idOS helps you share your verified info with apps as easily as you’d move your money, all while keeping your privacy and security front and center.

</details>

<details>

<summary>Do I need a wallet? Which wallets work?</summary>

Today, yes. Your blockchain wallet is how idOS knows who you are — it’s used to authenticate you (logging into idOS) and authorize all your actions in idOS, such as data sharing. idOS doesn’t introduce a new proprietary wallet: it works with your existing ones. It currently supports wallets from Ethereum-compatible (EVM) chains, NEAR, XRPL, and Stellar. In practice, that means popular wallets like MetaMask, WalletConnect-compatible wallets, NEAR Wallet, and others will work. You just connect the wallet as you would in any web3 app. There’s no special browser extension or new app needed for idOS — it’s meant to feel seamless with the wallets you already use.



We will soon launch our FaceSign feature, which will enable you to manage your idOS Profile with your biometrics, and without the need to have a wallet in advance.

</details>

<details>

<summary>Do I need 'crypto tokens' to use idOS?</summary>

No. You don’t need to purchase any cryptocurrency to use idOS as a user. The system uses blockchain technology under the hood, but there are currently no gas fees or tokens required for basic use. You will need a crypto wallet, but using idOS doesn’t mean you must hold or spend crypto. The idOS network is currently free to use for users, and even when the Economy Network is introduced, its costs will likely be handled behind the scenes by the apps or services you use. In summary, idOS leverages crypto tech for decentralization and security, but you don’t have to buy coins just to manage your identity.

</details>

<details>

<summary>Is idOS an app I install or something apps use behind the scenes?</summary>

While idOS also has an app ([app.idos.network](https://app.idos.network)), idOS is much more than a single downloadable application; it’s an infrastructure layer that other applications integrate. From a user perspective, you typically encounter idOS when an application (for example, a crypto exchange or wallet app) asks you to “Connect with idOS” or share your idOS credentials for onboarding. Generally, idOS works behind the scenes inside apps. You don’t have to install a separate mobile app or extension for idOS: it runs in the browser when needed, and apps invoke it to handle things like identity verification, data storage, and consent. This design means less friction: you use your regular wallet and browser, and idOS works under the hood to securely shuttle your data between you and the service.

</details>

<details>

<summary>What happens if I lose my wallet?</summary>

If you lose access to the wallet that is linked to your idOS profile (for example, you lose your device and wallet seed), it can be a serious problem — similar to losing keys to a safe-deposit box. Since idOS uses your wallet for authentication, you won't be able to log in to your profile or approve new access grants with that wallet.

However, idOS allows you to associate multiple wallets with one profile. So the best mitigation is: add at least one backup wallet as an additional controller of your profile.

Another way to protect yourself is by using idOS FaceSign which we’re launching soon. FaceSign is a wallet users can't lose. It lets you sign messages using your face no matter where you are or what device you're using, all without needing to download and install any new apps.

</details>

<details>

<summary>I no longer want to use idOS, how do I remove my data and unlink apps?</summary>

idOS was built to give you full freedom, without needing permission from any central authority to do so. If you decide to stop using idOS, here are some steps you can take:

1. Revoke all active Access Grants. Go through your dashboard's list of apps that have access and revoke each one. This ensures that from this point on, no app (Data Consumer) can fetch or view your data via idOS. This won't apply to access grants with active timelocks.
2. Delete all your credentials (personal data) from idOS. You can delete each credential through the dashboard, exercising your right to be forgotten. Once deleted, idOS nodes will purge that data from storage. Do this for all items in your profile. At this stage, your profile becomes essentially empty.
3. Unlinking apps in a technical sense just means revoking their access (done in step 1). There's no centralized "account" at each app to delete in idOS's context, because the data was self-custodied.

Make sure you have backups of anything you might need because deletion is irreversible. If down the road you want to use idOS again, you'd essentially start fresh, possibly needing to verify your data again.

</details>

## idOS Profile

<details>

<summary>How can I create an idOS Profile?</summary>

Usually, your idOS Profile gets created the first time you use an app that supports idOS and you go through an identity verification (e.g. KYC) flow. Here’s what happens: when you connect your wallet to an idOS-enabled app, it will check if you already have an idOS profile. If not, the app will help you create one. The app will likely ask you to verify your identity (for example, submit your ID documents), similar to a normal KYC process.

During this process, idOS will prompt you to set a password for the idOS Enclave (a secure module for your encryption keys) and have you sign a message with your wallet to prove it’s yours. Once your info is verified, the app will issue a credential with your KYC information into your profile.

You can also create your idOS profile in [app.idos.network](https://app.idos.network)

</details>

<details>

<summary>Can I have more than one idOS Profile?</summary>

Sure thing! Just make sure you use a wallet not associated with any existing idOS Profile. This also extends to your idOS FaceSign wallet.

</details>

<details>

<summary>Why is my existing idOS Profile "not found"? What does it mean to "link existing wallet"?</summary>

This means the wallet address you connected doesn’t have an idOS profile yet. Don’t worry, it’s expected for first-time users. What you should do is follow the app’s onboarding flow to create your profile. Typically, the app will automatically prompt you at this point: it might say something like “We couldn’t find an idOS profile for you. Let’s create one!”.

If you do have an existing idOS profile, you can either connect one of its associated wallets to the app, or click the “Link existing wallet” button on your onboarding flow.

</details>

## Your idOS Key and Encryption

<details>

<summary>What is an idOS key and why do I need one?</summary>

Your idOS key is used to decrypt your idOS data. Every user in idOS has their own encryption keys. This is one of the hallmarks of our defense in depth approach, and ensures that even if it were to happen, a data leak would leave an attacker holding on to a bunch of nothing.

When a new user is added to idOS, we help them create this key — an encryption/decryption keypair — and record the public key on their idOS profile. This is the public key that everything will be encrypted to for this user, so the user will always need its corresponding private key whenever decrypting data.

</details>

<details>

<summary>What is the idOS Enclave?</summary>

The idOS Enclave is a secure component that runs in your browser to handle sensitive cryptographic operations. Think of it as a mini “security vault” within a web app: similar to how hardware wallets or your phone’s secure enclave work, but implemented in software for web use. Just like e.g. MetaMask does regarding signatures, the Enclave ensures your idOS key isn’t accessible by apps. Whenever data needs to be decrypted, we ask you to “unlock” the Enclave.

</details>

<details>

<summary>How is my idOS key created and stored?</summary>

We don't store your idOS key anywhere. This means the Enclave must be ready to recreate it at any time. To do this, it must use a key generation process that reliably arrives at the same key, again and again, for you to be able to decrypt data that is encrypted to it. We built two mechanisms for this purpose and, when you create your idOS profile, you can choose between them.

1 -  MPC key abstraction: The first (default) mechanism uses high-quality entropy to generate a random key for you through the Enclave. It then splits this key into several shares using Shamir's Secret Sharing (which ensures each share is not only useless but also undecipherable in isolation). These shares are distributed among several MPC nodes, along with a list of your wallets that can sign a message authorizing their retrieval.

Whenever the Enclave needs your idOS key for decryption operations, it will ask you to sign a message with one of those wallets to authorize the retrieval of your key shares. These shares are then recombined into your idOS key. Learn more in [mpc-for-encryption-keys.md](mpc-for-encryption-keys.md "mention")

Soon, users will be able to use idOS FaceSign instead of their own wallet, to authorize the retrieval of key shares using their biometrics. Learn more [biometrics-and-idos-facesign-beta.md](biometrics-and-idos-facesign-beta.md "mention")

2 - Password: A secondary method is creating a password. Passwords “just work” and are a familiar option for most users. If you choose this option, the Enclave will ask you to choose a password, and use it as input — combined with your idOS user ID — to a mechanism called key derivation. Key derivation is what happens when your operating system asks you for a password to unlock your laptop, perform updates, etc.

Passwords, however, have a nasty habit of being poorly chosen and/or forgotten. Unless you're experienced with password managers or a security nerd, this puts you at risk of forgetting your password, which would lock you out of being able to decrypt your own idOS data. Unfortunately, idOS cannot reset or recover your password for you. To ensure self-custody, we built the system to make it impossible for us to have access to it. This means if it’s truly lost, the data encrypted under it is essentially unreadable.

</details>

## Getting & Sharing Credentials

<details>

<summary>What is a delegated write grant, and why am I being asked to sign one?</summary>

A delegated write grant is a mechanism that allows a credential issuer, for a short period of time, to insert a credential on your behalf in idOS. This allows for a better UX by making identity verification a “set and forget” affair: once you’ve submitted your information, you can leave the issuer’s platform without needing to return just to get your credential.

</details>

<details>

<summary>What is an Access Grant and why do apps ask me for it?</summary>

Data in idOS is shared using access grants. When an app wants you to share your data with them, they'll ask you for one of those. If you choose to accept the sharing request, the relevant data will be re-encrypted on your device to the app's key, and then written back into idOS for them to access it if and when they need it.

Apps ask for this because it’s how consent is managed: rather than you directly sending your documents over (insecure and annoying), the app uses idOS to obtain a re-encrypted credential from you. The Access Grant mechanism ensures you are in control, because the app cannot pull anything from idOS until you give the green light by signing that grant. Once granted, the app can fetch the specific data you allowed and nothing else. In other words, an Access Grant is the consent token that powers the sharing of your encrypted data: apps need it to prove they have your permission.

If you change your mind later, you can unilaterally revoke this Access Grant, ensuring the app no longer has access to your data. This doesn’t apply to Access Grants you accepted a timelock for.

</details>

<details>

<summary>What is a timelock?</summary>

A timelock is an optional add-on to an access grant. When an app asks you to share some data, they can optionally add a timelock to that request. As the owner of your data, you get to decide if you accept it or not.

Timelocks can be used for any purpose, but are particularly useful in the context of AML regulation, which mandates obliged entities to maintain access to the data underlying a KYC verification for a certain period of time.

You can delete your data anytime, but if you've agreed to a timelock for a particular access grant you won't be able to delete the corresponding data until the timelock expires.

</details>

<details>

<summary>How do I revoke access? Does the app keep a copy?</summary>

You can revoke access to a credential using your Data Dashboard (e.g. in [app.idos.network](https://app.idos.network) or [dashboard.idos.network](https://dashboard.idos.network), or in some app integration's front end)

Revoking an Access Grant in idOS immediately cuts off the app’s ability to access your data via idOS. However, it’s important to understand what may have happened during the time access was granted. While idOS and regulations like GDPR actively discourage keeping local copies of data, apps may fetch a copy of your credential (still encrypted for them) from idOS and save it to their own database. Revoking the grant means they can’t fetch it again or get updates, but if they already pulled the data into their own systems then idOS cannot magically delete those copies.

We designed idOS for apps to use it in a “live” way (accessing data on demand without local hoarding) to reduce such duplication. In fact, idOS’ design encourages apps to not store unnecessary copies, by giving them quick on-demand access when needed.

Indeed, compliance-conscious apps treat idOS as the source of truth, and don’t maintain their own persistent copies.

If you suspect that an app has stored your data locally, you may contact them to delete their local copy (this falls under regulations like GDPR and CCPA rights, where you can ask an app to erase your data). The good news is that by using idOS, apps have less need to store your data themselves in the first place, meaning in many cases revoking access essentially means they no longer have it.

</details>

<details>

<summary>What happens if an issuer revokes a credential they created for me?</summary>

In idOS, since you own your data, a Data Issuer (say, a KYC provider or app that used it) cannot yank a credential out of your profile without your permission. What they can do is update the metadata of that credential to signal they no longer vouch for it.

And so, if the issuer of a credential decides to revoke it, it essentially marks it as untrusted going forward. For example, if an issuer discovers fraud or an error, they might mark the credential as revoked. Once revoked, any app that tries to use that credential will see its status and likely reject it.

</details>

<details>

<summary>Can I choose which identity verification provider/issuer to use?</summary>

Often, yes. idOS is an open ecosystem, which means multiple issuers (KYC providers, regulated apps, etc.) can plug in and issue credentials. When you are about to create a profile or add a credential, you might be offered different data verification alternatives if the app you’re using supports them. For example, an app might say “Please verify your identity. Choose provider: \[Provider A] or \[Provider B].” If you already have a credential from a provider that the app trusts, you can use that; otherwise, you can pick from the available ones to perform a new data verification check.

idOS itself doesn’t force you to stick to a single issuer. You can accumulate credentials from different issuers in your profile and use them interchangeably where accepted. The caveat is, the relying app (the one requesting your data) will usually specify which issuers it trusts.

</details>

<details>

<summary>What happens to my data once an identity verification provider has verified it?</summary>

Before an identity verification provider or issuer adds data to your idOS Profile, they may have to process that data on their servers. idOS encourages all identity verification providers and issuers to delete that data, and request an Access Grant if needed.

However, there is a general misconception that, for AML reasons, identity verification providers must also store their verified data. This is not true across major jurisdictions, and usually these requirements only exist inside service agreements between verification providers and apps.

idOS collaborates with identity verification providers that have a requirement to delete user data after processing it. To be more specific, this is something that today is followed by [Sumsub](https://sumsub.com/) and [Fractal ID](https://web.fractal.id/), with more providers being added soon. Today, this applies to any data verification journey that starts in app.idos.network, although this set up is open to any integrators using idOS today, and some are already leveraging it.

</details>

<details>

<summary>My name/address changed, how do I update my credential?</summary>

If your personal information changes (like you moved to a new address or legally changed your name), you might need to get an updated credential reflecting that new information. Since idOS credentials are issued by third parties and digitally signed, you cannot just edit the old credential; you need a new one issued.

In practice, you likely don’t need to worry about this. If an update is required, the apps you’re using will guide you through the process you need to follow.

</details>

<details>

<summary>The information in my credential is wrong. How do I dispute or correct it?</summary>

If you discover an error in a credential (for example, your name is misspelled, or the issuer recorded the wrong nationality, or it’s an old address), the process to correct it involves the credential’s issuer because they are the ones who created and signed that data:

* Contact the issuer or follow their correction process. For instance, if the credential was issued by a KYC provider or bank, reach out to them, tell them what’s wrong, and provide evidence of the correct info if needed. They might have a support channel for identity verification issues.
* The issuer can then update their records and issue you a new corrected credential. In idOS, this would typically mean they insert a new credential with the correct details into your profile (with your permission). They might first revoke the old one or ask you to delete it.

idOS itself doesn’t (and can’t) arbitrate disputes about data accuracy. idOS is just a storage and sharing platform. The responsibility for the content is with the issuer and you (the issuer provides, you approve storing/sharing). So resolving discrepancies is a matter of going to the source. idOS itself can’t correct data because it can’t actually read or alter the content: it only stores what issuers produce.

</details>

## Data Privacy & Security {#data-privacy-and-security}

<details>

<summary>Where and how is my data actually stored?</summary>

Your data is stored in the idOS Storage Network, which is a decentralized network of nodes run by authorized operators. In simple terms, it’s not in a single company’s server or your local device: it lives across multiple secure nodes that sync with each other. Importantly, everything stored there is encrypted to your idOS key before being stored on your profile. Physically, those nodes are like computers hosted by various organizations (initially the idOS Consortium partners and others) that have committed to running this infrastructure.

</details>

<details>

<summary>Is my personal data ever put “on a blockchain”?</summary>

Not in the way you might fear. None of your personal data (like your name, ID numbers, documents, etc.) are stored on a public blockchain. idOS uses blockchain tech for things like recording permission grants and ensuring consensus between nodes, but your sensitive data remains encrypted and off of public ledgers.

</details>

<details>

<summary>Who can see my data inside idOS?</summary>

By design, only you can see and decrypt your data. Even the idOS node operators and the idOS Association cannot read your information in plaintext. This is because idOS employs end-to-end encryption using a key that you control: your idOS key. When your data is stored, it’s locked with this unique encryption key of yours.

Without this key, not even node operators can decrypt anything. As a result, the network’s role is to hold and transport encrypted blobs of data, but not to understand them. The only people who can see your data in a usable form are those you explicitly grant access to, and even then, they only see the specific items you share, nothing else. For instance, if you grant a fintech app access to your proof-of-identity credential, that app can only read that credential, not your whole profile.

No one else browsing the network or operating a node can casually look into your information.

</details>

<details>

<summary>How do I see everything idOS has about me?</summary>

idOS provides a Data Dashboard where you can log in and view your profile's data (you can see it in [app.idos.network](https://app.idos.network) or [dashboard.idos.network](https://dashboard.idos.network)). When you access this dashboard, you’ll be able to see all the credentials and personal data items that have been stored under your profile. Think of it as a control panel for your digital identity: you can review what documents or verified claims are there (e.g., a KYC credential from Bank A, a proof of address, etc.), see their details, and manage them.

Additionally, the dashboard lets you see your active Access Grants, i.e. which applications have permission to what data. This way, you have full transparency into “what idOS knows about you,” because really it’s “what you have stored in idOS.”

</details>

<details>

<summary>How do I add, update, or delete my data?</summary>

All of these actions are under your control, either via the Data Dashboard or through applications themselves. Adding or updating data typically happens through issuer/consumer applications and their flows, while deletion is a user-initiated action you can do at any time to maintain your data hygiene.

**Adding or updating Data**

Usually, data gets added to idOS when an issuer (like a KYC provider or some credential issuer) inserts a credential into your profile, with your consent. For instance, after you complete an identity verification journey, they store the verified credential in idOS for you. You can also add data yourself if you wish, but if you’re not a developer that might be a bit hard: since identity verification is our current primary use case, we don’t yet have good tools for you to use the idOS as a generic data storage solution.

**Deleting Data**

You have the right and ability to delete any credential from your profile. Using the idOS dashboard, you can remove a credential or wallet, and this triggers it to be deleted across all idOS nodes. idOS’s architecture was built to comply with data protection laws like GDPR’s “right to be forgotten,” so when you delete something, it is truly purged from the network’s active storage (not just hidden).

</details>

<details>

<summary>Can I download or export my data?</summary>

Yes. Since you own the data in your idOS profile, you can retrieve it. idOS doesn’t lock in your data. Your data is yours to access, download, and use as you see fit.

idOS encourages credentials to be stored in a standard format (W3C Verifiable Credential JSON), which means they’re portable and interoperable. Through the Data Dashboard, you can fetch the plaintext contents of any credential after unlocking with your idOS keys.

Also, idOS being standards-based means you could take that exported credential and use it outside of idOS if needed, since it’s in a common format.

</details>

<details>

<summary>How is my data protected/encrypted?</summary>

Your data is distributed among several idOS nodes, at this point primarily for redundancy. A consensus protocol keeps the nodes in sync and enforces data deletions. And not even these nodes can decrypt your safely stored data in idOS: that requires your idOS key, which only you have.

Since data is always encrypted to your idOS key before being sent to the idOS, only you as the owner of that key can decrypt it. There's no other key that the idOS could leak that would have any impact on data security and, if some other user leaks their keys, only their data is at risk — not yours. Even in that scenario, an attacker would still need a separate signing key to be able to access the encrypted data in the idOS, making attacks impossibly expensive.

At the very core, this per-user encryption is likely the most powerful security guarantee in idOS. That is because per-user encryption means that even if all security layers are breached and an attacker accesses idOS data, they'll end up with nothing useful.

Furthermore, this is only one of the several layers that keep idOS secure. We believe that better security emerges from composing different layers, rather than pointlessly obsessing over making any single one ostensibly bullet-proof. This concept is called "defense in depth", and it works because different security measures fail in different ways. When one breaks, the others ensure that attacks stay small and boring.

</details>

<details>

<summary>What happens if an idOS node is hacked or otherwise leaks data?</summary>

Because of the strong per-user encryption in place, a hacked node or leaked data would not expose your personal information to anyone. All data stored in idOS nodes is encrypted at the edge (on your side) before storage (read: [encryption-flows.md](key-flows/encryption-flows.md "mention")). So if an attacker somehow gets hold of the raw database or intercepts data from a node, they would only obtain ciphertext (random-looking encrypted data). To actually read that, they would need every user’s private idOS key in addition to compromising the node: a highly unlikely combination.

Furthermore, the idOS Storage Network is today a permissioned network, meaning node operators are vetted and legally bound to operate securely. This reduces the risk of malicious operators. In the worst-case scenario of a breach, the attacker’s challenge to decrypt the stolen data is akin to breaking modern cryptography, which is considered computationally infeasible.

We have plans to further decentralize the node operator selection process, but first and foremost we want to ensure data security for idOS users.

</details>

<details>

<summary>Does idOS sell my data or use it for ads/AI training?</summary>

No. We couldn’t even if we wanted to. Since data is always encrypted to your idOS key before being sent to the idOS, only the owner of that key — you — can decrypt it. That means the idOS has only gibberish to sell — and nobody pays for gibberish.

The way idOS plans to sustain itself is by charging small protocol fees to the apps or parties transacting on the network (like a tiny fee when an issuer issues a credential or when an access grant is facilitated), not by exploiting user data. In summary, idOS is an infrastructure service, not a data broker or advertising platform.

</details>

