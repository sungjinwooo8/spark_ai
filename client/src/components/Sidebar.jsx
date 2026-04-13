import React from 'react';

const Sidebar = ({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat, sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-surface/95 backdrop-blur-md border-r border-borderC
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 bg-surface/50 border-b border-borderC backdrop-blur-sm sticky top-0 z-10">
          <button 
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg rounded-xl transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold tracking-wide">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          <h3 className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2">Recent Chats</h3>
          <div className="flex flex-col gap-1">
            {chats.map(chat => (
              <div key={chat.id} className="relative group w-full flex items-center">
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className={`
                    flex-1 text-left px-4 py-3 rounded-xl truncate text-sm transition-all duration-200 pr-10
                    ${activeChatId === chat.id 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'}
                  `}
                >
                  {chat.title}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}
                  className={`absolute right-2 p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 ${activeChatId === chat.id ? 'opacity-100' : ''}`}
                  title="Delete chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-borderC text-xs text-slate-500 text-center flex gap-2 justify-center items-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Spark AI Dashboard
        </div>
      </div>
    </>
  );
};

export default Sidebar;
