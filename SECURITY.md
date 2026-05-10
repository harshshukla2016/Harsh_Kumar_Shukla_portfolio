# Security Policy

## 🛡️ Our Commitment
The **Harsh OS** project is committed to providing a secure and responsible digital experience. As an AI-powered professional ecosystem, we prioritize data integrity and the safe use of Google AI services.

---

## 🔒 Security Implementations

### 1. Environment Variable Protection
We strictly manage all sensitive API keys (Google Gemini, Groq, Firebase) using environment variables. These keys are never hardcoded in the client-side logic and are injected during the build process to prevent leakage.

### 2. Prompt Injection Mitigation
Our AI Navigator (Gemini-powered) uses a predefined **System Instruction** set that restricts the AI from executing unauthorized commands or revealing internal configuration details. This ensures that the assistant remains professional and within its functional boundaries.

### 3. Data Privacy
- **Lead Tracking**: All recruiter leads captured by the AI are stored locally in the browser's `localStorage`. No personal data is transmitted to third-party databases without explicit consent.
- **Sanitization**: All user inputs in the ChatBot and Contact forms are sanitized to prevent Cross-Site Scripting (XSS) and SQL Injection attacks.

---

## 🚀 Responsible AI Use
We follow Google's **Generative AI Prohibited Use Policy**. Our AI implementation:
- Does not generate harmful or misleading content.
- Provides clear disclosure that users are interacting with an AI assistant.
- Focuses exclusively on professional and career-related contexts.

---

## 📞 Reporting a Vulnerability
If you discover a security vulnerability within this project, please contact us immediately:
- **Email**: harshshukla2016@gmail.com
- **Response Time**: We aim to respond within 24 hours.
