/**
 * @type {object} s
 */
const s = {}
const h = s.hasOwnProperty

/**
 * Function to dispatch a topic and payload
 * @param {string} topic The topic to listen for.
 * @param {string|number|boolean|object|array} payload Any data to pass with the dispatch.
 */
export const dispatch = (topic, payload) => {
  if (!h.call(s, topic)) return
  s[topic].map((item) => item(payload != undefined ? payload : {}))
}

/**
 * Function to subscribe to dispatches.
 * @param {string} topic The topic for the subscription.
 * @param {function} callback A function to execute when the dispatched topic matches.
 */
export const subscribe = (topic, callback) => {
  if (!h.call(s, topic)) s[topic] = []
  const index = s[topic].push(callback) - 1
}

/**
 * Function to unsbuscribe from a topic.
 * @param {string} topic The topic to unsubscribe.
 */
export const unsubscribe = (topic) => delete s[topic]
