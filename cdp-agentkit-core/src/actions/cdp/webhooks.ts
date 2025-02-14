import { CdpAction } from "./cdp_action";
import { CreateWebhookOptions, Webhook } from "@coinbase/coinbase-sdk";
import { z } from "zod";

const CREATE_WEBHOOK_PROMPT = `
Create a new webhook to receive real-time updates for on-chain events. 
Supports monitoring wallet activity or smart contract events by specifying:
- Callback URL for receiving events
- Event type (wallet_activity, smart_contract_event_activity, erc20_transfer or erc721_transfer)
- Addresses to monitor
Also supports monitoring erc20_transfer or erc721_transfer, when those are defined at least one of these filters needs to be provided (only one of them is required):
- Contract address to listen for token transfers
- Sender address for erc20_transfer and erc721_transfer events (listen on transfers originating from this address)
- Recipient address for erc20_transfer and erc721_transfer events (listen on transfers being made to this address)
`;

// Define the webhook event types
const WebhookEventType = z.enum([
  "wallet_activity",
  "smart_contract_event_activity",
  "erc20_transfer",
  "erc721_transfer",
]);

// Networks available for creating webhooks
const WebhookNetworks = z.enum(["base-mainnet", "base-sepolia"]);

// Create a flexible event filters schema
const EventFilters = z.array(
  z
    .object({
      from_address: z.string().optional().describe("Sender address for token transfers"),
      to_address: z.string().optional().describe("Recipient address for token transfers"),
      contract_address: z.string().optional().describe("Contract address for token transfers"),
    })
    .refine(
      data => {
        // Ensure at least one filter is provided
        return Object.keys(data).length > 0;
      },
      { message: "At least one filter must be provided" },
    ),
);

/**
 * Input schema for event type filter.
 */
const EventTypeFilter = z.object({
  addresses: z.array(z.string()).describe("List of wallet or contract addresses to monitor"),
});

/**
 * Input schema for create webhook action.
 */
export const CreateWebhookInput = z.object({
  notificationUri: z.string().url().describe("The callback URL where webhook events will be sent"),
  eventType: WebhookEventType,
  eventTypeFilter: EventTypeFilter,
  eventFilters: EventFilters.optional(),
  networkId: WebhookNetworks,
});

/**
 * Creates a new webhook for monitoring on-chain events
 *
 * @param args - Object with arguments needed
 * @returns Details of the created webhook
 */
export async function createWebhook(args: z.infer<typeof CreateWebhookInput>): Promise<string> {
  try {
    const { notificationUri, eventType, eventTypeFilter, eventFilters, networkId } = args;

    const webhookOptions: CreateWebhookOptions = {
      networkId,
      notificationUri,
      eventType,
    };

    // Handle different event types with appropriate filtering
    switch (eventType) {
      case "wallet_activity":
        webhookOptions.eventTypeFilter = {
          addresses: eventTypeFilter.addresses || [],
          wallet_id: "", // this is required by SDK, but can be an empty value
        };
        break;
      case "smart_contract_event_activity":
        webhookOptions.eventTypeFilter = {
          contract_addresses: eventTypeFilter.addresses || [],
        };
        break;
      case "erc20_transfer":
      case "erc721_transfer":
        webhookOptions.eventFilters = [
          {
            ...(eventFilters?.[0]?.contract_address
              ? { contract_address: eventFilters?.[0].contract_address }
              : {}),
            ...(eventFilters?.[0]?.from_address
              ? { from_address: eventFilters?.[0].from_address }
              : {}),
            ...(eventFilters?.[0]?.to_address ? { to_address: eventFilters?.[0].to_address } : {}),
          },
        ];
        break;
      default:
        throw new Error(`Unsupported event type: ${eventType}`);
    }

    // Create webhook
    const webhook = await Webhook.create(webhookOptions as CreateWebhookOptions);

    return `The webhook was successfully created: ${webhook?.toString()}\n\n`;
  } catch (error) {
    return `Error: ${error}`;
  }
}

/**
 * Create webhook action.
 */
export class CreateWebhookAction implements CdpAction<typeof CreateWebhookInput> {
  public name = "create_webhook";
  public description = CREATE_WEBHOOK_PROMPT;
  public argsSchema = CreateWebhookInput;
  public func = createWebhook;
}
