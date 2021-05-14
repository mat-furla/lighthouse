import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

export default {
  key: 'audit',
  async handle({ data }) {
    const { url_site } = data

    try {
      const chrome = await launch({ chromeFlags: ['--headless'] })
      const options = {
        logLevel: 'info',
        output: 'json',
        port: chrome.port
      }
      const runnerResult = await lighthouse(url_site, options)
      await chrome.kill()

      return runnerResult.lhr.categories
    } catch (err) {
      return err
    }
  }
}
