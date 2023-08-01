# subscription-listener
A lite weight library used for subscribe to an event and dispatch it instantly

# Examples

```js
import SubscriptionListener from "subscription-listener";

const emittion = new SubscriptionListener();

// trigger value
emittion.trigger('my-custom-event', 'rice', 'monday');

// listen to events
const unsubscribe = emittion.listenTo('my-custom-event', (food, day) => {
    // this should emit food=rice, day=monday
    console.log(`food: ${food} and day: ${day}`);
});
// then after if you want to stop receiving event
unsubscribe();

// check if an event has been called
emittion.hasTrigger('my-custom-event');

// delete an event value that was called
emittion.deleteTrigger('my-custom-event');
```
