# ✨ Spark AI Chatbot

A sleek, robust, and modern AI chat application powered by Google's Gemini AI. Built with a responsive **React (Vite)** frontend and a lightweight **Node.js + Express** backend.

![Spark AI Concept](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge) ![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?style=for-the-badge&logo=react) ![Backend](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js) ![AI](https://img.shields.io/badge/AI-Gemini%20Flash-orange?style=for-the-badge&logo=google)

## 🌟 Features

- ⚡ **Lightning Fast Responses:** Powered by `@google/generative-ai` (Gemini Flash model).
- 🎨 **Premium UI/UX:** A stunning, modern dark-mode aesthetic built using Tailwind CSS with glassmorphism touches and smooth animations.
- 📱 **Fully Responsive:** Beautifully designed to work seamlessly across desktops, tablets, and mobile devices.
- 📝 **Markdown Support:** Renders bold text, code blocks, lists, and tables elegantly from the AI.
- 💾 **Local Chat History:** Automatically saves your conversations using your browser's local storage (so you don't lose chat history until you clear your cache).
- 🗂️ **Sidebar Navigation:** Switch between historic chats, create new chats, and easily delete old threads.

## 🛠️ Tech Stack

### Frontend (Client)
- **React 18** (via Vite)
- **Tailwind CSS** (for rapid styling and responsive design)
- **React Markdown** (for rendering AI replies with formatting)
- **Lucide React** (for modern, scalable SVG icons)

### Backend (Server)
- **Node.js & Express** 
- **Google Generative AI SDK** (`@google/generative-ai`)
- **Dotenv** & **Cors**

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/sungjinwooo8/spark_ai.git
cd spark_ai
```

### 2. Set up the Backend (Server)
Navigate to the server directory, install dependencies, and add your API key.

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your Gemini API key (you can grab a free one from [Google AI Studio](https://aistudio.google.com/app/apikey)):
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Start the server:
```bash
npm start
# or npm run dev
```

### 3. Set up the Frontend (Client)
Open a new terminal session, navigate to the client folder, and start the Vite dev server.

```bash
cd client
npm install
npm run dev
```

The application will now be running. The client defaults to opening on `http://localhost:5173` while talking to the backend at `http://localhost:5000`.

---

## 🔭 Roadmap (Upcoming Features)
- [ ] User Authentication (Sign up / Log in)
- [ ] Database-backed chat persistence using MongoDB (replacing `localStorage`)
- [ ] Advanced User Profiles
- [ ] Export feature to download chats

## 🤝 Contributing
Contributions are always welcome! Feel free to open a pull request or submit an issue if you encounter bugs or want to request a feature.

## 📝 License
This project is open-source and free to use.
