# Twitter Chatbot

A chatbot that can interact with Twitter (X) using the Coinbase Developer Platform Twitter Agentkit.

## Prerequisites

- Node.js installed
- Twitter API credentials in `.env` file
- OpenAI API key in `.env` file

## Setup

The project is already configured with necessary files:
- `package.json` - Contains project dependencies
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (API keys)

## Running the Chatbot

1. Navigate to the project directory:
```bash
cd Test/chatbottwitter
```

2. Run the chatbot:
```bash
npx ts-node chatbottwitter.ts
```

3. Choose a mode when prompted:
   - Mode 1: Interactive chat mode - Chat directly with the bot
   - Mode 2: Autonomous mode - Bot performs actions automatically

4. In chat mode:
   - Enter commands to interact with Twitter
   - Type 'exit' to end the session

## Environment Variables Required

Make sure your `.env` file contains:
```
# OpenAI
OPENAI_API_KEY=your_key_here

# Twitter
TWITTER_ACCESS_TOKEN=your_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_secret_here
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here

# CDP
CDP_API_KEY_NAME=your_key_name_here
CDP_API_KEY_PRIVATE_KEY=your_private_key_here
``` 