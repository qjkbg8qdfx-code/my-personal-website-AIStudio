import React, { useEffect } from 'react';

const JsonLd: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Alex System",
        "jobTitle": "SME Systems Architect",
        "url": "https://systematic-authority.com",
        "sameAs": [
          "https://www.linkedin.com/in/alexsystem",
          "https://twitter.com/alexsystem"
        ]
      },
      {
        "@type": "Organization",
        "name": "Systematic Authority",
        "url": "https://systematic-authority.com",
        "logo": "https://systematic-authority.com/logo.png",
        "founder": {
          "@id": "https://systematic-authority.com/#person"
        },
        "description": "Scaling SME Efficiency through autonomous neuro-symbolic frameworks."
      },
      {
        "@type": "Service",
        "name": "The Trust Engine Methodology",
        "provider": { "@type": "Organization", "name": "Systematic Authority" },
        "description": "A proprietary neuro-symbolic automation audit that deconstructs manual workflows into atomic units for AI agent deployment.",
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Automation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "72-Hour Workflow Decomposition"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Autonomous Agent Deployment"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Neuro-Symbolic AI differ from standard automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike standard scripts, Neuro-Symbolic AI combines the reasoning capabilities of LLMs with the deterministic reliability of code execution, allowing for self-healing workflows."
            }
          },
          {
            "@type": "Question",
            "name": "What is the timeline for system deployment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most systems reach initial operational capability within 30 days, with an audit completed in the first 72 hours."
            }
          }
        ]
      }
    ]
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    script.id = 'json-ld-schema';
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('json-ld-schema');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  return null;
};

export default JsonLd;