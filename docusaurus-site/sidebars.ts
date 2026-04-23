import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
  {
    "type": "category",
    "label": "Overview",
    "items": [
      {
        "type": "doc",
        "id": "index",
        "label": "What is idOS?"
      },
      {
        "type": "doc",
        "id": "why-idos",
        "label": "Why idOS?"
      },
      {
        "type": "doc",
        "id": "what-is-self-custodial-data",
        "label": "What is self-custodial data?"
      },
      {
        "type": "doc",
        "id": "market-focus",
        "label": "Market focus"
      },
      {
        "type": "category",
        "label": "Example use cases",
        "link": {
          "type": "doc",
          "id": "example-use-cases/index"
        },
        "items": [
          {
            "type": "doc",
            "id": "example-use-cases/neobank-wallet-integration",
            "label": "Neobank/wallet integration"
          },
          {
            "type": "doc",
            "id": "example-use-cases/financial-module-integration",
            "label": "Financial module integration"
          },
          {
            "type": "doc",
            "id": "example-use-cases/tradfi-onchain-integration",
            "label": "TradFi → onchain integration"
          }
        ]
      },
      {
        "type": "doc",
        "id": "the-idos-consortium",
        "label": "The idOS Consortium"
      }
    ]
  },
  {
    "type": "category",
    "label": "How It Works",
    "items": [
      {
        "type": "doc",
        "id": "how-it-works/system-design",
        "label": "System design"
      },
      {
        "type": "category",
        "label": "Key flows",
        "link": {
          "type": "doc",
          "id": "how-it-works/key-flows/index"
        },
        "items": [
          {
            "type": "doc",
            "id": "how-it-works/key-flows/encryption-flows",
            "label": "Encryption flows"
          },
          {
            "type": "doc",
            "id": "how-it-works/key-flows/data-flows",
            "label": "Data flows"
          }
        ]
      },
      {
        "type": "doc",
        "id": "how-it-works/biometrics-and-idos-facesign-beta",
        "label": "Biometrics & idOS FaceSign (Beta)"
      },
      {
        "type": "doc",
        "id": "how-it-works/mpc-for-encryption-keys",
        "label": "MPC for encryption keys"
      },
      {
        "type": "doc",
        "id": "how-it-works/faqs-users",
        "label": "FAQs - Users"
      },
      {
        "type": "doc",
        "id": "how-it-works/security",
        "label": "Security"
      },
      {
        "type": "doc",
        "id": "how-it-works/bug-bounty-program",
        "label": "Bug bounty program"
      }
    ]
  },
  {
    "type": "category",
    "label": "Compliance",
    "items": [
      {
        "type": "doc",
        "id": "compliance/legal-assessment",
        "label": "Legal Assessment"
      },
      {
        "type": "doc",
        "id": "compliance/idos-regulatory-approach",
        "label": "idOS Regulatory approach"
      },
      {
        "type": "category",
        "label": "KYC Re-usability",
        "link": {
          "type": "doc",
          "id": "compliance/kyc-re-usability/index"
        },
        "items": [
          {
            "type": "doc",
            "id": "compliance/kyc-re-usability/data-ingestion",
            "label": "Data ingestion"
          },
          {
            "type": "doc",
            "id": "compliance/kyc-re-usability/case-studies-for-kyc-re-usability",
            "label": "Case studies for KYC re-usability"
          }
        ]
      },
      {
        "type": "category",
        "label": "Compliance overview",
        "link": {
          "type": "doc",
          "id": "compliance/compliance-overview/index"
        },
        "items": [
          {
            "type": "doc",
            "id": "compliance/compliance-overview/idos-and-regulatory-frameworks",
            "label": "idOS & Regulatory frameworks"
          }
        ]
      },
      {
        "type": "doc",
        "id": "compliance/idos-compliance-partners",
        "label": "idOS Compliance partners"
      }
    ]
  },
  {
    "type": "doc",
    "id": "legal-considerations",
    "label": "Legal Considerations"
  },
  {
    "type": "category",
    "label": "Idos Token Launch",
    "items": [
      {
        "type": "doc",
        "id": "idos-token-launch/token-economy-and-revenue-streams",
        "label": "Token Economy & Revenue Streams"
      },
      {
        "type": "doc",
        "id": "idos-token-launch/token-allocation-and-distribution",
        "label": "Token Allocation & Distribution"
      },
      {
        "type": "doc",
        "id": "idos-token-launch/faqs-token-launch",
        "label": "FAQs - Token Launch"
      },
      {
        "type": "doc",
        "id": "idos-token-launch/official-links",
        "label": "Official links"
      }
    ]
  },
  {
    "type": "category",
    "label": "Integrate",
    "items": [
      {
        "type": "doc",
        "id": "integrate/journey-overview",
        "label": "Journey Overview"
      },
      {
        "type": "doc",
        "id": "integrate/consumer-guide",
        "label": "Consumer guide"
      },
      {
        "type": "doc",
        "id": "integrate/issuer-guide",
        "label": "Issuer guide"
      },
      {
        "type": "doc",
        "id": "integrate/faqs-developers",
        "label": "FAQs - Developers"
      },
      {
        "type": "doc",
        "id": "integrate/copy-of-idos-sdks",
        "label": "Copy of idOS SDKs"
      },
      {
        "type": "doc",
        "id": "integrate/getting-started-with-the-sdks",
        "label": "Getting Started With the SDKs"
      }
    ]
  }
],
};

export default sidebars;
