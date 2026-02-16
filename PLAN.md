# Gensokyo Engine (Project: Shrine-Builder) ⛩️

**Status:** Concept / Planning
**Goal:** Create a minimalist, browser-based "Roblox-like" sandbox platform where users can build, script, and play together in real-time.

## 🌟 Vision
A user-generated content (UGC) platform. Not just a game, but a *tool* for creativity.
- **Accessible:** Runs in a browser (no install).
- **Social:** Multiplayer by default.
- **Extensible:** Users can write scripts to make games.

## 🛠️ Architecture

### 1. The Core (Engine)
*Where the world lives.*
- **Frontend:** Three.js (Rendering), React (UI Overlay).
- **Physics:** Cannon.js (Lightweight physics).
- **Networking:** Socket.io (Real-time state sync).

### 2. The Editor (Creative Mode)
*How users build.*
- **Building:** Voxel-based or Object-based placement.
- **Scripting:** A simple API (Lua-style or JS-subset) to make things move/react.
- **Assets:** Basic primitive shapes + ability to import models (GLTF).

### 3. The Server (Universe)
*Where players meet.*
- **Room System:** Users create "islands" or "servers".
- **State Management:** Authoritative server to prevent cheating (later).
- **Persistence:** Save worlds to JSON/Database.

## 📅 Phase 1: The "Hello World" (MVP)
*Goal: A shared room where two players can see each other and place a block.*
- [ ] Set up a basic Three.js scene.
- [ ] Implement a simple First-Person Controller.
- [ ] Add Multiplayer (Socket.io) - See other players as capsules.
- [ ] Add Block Placement (Click to spawn a cube).
- [ ] Sync Block Placement (Everyone sees the cube).

## 📅 Phase 2: The "Builder"
*Goal: Tools to make it a game.*
- [ ] Inventory System (Select block types).
- [ ] Save/Load World.
- [ ] Basic Physics (Jump, collision).
- [ ] Chat System.

## 📅 Phase 3: The "Scripter"
*Goal: Logic.*
- [ ] Implement a scripting console.
- [ ] Events: `onClick`, `onTouch`, `onUpdate`.
- [ ] API: `createPart()`, `killPlayer()`, `addScore()`.

## 📝 Notes
- **Keep it simple:** Start with Minecraft-style blocks. Easier to network and render.
- **Performance:** Browser limits are real. Optimize early.
- **Safety:** Sandboxed scripting is hard. We'll need strict limits.
