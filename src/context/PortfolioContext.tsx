import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultData = {
    hero: {
        mainHeadline: "Harsh Kumar Shukla",
        subHeadline: "SAP SD Consultant & Software Engineer",
        color: "#00f3ff"
    },
    about: {
        title: "About Me",
        p1: "I am a highly driven SAP SD Consultant and Software Engineer. With a solid foundation in both enterprise solutions and modern web development, I bridge the gap between robust backend processes and beautiful frontend experiences.",
        p2: "My passion lies in creating optimized, scalable systems while ensuring a seamless, futuristic user interface. I thrive in fast-paced environments where I can leverage my unique blend of SAP expertise and full-stack development skills.",
        exp: 2,
        projects: 15
    },
    experience: [
        {
            company: 'Cognizant',
            role: 'SAP SD Consultant',
            period: 'Nov 2025 - Present',
            location: 'Chennai, Tamil Nadu',
            description: ['Currently working as an SAP SD Consultant, leveraging expertise in Sales and Distribution modules.', 'Contributing to large-scale enterprise resource planning implementation and support projects.'],
        },
        {
            company: 'Learn With Fraternity Pvt Ltd',
            role: 'Software Engineer',
            period: 'Apr 2024 - Apr 2025',
            location: 'Dehradun, Uttarakhand',
            description: ['Crafted robust and scalable software solutions involving SQL, AWS, and Windows software development.', 'Collaborated on impactful projects driving efficiency in dynamic environments.'],
        }
    ],
    education: [
        {
            institution: 'Amity University Online',
            degree: 'Masters Of Computer Application (MCA)',
            specialization: 'Artificial Intelligence / Machine Learning',
            period: 'Jan 2024 - Present',
            description: 'Focused on principles of AI, ML, NLP, and predictive analytics for intelligent systems.',
        },
        {
            institution: 'Dr. Virendra Swaroop Institute Of Computer Studies',
            degree: 'Bachelors Of Computer Application (BCA)',
            specialization: 'Computer Science Fundamentals',
            period: 'Aug 2020 - 2023',
            grade: '73.0%',
            description: 'Comprehensive study in software development, database management, and web technologies.',
        }
    ],
    skills: {
        frontend: 'React, Next.js, TailwindCSS, Framer Motion',
        backend: 'Node.js, Express, MongoDB, Git',
        sap: 'SAP SD, SAP MM'
    },
    customProjects: [],
    jobs: [],
    global: {
        resumeUrl: "Harsh_Kumar_Shukla_Resume_fresher.pdf", // default fallback
        email: "contact@harsh.com",
        linkedin: "https://linkedin.com/in/harshshukla2016",
        github: "harshshukla2016"
    }
};

const PortfolioContext = createContext<any>(null);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem('portfolioData');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Deep merge with defaults to fill any missing fields
                return {
                    ...defaultData,
                    ...parsed,
                    hero: { ...defaultData.hero, ...(parsed.hero || {}) },
                    about: { ...defaultData.about, ...(parsed.about || {}) },
                    skills: { ...defaultData.skills, ...(parsed.skills || {}) },
                    global: { ...defaultData.global, ...(parsed.global || {}) },
                    experience: Array.isArray(parsed.experience) ? parsed.experience : defaultData.experience,
                    education: Array.isArray(parsed.education) ? parsed.education : defaultData.education,
                    customProjects: Array.isArray(parsed.customProjects) ? parsed.customProjects : [],
                    jobs: Array.isArray(parsed.jobs) ? parsed.jobs : [],
                };
            }
        } catch (e) {
            console.warn('Failed to load portfolioData from localStorage, using defaults', e);
        }
        return defaultData;
    });

    const [theme, setTheme] = useState('cyan'); // 'cyan', 'magenta', 'amber', 'emerald'

    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(data));
    }, [data]);

    const updateData = (section: string, newData: any) => {
        setData((prev: any) => ({
            ...prev,
            [section]: newData
        }));
    };

    return (
        <PortfolioContext.Provider value={{ data, updateData, theme, setTheme }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
