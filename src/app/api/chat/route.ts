import { NextResponse } from "next/server";
import {
  PERSONAL_DATA,
  EXPERIENCES,
  PROJECTS,
  ORGANIZATIONS,
  TECH_STACK_ITEMS,
} from "@/lib/data";

interface HistoryMessage {
  sender: "user" | "ai";
  text: string;
}

// In-memory rate limiting map for chat API protection (IP-based)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request) {
  try {
    // 1. IP extraction & Rate Limiting (max 20 requests per minute per IP)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous-client";

    const now = Date.now();
    const clientRecord = rateLimitMap.get(ip);

    if (clientRecord && now < clientRecord.resetTime) {
      if (clientRecord.count >= 20) {
        return NextResponse.json(
          {
            reply: "You've sent quite a few messages! Please wait a moment before sending another.",
            source: "offline",
            suggestions: ["Contact Vivek", "Projects", "Skills"],
          },
          { status: 429 }
        );
      }
      clientRecord.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 });
    }

    const { message, language, history } = await req.json();
    const rawUserQuery = (message || "").trim();

    // 2. Input Length & Sanitation Limit (Prevent prompt injection / token exhaustion attacks)
    const userQuery = rawUserQuery.slice(0, 500);
    if (!userQuery) {
      return NextResponse.json({ reply: "Please enter a message." }, { status: 400 });
    }

    // Format conversation history
    const conversationHistory = Array.isArray(history)
      ? (history as HistoryMessage[]).slice(-8).map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }))
      : [];

    // Fetch live GitHub data when queried
    let githubLiveInfo = "";
    const isGithubQuery =
      /github|repo|repository|code|project|git|bodhai|chatbot|प्रोजेक्ट|गिटहब/i.test(
        userQuery
      );

    if (isGithubQuery) {
      try {
        const ghRes = await fetch(
          "https://api.github.com/users/webdeveloperdesigner/repos?sort=updated&per_page=6",
          { headers: { "User-Agent": "antigravity-portfolio" }, next: { revalidate: 60 } }
        );
        if (ghRes.ok) {
          const repos = await ghRes.json();
          if (Array.isArray(repos) && repos.length > 0) {
            githubLiveInfo = repos
              .map(
                (r: { name: string; description: string; html_url: string; language: string }) =>
                  `- **${r.name}** (${r.language || "TypeScript/JavaScript"}): ${r.description || "Project repository"}. [Repo Link](${r.html_url})`
              )
              .join("\n");
          }
        }
      } catch {
        // Fallback silently
      }
    }

    const defaultApiSuggestions = [
      "Tell me about Vivek",
      "Skills & Tech Stack",
      "Certifications & Achievements",
      "Explore All Projects",
      "Work Experience",
      "Education Details",
      "Contact Vivek",
      "Latest Announcements",
      "Open Desktop Portfolio",
    ];
    // Format live date and time in IST (Indian Standard Time)
    const currentDateTimeIST = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date());

    // System prompt engineered for strict portfolio & Vivek scope
    const systemContext = `
You are Vivek's AI Companion on his personal Developer Portfolio.
Your sole mission is to assist visitors with information about Vivek: his projects, technical skills (Full-Stack, Blockchain, AI), work experience, education at GLA University, and how to contact him.

Language: ${language === "hi" ? "Hindi" : "English"}
Current Live System Date & Time: ${currentDateTimeIST} (IST)

# STRICT SCOPE & BOUNDARY RULES:
1. **PORTFOLIO BOUNDARY**:
   - You MUST ONLY answer questions related to Vivek, his portfolio, his skills, his projects (like BodhAI), his tech stack (React, Next.js, Solidity, Firebase, etc.), or getting in touch with him.
   - **DATE & TIME EXCEPTION**: When asked about the current date, time, or today, you DO have real-time access through the system prompt! Answer directly with the live date and time provided above (${currentDateTimeIST}), warmly mentioning it's in IST.
   - If the user asks about completely unrelated, out-of-scope topics (e.g. general drafting unrelated letters, politics, sports, random coding tasks not related to Vivek's work, general knowledge trivia):
     - **Politely decline and redirect back to Vivek's portfolio**.
     - Example response: "I'm specifically tuned to answer questions about Vivek's portfolio, projects, and skills. Feel free to ask about his work on BodhAI, his Blockchain experience, or his tech stack!"

2. **RELEVANT TECHNICAL KNOWLEDGE EXCEPTION**:
   - If the user asks about a technical concept directly connected to Vivek's tech stack (e.g. "What is ERC-20?", "What is Solidity?", "How does Next.js work with Firebase?"):
     - You may give a brief 2-sentence explanation of the concept, but immediately connect it back to how Vivek uses it.

3. **CONCISE & DIRECT**:
   - Keep all responses concise (under 2-3 short paragraphs or bullet points).
   - NEVER generate generic long essays, multi-option templates, or unrelated generic drafts.
   - For contacting Vivek, ALWAYS format contact links as individual, dedicated bullet points on their own line so they render cleanly:
     * 📧 Email: [${PERSONAL_DATA.email}](mailto:${PERSONAL_DATA.email})
     * 💼 LinkedIn: [linkedin.com/in/vivek-vns](${PERSONAL_DATA.linkedin})
     * 🐙 GitHub: [github.com/webdeveloperdesigner](${PERSONAL_DATA.github})
   - NEVER combine multiple contact links inside a single sentence (e.g. avoid "review on GitHub or connect via LinkedIn" on one line). Keep them as separate bullet points.
   - **UPCOMING FEATURE (1-on-1 Live Chat & Direct Contact)**:
     - If visitors ask about live chat, real-time messaging, 1-on-1 calls, direct live support, or real-time communication:
       - Clearly inform them that **1-on-1 Live Chat & Direct Contact** is **Available Soon**!
       - In the meantime, invite them to connect directly via [Email](mailto:${PERSONAL_DATA.email}) or [LinkedIn](${PERSONAL_DATA.linkedin}).
   - **PORTFOLIO NOTICES & ANNOUNCEMENTS**:
     - If the visitor asks for "notice", "notices", "announcements", "important notice", "latest announcements", or "नोटिस":
       - Respond in natural, conversational markdown:
         * ⚡ **AI Assistant Updates in Progress**: We're working to make your experience smarter, faster, and more accurate!
         * ⏳ **Awards & Certifications**: Data update is in progress; verified original data will be uploaded soon to replace demo entries.
         * 💻 **Desktop Experience**: This portfolio is optimized for desktop at [https://vivek01.vercel.app/](https://vivek01.vercel.app/).
         * 📜 **Changelog**: All version milestones from v0.1.0 to v2.0.0 are documented on [/changelog](/changelog).
   - **DESKTOP-FIRST PORTFOLIO**:
     - Vivek's dedicated desktop experience is live at [https://vivek01.vercel.app/](https://vivek01.vercel.app/). Note that this portfolio is designed specifically for desktop devices.

    - **AWARDS & CERTIFICATIONS STATUS**:
      - If visitors ask about certificates, awards, credentials, or achievements:
        - Clarify that Vivek's 3 major certifications are verified & accurate (Oracle OCI AI Foundations, IIT Madras Shaastra Fullstack, DevTown Web Dev), while other entries (like GLA Hackathon participant) are currently placeholders/demo data.
        - Emphasize that the full verified Awards & Certifications data update is **currently in progress and will be updated with original data soon**! Visitors can inspect ongoing updates at [/achievements](/achievements).

4. **Changelog & Updates Awareness**:
   - If the user asks about updates, changelog, new versions, or what's new (e.g. "what's new?", "show changelog", "updates", "चेंजलॉग"):
     - Explain the recent milestone highlights:
       - **v2.0.1 (Latest Patch - Nov 1, 2026)**: Secure 30-min sessionStorage chat persistence, stabilized dual AI runners with seamless failover, and live AI update notices.
       - **v2.0.0 (Major Release - Oct 31, 2026)**: Sub-second live AI Companion, enterprise security headers & IP rate limiting, and updated verified tech stack.
       - **v1.9.0**: Interactive clickable contact cards for Email, LinkedIn, and GitHub.
       - **v1.8.0**: Turbopack root config & build speed fixes.
       - **v1.5.0**: Custom glowing VK logo favicon and Dev-Workspace AI foundation.
       - **Full History**: Portfolio timeline spans from initial inception **v0.1.0** (July 1, 2026) to **v2.0.1** (Today).
     - Direct the user to view the complete visual timeline: "You can explore the full interactive timeline on the [/changelog](/changelog) page!"

5. **TONE & PERSONA**:
   - Warm, friendly, tech-savvy peer.
   - Highlight key projects like **BodhAI** and his **Blockchain Engineering** foundation at **GLA University**.

# Vivek's Profile Data:
- **Name**: ${PERSONAL_DATA.name}
- **Role**: ${PERSONAL_DATA.title}
- **Location**: ${PERSONAL_DATA.location}
- **Email**: ${PERSONAL_DATA.email}
- **GitHub**: ${PERSONAL_DATA.github}
- **LinkedIn**: ${PERSONAL_DATA.linkedin}
- **Education**: B.Tech CSE at GLA University (2022-2026).

# Featured Projects:
${PROJECTS.map(
  (p) => `
- **${p.title}** (${p.category}): ${p.description.en}
  - **Tech**: ${p.tags.join(", ")}
  - **Features**: ${p.features.en.join("; ")}
  - **GitHub**: ${p.githubUrl || PERSONAL_DATA.github}
`
).join("\n")}

${githubLiveInfo ? `# Live Repos:\n${githubLiveInfo}` : ""}

# Work Experience:
${EXPERIENCES.map(
  (exp) =>
    `- **${exp.role}** at **${exp.company}** (${exp.period}): ${exp.description.en} [Skills: ${exp.skills.join(", ")}]`
).join("\n")}

# Organizations & Leadership:
${ORGANIZATIONS.map(
  (org) =>
    `- **${org.name}** (${org.role.en}, ${org.period}): ${org.description.en}${org.tags ? ` [Tags: ${org.tags.join(", ")}]` : ""}`
).join("\n")}

# Technical Stack:
${TECH_STACK_ITEMS.map((t) => t.name).join(", ")}
`;

    const apiKeyGroq = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const apiKeyGemini = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // 1. Try Groq API FIRST (ultra-fast ~200ms latency, high availability)
    if (apiKeyGroq) {
      try {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKeyGroq}`,
            },
            body: JSON.stringify({
              model: "qwen/qwen3.8-27b",
              messages: [
                { role: "system", content: systemContext },
                ...conversationHistory,
                { role: "user", content: userQuery },
              ],
              temperature: 0.6,
              max_tokens: 650,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              source: "groq",
              suggestions: defaultApiSuggestions,
            });
          }
        } else {
          const groqErr = await response.text();
          console.warn("Groq primary failed, status:", response.status, groqErr);
        }
      } catch (err) {
        console.error("Groq primary error:", err);
      }
    }

    // 2. Try Google Gemini API as resilient BACKUP runner (gemini-3.1-flash-lite)
    if (apiKeyGemini) {
      try {
        const geminiHistory = conversationHistory.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n");
        const fullPrompt = `${systemContext}\n\n# Conversation History:\n${geminiHistory}\n\nUser Question: ${userQuery}`;

        const geminiModels = ["gemini-3.1-flash-lite", "gemini-3.5-flash-lite", "gemini-flash-latest"];
        for (const modelName of geminiModels) {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKeyGemini}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKeyGemini,
              },
              body: JSON.stringify({
                contents: [{ parts: [{ text: fullPrompt }] }],
                generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
              }),
            }
          );

          if (geminiRes.ok) {
            const gData = await geminiRes.json();
            const reply = gData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (reply) {
              return NextResponse.json({
                reply,
                source: "gemini",
                suggestions: defaultApiSuggestions,
              });
            }
          } else {
            const errBody = await geminiRes.text();
            console.warn(`Gemini (${modelName}) failed, status:`, geminiRes.status, errBody);
          }
        }
      } catch (err) {
        console.error("Gemini API call error:", err);
      }
    }

    // 3. Fallback Rule-based Intelligent Response
    const query = userQuery.toLowerCase();
    const isFirstGreeting = conversationHistory.length <= 1;
    let reply = "";

    if (["hi", "hello", "hey", "hlo", "namaste", "नमस्ते"].includes(query)) {
      if (isFirstGreeting) {
        reply =
          language === "hi"
            ? "नमस्ते! 👋 विवेक के बारे में आप क्या जानना चाहते हैं? आप उनके प्रोजेक्ट्स, स्किल्स, BodhAI या ब्लॉकचेन काम के बारे में पूछ सकते हैं।"
            : "Hi! 👋 What would you like to know about Vivek? You can ask about his projects, skills, internship experience, BodhAI, blockchain work, or anything else.";
      } else {
        reply =
          language === "hi"
            ? "फिर से नमस्ते! 😊 आपके साथ बातचीत करके अच्छा लगा! विवेक के बारे में आप आगे क्या जानना चाहेंगे?"
            : "Hello again! 😊 Great to chat with you! What would you like to explore next about Vivek?";
      }
    } else if (query.includes("blockchain") || query.includes("block chain") || query.includes("smart contract") || query.includes("solidity") || query.includes("web3")) {
      reply =
        language === "hi"
          ? "विवेक के पास **Solidity**, **Ethereum**, **Web3.js** और **Smart Contracts** के साथ ब्लॉकचेन इंजीनियरिंग में मजबूत अनुभव है।\n\n**प्रमुख ब्लॉकचेन कौशल:**\n* 🔗 Solidity के साथ स्मार्ट कॉन्ट्रैक्ट विकास\n* ⛓️ एथेरियम पारिस्थितिकी तंत्र और ERC मानक (ERC-20, ERC-721)\n* 🌐 Web3.js और Ethers.js एकीकरण\n* 🔐 वॉलेट कनेक्टिविटी (MetaMask) और dApp इंटरैक्शन"
          : "Vivek works extensively with blockchain technologies including **Solidity, Ethereum, Web3.js, and smart contracts** as part of his Blockchain Engineering specialization at GLA University.\n\n**Key blockchain expertise:**\n* 🔗 **Smart Contract Development** with Solidity\n* ⛓️ **Ethereum ecosystem** and ERC standards (ERC-20, ERC-721)\n* 🌐 **Web3.js / Ethers.js** integration with frontend applications\n* 🔐 **Wallet connectivity** (MetaMask) & dApp interactions\n\nThese core skills enable him to build decentralized applications (dApps), token systems, and smart contract architectures.";
    } else if (query.includes("erc") || query.includes("erc20") || query.includes("erc-20")) {
      reply =
        language === "hi"
          ? "**ERC-20** एथेरियम पर फंगिबल टोकन बनाने के लिए उपयोग किया जाने वाला मानक है। यह `transfer`, `approve` और `balanceOf` जैसे कार्यों को परिभाषित करता है।\n\nविवेक के पास **Solidity** और **स्मार्ट कॉन्ट्रैक्ट्स** में व्यावहारिक अनुभव है जो ERC-20 टोकन बनाने के लिए मुख्य प्रौद्योगिकियां हैं।"
          : "**ERC-20** is the standard used to create fungible tokens on Ethereum. It defines core functions such as `transfer`, `approve`, and `balanceOf` so wallets and exchanges can interact with tokens consistently.\n\nVivek has strong experience with **Solidity** and **smart contracts**, which are the core technologies used to build ERC-20 tokens. While his portfolio currently showcases full-stack AI apps like BodhAI, he possesses the complete Web3 engineering foundation to build decentralized token systems.";
    } else if (query.includes("changelog") || query.includes("update") || query.includes("version") || query.includes("what's new") || query.includes("whats new") || query.includes("नया")) {
      reply =
        language === "hi"
          ? "यहाँ हालिया प्रमुख अपडेट्स हैं:\n\n* **v2.0.1 (01 नवंबर 2026)**: सुरक्षित 30 मिनट का sessionStorage चैट इतिहास, उन्नत ड्यूल AI रनर आर्किटेक्चर।\n* **v2.0.0 (31 अक्टूबर 2026)**: लाइव AI साथी, मजबूत सुरक्षा (HSTS, Rate Limiting) और सत्यापित स्किल्स संरेखण।\n* **v1.9.0**: संपर्क के लिए सुंदर क्लिक करने योग्य कार्ड (Email, LinkedIn, GitHub)।\n* **v0.1.0 से 2.0.1**: 1 जुलाई 2026 से आज तक का पूरा सफर।\n\nआप पूरा इंटरेक्टिव चेंजलॉग [/changelog](/changelog) पेज पर देख सकते हैं!"
          : "Here are the latest highlights from Vivek's portfolio:\n\n* **v2.0.1 (Nov 1, 2026)**: Secure 30-min sessionStorage chat persistence, stabilized dual AI runners with automated failover, and live AI update notices.\n* **v2.0.0 (Oct 31, 2026)**: Real-time AI Companion, enterprise security headers (HSTS, rate limiting), and verified skills alignment.\n* **v1.9.0**: Interactive clickable contact cards for Email, LinkedIn, and GitHub.\n* **Full Journey**: Chronological releases spanning from **v0.1.0** (July 1, 2026) to **v2.0.1** (Today).\n\nCheck out the full interactive timeline at [/changelog](/changelog)!";
    } else if (
      query.includes("live chat") ||
      query.includes("1 to 1") ||
      query.includes("1 on 1") ||
      query.includes("direct contact") ||
      query.includes("call") ||
      query.includes("desktop") ||
      query.includes("notice") ||
      query.includes("notice mode") ||
      query.includes("announcement")
    ) {
      reply =
        language === "hi"
          ? "यहाँ पोर्टफोलियो से जुड़ी मुख्य घोषणाएं और अपडेट्स हैं:\n\n* ⚡ **AI असिस्टेंट अपडेट प्रगति में हैं:** हम आपके अनुभव को और अधिक स्मार्ट, तेज़ और सटीक बनाने के लिए लगातार काम कर रहे हैं।\n* ⏳ **पुरस्कार एवं प्रमाणपत्र:** मूल और सत्यापित डेटा के साथ अपडेट प्रगति में है।\n* 💻 **डेस्कटॉप अनुभव:** यह पोर्टफोलियो विशेष रूप से [https://vivek01.vercel.app/](https://vivek01.vercel.app/) पर डेस्कटॉप के लिए अनुकूलित है।\n* 📜 **चेंजलॉग:** सभी रिलीज़ और फीचर्स [/changelog](/changelog) पेज पर देख सकते हैं।\n\n*विवेक से सीधे जुड़ने के लिए:*\n* 📧 Email: [vsoni4107@gmail.com](mailto:vsoni4107@gmail.com)\n* 💼 LinkedIn: [linkedin.com/in/vivek-vns](https://linkedin.com/in/vivek-vns)\n* 🐙 GitHub: [github.com/webdeveloperdesigner](https://github.com/webdeveloperdesigner)"
          : "Here are the current portfolio updates and notices:\n\n* ⚡ **AI Assistant updates are in progress:** We're working to make your experience smarter, faster, and more accurate.\n* ⏳ **Awards & Certifications:** Data update is in progress with authentic credentials.\n* 💻 **Desktop Experience:** Vivek's portfolio is optimized for desktop at [https://vivek01.vercel.app/](https://vivek01.vercel.app/).\n* 📜 **Changelog:** Explore all version milestones from v0.1.0 to v2.0.0 on [/changelog](/changelog).\n\n*Feel free to reach out directly:*\n* 📧 Email: [vsoni4107@gmail.com](mailto:vsoni4107@gmail.com)\n* 💼 LinkedIn: [linkedin.com/in/vivek-vns](https://linkedin.com/in/vivek-vns)\n* 🐙 GitHub: [github.com/webdeveloperdesigner](https://github.com/webdeveloperdesigner)";
    } else if (
      query.includes("time") ||
      query.includes("date") ||
      query.includes("today") ||
      query.includes("समय") ||
      query.includes("तारीख") ||
      query.includes("आज")
    ) {
      reply =
        language === "hi"
          ? `🕒 **वर्तमान दिनांक व समय (IST):**\n\n**${currentDateTimeIST}**\n\nपोर्टफोलियो की नवीनतम रिलीज़ **v2.0.0** है (31 अक्टूबर 2026)। आप पूरा सफर [/changelog](/changelog) पेज पर देख सकते हैं!`
          : `🕒 **Current Date & Time (IST):**\n\n**${currentDateTimeIST}**\n\nThe portfolio's latest release **v2.0.0** is active as of October 31, 2026. Explore the complete interactive timeline at [/changelog](/changelog)!`;
    } else if (
      query.includes("certificate") ||
      query.includes("certification") ||
      query.includes("award") ||
      query.includes("achievement") ||
      query.includes("प्रमाणपत्र") ||
      query.includes("पुरस्कार")
    ) {
      reply =
        language === "hi"
          ? "🏆 **पुरस्कार एवं प्रमाणपत्र स्थिति (Awards & Certifications):**\n\n* ✅ **सत्यापित प्रमाणपत्र (3 पूर्णतः प्रामाणिक):**\n  - **Oracle Cloud Infrastructure** — AI Foundations Associate (2025)\n  - **IIT Madras (Shaastra 2026)** — Fullstack Development Workshop\n  - **DevTown** — Certified Web Development Associate (2024)\n\n* ⏳ **अपडेट प्रगति में (Update in Progress):**\n  - अतिरिक्त उपलब्धियां (जैसे GLA हैकाथॉन डेमो एंट्री) जल्द ही मूल और सत्यापित डेटा से अपडेट की जा रही हैं।\n\nआप वर्तमान प्रविष्टियां देखने के लिए [/achievements](/achievements) पेज पर जा सकते हैं!"
          : "🏆 **Awards & Certifications Status:**\n\n* ✅ **Verified Certifications (3 Active & Accurate):**\n  - **Oracle Cloud Infrastructure**: 2025 Certified AI Foundations Associate\n  - **IIT Madras (Shaastra 2026)**: Fullstack Development Workshop\n  - **DevTown**: Certified Web Development Associate (2024)\n\n* ⏳ **Update in Progress:**\n  - Additional awards (such as the GLA Hackathon demo entry) are currently being refreshed with authentic original credentials soon!\n\nExplore live updates directly on the [/achievements](/achievements) page.";
    } else if (query.includes("bodhai")) {
      reply =
        language === "hi"
          ? "**BodhAI** विवेक का एक प्रमुख प्रोजेक्ट है—एक AI-संचालित शिक्षण मंच जो छात्रों को MCQs का अभ्यास करने, कोडिंग समस्याओं को हल करने और अपनी प्रगति को ट्रैक करने में मदद करता है।"
          : "**BodhAI** is one of Vivek's flagship projects—an AI-powered learning platform that helps students practice MCQs, solve coding challenges, and track their progress. It combines **React**, **Firebase**, **Node.js**, and **AI** to generate intelligent practice content and analytics.";
    } else {
      reply =
        language === "hi"
          ? `नमस्ते! मैं विवेक का AI साथी हूँ। आप उनके प्रोजेक्ट्स, तकनीकी कौशल, ब्लॉकचेन अनुभव या BodhAI के बारे में कुछ भी पूछ सकते हैं!`
          : `Hi! I'm Vivek's AI companion. Feel free to ask me anything about his projects, technical skills, blockchain experience, or BodhAI!`;
    }

    return NextResponse.json({
      reply,
      source: "offline",
      suggestions: defaultApiSuggestions,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "Hi! I'm Vivek's AI assistant. Feel free to ask me anything about his projects, technical skills, or work experience!",
      source: "offline",
      suggestions: ["Show Projects", "Skills", "Experience", "Contact"],
    });
  }
}
