import React, { useState, useEffect } from 'react';
import { VideoTutorial } from '../types';
import { X, Youtube, CheckCircle, AlertTriangle, Lightbulb, ExternalLink, Copy, Check, Bookmark, FileText, Sparkles, Terminal, Key, Code2, Link as LinkIcon, Database, Clock, User, Cpu, ListChecks, MessageSquare, ListOrdered, Layers, Globe, Share2 } from 'lucide-react';

interface VideoDetailModalProps {
  video: VideoTutorial | null;
  index?: number;
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  video,
  index,
  onClose,
  onToggleBookmark,
  onSaveNotes,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'bulletPlan' | 'authorDesc' | 'topComments' | 'totalData' | 'deepData' | 'full' | 'instructions' | 'execution' | 'warnings' | 'takeaways' | 'notes'>('bulletPlan');
  const [notes, setNotes] = useState(video?.notes || '');
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    if (video) {
      setNotes(video.notes || '');
      setNotesSaved(false);
    }
  }, [video]);

  if (!video) return null;

  const handleCopyMarkdown = () => {
    const md = `# ${video.title}
Link: ${video.url}
Channel: ${video.channelName || 'Tech Lead'}
Category: ${video.category}
Duration: ${video.duration || 'N/A'}

## Overview
${video.overview}

${video.deepData?.bulletPointPlan ? `## Numbered Execution Plan
${video.deepData.bulletPointPlan.map(bp => `### Step ${bp.stepNumber}: ${bp.title}\n${bp.detail}\n- Prompt: "${bp.prompt || 'N/A'}"\n- Command: \`${bp.cmd || 'N/A'}\`\n- Timestamp: ${bp.link || 'N/A'}\n`).join('\n')}` : ''}

${video.deepData?.fullAuthorDescription ? `## Official Full Description by Author\n${video.deepData.fullAuthorDescription}\n` : ''}

${video.deepData?.topComments ? `## Top Community Comments\n${video.deepData.topComments.map(c => `> **${c.author}** (${c.timeAgo || 'Recent'} - ${c.likes || 0} likes):\n> ${c.comment}\n`).join('\n')}` : ''}

${video.deepData?.totalDataSummary ? `## Complete Total Extracted Data\n${video.deepData.totalDataSummary}\n` : ''}

## Step-by-Step Instructions
${video.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

${video.executionCommands && video.executionCommands.length > 0 ? `## Terminal Execution Commands\n\`\`\`bash\n${video.executionCommands.join('\n')}\n\`\`\`\n` : ''}
${video.envVariables && video.envVariables.length > 0 ? `## Environment Variables\n\`\`\`env\n${video.envVariables.join('\n')}\n\`\`\`\n` : ''}

## Warnings & Cautions
${video.warnings.map(w => `- ${w}`).join('\n')}

## Key Takeaways
${video.takeaways.map(t => `- ${t}`).join('\n')}
${notes ? `\n## Personal Notes\n${notes}` : ''}`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCommands = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    onSaveNotes(video.id, val);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-slate-950/80 overflow-hidden flex flex-col max-h-[90vh] my-auto">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {index !== undefined && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-red-400 border border-red-500/30">
                #{index}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              {video.category}
            </span>
            {video.isCustom && (
              <span className="inline-flex items-center gap-1 text-xs text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                <Sparkles className="w-3 h-3" /> Custom AI Analysis
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 rounded-lg shadow-sm transition-colors cursor-pointer"
              title="Copy entire step-by-step instructions, prompts, commands, and links to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
              <span>{copied ? 'Guide Copied!' : 'Copy Guide'}</span>
            </button>

            <button
              onClick={(e) => onToggleBookmark(video.id, e)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                video.bookmarked
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-100 border border-slate-700/60'
              }`}
              title={video.bookmarked ? 'Remove Bookmark' : 'Bookmark Tutorial'}
            >
              <Bookmark className={`w-4.5 h-4.5 ${video.bookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Title and Link */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {video.title}
            </h2>

            {video.url && (
              <div className="mt-2.5 flex items-center gap-3">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors bg-red-950/30 border border-red-800/40 px-3 py-1.5 rounded-lg"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Watch Tutorial on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            )}
          </div>

          {/* Embedded YouTube Player if YouTube ID exists */}
          {video.youtubeId ? (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : null}

          {/* Overview Block */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Overview & Context
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {video.overview}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('bulletPlan')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'bulletPlan'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-amber-300" />
              <span>Numbered Execution Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('totalData')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'totalData'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>Total Complete Dataset</span>
            </button>

            <button
              onClick={() => setActiveTab('authorDesc')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'authorDesc'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Globe className="w-4 h-4 text-blue-300" />
              <span>Full Description & Author Links</span>
            </button>

            <button
              onClick={() => setActiveTab('topComments')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'topComments'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Top Comments & Discussion</span>
            </button>

            <button
              onClick={() => setActiveTab('deepData')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'deepData'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Database className="w-4 h-4 text-purple-300" />
              <span>Raw Deep Data</span>
            </button>

            <button
              onClick={() => setActiveTab('execution')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'execution'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-300" />
              <span>CLI Commands</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>My Notes</span>
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'bulletPlan' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-red-500/30 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-amber-400" />
                    <span>Bullet Point Execution Plan & Prompts</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Structured step-by-step numbered list with precise prompts, terminal execution commands, and video timestamps.
                  </p>
                </div>
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Plan Copied!' : 'Copy Plan'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {(video.deepData?.bulletPointPlan || []).map((step) => (
                  <div key={step.stepNumber} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-xs flex items-center justify-center">
                          {step.stepNumber}
                        </span>
                        <h5 className="text-sm font-bold text-slate-100">{step.title}</h5>
                      </div>
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-red-400 hover:text-red-300 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded transition-colors"
                        >
                          <Clock className="w-3 h-3" /> Timestamp
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {step.detail}
                    </p>

                    {step.prompt && (
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Recommended Prompt
                        </div>
                        <p className="text-xs font-mono text-slate-300">{step.prompt}</p>
                      </div>
                    )}

                    {step.cmd && (
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <Terminal className="w-3 h-3" /> Terminal / CMD Command
                        </div>
                        <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">{step.cmd}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'totalData' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Total Comprehensive Dataset</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Full aggregated data scraped and organized for this video tutorial including all technical specifications.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyCommands(video.deepData?.totalDataSummary || '')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Data Copied!' : 'Copy Total Data'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                  {video.deepData?.totalDataSummary || 'Generating total data summary...'}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'authorDesc' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm font-bold text-white">Full Video Description by {video.channelName || 'Author'}</h4>
                </div>
                <pre className="p-3.5 bg-slate-950 rounded-lg text-xs font-sans text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                  {video.deepData?.fullAuthorDescription || video.overview}
                </pre>
              </div>

              {/* Author Links */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Author Provided Links & Repositories</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(video.deepData?.authorLinks || video.relevantLinks || []).map((lnk, lIdx) => (
                    <a
                      key={lIdx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-200 hover:text-blue-400 transition-colors group"
                    >
                      <span className="font-semibold truncate">{lnk.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topComments' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Top Community Comments & Discussion Thread</h4>
              </div>

              <div className="space-y-3">
                {(video.deepData?.topComments || []).map((comment, cIdx) => (
                  <div key={cIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center">
                          {comment.author.charAt(0)}
                        </span>
                        <span className="text-xs font-bold text-slate-200">{comment.author}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{comment.timeAgo || 'Recent'} • 👍 {comment.likes || 0}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'deepData' && (
            <div className="space-y-6">
              {/* Channel & Metadata Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                  <User className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Channel Author</div>
                    <div className="text-xs font-bold text-slate-100 truncate">{video.channelName || 'Tech Lead'}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Video Duration</div>
                    <div className="text-xs font-bold text-slate-100">{video.duration || '12 min'}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Tech Domain</div>
                    <div className="text-xs font-bold text-slate-100 truncate">{video.category}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                  <Youtube className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">YouTube ID</div>
                    <div className="text-xs font-mono font-bold text-slate-100">{video.youtubeId || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Contextual Transcript Summary */}
              {video.deepData?.transcriptSummary && (
                <div className="p-4 rounded-xl bg-slate-900 border border-purple-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                    <Database className="w-4 h-4 text-purple-400" />
                    <span>Contextual Transcript Analysis & Deep Breakdown</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {video.deepData.transcriptSummary}
                  </p>
                </div>
              )}

              {/* Key Timestamps & Topics */}
              {video.deepData?.keyTimestamps && video.deepData.keyTimestamps.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                      <Clock className="w-4 h-4" />
                      <span>Key Timestamps & Interactive Chapter Markers</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Click to jump on YouTube</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {video.deepData.keyTimestamps.map((ts, tsIdx) => (
                      <a
                        key={tsIdx}
                        href={ts.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/40 flex items-center gap-2.5 group transition-colors"
                      >
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-colors">
                          {ts.time}
                        </span>
                        <span className="text-xs font-medium text-slate-300 group-hover:text-slate-100 truncate">
                          {ts.topic}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-500 ml-auto flex-shrink-0 group-hover:text-red-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack & Tool Matrix & Prerequisites Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tech Stack Matrix */}
                {video.deepData?.completeToolMatrix && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 pb-2 border-b border-slate-800">
                      <Cpu className="w-4 h-4" />
                      <span>Complete Tech Stack & Tools</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {video.deepData.completeToolMatrix.map((tool, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {video.deepData?.prerequisites && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 pb-2 border-b border-slate-800">
                      <ListChecks className="w-4 h-4" />
                      <span>Prerequisites & Requirements</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-amber-200/90 list-disc list-inside">
                      {video.deepData.prerequisites.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Architecture Topology & API Endpoints */}
              {video.deepData?.architectureOverview && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 pb-2 border-b border-slate-800">
                    <Terminal className="w-4 h-4" />
                    <span>System Architecture Topology & Endpoints</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-3 rounded-lg border border-slate-800/80">
                    {video.deepData.architectureOverview}
                  </p>
                  {video.deepData.apiEndpoints && video.deepData.apiEndpoints.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-400 mb-1">Involved API / RPC Endpoints:</div>
                      <div className="space-y-1">
                        {video.deepData.apiEndpoints.map((ep, epIdx) => (
                          <div key={epIdx} className="px-2.5 py-1 rounded bg-slate-900 text-xs font-mono text-emerald-400 border border-slate-800">
                            {ep}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Raw JSON Data Viewer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span>Exhaustive Raw JSON Metadata Schema</span>
                  </div>
                  <button
                    onClick={() => handleCopyCommands(JSON.stringify(video, null, 2))}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copiedCmd ? 'Copied Raw JSON' : 'Copy Raw JSON'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-900/90 max-h-60 overflow-y-auto rounded-lg text-[11px] font-mono text-purple-200/90 overflow-x-auto whitespace-pre">
                  {JSON.stringify(video, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'full' && (
            <div className="space-y-6">
              {/* Full Guide Banner & Copy Trigger */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Master Technical Execution Guide</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete blueprint including step-by-step instructions, CLI commands, prompts, env config, and documentation links.
                  </p>
                </div>
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md shadow-emerald-950/40 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-emerald-200" />}
                  <span>{copied ? 'Guide Copied to Clipboard!' : 'Copy Full Guide'}</span>
                </button>
              </div>

              {/* Detailed Step-by-Step Bullet Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  <span>Step-by-Step Implementation Steps</span>
                </h4>
                <div className="space-y-2.5">
                  {video.instructions.map((inst, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3 text-sm text-slate-200 hover:border-slate-600 transition-colors"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-xs flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 leading-relaxed font-normal">
                        {inst}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Execution Commands */}
              {video.executionCommands && video.executionCommands.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <Terminal className="w-4 h-4" />
                      <span>Terminal Shell Commands</span>
                    </div>
                    <button
                      onClick={() => handleCopyCommands(video.executionCommands!.join('\n'))}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors cursor-pointer"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedCmd ? 'Copied' : 'Copy Commands'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                    {video.executionCommands.join('\n')}
                  </pre>
                </div>
              )}

              {/* Environment Variables */}
              {video.envVariables && video.envVariables.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 pb-2 border-b border-slate-800">
                    <Key className="w-4 h-4" />
                    <span>Environment Variables (.env)</span>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-300 overflow-x-auto whitespace-pre">
                    {video.envVariables.join('\n')}
                  </pre>
                </div>
              )}

              {/* Code Snippets and Prompts */}
              {video.codeSnippets && video.codeSnippets.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 pb-2 border-b border-slate-800">
                    <Code2 className="w-4 h-4" />
                    <span>Prompt / Code Snippet Blueprint</span>
                  </div>
                  {video.codeSnippets.map((snippet, sIdx) => (
                    <pre key={sIdx} className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre">
                      {snippet}
                    </pre>
                  ))}
                </div>
              )}

              {/* Warnings and Key Takeaways Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Warnings */}
                {video.warnings && video.warnings.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Warnings & Limitations</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-amber-200 list-disc list-inside">
                      {video.warnings.map((warn, wIdx) => (
                        <li key={wIdx}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Takeaways */}
                {video.takeaways && video.takeaways.length > 0 && (
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                      <span>Key Takeaways</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-blue-100 list-disc list-inside">
                      {video.takeaways.map((take, tIdx) => (
                        <li key={tIdx}>{take}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Useful Links */}
              {video.relevantLinks && video.relevantLinks.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 pb-2 border-b border-slate-700">
                    <LinkIcon className="w-4 h-4 text-red-400" />
                    <span>Useful Links & Documentation</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {video.relevantLinks.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between text-xs text-slate-200 hover:text-red-400 transition-colors"
                      >
                        <span className="font-medium truncate">{link.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 ml-2 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'instructions' && (
            <div className="space-y-3">
              {video.instructions.map((inst, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3 text-sm text-slate-200 hover:border-slate-600 transition-colors"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-xs flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 leading-relaxed whitespace-pre-wrap font-normal">
                    {inst}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'execution' && (
            <div className="space-y-5">
              {/* Terminal Commands */}
              {video.executionCommands && video.executionCommands.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <Terminal className="w-4 h-4" />
                      <span>Terminal Shell Commands</span>
                    </div>
                    <button
                      onClick={() => handleCopyCommands(video.executionCommands!.join('\n'))}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors cursor-pointer"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedCmd ? 'Copied Commands' : 'Copy Commands'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                    {video.executionCommands.join('\n')}
                  </pre>
                </div>
              )}

              {/* Environment Variables */}
              {video.envVariables && video.envVariables.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 pb-2 border-b border-slate-800">
                    <Key className="w-4 h-4" />
                    <span>Required Environment Variables (.env)</span>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-300 overflow-x-auto whitespace-pre">
                    {video.envVariables.join('\n')}
                  </pre>
                </div>
              )}

              {/* Code Snippets */}
              {video.codeSnippets && video.codeSnippets.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 pb-2 border-b border-slate-800">
                    <Code2 className="w-4 h-4" />
                    <span>Code Snippet / Prompt Blueprint</span>
                  </div>
                  {video.codeSnippets.map((snippet, sIdx) => (
                    <pre key={sIdx} className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre">
                      {snippet}
                    </pre>
                  ))}
                </div>
              )}

              {/* Documentation & Links */}
              {video.relevantLinks && video.relevantLinks.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 pb-2 border-b border-slate-700">
                    <LinkIcon className="w-4 h-4 text-red-400" />
                    <span>Reference Resources & Documentation Links</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {video.relevantLinks.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between text-xs text-slate-200 hover:text-red-400 transition-colors"
                      >
                        <span className="font-medium truncate">{link.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 ml-2 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-3">
              {video.warnings.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No specific warnings recorded for this video.</p>
              ) : (
                video.warnings.map((warn, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-sm text-amber-200"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 leading-relaxed">
                      {warn}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'takeaways' && (
            <div className="space-y-3">
              {video.takeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 text-sm text-blue-100"
                >
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">
                    {takeaway}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400">
                  Developer Notes & Annotations
                </label>
                {notesSaved && (
                  <span className="text-xs text-emerald-400 font-medium">Auto-saved to local state</span>
                )}
              </div>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Write your personal notes, code snippets, or key findings for this tutorial..."
                rows={6}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/80"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
