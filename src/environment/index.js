const PORT = process.env.PORT || 3000

const REDIS_URL = process.env.REDIS_URL || 'http://127.0.0.1:6379'
const WEB_CURRENCY = process.env.WEB_CONCURRENCY || 1

export { PORT, REDIS_URL, WEB_CURRENCY }
