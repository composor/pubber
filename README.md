pubber
======

Pubber is an ES6 module for implementing pubsub in a project. It exposes three methods:

1. subscribe - function to subscribe to a topic
2. dispatch - function to send a topic with optional data
3. unsubscribe - function to delete a subscriber

Installation
------------

In your terminal, run:

```sh
npm i -D pubber
```

Import in Project
-----------------

After installing, you need to import `pubber` into your project. Remember, this is an ES6 module, so you need to use ES6 import syntax. 

```javascript
import {subscribe, dispatch, unsubscribe} from 'pubber'
```

After importing, you can define subscribers and disptach topics and data. You can define a subscriber wherever it makes sense for your code.

Creating a Subscriber
---------------------

The `subscribe` function takes two arguments, a topice and a callback. The callback will be executed when the topic gets disptached. The callback can capture a default parameter representing any data that was dispatched with the topic:

```javascript
// ...bunch of code...
// Define a subscriber:
subscribe('announcement', (msg) => alert(`The message is: ${msg}`))
```

In the above subscriber it's obvious that it is expecting a string as data. Even so, it is best to allays check the type of data the subscriber receives before attempting to use it. This will help you avoid unexpected type bugs. Here's the subscriber redone with a type check:

```javascript
// ...bunch of code...
// Define a subscriber:
subscribe('announcement', (msg) => {
  typeof msg === 'string' && alert(`The message is: ${msg}`)
})
```

Now, it the wrong type was dispatched, the subscribe will ignore it. We could also modify this to exepct a string or a boolean.

### Subscriber Without Data

A subscriber does not need to receive data. You could define a subscribe that just listens for a topic and then runs. Here's the previous subscriber refactored to work without data:

```javascript
// ...bunch of code...
// Define a subscriber:
subscribe('announcement', () => alert('Just heard an announcement!'))
```

With the above change, even if we dispatch 'announcement' with data, it will ignore the data and make the alert.

Creating a Dispatcher
---------------------

The `dispatch` function takes one argument, with a second one being optional: topic and data. This means you can dispatch a topic without data. You can define dispatcher where it makes sense. For example, you could have a user event and use a dispatch to notify some other part of your application. You could dispatch just the topic, or a topic with data. It toally depends on your needs.

### Dispatch Without Data

```javascript
dispatch('announcement')
// The previous defined subscribers would react to this dispatch.

// Dispatch a message for the previous subscriber:
dispatch('announcement', 'Hello from over here!')
```

Complex Data
------------
So far we saw how to use primitive data types. You could use complex data, such as an object or an array. Always use a type check before using any type of data.

In this example we are going to subscribe to a topic that expects and object and then dispatch one:

```javascript
// Somewhere in your code:
subscribe('new-person', (person) => {
  // Check that person is not an array but is an object:
  if (!Array.isArray(person) && typeof person === 'object') {
    alert(`We have a new person: ${person.name}!`)
  }
})

// Elsewhere in your code an user interaction occurs:
dispatch('new-person', {
  id: '1234',
  name: 'Joe Bodoni',
  job: 'mechanic'
})
// This dispatch will be received by the subscriber, which will alert: "We have a new person: Joe Bodoni!"
```

Unsubscribe
-----------

If you need to, you can unsubscribe a topic. Since there may be multiple subscribers listening to the same topic, this will disable all subscriptions to that topic:

```javascript
unsubscribe('announcement')
```

In Browser
----------

You can use `pubber` in the browser. Just import it with a script tag. Just import the version in the `dist` folder. This is in `umd` format, supporting AMD, CommonJS and browser globals:

```html
<script src="./js/pubber/dist/index.js"></script>
```

Then you can use it like this:

```html
<script>
  const {subscribe, dispatch} = pubber
  subscribe('bozo', (data) => {
    alert(`This is the data: ${data}`)
  })
  // Enable a dispatch:
  document.querySelector('button').addEventListener('click', () => dispatch('bozo', 'This is Bozo the Clown!'))
</script>
```