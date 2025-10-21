<!-- <div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1rWozM86a7lz0nh2kPWTaXIn6OMjSgRxe -->

🤖 Intelligent Retrieval Assistant

Welcome to the Intelligent Retrieval Assistant, a sophisticated web application that showcases the power of the Google Gemini API for real-time information retrieval.
This project goes beyond a standard chatbot by interpreting complex, multi-intent natural language queries and answering them with accurate, up-to-date information grounded in Google Search and Google Maps. Whether you're looking for the best pet-friendly cafes in your area or asking a technical question, this assistant is designed to provide structured, reliable, and transparently sourced answers.
✨ Key Features
🧠 Advanced Natural Language Understanding: Deciphers complex questions to extract key entities, context, and intent.
🌐 Real-Time Grounding: Utilizes Google Search and Maps via the Gemini API to fetch live data, ensuring responses are current and relevant.
📍 Geolocation-Aware: Integrates with your device's location to provide personalized, context-aware results for local queries.
🔗 Transparent Sourcing: Automatically displays a list of the web and map sources used to formulate its response, ensuring credibility.
🎨 Sleek & Responsive UI: A modern, dark-themed interface built with React, TypeScript, and Vite, and styled with Tailwind CSS for a seamless experience on any device.
✍️ Formatted Markdown Responses: Presents information in a clean, readable format with proper headers, lists, and emphasis.
🛠️ Tech Stack
Frontend: React 19, TypeScript, Vite
Styling: Tailwind CSS, PostCSS
AI Engine: Google Gemini API (@google/genai SDK)
Permissions: Browser Geolocation API
This repository serves as a powerful demonstration and a robust template for building next-generation AI-powered web applications with a modern frontend stack.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
