// fetch-polyfill.js
import fetch, {
    Blob,
    Headers,
    Request,
    Response,
} from 'node-fetch'

if (!globalThis.fetch) {
    globalThis.fetch = fetch
    globalThis.Headers = Headers
    globalThis.Request = Request
    globalThis.Response = Response
}