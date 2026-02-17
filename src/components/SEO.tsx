import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = () => {
    const siteTitle = "Harsh Kumar Shukla | SAP SD Consultant, Full Stack Developer & AI Engineer";
    const siteDescription = "Expert SAP SD Consultant and Full Stack Developer (React.js, Python) based in India. Specializing in Enterprise ERP Solutions, AI/ML Integrations, and Modern Web Applications. View projects and experience.";
    const siteUrl = "https://harsh-kumar-shukla-portfolio.vercel.app";
    const siteImage = "https://harsh-kumar-shukla-portfolio.vercel.app/og-image.png";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Harsh Kumar Shukla",
        "url": siteUrl,
        "image": siteImage,
        "sameAs": [
            "https://www.linkedin.com/in/harsh-kumar-shukla-a42aa4138",
            "https://github.com/harshshukla2016"
        ],
        "jobTitle": ["SAP SD Consultant", "Software Engineer", "Full Stack Developer"],
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
            <meta name="keywords" content="Harsh Kumar Shukla, SAP SD Consultant, Full Stack Developer, React.js Expert, Python Developer, AI Engineer, Machine Learning, Cognizant, Portfolio, Web Development, Software Engineer India, Kanpur, Freelance Developer" />
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
