import dotenv from 'dotenv-safe'
import { HttpsProxyAgent } from 'https-proxy-agent'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing the `onProgress` streaming support.
 *
 * ```
 * npx tsx demos/demo-on-progress.ts
 * ```
 */
async function main() {
  //use HttpsProxyAgent
  const httpsProxyAgent = new HttpsProxyAgent(process.env.PROXY)
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    httpsProxyAgent
  })

  const prompt =
    'Write a python version of bubble sort. Do not include example usage.'

  console.log(prompt)
  const res = await api.sendMessage(prompt, {
    onProgress: (partialResponse) => {
      console.log(partialResponse.text)
    }
  })
  console.log(res.text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
