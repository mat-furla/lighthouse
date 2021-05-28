import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

// Job para auditoria de site com o Lighthouse
export default {
  key: 'audit',
  async handle({ data }) {
    const { url_site } = data

    return launch({ chromeFlags: ['--headless', '--disable-gpu'] }).then(
      (chrome) => {
        const options = {
          output: 'json',
          port: chrome.port,
          onlyCategories: [
            'performance',
            'accessibility',
            'best-practices',
            'SEO'
          ],
          skipAudits: [
            'first-contentful-paint',
            'largest-contentful-paint',
            'first-meaningful-paint',
            'speed-index',
            'estimated-input-latency',
            'total-blocking-time',
            'max-potential-fid',
            'cumulative-layout-shift',
            'screenshot-thumbnails',
            'final-screenshot',
            'full-page-screenshot'
          ],
          maxWaitForFcp: 45000,
          maxWaitForLoad: 60000
        }
        return lighthouse(url_site, options).then((results) => {
          return chrome.kill().then(() => {
            return results.lhr.categories
          })
        })
      }
    )
  }
}
