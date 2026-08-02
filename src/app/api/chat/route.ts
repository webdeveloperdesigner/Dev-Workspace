import { NextResponse } from "next/server";
import {
  PERSONAL_DATA,
  EXPERIENCES,
  PROJECTS,
  CERTIFICATIONS,
  TECH_STACK_ITEMS,
  TOOLS_ITEMS,
} from "@/lib/data";

interface HistoryMessage {
  sender: "user" | "ai";
  text: string;
}

export async function POST(req: Request) {
  try {
    const { message, language, history } = await req.json();
    const userQuery = (message || "").trim();

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
          { headers: { "User-Agent": "antigravity-portfolio" }, next: { revalidate: 3600 } }
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

    // System prompt engineered for expert question-answering + portfolio context grounding
    const systemContext = `
You are Vivek's AI Companion on his Developer Portfolio. You speak like a knowledgeable, warm, and tech-savvy software engineering teammate.

Language: ${language === "hi" ? "Hindi" : "English"}

# CORE RESPONSIBILITY: ANSWER THE USER'S QUESTION FIRST!
1. **Distinguish Between General Technical Knowledge & Portfolio Facts**:
   - If the user asks about a general concept or standard (e.g. "Tell me about ERC-20", "What is Web3?", "How do smart contracts work?"):
     - **ALWAYS explain the concept clearly first** with technical accuracy.
     - **THEN** relate the concept to Vivek's skills, foundation, and experience.
   - Example:
     User: "Tell me about ERC-20."
     Response: "**ERC-20** is the standard for creating fungible tokens on Ethereum, defining core functions like \`transfer\`, \`approve\`, and \`balanceOf\` so wallets and dApps can interact with tokens seamlessly. Vivek has strong hands-on foundation in **Solidity**, **Ethereum**, and **Smart Contracts** through his Blockchain Engineering focus. While his portfolio emphasizes full-stack AI applications like BodhAI, he understands token standards and Web3 architecture thoroughly."

2. **Blockchain & Web3 Questions**:
   - When asked about Vivek's blockchain projects or Web3 work (e.g. "tell me project about of blockchain"):
     - Answer directly: Explain that Vivek is a **Blockchain Engineer & Full Stack Developer** at GLA University skilled in **Solidity**, **Ethereum**, **Web3.js**, and **Smart Contracts**.
     - Highlight his **Key Blockchain Expertise**:
       - 🔗 **Smart Contract Development** with **Solidity**
       - ⛓️ **Ethereum Ecosystem** and **ERC standards** (ERC-20, ERC-721)
       - 🌐 **Web3.js & Ethers.js** frontend integration
       - 🔐 **Wallet Connectivity** (MetaMask) and dApp interactions
     - Conclude by noting how these skills enable him to build dApps, token systems, or NFT platforms.

3. **Natural Conversational Persona**:
   - Warm greetings: "Hi! 👋 What would you like to know about Vivek?" or "Hello again! 😊 Great to chat with you!"
   - NO corporate HR buzzwords (do NOT say "evaluate qualifications", "discuss architectural experience", or "specify topic").
   - Use bold markdown for key technologies (**Solidity**, **React**, **Next.js**, **BodhAI**, **GLA University**).

4. **Featured Projects (BodhAI & Web Apps)**:
   - When asked about projects like **BodhAI**, explain it clearly as an AI-powered practice platform using **React**, **Firebase**, **Node.js**, and **AI Analytics**.

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

# Technical Stack:
${TECH_STACK_ITEMS.map((t) => t.name).join(", ")}
`;

    const apiKeyGemini = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const apiKeyGroq = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

    // 1. Try Google Gemini API FIRST
    if (apiKeyGemini) {
      try {
        const geminiHistory = conversationHistory.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n");
        const fullPrompt = `${systemContext}\n\n# Conversation History:\n${geminiHistory}\n\nUser Question: ${userQuery}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeyGemini}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }],
              generationConfig: { maxOutputTokens: 400, temperature: 0.6 },
            }),
          }
        );

        if (geminiRes.ok) {
          const gData = await geminiRes.json();
          const reply = gData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              suggestions: [
                "Blockchain Work",
                "Tell me about BodhAI",
                "Skills & Tech Stack",
                "Work Experience",
                "Contact Vivek",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Gemini API call error:", err);
      }
    }

    // 2. Try Groq API SECOND
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
              model: "llama-3.3-70b-versatile",
              messages: [
                { role: "system", content: systemContext },
                ...conversationHistory,
                { role: "user", content: userQuery },
              ],
              temperature: 0.6,
              max_tokens: 400,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              suggestions: [
                "Blockchain Work",
                "Tell me about BodhAI",
                "Skills & Tech Stack",
                "Work Experience",
                "Contact Vivek",
              ],
            });
          }
        }
      } catch (err) {
        console.error("Groq API call error:", err);
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
      suggestions: [
        "Blockchain Work",
        "Tell me about BodhAI",
        "Skills & Tech Stack",
        "Work Experience",
        "Contact Vivek",
      ],
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "Hi! I'm Vivek's AI assistant. Feel free to ask me anything about his projects, technical skills, or work experience!",
      suggestions: ["Show Projects", "Skills", "Experience", "Contact"],
    });
  }
}
