# 📰 Pulse-Wire

**Pulse-Wire** is a responsive single-page web application that delivers the latest headlines and news articles using **The Guardian Open Platform API**. Users can browse top headlines, search for specific news topics, and bookmark articles for later reading.

---

## 🌐 Live Demo

[🔗 Click here to visit Pulse-Wire (demo link)](https://pulsewire-eight.vercel.app/) 

---

## 🚀 Features

- 🔎 Search for news by keywords
- 📰 View latest top headlines from The Guardian
- 🗂️ Auto-generated categories for visual appeal
- 📱 Responsive UI for all devices
- 💾 Bookmark functionality (optional)
- 🔄 Retry option on network failure
- 🌑 Placeholder content for missing data

---

## 📸 Screenshots

> *(Add images in `/assets` or directly using image links if hosted)*

![Landing Page](1.png)
![Home Page](2.png)
![Search Results](3.png)
![Filters](4.png)

---

## 🧰 Tech Stack

- **Frontend**: React.js (SPA)
- **Styling**: CSS / Tailwind (optional)
- **Data Source**: [The Guardian Open Platform](https://open-platform.theguardian.com/)
- **HTTP Client**: Axios

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/pulse-wire.git
cd pulse-wire
```
2. **Install dependencies**
- npm install
- Create .env file
- VITE_GUARDIAN_API_KEY=your_guardian_api_key Or hardcode the key in your hook temporarily for testing.

3. **Run the application**
- npm run dev
- Visit: http://localhost:5173 (or as defined by your dev server)

---

## 📦 Folder Structure

src/
│
├── components/       # Reusable UI components (e.g., NewsCard, SearchBar)
├── hooks/            # Custom React hooks (e.g., useNews)
├── pages/            # Page-level components (e.g., Home.jsx)
├── styles/           # CSS files
└── App.jsx           # Root component

---

## 🔐 API Key Setup

To use **The Guardian API**:

1. Sign up at [The Guardian Developer Portal](https://open-platform.theguardian.com/access/)
2. Generate your API key
3. Replace the key in either:

   - `useNews.js` file  
   **or**
   - Create a `.env` file and add:
     ```env
     VITE_GUARDIAN_API_KEY=your_guardian_api_key
     ```
   - Then access it in code using:
     ```js
     import.meta.env.VITE_GUARDIAN_API_KEY
     ```

---

## 📄 License

MIT License © 2025 [Abdul Ahad](https://github.com/AbdulAHAD968)

---

## 🙌 Acknowledgements

- [The Guardian API](https://open-platform.theguardian.com/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Universe IO](https://universe.io)
- [CodePen](https://codepen.com)


