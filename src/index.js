/**
 * @type {object} s
 */
const s = {}
const h = s.hasOwnProperty

/**
 * Function to dispatch a topic and payload
 * @param {string} topic The topic to listen for.
 * @param {string|number|boolean|object|array} payload Any data to pass with the dispatch.
 * @returns void
 */
export const dispatch = (topic, payload) => {
  if (!h.call(s, topic)) return
  s[topic].callback.map((item) => {
    item(payload != undefined ? payload : {})
    s[topic].once && unsubscribe(topic)
  })
}

/**
 * Function to subscribe to dispatches.
 * @param {string} topic The topic for the subscription.
 * @param {function} callback A function to execute when the dispatched topic matches.
 * @param {boolean} once If true, the subscription will fire only once. After that it unsubscribes itself.
 * @returns void
 */
export const subscribe = (topic, callback, once) => {
  !h.call(s, topic) && (s[topic] = {topic, callback: [], once})
  const index = s[topic].callback.push(callback) - 1
}

/**
 * @description Function to unsbuscribe from a topic.
 * @param {string} topic The topic to unsubscribe.
 * @returns void
 */
export const unsubscribe = (topic) => delete s[topic]
