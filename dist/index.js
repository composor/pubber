"use strict"
(this.define || function() {})(
  this.pubber = {
    subscriptions: {},
    /**
     * Function to dispatch a topic and payload
     * @param {string} topic The topic to listen for.
     * @param {string|number|boolean|object|array} payload Any data to pass with the dispatch.
     */
    dispatch: function(topic, payload) {
      if (!pubber.subscriptions.hasOwnProperty.call(pubber.subscriptions, topic)) return
      pubber.subscriptions[topic].map(function(item) {
        item(payload != undefined ? payload : {})
      })
    },
  
    /**
     * Function to subscribe to dispatches.
     * @param {string} topic The topic for the subscription.
     * @param {function} callback A function to execute when the dispatched topic matches.
     */
    subscribe: function(topic, callback) {
      if (!pubber.subscriptions.hasOwnProperty.call(pubber.subscriptions, topic)) pubber.subscriptions[topic] = []
      var index = pubber.subscriptions[topic].push(callback) - 1
    },
  
    /**
     * Function to unsbuscribe from a topic.
     * @param {string} topic The topic to unsubscribe.
     */
    unsubscribe: function(topic) {
      delete pubber.subscriptions[topic]
    }
  }
)
