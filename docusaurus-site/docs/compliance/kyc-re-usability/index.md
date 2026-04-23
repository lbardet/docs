# KYC Re-usability

As covered under the [Market focus ](../../market-focus.md)section, KYC re-usability is a key focus of idOS today and aims to solve one of the most significant pain points for both users and businesses: the need for repetitive and costly identity verification processes. Such an approach aligns well with idOS’ mission: by enabling users to reuse credentials across a diverse ecosystem of applications and services, idOS aims to offer a seamless User Experience while allowing for adherence to stringent regulatory requirements.

At the heart of the idOS’ solution for KYC re-usability is **Data Ingestion**.

#### **Data Ingestion**

[Data Ingestion](data-ingestion.md) is the supported KYC re-usability mechanism within idOS.

The user can share a KYC data package, encapsulated within a credential, directly with a Data Consumer.

The Data Consumer of such credential may still need to verify the corresponding data package before making a decision to onboard the user (including, for example, performing an additional liveness check). While this involves additional effort compared to direct reliance models, it eliminates the need for users to resubmit their information repeatedly and still offers significant time and cost savings compared to traditional KYC processes. This process is facilitated by the [idOS SDK](/broken/pages/hpS8ofIxIwM3fj8nNdtF).

By supporting Data Ingestion for KYC re-usability, idOS aims to reduce repeated data collection while preserving user control and supporting compliance-sensitive workflows.
