<img src="https://github.com/naimish2002/discord-clone/assets/57554170/f925a25c-c217-41c4-84b3-14b14b5d95b9" alt="discord clone"  />


# 🚀 Discord Clone

This project is a Discord clone that allows users to send messages, attachments, and create channels. It also supports 1:1 video calls and conversations, and offers a beautiful UI that is fully responsive.

## 📦 Tech Stack

- [![Next.js](https://img.shields.io/badge/Next.js-Server--side%20Rendering-lightgrey)](https://nextjs.org/)
- [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-blue)](https://tailwindcss.com/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-Language-blueviolet)](https://www.typescriptlang.org/)
- [![ShadcnUI](https://img.shields.io/badge/ShadcnUI-UI%20Components-brightgreen)](https://shadcn.com/)
- [![Socket.io](https://img.shields.io/badge/Socket.io-Real--time%20Messaging-orange)](https://socket.io/)
- [![LiveKit](https://img.shields.io/badge/LiveKit-Video%20Calls-yellow)](https://livekit.io/)
- [![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)](https://www.prisma.io/)
- [![Clerk](https://img.shields.io/badge/Clerk-Authentication-red)](https://clerk.dev/)
- [![UploadThing](https://img.shields.io/badge/UploadThing-File%20Uploads-lightgrey)](https://uploadthingy.com/)
- [![tanstack/query](https://img.shields.io/badge/tanstack%2Fquery-Infinite%20Loading-green)](https://tanstack.com/query/)
- [![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)](https://www.mongodb.com/)
- [![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)](https://nodejs.org/)
- [![Websockets](https://img.shields.io/badge/Websockets-Real--time%20Communication-9cf)](https://en.wikipedia.org/wiki/WebSocket)

  ## 📦 Screenshots
  <div style={{"display": "flex", "flex-direction": "column"}}>
  <div style={{"display": "flex"}}>
  <img src="https://github.com/naimish2002/discord-clone/assets/57554170/55b170f5-49ea-4fba-992a-b66d2617491e" alt="sign in" height="50%" width="49%"  />
  <img src="https://github.com/naimish2002/discord-clone/assets/57554170/885b5f3c-5886-47bf-a732-49909e90c788" alt="sign up" height="50%" width="49%"  />
  </div>
  <div style={{"display": "flex"}}>
  <img src="https://github.com/naimish2002/discord-clone/assets/57554170/7a550356-bd8d-474c-8135-991e56ab85e5" alt="home" height="50%" width="49%"  />
  <img src="https://github.com/naimish2002/discord-clone/assets/57554170/602773b5-69e9-4113-a377-1e096343b9ab" alt="create server" height="50%" width="49%"  />
  </div>
  <img src="https://github.com/naimish2002/discord-clone/assets/57554170/eddcc30d-ccc8-427a-a23e-6812d9953197" alt="search" height="50%" width="49%" align="center"  />

  </div>

## 👩🏽‍🍳 Features

- Real-time messaging using Socket.io
- Send attachments as messages using UploadThing
- Delete & Edit messages in real time for all users
- Create Text, Audio, and Video call Channels
- 1:1 conversation between members
- 1:1 video calls between members
- Member management (Kick, Role change Guest / Moderator)
- Unique invite link generation & full working invite system
- Infinite loading for messages in batches of 10 (tanstack/query)
- Server creation and customization
- Beautiful UI using TailwindCSS and ShadcnUI
- Full responsivity and mobile UI
- Light / Dark mode
- Websocket fallback: Polling with alerts
- ORM using Prisma
- MongoDB database
- Authentication with Clerk

## 📚 Learnings

- Utilizing Next.js for server-side rendering
- Implementing TailwindCSS for styling
- Integrating Clerk for authentication
- Working with Prisma for ORM
- Using Socket.io for real-time messaging
- Incorporating LiveKit for video calls
- Managing file uploads with UploadThing
- Implementing infinite loading of messages using tanstack/query

## Installation

### Prerequisites

- Node version 18.x.x

### Cloning the repository
```
git clone https://github.com/naimish2002/discord-clone.git
```
### Install packages
```
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Setup .env file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
DATABASE_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Setup Prisma

Ensure MongoDB database is configured, then run:
```
npx prisma generate
npx prisma db push
```
### Start the app
```
npm run dev
```
