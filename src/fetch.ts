/// <reference lib="dom" />
//import fetch from "node-fetch"
import HttpsProxyAgent from 'https-proxy-agent'
import fetch from 'node-fetch'

import consts from './consts'

const agent = new HttpsProxyAgent.HttpsProxyAgent(consts.PROXY)
const customFetch = (url, options) => {
  return fetch(url, { ...options, agent })
}

export { customFetch as fetch }
