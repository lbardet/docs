# W3C Verifiable Credentials

A Verifiable Credential (VC) is a collection of statements provably made by an issuer regarding their subject/holder and can be presented to a verifier. It contains claims, proofs, and metadata like the schema to which it conforms (e.g. the meaning of keys like "name") and the subject it refers to.

The idOS encourages identity verification providers to issue credentials that follow the [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) standard, as it's the most commonly accepted VC standard today, and our SDK is prepared to work with it.

Here's an abridged JSON-LD example of what a W3C VC looks like:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "...",
  "type": ["..."],
  "issuer": "FractalID (or others)",
  "issuanceDate": "...",
  "credentialSubject": {
    "id": "...",
    "level": "...",
    "wallets": [
      {
        "currency": "",
        "verified": true,
        "address": "",
      }
    ],
    "emails": [""],
    "phones": [],
    "residential_address": "",
    "residential_address_country": "",
    "residential_address_proof_date_of_expiry": "",
    "date_of_birth": "",
    "full_name": "",
    "identification_document_country": "",
    "identification_document_number": "",
    "identification_document_type": "",
    "place_of_birth": "",
    "identification_document_date_of_issue": "",
    "identification_document_date_of_expiry": ""
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "...",
    "verificationMethod": "...",
    "proofPurpose": "assertionMethod",
    "proofValue": "..."
  }
}
```

Verifiable credential authenticity can be trivially determined by verifying it according it to its embedded proof, which our SDK helps you do in one line of code.
