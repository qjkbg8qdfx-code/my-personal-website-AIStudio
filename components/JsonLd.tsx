import React, { useEffect } from 'react';

const JsonLd: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Systematic Authority",
    "url": "https://systematic-authority.com",
    "logo": "https://systematic-authority.com/logo.png",
    "description": "Scaling SME Efficiency through AI Systems and Neuro-symbolic frameworks.",
    "founder": {
      "@type": "Person",
      "name": "Alex System",
      "sameAs": [
        "https://www.linkedin.com/in/alexsystem",
        "https://twitter.com/alexsystem"
      ]
    },
    "knowsAbout": ["Artificial Intelligence", "System Architecture", "Business Automation", "Next.js Performance"],
    "review": {
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": "Trusted Industry Expert"
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
        }
    }
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