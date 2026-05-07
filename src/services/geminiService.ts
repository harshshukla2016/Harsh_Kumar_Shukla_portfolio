/**
 * AI Service — Supports multiple providers (Gemini & Groq) for high availability.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ─── PORTFOLIO CONTEXT ───────────────────────────────────────
const PORTFOLIO_URL = 'https://harsh-kumar-shukla.vercel.app';
const PORTFOLIO_CONTEXT = `
Author: Harsh Kumar Shukla
Role: SAP SD Consultant & Software Engineer at Cognizant
Skills: Python, React.js, JavaScript, SQL, C++, Java, SAP SD, AWS, AI/ML
Education: MCA (AI/ML) from Amity University, BCA from Dr. Virendra Swaroop Institute
Portfolio URL: ${PORTFOLIO_URL}
LinkedIn: https://linkedin.com/in/harsh-kumar-shukla-a42aa4138
GitHub: https://github.com/harshshukla2016
`;

// ─── TYPES ───────────────────────────────────────────────────
export interface BlogTopic {
    id: string;
    title: string;
    summary: string;
    category: string;
    tags: string[];
    estimatedReadTime: string;
    seoScore: number;
    generatedAt: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    tags: string[];
    readTime: string;
    author: string;
    publishedAt: string;
    portfolioLinks: { text: string; url: string }[];
    relatedTopics: string[];
    seoMeta: {
        title: string;
        description: string;
        keywords: string[];
    };
}

// ─── API CALLS ───────────────────────────────────────────────

async function callGemini(prompt: string): Promise<string> {
    if (!GEMINI_API_KEY) throw new Error('Gemini API key not configured');
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 8192,
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `Gemini API error: ${response.status}`;
        
        // Check for quota error
        if (response.status === 429 || message.toLowerCase().includes('quota')) {
            if (GROQ_API_KEY) {
                console.warn('Gemini quota exceeded, falling back to Groq...');
                return callGroq(prompt);
            }
            throw new Error('Gemini quota exceeded. Please add a GROQ API key as backup or wait a few minutes.');
        }
        throw new Error(message);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

async function callGroq(prompt: string): Promise<string> {
    if (!GROQ_API_KEY) throw new Error('Groq API key not configured');

    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are an SEO-expert tech blog writer." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 4096
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() || '';
}

// Smart call that tries Gemini first, then Groq
async function callAI(prompt: string): Promise<string> {
    try {
        return await callGemini(prompt);
    } catch (err: any) {
        if (GROQ_API_KEY && !err.message.includes('Groq API error')) {
            return await callGroq(prompt);
        }
        throw err;
    }
}

function parseJsonResponse(text: string): any {
    let clean = text;
    // Remove markdown code fences if present
    if (clean.includes('```')) {
        clean = clean.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1');
    }
    // Final trim to remove any leading/trailing whitespace
    clean = clean.trim();
    
    try {
        return JSON.parse(clean);
    } catch (e) {
        console.error('Failed to parse JSON response:', clean);
        throw new Error('AI returned invalid JSON format. Please try again.');
    }
}

// ─── STORAGE ─────────────────────────────────────────────────
const TOPICS_KEY = 'blog_topics';
const POSTS_KEY = 'blog_posts';
const LAST_FETCH_KEY = 'blog_last_fetch';

export function getStoredTopics(): BlogTopic[] {
    try {
        const data = localStorage.getItem(TOPICS_KEY);
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

export function getStoredPosts(): BlogPost[] {
    try {
        const data = localStorage.getItem(POSTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

function storeTopics(topics: BlogTopic[]) {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
}

function storePosts(posts: BlogPost[]) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function getLastFetchDate(): string | null {
    return localStorage.getItem(LAST_FETCH_KEY);
}

function setLastFetchDate() {
    localStorage.setItem(LAST_FETCH_KEY, new Date().toISOString().split('T')[0]);
}

export function shouldRefreshTopics(): boolean {
    const lastFetch = getLastFetchDate();
    if (!lastFetch) return true;
    const today = new Date().toISOString().split('T')[0];
    return lastFetch !== today;
}

// ─── TOPIC GENERATION ────────────────────────────────────────
export async function fetchTrendingTopics(): Promise<BlogTopic[]> {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const existingPosts = getStoredPosts();
    const existingTitles = existingPosts.map(p => p.title).join(', ');

    const prompt = `You are an SEO-expert blog strategist for a tech professional's portfolio.

${PORTFOLIO_CONTEXT}

Today is ${today}.

EXISTING blog posts (DO NOT repeat these topics): ${existingTitles || 'None yet'}

Generate 6 trending, high-SEO-value blog topic suggestions that would:
1. Drive organic traffic to a software engineer / SAP consultant portfolio
2. Cover current tech trends in 2026 (AI, SAP S/4HANA, React, cloud, etc.)
3. Be relevant to the author's expertise
4. Have strong search intent and keyword potential
5. Be unique from any existing posts

Return ONLY valid JSON array with this exact structure (no markdown, no code fences):
[
  {
    "title": "...",
    "summary": "2-3 sentence compelling summary",
    "category": "one of: AI & ML, Web Development, SAP & ERP, Cloud & DevOps, Career & Tech, Tutorial",
    "tags": ["tag1", "tag2", "tag3"],
    "estimatedReadTime": "X min read",
    "seoScore": 85
  }
]`;

    const text = await callAI(prompt);
    const parsed = parseJsonResponse(text) as any[];

    const topics: BlogTopic[] = parsed.map((t, i) => ({
        id: `topic-${Date.now()}-${i}`,
        title: t.title,
        summary: t.summary,
        category: t.category,
        tags: t.tags || [],
        estimatedReadTime: t.estimatedReadTime || '5 min read',
        seoScore: t.seoScore || 80,
        generatedAt: new Date().toISOString(),
    }));

    storeTopics(topics);
    setLastFetchDate();
    return topics;
}

// ─── FULL BLOG GENERATION ────────────────────────────────────
export async function generateFullBlog(topic: BlogTopic): Promise<BlogPost> {
    const existingPosts = getStoredPosts();
    const existingTitles = existingPosts.map(p => `"${p.title}"`).join(', ');

    const prompt = `You are a senior technical content writer creating a blog post for a software engineer's portfolio website.

${PORTFOLIO_CONTEXT}

BLOG TOPIC: "${topic.title}"
CATEGORY: ${topic.category}
SUMMARY: ${topic.summary}

EXISTING blog posts on this portfolio (link to these when relevant): ${existingTitles || 'None yet'}

Write a comprehensive, SEO-optimized blog post following these rules:

1. **Length**: 1500-2500 words, well-structured with clear headings (##, ###)
2. **Tone**: Professional yet approachable, showing expertise
3. **SEO**: Naturally integrate keywords, use descriptive headings
4. **Author connection**: Naturally mention how this topic connects to Harsh's work or expertise (1-2 times, not forced)
5. **Links back to portfolio**: Include 2-3 natural references to the portfolio sections:
   - Projects: ${PORTFOLIO_URL}/#projects
   - Skills: ${PORTFOLIO_URL}/#skills
   - Contact: ${PORTFOLIO_URL}/#contact
   - Experience: ${PORTFOLIO_URL}/#experience
6. **Internal linking**: If relevant, reference existing blog posts: ${existingTitles}
7. **External references**: Include 3-5 real, credible external links (docs, articles, tools)
8. **Related topics**: Suggest 3 topics for future blog posts
9. **Code examples**: Include practical code snippets where relevant
10. **Conclusion**: End with a CTA linking to the portfolio contact section

Return ONLY valid JSON (no markdown fences) with this structure:
{
  "title": "SEO-optimized title",
  "slug": "url-friendly-slug",
  "summary": "Meta description (150-160 chars)",
  "content": "Full blog in markdown format",
  "category": "${topic.category}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readTime": "X min read",
  "portfolioLinks": [
    {"text": "link anchor text", "url": "${PORTFOLIO_URL}/#section"}
  ],
  "relatedTopics": ["Future topic 1", "Future topic 2", "Future topic 3"],
  "seoMeta": {
    "title": "SEO title | Harsh Kumar Shukla",
    "description": "Meta description for search engines",
    "keywords": ["keyword1", "keyword2"]
  }
}`;

    const text = await callAI(prompt);
    const parsed = parseJsonResponse(text);

    const post: BlogPost = {
        id: `post-${Date.now()}`,
        title: parsed.title,
        slug: parsed.slug || topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        summary: parsed.summary,
        content: parsed.content,
        category: parsed.category || topic.category,
        tags: parsed.tags || topic.tags,
        readTime: parsed.readTime || topic.estimatedReadTime,
        author: 'Harsh Kumar Shukla',
        publishedAt: new Date().toISOString(),
        portfolioLinks: parsed.portfolioLinks || [],
        relatedTopics: parsed.relatedTopics || [],
        seoMeta: parsed.seoMeta || {
            title: `${parsed.title} | Harsh Kumar Shukla`,
            description: parsed.summary,
            keywords: parsed.tags || [],
        },
    };

    // Store the post
    const allPosts = getStoredPosts();
    allPosts.unshift(post);
    storePosts(allPosts);

    return post;
}

// ─── UTILITY ─────────────────────────────────────────────────
export function getPostBySlug(slug: string): BlogPost | undefined {
    return getStoredPosts().find(p => p.slug === slug);
}

export function deletePost(postId: string) {
    const posts = getStoredPosts().filter(p => p.id !== postId);
    storePosts(posts);
}

export function isApiKeyConfigured(): boolean {
    return !!GEMINI_API_KEY || !!GROQ_API_KEY;
}
