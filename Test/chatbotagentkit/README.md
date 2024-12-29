# CDP Agentkit Chatbot Example

This is a chatbot example using CDP (Coinbase Developer Platform) Agentkit. The chatbot can interact with the blockchain using CDP tools and can operate in both interactive and autonomous modes.

## Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Setup

1. Clone the repository and navigate to the project directory:
   ```bash
   cd Test/chatbotagentkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env` file:
   ```
   XAI_API_KEY=your_xai_api_key_here
   CDP_API_KEY_NAME=your_cdp_api_key_name_here
   CDP_API_KEY_PRIVATE_KEY=your_cdp_private_key_here
   NETWORK_ID=base-sepolia  # Optional, defaults to base-sepolia testnet
   ```

## Running the Chatbot

1. Start the chatbot:
   ```bash
   npm start
   ```

2. Choose your preferred mode when prompted:
   - Mode 1: Interactive chat mode
   - Mode 2: Autonomous action mode

3. If you choose chat mode:
   - Type your prompts and interact with the bot
   - Type 'exit' to end the session

## Available Modes

### Chat Mode (1)
- Interactive conversation with the bot
- Ask questions or give commands
- Bot will respond and execute blockchain operations as needed
- Type 'exit' to end the session

### Autonomous Mode (2)
- Bot operates independently
- Performs creative blockchain interactions
- Demonstrates its capabilities automatically
- Use Ctrl+C to stop the autonomous mode

## Notes

- The bot uses base-sepolia testnet by default if NETWORK_ID is not set
- Wallet data is automatically saved to `wallet_data.txt`
- The bot can interact with blockchain using CDP Agentkit tools
- For development on other networks, set the appropriate NETWORK_ID in .env