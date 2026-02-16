import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = () => {
    const siteTitle = "Harsh Kumar Shukla | SAP SD Consultant & Software Engineer";
    const siteDescription = "Harsh Kumar Shukla is a top-rated SAP SD Consultant and Software Engineer in India (Delhi/NCR). Specializing in SAP Sales & Distribution, React.js, Python, and AI/ML via MCA from Amity University. Explore his portfolio for projects and expertise.";
    const siteUrl = "https://harshshukla.com"; // Ideally replace with actual domain
    const siteImage = "/og-image.png"; // Placeholder path

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Harsh Kumar Shukla",
        "url": siteUrl,
        "image": `${siteUrl}${siteImage}`,
        "sameAs": [
            "https://www.linkedin.com/in/harsh-kumar-shukla-a42aa4138",
            "https://github.com/harshshukla2016",
            "https://twitter.com/harshshukla2016" // Example if exists
        ],
        "jobTitle": ["SAP SD Consultant", "Software Engineer"],
        "worksFor": {
            "@type": "Organization",
            "name": "Cognizant"
        },
        "alumniOf": [
            {
                "@type": "CollegeOrUniversity",
                "name": "Amity University Online"
            },
            {
                "@type": "CollegeOrUniversity",
                "name": "Dr. Virendra Swaroop Institute Of Computer Studies"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kanpur",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "India"
        },
        "description": siteDescription
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content="Harsh Kumar Shukla, SAP SD Consultant, Software Engineer, React Developer, AI/ML Specialist, India, Delhi, Kanpur, Uttar Pradesh, SAP Implementation, Web Development, Portfolio" />
            <meta name="author" content="Harsh Kumar Shukla" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
