# Biometrics & idOS FaceSign (Beta)

:::caution
idOS FaceSign is currently in closed beta, available only on the idOS app while we get it ready for use by third party developers.
:::

FaceSign is a wallet you can't lose. It lets you sign messages no matter where you are or what device you're using, all without needing to download and install any new apps.

FaceSign protects you by enforcing liveness detection before creating or using any keys. This means that a video or mask of your face won't do — FaceSign will only work if you're in front of your device.

Let's walk through it to see how it works. First, your device captures some information about your face. This information is encrypted and sent directly to a TEE, ensuring that not even idOS has access to it. This TEE then transforms this information into a feature vector, a description of your face usable only for pattern matching, and from which no human-readable representation of your face can be derived.

The first time the TEE sees your face, it uses a cryptography grade entropy source to generate a random signing key for you. This key is returned to your device, which it can then use to sign messages like a regular wallet does.

![FaceSign user flow diagram](/assets/image-3.png)

## ➡️ User flow

1. **You capture on your own device.** You take a short video-selfie in your own phone or laptop.
2. **Encrypted handoff to a secure compute enclave.** The captured data is sent over an encrypted channel to a locked-down [AWS Nitro Enclave](https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html), and before running any de-duplication/matching code it gets transformed into anonymized [FaceVectors](https://dev.facetec.com/facevectors) (a non-reversible, no image-containing string of numbers derived from your face features). Nitro Enclaves are isolated VMs with **no external networking, and no interactive access**.
3. **Compute-only result leaves the enclave.** The enclave computes whether you are **new** or **already known** and outputs only an anonymized **unique user ID** accordingly and linked entropy for key derivation. Because the enclave uses FaceVectors, the raw selfie frames used for that computation are not persisted there.
4. **No data, images or video are stored.** No sensitive biometric data is stored anywhere.
5. **You receive a Verifiable Credential (VC) with a unique idOS biometric ID in your idOS profile.** The credential is [**issuer-encrypted** with your keys](system-design), and stored in idOS; you control who can decrypt it via **Access Grants**.

## 🔒 Privacy by design

* **Biometric capture happens on _your_ device.** You record a short video-selfie locally, with your own personal device. There’s no third-party or shared hardware involved.
* **No human/operator access before, during or after biometric compute.** The matching step runs inside [Nitro Enclaves](https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html), which **cannot be SSH’d into** and **don’t expose a network interface**. Data is processed in enclave memory and not viewable by admins or support staff.
* **No photos of your face are matched.** Before any matching take place, an anonymized [FaceVector](https://dev.facetec.com/facevectors) is generated. FaceVectors are non-reversible, no image-containing string of numbers derived from your face features. Actual video/images are permanently deleted inside the secure enclave once the FaceVector is created.
* **No photos stored in idOS; only an encrypted credential with your unique ID.** After matching, you are prompted to store a **Verifiable Credential** containing the anonymized unique ID—**not** the selfie, frames, or templates. The credential remains **encrypted with your keypair**, and third parties can only read it if **you grant access**. This also includes idOS, and the issuer does not have access to any data to store.
* **Multiple profiles, with a user-controlled “same-person” proof.** At a protocol level, you may have more than one idOS profile (e.g., for pseudonymous contexts). Because the **same issuer-signed VC** (with your unique ID) can be held and presented from more than one profile, **you** can later prove those profiles are controlled by the **same person** by presenting that VC.

## 🛡 Security at the core

* **Isolated biometric compute.** User de-duplication and matching is run inside [**AWS Nitro Enclaves**](https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html)—isolated VMs with **no external networking, and no shell access**, even to a root admin on the host.
* **Encrypted, issuer-controlled credentials at rest.** idOS stores credentials **already** [**encrypted to the user’s keys**](system-design), and access to contents requires a user-granted **Access Grant** to a specific consumer address. Current SDKs use [**x25519-xsalsa20-poly1305**](key-flows/encryption-flows) authenticated encryption. There’s no single point of failure and no platform risk. For additional privacy and security, in the future we plan to move the processing and computations from the AWS Nitro Enclave to the idOS MPC network, inside the Decentralized Storage Network hosted by different node operators across jurisdictions.
* **Very hard to spoof, accredited and battle tested engine.** Our biometric engine’s **1:1 matching** reports False Acceptance Rate **(FAR) = 1 / 125,000,000** at \~**<1% False Rejection Rate (FRR)** in its [official accuracy report](https://www.facetec.com/FaceTec_3D_Face_Matching_Whitepaper.pdf) and has also passed [independent PAD testings](https://facetec.com/FaceTec_BixeLab_3D_PAD_Test_Report_v1.0.pdf) (ISO/IEC 30107-3)**.** There is a [**live, public “Spoof Bounty”** of **$600k**](https://dev.facetec.com/spoof-bounty-program) for anyone that can go through its liveness/capture defenses— proving ongoing real-world scrutiny beyond one-time lab tests.
