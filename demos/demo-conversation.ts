import dotenv from 'dotenv-safe'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { oraPromise } from 'ora'

import { ChatGPTAPI } from '../src'

dotenv.config()

/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx demos/demo-conversation.ts
 * ```
 */
async function main() {
  //use HttpsProxyAgent
  const httpsProxyAgent = new HttpsProxyAgent(process.env.PROXY)
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    debug: false,
    httpsProxyAgent
  })

  const prompt = 'Write a poem about cats.'

  let res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  console.log('\n' + res.text + '\n')

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0)
    }, 10000)
  })
  const prompt2 = 'Can you make it cuter and shorter?'

  res = await oraPromise(
    api.sendMessage(prompt2, {
      parentMessageId: res.id
    }),
    {
      text: prompt2
    }
  )
  console.log('\n' + res.text + '\n')

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0)
    }, 10000)
  })
  const prompt3 = 'Now write it in Chinese.'

  res = await oraPromise(
    api.sendMessage(prompt3, {
      parentMessageId: res.id
    }),
    {
      text: prompt3
    }
  )
  console.log('\n' + res.text + '\n')

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(0)
    }, 10000)
  })
  const prompt4 = 'What were we talking about again?'

  res = await oraPromise(
    api.sendMessage(prompt4, {
      parentMessageId: res.id
    }),
    {
      text: prompt4
    }
  )
  console.log('\n' + res.text + '\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
