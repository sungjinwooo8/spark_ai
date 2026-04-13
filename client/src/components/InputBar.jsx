import React from 'react';

const InputBar = ({ input, setInput, handleSend, isLoading }) => {
  return (
    <div className="p-4 bg-background/80 backdrop-blur-md border-t border-borderC">
      <div className="max-w-3xl mx-auto w-full relative">
        <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-surface/50 border border-white/10 focus-within:border-blue-500/50 rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] focus-within:shadow-[0_4px_24px_-4px_rgba(59,130,246,0.3)] transition-all overflow-hidden pl-4 pr-1.5 py-1.5">
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Message Spark AI..."
            className="flex-1 max-h-40 bg-transparent text-slate-100 placeholder-slate-500 outline-none resize-none py-3 text-[15px] custom-scrollbar"
            rows={1}
            disabled={isLoading}
            autoFocus
          />

          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="mb-1 p-2.5 bg-white text-black hover:bg-slate-200 disabled:bg-white/10 disabled:text-white/30 rounded-[10px] transition-all duration-200 flex-shrink-0"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </form>
        <div className="text-center mt-3 text-[11px] text-slate-500 tracking-wide">
          Spark AI can make mistakes. Consider checking important info.
        </div>
      </div>
    </div>
  );
};

export default InputBar;
