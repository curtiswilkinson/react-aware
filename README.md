# React Aware
React Aware is a small state management library for React, modelled after the Elm Architecture and takes inspiration from Redux (WIP)

## Update

The update function passed to the Controller (see later) is at the core of React-Aware, and will look to familiar to Redux users.
It should be a function that takes two arguments, the existing "Model"" (a state object), and a "Message"": `{ type: '<string>', value: [any, data, type]}`

This function must return an Array in the following form (command is optional):
`[newModelObject, command]`

A command is simply a promise that will resolve with a new Message, allowing for asynchronous behaviour to update the model when it's complete. 

Here is an example update function:

```javascript
const updateFn = (model, msg) => {
  switch(msg.type) {
    case 'updateText': 
      return [{ ...model, text: msg.value }]

    case 'getText':
      const updateTextMsg = { type: 'updateText', value: 'TEXT' }
      
      // Promise resolves with a 'updateText' Msg after 2 seconds
      const asyncStuff = new Promise(res => setTimeout( res(updateTextMsg), 2000 ))
      
      // no action is performed on the model, but an async command is sent by adding the promise to the array
      return [model, asyncStuff] 
  }
}
```

This update function would play out as follows:

- An Aware component issues a message `{ type: 'getText', value: {}}`
- This fires the second branch of the `update`, which returns the old model, and a `command`
- The command sent will resolve with an `updateText` message after the setTimeout of 2 seconds
- This will issue the message into the update function, firing the first branch of `update`
- This updates the model with the message value, and returns the new, modified model

## Controller

The Controller component is what wraps your application. It takes two, manditory props:

- `update`, which is a function as seen above
- `model`, which is an object representing the application state

### Example Usage

```javascript
import { Controller } from 'react-aware'

const App = (props) => {
  return (
    <Controller model={ {} } update={ //function as seen above }>
      <Page />
    </Controller>
  )
}
```

## Aware

Making a component "Aware" will expose two react props `message` and `model`.

- `message` is a function, which is given a Message object to trigger updating of the model.

- `model` is the object of application state, the same thing the `message` function allows the updating of.

### Example Usage

```javascript
import { Aware } from 'react-aware'

const component = (props) => {
  const sendNewText = () => 
    props.message({ type: 'updateText', value: 'NEWTEXT' })
  
  return (
    <div>
      { props.model.text }
      <button onClick={ sendNewText }>
        Click Me!
      </button>
    </div>
  )
}

export default Aware(component)
```

