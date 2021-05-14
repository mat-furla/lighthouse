import Queue from 'bull'
import * as jobs from '../jobs'

import { REDIS_URL } from '../environment'

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, REDIS_URL),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((queue) => queue.name === name)

    return queue.bull.add(data, queue.options)
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle)

      queue.bull.on('completed', (job, result) => {
        console.log(`Job with id ${job.id} has been completed.`)
      })

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data)
        console.log(err)
      })
    })
  }
}
