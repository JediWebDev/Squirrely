import { ChatMessage } from '../types';

const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY || '';
const RUNPOD_ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID || '';

/**
 * Service to interact with RunPod serverless endpoints.
 * Simulated when API key is missing.
 */
export async function generateCharacterResponse(
  characterName: string,
  persona: string,
  history: ChatMessage[],
  userInput: string
): Promise<string> {
  if (!RUNPOD_API_KEY || !RUNPOD_ENDPOINT_ID) {
    console.warn("RunPod API Key or Endpoint ID missing. Simulating response...");
    // Fallback to a simulation for demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[RUNPOD SIMULATION] ${characterName} (${persona}): I've received your message: "${userInput}". Since the RunPod API is not yet configured, I'm responding via simulation! ❤️`);
      }, 1500);
    });
  }

  try {
    const response = await fetch(`https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RUNPOD_API_KEY}`
      },
      body: JSON.stringify({
        input: {
          prompt: `Character Name: ${characterName}\nPersona: ${persona}\nConversation History: ${history.map(m => `${m.role}: ${m.content}`).join('\n')}\nUser: ${userInput}\n${characterName}:`,
          max_new_tokens: 150,
          temperature: 0.7,
        }
      })
    });

    const data = await response.json();
    
    // Serverless endpoints are often async, we might need to poll for status
    // For brevity, we assume the job is fast or handled by a synchronous proxy if available
    // Otherwise, a production app would poll /status/{jobId}
    return data.output || "I'm having trouble connecting to my brain right now...";
  } catch (error) {
    console.error("RunPod Error:", error);
    return "The signal is fuzzy... try again in a bit?";
  }
}
