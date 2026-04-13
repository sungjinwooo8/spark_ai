import React from 'react';
import MessageBubble from './MessageBubble';

const ChatContainer = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 scroll-smooth" id="chat-container">
      <div className="max-w-3xl mx-auto w-full pt-4 pb-12">
        {messages.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 opacity-80" style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards' }}>
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20 shadow-inner">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-200 mb-2 tracking-tight">How can I help you today?</h2>
            <p className="text-slate-500 text-sm max-w-sm text-center">Ask me anything from answering questions to analyzing data or generating creative text.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} role={msg.role} content={msg.content} />
          ))
        )}

        {isLoading && (
          <div className="flex w-full mb-8 justify-start" style={{ animation: 'fadeSlideUp 0.3s ease-out forwards' }}>
            <div className="flex max-w-[85%] flex-col gap-1.5 items-start">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-1.5 mb-0.5">
                 <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center border border-white/10">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
                 Spark AI
              </span>
              <div className="px-5 py-4 rounded-2xl rounded-bl-[4px] bg-white/5 border border-white/5 shadow-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 bounce-delay-1"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 bounce-delay-2"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 bounce-delay-3"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatContainer;
