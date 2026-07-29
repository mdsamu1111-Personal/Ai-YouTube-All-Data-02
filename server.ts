import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to initial pre-analyzed videos JSON
const initialVideosPath = path.join(process.cwd(), "src", "data", "initialVideos.json");

// In-memory store initialized from initialVideos.json if available
let customVideosStore: any[] = [];

function loadInitialVideos() {
  try {
    if (fs.existsSync(initialVideosPath)) {
      const data = fs.readFileSync(initialVideosPath, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to load initialVideos.json", err);
  }
  return [];
}

const initialVideos = loadInitialVideos();

// API Endpoints
app.get("/api/videos", (req, res) => {
  const allVideos = [...customVideosStore, ...initialVideos];
  res.json({ success: true, videos: allVideos });
});

// Endpoint to download full Markdown document of the whole knowledge base
app.get("/api/export-markdown", (req, res) => {
  const allVideos = [...customVideosStore, ...initialVideos];
  
  let markdown = `# YouTube Tutorial Knowledge Hub - Full Technical Knowledge Base
*Total Indexed Video Tutorials: ${allVideos.length}*
*Generated: ${new Date().toISOString()}*

---

## Executive Table of Contents
${allVideos.map((v, i) => `${i + 1}. [${v.title}](#tutorial-${i + 1}) - *${v.category}*`).join('\n')}

---

## Complete Tutorial Breakdowns & Execution Guides

`;

  allVideos.forEach((v, i) => {
    markdown += `<a id="tutorial-${i + 1}"></a>\n### ${i + 1}. ${v.title}\n`;
    markdown += `- **URL / Link:** ${v.url}\n`;
    markdown += `- **Channel Name:** ${v.channelName || 'Tech Lead'}\n`;
    markdown += `- **Duration:** ${v.duration || '12 min'}\n`;
    markdown += `- **Category:** ${v.category}\n`;
    markdown += `- **YouTube Video ID:** \`${v.youtubeId || 'N/A'}\` \n\n`;
    
    markdown += `#### 📖 Overview\n${v.overview}\n\n`;

    if (v.deepData) {
      if (v.deepData.bulletPointPlan && v.deepData.bulletPointPlan.length > 0) {
        markdown += `#### 🔢 Numbered Execution Plan & Prompts\n`;
        v.deepData.bulletPointPlan.forEach((step: any) => {
          markdown += `##### Step ${step.stepNumber}: ${step.title}\n`;
          markdown += `${step.detail}\n`;
          if (step.prompt) markdown += `- **Prompt:** \`${step.prompt}\`\n`;
          if (step.cmd) markdown += `- **Command:** \`${step.cmd}\`\n`;
          if (step.link) markdown += `- **Timestamp:** ${step.link}\n`;
          markdown += `\n`;
        });
      }

      if (v.deepData.fullAuthorDescription) {
        markdown += `#### 📝 Full Description by Author\n\`\`\`text\n${v.deepData.fullAuthorDescription}\n\`\`\`\n\n`;
      }

      if (v.deepData.topComments && v.deepData.topComments.length > 0) {
        markdown += `#### 💬 Top Community Comments & Discussion Thread\n`;
        v.deepData.topComments.forEach((c: any) => {
          markdown += `> **${c.author}** (${c.timeAgo || 'Recent'} • ${c.likes || 0} likes):\n> ${c.comment}\n\n`;
        });
      }

      if (v.deepData.totalDataSummary) {
        markdown += `#### 📊 Total Comprehensive Dataset Summary\n\`\`\`text\n${v.deepData.totalDataSummary}\n\`\`\`\n\n`;
      }

      if (v.deepData.transcriptSummary) {
        markdown += `#### 📜 Contextual Transcript Summary\n${v.deepData.transcriptSummary}\n\n`;
      }

      if (v.deepData.keyTimestamps && v.deepData.keyTimestamps.length > 0) {
        markdown += `#### ⏱️ Key Timestamps & Topics\n`;
        v.deepData.keyTimestamps.forEach((ts: any) => {
          markdown += `- **[${ts.time}](${ts.url})**: ${ts.topic}\n`;
        });
        markdown += `\n`;
      }

      if (v.deepData.completeToolMatrix && v.deepData.completeToolMatrix.length > 0) {
        markdown += `#### 🛠️ Tech Stack & Tool Matrix\n`;
        v.deepData.completeToolMatrix.forEach((tool: string) => {
          markdown += `- \`${tool}\`\n`;
        });
        markdown += `\n`;
      }

      if (v.deepData.prerequisites && v.deepData.prerequisites.length > 0) {
        markdown += `#### 📌 Prerequisites & Requirements\n`;
        v.deepData.prerequisites.forEach((req: string) => {
          markdown += `- ${req}\n`;
        });
        markdown += `\n`;
      }

      if (v.deepData.architectureOverview) {
        markdown += `#### 🏗️ System Architecture Topology\n${v.deepData.architectureOverview}\n\n`;
      }
    }
    
    if (v.instructions && v.instructions.length > 0) {
      markdown += `#### 📋 Step-by-Step Instructions\n`;
      v.instructions.forEach((inst: string, idx: number) => {
        markdown += `${idx + 1}. ${inst}\n`;
      });
      markdown += `\n`;
    }

    if (v.executionCommands && v.executionCommands.length > 0) {
      markdown += `#### 💻 Terminal Execution Commands\n\`\`\`bash\n`;
      v.executionCommands.forEach((cmd: string) => {
        markdown += `${cmd}\n`;
      });
      markdown += `\`\`\`\n\n`;
    }

    if (v.envVariables && v.envVariables.length > 0) {
      markdown += `#### 🔑 Required Environment Variables (.env)\n\`\`\`env\n`;
      v.envVariables.forEach((env: string) => {
        markdown += `${env}\n`;
      });
      markdown += `\`\`\`\n\n`;
    }

    if (v.codeSnippets && v.codeSnippets.length > 0) {
      markdown += `#### 📝 Code Snippet Blueprint\n`;
      v.codeSnippets.forEach((snippet: string) => {
        markdown += `\`\`\`typescript\n${snippet}\n\`\`\`\n\n`;
      });
    }

    if (v.warnings && v.warnings.length > 0) {
      markdown += `#### ⚠️ Warnings & Limitations\n`;
      v.warnings.forEach((warn: string) => {
        markdown += `- ${warn}\n`;
      });
      markdown += `\n`;
    }

    if (v.takeaways && v.takeaways.length > 0) {
      markdown += `#### 💡 Key Takeaways\n`;
      v.takeaways.forEach((take: string) => {
        markdown += `- ${take}\n`;
      });
      markdown += `\n`;
    }

    if (v.relevantLinks && v.relevantLinks.length > 0) {
      markdown += `#### 🔗 Useful Links & Documentation\n`;
      v.relevantLinks.forEach((link: any) => {
        markdown += `- [${link.title}](${link.url})\n`;
      });
      markdown += `\n`;
    }

    markdown += `---\n\n`;
  });

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="YouTube_Tutorial_Knowledge_Hub.md"');
  res.send(markdown);
});

app.get("/api/export-category-markdown", (req, res) => {
  const categoryQuery = (req.query.category as string) || "All";
  const allVideos = [...customVideosStore, ...initialVideos];
  const filtered = categoryQuery === "All" 
    ? allVideos 
    : allVideos.filter((v) => v.category === categoryQuery);

  let markdown = `# YouTube Tutorials - Category Export: ${categoryQuery}\n`;
  markdown += `**Exported Date:** ${new Date().toISOString().split('T')[0]}\n`;
  markdown += `**Total Tutorials in Category:** ${filtered.length}\n\n`;
  markdown += `> This document contains exhaustive extracted datasets, video links, channel names, bullet-point execution plans, CLI commands, author descriptions, top comments, and technical specifications for all videos in **${categoryQuery}**.\n\n`;

  filtered.forEach((v, index) => {
    markdown += `## ${index + 1}. ${v.title}\n`;
    markdown += `- **Category:** ${v.category}\n`;
    markdown += `- **Author Channel:** ${v.channelName || 'Tech Lead'}\n`;
    markdown += `- **Video Duration:** ${v.duration || 'N/A'}\n`;
    markdown += `- **YouTube URL:** ${v.url}\n`;
    markdown += `- **YouTube ID:** \`${v.youtubeId || 'N/A'}\` \n\n`;

    markdown += `#### 📖 Overview\n${v.overview}\n\n`;

    if (v.deepData) {
      if (v.deepData.bulletPointPlan && v.deepData.bulletPointPlan.length > 0) {
        markdown += `#### 🔢 Numbered Execution Plan & Prompts\n`;
        v.deepData.bulletPointPlan.forEach((step: any) => {
          markdown += `##### Step ${step.stepNumber}: ${step.title}\n`;
          markdown += `${step.detail}\n`;
          if (step.prompt) markdown += `- **Prompt:** \`${step.prompt}\`\n`;
          if (step.cmd) markdown += `- **Command:** \`${step.cmd}\`\n`;
          if (step.link) markdown += `- **Timestamp:** ${step.link}\n`;
          markdown += `\n`;
        });
      }

      if (v.deepData.fullAuthorDescription) {
        markdown += `#### 📝 Full Author Description\n\`\`\`text\n${v.deepData.fullAuthorDescription}\n\`\`\`\n\n`;
      }

      if (v.deepData.topComments && v.deepData.topComments.length > 0) {
        markdown += `#### 💬 Top Community Comments\n`;
        v.deepData.topComments.forEach((c: any) => {
          markdown += `> **${c.author}** (${c.timeAgo || 'Recent'} • ${c.likes || 0} likes):\n> ${c.comment}\n\n`;
        });
      }

      if (v.deepData.totalDataSummary) {
        markdown += `#### 📊 Total Extracted Dataset\n\`\`\`text\n${v.deepData.totalDataSummary}\n\`\`\`\n\n`;
      }
    }

    if (v.instructions && v.instructions.length > 0) {
      markdown += `#### 📋 Step-by-Step Instructions\n`;
      v.instructions.forEach((inst: string, idx: number) => {
        markdown += `${idx + 1}. ${inst}\n`;
      });
      markdown += `\n`;
    }

    if (v.executionCommands && v.executionCommands.length > 0) {
      markdown += `#### 💻 Terminal Execution Commands\n\`\`\`bash\n`;
      v.executionCommands.forEach((cmd: string) => {
        markdown += `${cmd}\n`;
      });
      markdown += `\`\`\`\n\n`;
    }

    if (v.relevantLinks && v.relevantLinks.length > 0) {
      markdown += `#### 🔗 Useful Links\n`;
      v.relevantLinks.forEach((link: any) => {
        markdown += `- [${link.title}](${link.url})\n`;
      });
      markdown += `\n`;
    }

    markdown += `---\n\n`;
  });

  const safeFilename = categoryQuery.replace(/[^a-z0-9]/gi, '_');
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="Category_${safeFilename}.md"`);
  res.send(markdown);
});

app.post("/api/analyze-video", async (req, res) => {
  const { urlOrTitle, customTopic } = req.body;

  if (!urlOrTitle || typeof urlOrTitle !== "string" || !urlOrTitle.trim()) {
    return res.status(400).json({ success: false, error: "Please provide a valid video URL or tutorial title." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "GEMINI_API_KEY environment variable is missing. Please set your Gemini API key in the secrets panel."
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Extract potential YouTube video ID if URL is provided
    let youtubeId = "";
    const ytMatch = urlOrTitle.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/|\/v\/)([\w-]{11})/);
    if (ytMatch) {
      youtubeId = ytMatch[1];
    }

    const prompt = `You are an expert AI EdTech Video Tutorial Analyst.
Analyze the following tech tutorial topic / YouTube video: "${urlOrTitle}".
${customTopic ? `Target Topic/Context: ${customTopic}` : ''}

Extract and format a structured educational tutorial breakdown. Respond ONLY with a valid JSON object matching this exact structure:
{
  "title": "A concise, engaging technical title for the tutorial",
  "category": "One of: AI Coding Tools, Model Context Protocol (MCP), Local Models & Ollama, Autonomous Agents, Workflows & Orchestration, AI & Engineering",
  "overview": "A high-level 2-3 sentence overview of what the tutorial teaches and its core architectural concepts.",
  "instructions": [
    "Step 1: Detailed instruction step with commands or key setup actions",
    "Step 2: Second step...",
    "Step 3: Third step...",
    "Step 4: Fourth step..."
  ],
  "warnings": [
    "Critical warning or limitation (e.g. VRAM requirements, API rate limits, environment versions)",
    "Another caution if applicable..."
  ],
  "takeaways": [
    "Key takeaway 1 regarding productivity or architecture",
    "Key takeaway 2...",
    "Key takeaway 3..."
  ]
}
Do not include markdown triple backticks around the JSON. Provide raw valid JSON only.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text ? response.text.trim() : "";
    const cleanJson = responseText.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", responseText);
      return res.status(500).json({ success: false, error: "Failed to parse structured response from Gemini." });
    }

    const newVideo = {
      id: `vid_custom_${Date.now()}`,
      title: parsed.title || urlOrTitle,
      url: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : urlOrTitle,
      youtubeId: youtubeId || "",
      category: parsed.category || "AI & Engineering",
      overview: parsed.overview || "AI analyzed tech video tutorial.",
      instructions: Array.isArray(parsed.instructions) ? parsed.instructions : ["Follow video instructions carefully."],
      warnings: Array.isArray(parsed.warnings) ? parsed.warnings : ["Ensure proper environment setup before testing."],
      takeaways: Array.isArray(parsed.takeaways) ? parsed.takeaways : ["Mastering this tool streamlines developer workflows."],
      createdAt: new Date().toISOString(),
      isCustom: true
    };

    // Save into store
    customVideosStore.unshift(newVideo);

    return res.json({ success: true, video: newVideo });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "An unexpected error occurred while analyzing the video with Gemini."
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
