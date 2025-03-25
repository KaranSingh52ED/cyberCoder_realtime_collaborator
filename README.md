# INTER IIT Software Guild Hackathon

## Contributor

---
**Karan Singh (ED22B052)**  
_Sole Contributor_

---

## Project Overview
This project is a real-time collaborative code editor designed for seamless teamwork and efficient coding workflows. It provides an interactive environment where multiple users can collaborate on code files in real time.

### 🔗 Useful Links
- **Drive Link:** [Project Documentation](https://drive.google.com/file/d/1Q7dGcbu7R3pMUjjmPUtMtUk-LrNxRHqB/view?usp=sharing)
- **Deployed Application:** [Live Demo](https://cyber-coder-realtime-collaborator.vercel.app/)

## ✨ Features
- 💻 **Real-Time Collaboration**: Edit code simultaneously across multiple files.
- 🚀 **Unique Room Generation**: Each session has a unique room ID for secure collaboration.
- 🌍 **Multi-Language Support**: Code in various programming languages.
- 🌈 **Syntax Highlighting**: Auto-detects language and applies appropriate syntax highlighting.
- 🚀 **Code Execution**: Execute code within the collaboration environment for instant feedback.
- ⏱️ **Instant Synchronization**: Live updates across all files and folders.
- 📁 **File Management**: Create, open, edit, save, delete, and organize files and folders.
- 💾 **Downloadable Codebase**: Download the entire project as a ZIP file.
- 📣 **User Notifications**: Receive alerts when users join or leave a session.
- 💡 **Smart Auto-Suggestions**: Context-based suggestions to enhance coding efficiency.
- 🔠 **Customizable Editor**: Change font size and font family for a personalized experience.
- 👥 **User Presence Tracking**: View active users with online/offline indicators.
- 💬 **Integrated Chat**: Communicate with team members while coding.
- 🎩 **User Activity Tooltip**: See who is currently editing a specific file.
- 🎨 **Theming Options**: Multiple themes for a tailored coding experience.
- ✏️ **Collaborative Drawing**: Draw and sketch in real time to enhance interactivity.

## ⚙️ Installation Guide
Follow these steps to set up the project on your local machine:

### 1️⃣ Fork or Clone the Repository
Fork the repository or clone it using:
```bash
https://github.com/KaranSingh52ED/cyberCoder_realtime_collaborator.git
```

### 2️⃣ Configure Environment Variables
Create a `.env` file inside both the `client` and `server` directories and set the following variables:

#### Frontend (`client/.env`):
```bash
VITE_BACKEND_URL=<your_server_url>  # Example: http://localhost:3000
```

#### Backend (`server/.env`):
```bash
PORT=3000
```

### 3️⃣ Install Dependencies
Navigate to the respective directories and install the required packages:
```bash
npm install
```

### 4️⃣ Run the Application
Start both frontend and backend servers:

#### Frontend:
```bash
cd frontend
npm run dev
```

#### Backend:
```bash
cd backend
npm run dev
```

### 5️⃣ Access the Application
Once the servers are running, open your browser and navigate to:
```bash
http://localhost:5173/
```

---
This documentation provides all necessary details to set up and use the collaborative coding platform efficiently. Happy coding! 🚀

