# Trello-like App Frontend

A simple frontend for a Trello-like app built with React, DnD Kit for drag-and-drop, and Socket.IO for real-time synchronization.

## Features

- Drag and drop cards between lists.
- Add new cards with a modal.
- Real-time synchronization using WebSockets.

## Installation

1. Clone the repository:

   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open in your browser at `http://localhost:3000`.

## Folder Structure

- `src/components`: Contains UI components like `List`, `Card`, and `Modal`.
- `src/services`: Contains API utility functions for backend interaction.
- `src/styles.css`: Custom CSS for styling.
