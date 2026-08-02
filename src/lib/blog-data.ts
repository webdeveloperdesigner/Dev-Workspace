export interface BlogPost {
  slug: string;
  aliases?: string[];
  title: string;
  excerpt: {
    en: string;
    hi: string;
  };
  content: {
    en: string;
    hi: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nextjs-performance-tips",
    aliases: ["building-high-performance-nextjs-16-apps"],
    title: "Architecting High-Performance Web Apps with Next.js 16 & React 19",
    excerpt: {
      en: "Deep dive into server components, static generation optimization, streaming UI, and minimal client JS bundles.",
      hi: "सर्वर घटकों, स्थैतिक पीढ़ी अनुकूलन, स्ट्रीमिंग यूआई और न्यूनतम क्लाइंट जेएस बंडलों में गहराई से उतरें।",
    },
    content: {
      en: `Next.js 16 and React 19 introduce powerful paradigm shifts in full-stack web development. In this article, we explore how to achieve near-instantaneous page transitions, optimal Core Web Vitals, and sleek user interfaces.

## 1. Leverage Server Components by Default

Keep heavy dependencies and data parsing strictly on the server. Server Components run zero JavaScript on the client, drastically reducing your bundle size.

- **Zero Bundle Impact**: Heavy libraries stay on the server.
- **Direct Database Access**: Fetch data right where it lives without public API exposure.
- **Improved Security**: Keep secrets and tokens off the browser.

## 2. Fine-Grained Client Boundaries

Only mark interactive widgets (like Theme Switches, Drawers, and Dock Navigation) with \`"use client"\`. Keep client components at the leaves of your component tree.

\`\`\`tsx
// Example Server Component pattern
export default async function Page() {
  const data = await fetchPortfolioData();
  return <PortfolioView data={data} />;
}
\`\`\`

## 3. Streaming & Suspense Boundaries

Break your page into independent chunks using React Suspense. Show fast initial shells while heavier data streams in asynchronously.

> "A great user experience starts with immediate visual feedback before data finishes loading."

## 4. Optimized Asset Loading

Utilize Next/Font for self-hosted zero-CLS fonts and Next/Image for automated modern WebP/AVIF formatting and responsive scaling.

## Conclusion

By adhering to modern App Router architectural rules, web applications achieve 100/100 Lighthouse performance scores while delivering rich, app-like interactive experiences.`,
      hi: `Next.js 16 और React 19 फुल-स्टैक वेब डेवलपमेंट में शक्तिशाली बदलाव पेश करते हैं। इस लेख में, हम जानते हैं कि लगभग तत्काल पृष्ठ परिवर्तन, इष्टतम कोर वेब वाइटल्स और सुरुचिपूर्ण उपयोगकर्ता इंटरफ़ेस कैसे प्राप्त करें।

## 1. डिफ़ॉल्ट रूप से सर्वर घटकों का लाभ उठाएं

सर्वर पर भारी निर्भरता और डेटा पार्सिंग रखें। सर्वर घटक क्लाइंट पर शून्य जावास्क्रिप्ट चलाते हैं, जिससे आपका बंडल आकार अत्यधिक कम हो जाता है।

- **शून्य बंडल प्रभाव**: भारी लाइब्रेरी सर्वर पर ही रहती हैं।
- **प्रत्यक्ष डेटाबेस पहुंच**: सार्वजनिक एपीआई एक्सपोजर के बिना डेटा प्राप्त करें।
- **बेहतर सुरक्षा**: गोपनीय कुंजियों को ब्राउज़र से दूर रखें।

## 2. फाइन-ग्रेन्ड क्लाइंट सीमाएं

केवल इंटरैक्टिव विजेट्स (जैसे थीम स्विच, ड्रॉअर और डॉक नेविगेशन) को \`"use client"\` से चिह्नित करें।

\`\`\`tsx
// सर्वर घटक पैटर्न का उदाहरण
export default async function Page() {
  const data = await fetchPortfolioData();
  return <PortfolioView data={data} />;
}
\`\`\`

## 3. निष्कर्ष

आधुनिक ऐप राउटर वास्तुकला के नियमों का पालन करके, वेब एप्लिकेशन 100/100 लाइटहाउस प्रदर्शन स्कोर प्राप्त करते हैं।`,
    },
    date: "2026-07-28",
    readTime: "4 min",
    tags: ["Next.js", "React 19", "Web Vitals", "Architecture"],
  },
  {
    slug: "building-ai-agents-with-python",
    title: "Building Autonomous AI Agents & Tool Integrations with Python",
    excerpt: {
      en: "Learn how to orchestrate multi-agent workflows, tool calling APIs, and contextual memory using modern LLM frameworks.",
      hi: "आधुनिक LLM फ्रेमवर्क का उपयोग करके मल्टी-एजेंट वर्कफ़्लो, टूल कॉलिंग एपीआई और प्रासंगिक मेमोरी को व्यवस्थित करना सीखें।",
    },
    content: {
      en: `Artificial Intelligence is evolving rapidly from single-prompt chat completion into autonomous AI agents capable of planning, executing terminal commands, querying databases, and calling external APIs.

## The Architecture of an Agent

An effective AI agent relies on four core pillars:

1. **Planning & Reasoning**: Breaking complex goals into sequential sub-tasks.
2. **Tool Execution**: Executing tools (web search, terminal, code execution).
3. **Contextual Memory**: Storing conversation trajectory in persistent vectors or structured logs.
4. **Self-Correction**: Evaluating execution output and adjusting plans dynamically.

\`\`\`python
# Example Agent Tool Calling Execution
async function execute_agent_step(prompt: str):
    response = await llm.generate_with_tools(prompt, tools=[search_tool, code_runner])
    if response.has_tool_call:
        result = await response.tool_call.execute()
        return await llm.continue_with_result(result)
\`\`\`

## Conclusion

Agentic AI represents the future of developer workflows, automation, and decision-support platforms.`,
      hi: `आर्टिफिशियल इंटेलिजेंस एकल-प्रॉम्प्ट चैट से तेजी से स्वायत्त एआई एजेंटों में विकसित हो रहा है जो योजना बनाने, कमांड निष्पादित करने और डेटाबेस क्वेरी करने में सक्षम हैं।

## एजेंट का आर्किटेक्चर

एक प्रभावी AI एजेंट चार मुख्य स्तंभों पर निर्भर करता है:

1. **योजना और तर्क**: जटिल लक्ष्यों को अनुक्रमिक उप-कार्यों में तोड़ना।
2. **टूल निष्पादन**: वेब खोज, टर्मिनल और कोड निष्पादित करना।
3. **मेमोरी**: वार्तालाप इतिहास को याद रखना।`,
    },
    date: "2026-07-22",
    readTime: "5 min",
    tags: ["AI Agents", "Python", "LLM", "Automation"],
  },
  {
    slug: "mastering-tailwind-v4-design-systems",
    title: "Mastering Clean Design Systems with Tailwind CSS v4",
    excerpt: {
      en: "How to craft customizable dark/light themes, smooth glassmorphism effects, and cohesive typography tokens.",
      hi: "अनुकूलन योग्य डार्क/लाइट थीम, सुचारू ग्लासमोर्फिज्म प्रभाव और सुसंगत टाइपोग्राफी टोकन कैसे तैयार करें।",
    },
    content: {
      en: `Tailwind CSS v4 revolutionizes how developers handle design tokens directly within CSS stylesheets.

## Key Features in Tailwind v4

- Direct CSS imports: \`@import "tailwindcss";\`
- Custom theme variables: \`@theme { --font-sans: var(--font-geist-sans); }\`
- Seamless dark mode support using CSS custom properties.

\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
}
\`\`\`

## Conclusion

Tailwind CSS v4 offers incredible performance, cleaner syntax, and native CSS variable integration for scalable UI systems.`,
      hi: `Tailwind CSS v4 इस बात में क्रांति लाता है कि डेवलपर्स सीधे CSS स्टाइलशीट के भीतर डिज़ाइन टोकन को कैसे संभालते हैं।

## Tailwind v4 में मुख्य विशेषताएं

- डायरेक्ट CSS इम्पोर्ट: \`@import "tailwindcss";\`
- कस्टम थीम चर।
- निर्बाध डार्क मोड समर्थन।`,
    },
    date: "2026-07-20",
    readTime: "3 min",
    tags: ["Tailwind CSS", "Design System", "CSS"],
  },
];
