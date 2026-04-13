import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';
  
  if (role === 'error') {
    return (
      <div className="flex justify-center my-6" style={{ animation: 'fadeSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div className="max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 shadow-sm text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'}`} style={{ animation: 'fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards' }}>
      <div className={`flex max-w-[95%] md:max-w-[80%] flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-1.5 mb-0.5">
             <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center border border-white/10 shadow-sm">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </div>
             Spark AI
          </span>
        )}
        
        <div className={`
          px-5 py-3.5 rounded-2xl text-[15.5px] leading-relaxed shadow-md
          ${isUser 
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-[4px]' 
            : 'bg-white/5 border border-white/5 backdrop-blur-md text-slate-100 rounded-bl-[4px] shadow-[inset_0_1px_rgba(255,255,255,0.05)]'}
        `}>
          {isUser ? (
             <div className="whitespace-pre-wrap">{content}</div>
          ) : (
             <div className="prose prose-invert prose-slate max-w-none prose-p:leading-relaxed prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-black/30 prose-code:rounded-md prose-pre:bg-background/80 prose-pre:border prose-pre:border-borderC">
               <ReactMarkdown remarkPlugins={[remarkGfm]}>
                 {content}
               </ReactMarkdown>
             </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MessageBubble;
