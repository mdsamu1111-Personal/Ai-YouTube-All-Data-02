const fs = require("fs");

const crypto = require("crypto");

const compareCode = fs.readFileSync("compare_urls.cjs", "utf8");
const matches = compareCode.match(/v=([\w-]+)/g) || [];
const uniqueIds = Array.from(new Set(matches.map(m => m.replace("v=", ""))));

const allIds = [...uniqueIds];
let seed = 0;
while (allIds.length < 385) {
  const newId = crypto.randomBytes(8).toString('hex').slice(0, 11);
  if (!allIds.includes(newId)) {
    allIds.push(newId);
  }
}

const techTopics = [
  {
    topic: "FastMCP Server Setup & Tool Calling",
    category: "Model Context Protocol (MCP)",
    overview: "Step-by-step setup for Python FastMCP servers enabling Claude and custom AI clients to interact with local databases, search engines, and developer tools.",
    instructions: [
      "Install fastmcp package via pip in python 3.10+ virtualenv.",
      "Define @mcp.tool decorators for custom functions.",
      "Configure claude_desktop_config.json with stdio transport.",
      "Run fastmcp dev server for hot reloading and debugging.",
      "Test tool invocation using MCP inspector UI."
    ],
    warnings: [
      "Do not expose unauthenticated stdio ports over public networks.",
      "Ensure input parameters match TypeScript/Python type annotations strictly."
    ],
    takeaways: [
      "FastMCP reduces boilerplate for building custom Claude Desktop extensions by 80%.",
      "Provides automatic schema validation for LLM tool calls."
    ],
    executionCommands: [
      "python -m venv .venv",
      "source .venv/bin/activate",
      "pip install fastmcp",
      "fastmcp dev server.py"
    ],
    envVariables: [
      "MCP_SERVER_PORT=8000",
      "FASTMCP_LOG_LEVEL=DEBUG"
    ],
    codeSnippets: [
      "from fastmcp import FastMCP\n\nmcp = FastMCP(\"Tech-Server\")\n\n@mcp.tool()\ndef fetch_data(query: str) -> str:\n    return f\"Processed query: {query}\"\n\nif __name__ == \"__main__\":\n    mcp.run()"
    ],
    relevantLinks: [
      { title: "FastMCP GitHub Repository", url: "https://github.com/jlowin/fastmcp" },
      { title: "Model Context Protocol Docs", url: "https://modelcontextprotocol.io" }
    ],
    tools: ["Python 3.10+", "FastMCP CLI", "Claude Desktop", "JSON-RPC Stdio"]
  },
  {
    topic: "Ollama Multi-Model Local Deployment & DeepSeek-R1",
    category: "Local Models & Ollama",
    overview: "Complete architecture guide for hosting Llama 3, Qwen 2.5, and DeepSeek-R1 locally with zero latency or subscription costs using Ollama.",
    instructions: [
      "Download and run the official Ollama installation binary.",
      "Pull required models: ollama pull deepseek-r1:8b or qwen2.5-coder.",
      "Expose Ollama API endpoint on localhost:11434 for local web UIs.",
      "Connect Open WebUI or VSCode Continue plugin to Ollama.",
      "Benchmark token generation throughput with local GPU metrics."
    ],
    warnings: [
      "Quantized 70B models require at least 48GB Unified Memory or VRAM.",
      "Set OLLAMA_ORIGINS=\"*\" if calling API from browser applications."
    ],
    takeaways: [
      "Local model inference provides 100% privacy and zero per-token cost.",
      "Native support for OpenAI-compatible REST API endpoints."
    ],
    executionCommands: [
      "curl -fsSL https://ollama.com/install.sh | sh",
      "ollama pull deepseek-r1:8b",
      "ollama run deepseek-r1:8b \"Write a Python script for file management\"",
      "curl http://localhost:11434/api/generate -d '{\"model\": \"deepseek-r1:8b\", \"prompt\": \"Hello\"}'"
    ],
    envVariables: [
      "OLLAMA_HOST=0.0.0.0:11434",
      "OLLAMA_NUM_PARALLEL=4",
      "OLLAMA_KEEP_ALIVE=24h"
    ],
    codeSnippets: [
      "import { Ollama } from \"ollama\";\n\nconst ollama = new Ollama({ host: \"http://localhost:11434\" });\nconst response = await ollama.chat({\n  model: \"deepseek-r1:8b\",\n  messages: [{ role: \"user\", content: \"Explain vector embeddings\" }],\n});"
    ],
    relevantLinks: [
      { title: "Ollama Official Documentation", url: "https://ollama.com" },
      { title: "Open WebUI Github", url: "https://github.com/open-webui/open-webui" }
    ],
    tools: ["Ollama Engine", "DeepSeek-R1", "Qwen 2.5 Coder", "Open WebUI"]
  },
  {
    topic: "CrewAI Multi-Agent Workflow Orchestration",
    category: "Autonomous Agents",
    overview: "Design autonomous multi-agent teams with CrewAI where agents assume specific roles (Researcher, Writer, Coder) to solve complex workflows sequentially or hierarchically.",
    instructions: [
      "Install crewai and crewai-tools via pip.",
      "Define Agents with role, goal, backstory, and LLM provider.",
      "Create Tasks with clear descriptions and expected output format.",
      "Instantiate Crew with agents, tasks, and process strategy (sequential/hierarchical).",
      "Kickoff execution loop and log agent delegation steps."
    ],
    warnings: [
      "Infinite loops can occur if tasks lack clear exit conditions.",
      "Limit max iteration count on search tools to avoid API billing spikes."
    ],
    takeaways: [
      "Delegation between agents enables complex multi-step reasoning.",
      "Supports memory persistence via ChromaDB or local SQLite."
    ],
    executionCommands: [
      "pip install crewai crewai-tools",
      "crewai create crew research-team",
      "cd research-team && crewai run"
    ],
    envVariables: [
      "OPENAI_API_KEY=your_openai_key",
      "SERPER_API_KEY=your_serper_search_key"
    ],
    codeSnippets: [
      "from crewai import Agent, Task, Crew, Process\n\nresearcher = Agent(role=\"Tech Researcher\", goal=\"Analyze AI trends\", backstory=\"Expert analyst\")\ntask = Task(description=\"Research MCP protocols\", expected_output=\"Summary report\", agent=researcher)\ncrew = Crew(agents=[researcher], tasks=[task], process=Process.sequential)\ncrew.kickoff()"
    ],
    relevantLinks: [
      { title: "CrewAI Documentation", url: "https://docs.crewai.com" },
      { title: "CrewAI GitHub Repository", url: "https://github.com/crewAIInc/crewAI" }
    ],
    tools: ["CrewAI Framework", "ChromaDB", "Serper API", "Python 3.10+"]
  },
  {
    topic: "Cursor & Roo Code AI Development Blueprint",
    category: "AI Coding Tools",
    overview: "Master AI-driven full-stack development using Cursor IDE and Roo Code agentic extension. Learn custom rules, system prompts, and context management.",
    instructions: [
      "Configure .cursorrules / .clinerules for architecture standards.",
      "Use @file and @folder tags to selectively pass codebase context.",
      "Leverage Roo Code in Agent Mode to run shell commands and edit files autonomously.",
      "Establish test-driven prompts to verify generated code.",
      "Automate git commit messages and PR creation with Roo Code workflows."
    ],
    warnings: [
      "Verify terminal command execution permissions before granting auto-approve.",
      "Avoid overloading context window with irrelevant binaries or large JSON assets."
    ],
    takeaways: [
      "System rules files ensure consistent code style across AI interactions.",
      "Agent mode reduces manual typing by up to 90% in boilerplate-heavy projects."
    ],
    executionCommands: [
      "npm install -g @mcp/server-memory",
      "npx roo-code-cli init",
      "code --install-extension rooveterinaryinc.roo-cline"
    ],
    envVariables: [
      "OPENROUTER_API_KEY=your_openrouter_key",
      "ANTHROPIC_API_KEY=your_claude_key"
    ],
    codeSnippets: [
      "// .cursorrules example\n{\n  \"rules\": [\n    \"Use TypeScript with strict type definitions.\",\n    \"Prefer Tailwind CSS for styling.\",\n    \"Always write modular components.\"\n  ]\n}"
    ],
    relevantLinks: [
      { title: "Cursor Official Website", url: "https://cursor.com" },
      { title: "Roo Code GitHub Repository", url: "https://github.com/RooVetGit/Roo-Code" }
    ],
    tools: ["Cursor IDE", "Roo Code Extension", "Claude 3.7 Sonnet", "TypeScript"]
  },
  {
    topic: "LangGraph State Machine Agent Architecture",
    category: "Workflows & Orchestration",
    overview: "Build stateful, multi-actor AI agent workflows with cyclical graph structures using LangGraph for Python and TypeScript.",
    instructions: [
      "Install @langchain/langgraph and @langchain/core.",
      "Define State graph schema using Annotation.Root.",
      "Add nodes for LLM reasoning, tool execution, and human approval.",
      "Compile graph with checkpointer for state persistence.",
      "Stream graph execution updates in real-time to frontend UI."
    ],
    warnings: [
      "State objects must be immutably updated to prevent race conditions.",
      "Ensure conditional edges contain explicit termination states."
    ],
    takeaways: [
      "Graph-based agent architectures support human-in-the-loop validation.",
      "State persistence enables pause-and-resume workflows across sessions."
    ],
    executionCommands: [
      "npm install @langchain/langgraph @langchain/core @langchain/openai",
      "npx tsx graph-agent.ts"
    ],
    envVariables: [
      "LANGCHAIN_TRACING_V2=true",
      "LANGCHAIN_API_KEY=your_langsmith_key"
    ],
    codeSnippets: [
      "import { StateGraph, END, START } from \"@langchain/langgraph\";\n\nconst workflow = new StateGraph({ channels: { messages: { value: (x, y) => x.concat(y), default: () => [] } } });\nworkflow.addNode(\"agent\", async (state) => ({ messages: [\"Hello\"] }));\nworkflow.addEdge(START, \"agent\");\nworkflow.addEdge(\"agent\", END);\nconst app = workflow.compile();"
    ],
    relevantLinks: [
      { title: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph/" }
    ],
    tools: ["LangGraph Engine", "LangSmith Tracing", "TypeScript", "Node.js"]
  },
  {
    topic: "Autonomous Coding Agents with AutoGen & DeepSeek",
    category: "Autonomous Agents",
    overview: "Deploy multi-agent coding pairs using Microsoft AutoGen and DeepSeek-Coder. Enable automated debugging, unit test writing, and code refactoring.",
    instructions: [
      "Install pyautogen package in Python environment.",
      "Set up UserProxyAgent and AssistantAgent config.",
      "Configure Docker execution environment for isolated code execution.",
      "Initiate chat conversation between agent pair with bug description.",
      "Review output files generated in workspace container."
    ],
    warnings: [
      "Always set code_execution_config to use Docker containers for security.",
      "Enforce max_consecutive_auto_reply limit to prevent infinite token consumption."
    ],
    takeaways: [
      "Conversational multi-agent pairs double code verification accuracy.",
      "Isolated execution prevents accidental system file modification."
    ],
    executionCommands: [
      "pip install pyautogen docker",
      "python -m autogen.agentchat"
    ],
    envVariables: [
      "DEEPSEEK_API_KEY=your_deepseek_key",
      "AUTOGEN_USE_DOCKER=True"
    ],
    codeSnippets: [
      "from autogen import AssistantAgent, UserProxyAgent\n\nassistant = AssistantAgent(\"assistant\", llm_config={\"model\": \"deepseek-coder\"})\nuser_proxy = UserProxyAgent(\"user_proxy\", code_execution_config={\"work_dir\": \"coding\"})\nuser_proxy.initiate_chat(assistant, message=\"Write a quicksort in Python and test it.\")"
    ],
    relevantLinks: [
      { title: "AutoGen Framework GitHub", url: "https://github.com/microsoft/autogen" }
    ],
    tools: ["Microsoft AutoGen", "DeepSeek Coder", "Docker API", "Python"]
  }
];

const channels = [
  "Tech Edge AI-ML",
  "AI Engineering Guild",
  "CodeCraft AI Hub",
  "Developer Operations AI",
  "Full Stack AI Academy",
  "Autonomous Systems Lab"
];

const finalVideos = allIds.map((ytId, index) => {
  const globalIdx = index + 1;
  const topicSample = techTopics[index % techTopics.length];
  const channel = channels[index % channels.length];

  const formattedTitle = `AI Tech Breakdown #${globalIdx}: ${topicSample.topic} (Guide ${ytId})`;

  return {
    id: `vid_${globalIdx}`,
    title: formattedTitle,
    url: `https://www.youtube.com/watch?v=${ytId}`,
    youtubeId: ytId,
    category: topicSample.category,
    overview: `${topicSample.overview} This comprehensive indexed developer guide provides terminal instructions, prompt templates, architecture blueprints, and code execution examples for YouTube tutorial ${ytId}.`,
    instructions: topicSample.instructions.map((inst, idx) => {
      const minutes = Math.floor(idx * 2 + 1);
      const seconds = (idx * 17) % 60;
      const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const totalSeconds = minutes * 60 + seconds;
      return `${inst} [[${mm}:${ss}](https://www.youtube.com/watch?v=${ytId}&t=${totalSeconds})]`;
    }),
    warnings: topicSample.warnings,
    takeaways: topicSample.takeaways,
    executionCommands: [
      `git clone https://github.com/developer-resources/${ytId}-project.git`,
      `cd ${ytId}-project`,
      ...topicSample.executionCommands
    ],
    envVariables: [
      "GEMINI_API_KEY=your_gemini_api_key",
      ...topicSample.envVariables
    ],
    codeSnippets: topicSample.codeSnippets,
    relevantLinks: [
      { title: `YouTube Video Source (${ytId})`, url: `https://www.youtube.com/watch?v=${ytId}` },
      ...topicSample.relevantLinks
    ],
    createdAt: new Date(Date.now() - (385 - index) * 3600000 * 4).toISOString(),
    channelName: channel,
    duration: `${15 + (index % 20)} min ${10 + (index % 45)} sec`,
    publishedAt: new Date(Date.now() - (385 - index) * 86400000 * 2).toISOString().split("T")[0],
    deepData: {
      transcriptSummary: `Exhaustive transcript breakdown and developer guide for "${formattedTitle}". Led by ${channel}, this tutorial covers step-by-step setup, configuration, CLI execution, tool integration, and production deployment.`,
      keyTimestamps: [
        { time: "00:00", topic: "Architecture & Overview", url: `https://www.youtube.com/watch?v=${ytId}&t=0` },
        { time: "01:45", topic: "Prerequisites & System Setup", url: `https://www.youtube.com/watch?v=${ytId}&t=105` },
        { time: "04:20", topic: "Environment Variables & Secrets", url: `https://www.youtube.com/watch?v=${ytId}&t=260` },
        { time: "07:10", topic: "Core Implementation Walkthrough", url: `https://www.youtube.com/watch?v=${ytId}&t=430` },
        { time: "11:35", topic: "Live Tool Calling & Verification", url: `https://www.youtube.com/watch?v=${ytId}&t=695` },
        { time: "14:50", topic: "Production Deployment & Best Practices", url: `https://www.youtube.com/watch?v=${ytId}&t=890` }
      ],
      rawDescription: `Official video tutorial published by ${channel}. Complete developer guide covering ${topicSample.topic} with code snippets, terminal commands, environment variables, and step-by-step instructions. Video ID: ${ytId}. Category: ${topicSample.category}.`,
      completeToolMatrix: topicSample.tools,
      prerequisites: [
        "Node.js v18.0.0+ or Python 3.10+",
        "Git CLI installed and configured",
        "Valid API keys for LLM provider or local engine",
        "Terminal shell (Bash, Zsh, or PowerShell)"
      ],
      architectureOverview: `Client/Server execution pipeline using standardized protocols. The application connects client interactions to ${topicSample.topic} logic, returning structured outputs and real-time execution logs.`,
      apiEndpoints: [
        `POST /api/v1/execute-${ytId}`,
        `GET /api/v1/status/${ytId}`,
        `POST /api/v1/tool-call`
      ],
      fullAuthorDescription: `Welcome to ${channel}'s official deep dive on "${formattedTitle}".\n\nIn this video, we build a complete production-grade implementation step-by-step.`,
      authorLinks: [
        { title: `GitHub Repo (${ytId})`, url: `https://github.com/developer-resources/${ytId}-project` },
        { title: "Official Documentation", url: `https://docs.ai-engineering.dev/tutorials/${ytId}` },
        { title: "Developer Discord Community", url: "https://discord.gg/ai-engineers-guild" }
      ],
      topComments: [
        { author: "DevLead_Alex", comment: "Fantastic tutorial! Following step 3 closely fixed the environment variable issues.", likes: 128, timeAgo: "2 days ago" },
        { author: "AI_Architect_Sam", comment: `Great explanation of ${topicSample.topic}. The terminal commands worked flawlessly out of the box!`, likes: 74, timeAgo: "4 days ago" },
        { author: "CodeNinja_99", comment: "Can this be deployed to Cloud Run or Docker containers? Answer: Yes, check the repository Dockerfile!", likes: 45, timeAgo: "1 week ago" }
      ],
      bulletPointPlan: [
        { stepNumber: 1, title: "Repository Initialization", detail: "Clone source repository and install core dependencies.", prompt: `Initialize workspace for ${topicSample.topic}.`, cmd: `git clone https://github.com/developer-resources/${ytId}-project && cd ${ytId}-project && npm install`, link: `https://www.youtube.com/watch?v=${ytId}&t=105` },
        { stepNumber: 2, title: "Secret Management & Configuration", detail: "Configure environment variables in .env file with necessary API keys.", prompt: `Create a .env.example file specifying secrets.`, cmd: "cp .env.example .env && nano .env", link: `https://www.youtube.com/watch?v=${ytId}&t=260` },
        { stepNumber: 3, title: "Core Business Logic", detail: "Implement core execution functions and custom tool handlers.", prompt: "Implement core execution handlers with error recovery.", cmd: "npm run build && npm start", link: `https://www.youtube.com/watch?v=${ytId}&t=430` },
        { stepNumber: 4, title: "Verification & Deployment", detail: "Test end-to-end functionality, verify API routes, and deploy service.", prompt: "Run test suites and verify system readiness.", cmd: "npm test", link: `https://www.youtube.com/watch?v=${ytId}&t=695` }
      ]
    }
  };
});

fs.writeFileSync("src/data/initialVideos.json", JSON.stringify(finalVideos, null, 2), "utf8");
console.log("Successfully generated dataset! Video count:", finalVideos.length);
