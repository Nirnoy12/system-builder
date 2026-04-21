# Agent Builder Practice Platform

A precise, visually-matched practice environment designed to simulate the Cognizant Agent Builder platform. Built specifically for your team to quickly draft GenAI workflows, refine branching logic, and practice answering targeted architectural reflection questions before the competition.

## 🚀 Features

- **Dynamic React Flow Canvas**: Exactly models the production environment. Drag, drop, and connect node inputs/outputs smoothly.
- **15 Authentic Node Types**: Every single node from the actual UI is implemented and color-coded. Includes: *Input, LLM Step, Knowledge Retrieval, Classifier / Router, Condition / Branch, Loop, Tool Call, Memory / Context, Human Handoff, Output Formatter, Evaluator / Guardrail, Retry / Fallback, Custom Code, Merge / Join, and Note*.
- **Adaptive Properties Panel**: When a node is selected, the right sidebar conditionally updates to display exactly what properties the contest requires (e.g., System Prompts, Routing Categories, API endpoints).
- **Intelligent Reflection Questions**: The "Submit" flow detects exactly what nodes you placed onto the canvas and actively prompts you with architectural questions relevant to *your* workflow. 
- **Competition Details Tracker**: Read the full challenge scenario, constraints, and success criteria right inside the builder.

## 🛠️ Tech Stack

- **React + Vite**: For a snappy, instant-refresh development environment.
- **React Flow (`@xyflow/react`)**: Powering the drag/drop canvas, nested connectors, and grid aesthetics.
- **Lucide React**: For scalable SVG icons mapping to node functions.
- **Vanilla CSS (Variables)**: High-performance standard styling ensuring absolute visual parity with the reference platform.

## 💻 Running Locally

To run the platform locally for practice, open a terminal and run the following commands:

1. Navigate into the application folder:
   ```bash
   cd practice-platform
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`).

## ☁️ Deployment

Since this is a client-side React App, it takes around 60 seconds to deploy it for your whole team:

**To Vercel (Recommended):**
1. Connect your GitHub repository at [Vercel](https://vercel.com/new).
2. Choose this repository from the list.
3. Make sure to set the **Root Directory** to `practice-platform`.
4. Click deploy. It will automatically build and provide a live URL.

**To Netlify:**
1. Connect your GitHub repository at [Netlify](https://app.netlify.com/start).
2. For the **Base directory**, type `practice-platform`.
3. Click Deploy Site.
