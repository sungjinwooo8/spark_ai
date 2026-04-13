import { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import InputBar from './components/InputBar';

function App() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('spark-chats');
    if (saved) return JSON.parse(saved);
    return [{ id: Date.now().toString(), title: 'New chat', messages: [] }];
  });
  
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || Date.now().toString());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('spark-chats', JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find(c => c.id === activeChatId) || { messages: [] };
  const currentMessages = activeChat.messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isLoading]);

  const handleNewChat = () => {
    const newChat = { id: Date.now().toString(), title: 'New chat', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleDeleteChat = (id) => {
    setChats(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        const newChat = { id: Date.now().toString(), title: 'New chat', messages: [] };
        setActiveChatId(newChat.id);
        return [newChat];
      }
      if (activeChatId === id) {
        setActiveChatId(filtered[0].id);
      }
      return filtered;
    });
  };

  const updateCurrentChatMessages = (newMessages) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        let title = chat.title;
        if (title === 'New chat' && newMessages.length > 0) {
          const firstUserMsg = newMessages.find(m => m.role === 'user');
          if (firstUserMsg) {
            title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '');
          }
        }
        return { ...chat, title, messages: newMessages };
      }
      return chat;
    }));
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    const newMsgsWithUser = [...currentMessages, { role: 'user', content: userMessage }];
    updateCurrentChatMessages(newMsgsWithUser);

    try {
      const apiUrl = import.meta.env.PROD ? '/api/chat' : 'http://localhost:5000/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      updateCurrentChatMessages([...newMsgsWithUser, { role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      updateCurrentChatMessages([...newMsgsWithUser, { role: 'error', content: error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar 
        chats={chats} 
        activeChatId={activeChatId} 
        onSelectChat={(id) => { setActiveChatId(id); if(window.innerWidth < 768) setSidebarOpen(false); }}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <ChatContainer 
          messages={currentMessages} 
          isLoading={isLoading} 
          messagesEndRef={messagesEndRef} 
        />
        <InputBar 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          isLoading={isLoading} 
        />
      </div>
    </>
  );
}

export default App;
