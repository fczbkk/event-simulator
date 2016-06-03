# Event Simulator

Cross-browser simulator of regular and mouse events in JavaScript.

## Documentation

### simulateEvent

Fires an event of provided type on provided object

**Parameters**

-   `target_object` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Any object that can fire an event
-   `event_type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Event identifier

**Examples**

```javascript
simulateEvent(window, 'scroll');
```

### simulateMouseEvent

Fires a mouse event on provided object

**Parameters**

-   `target_object` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `custom_properties` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {})** 

**Examples**

```javascript
simulateMouseEvent(window, {type: 'mousedown', button: 'right'});
```

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/event-simulator/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Event Simulator is published under the [MIT license](https://github.com/fczbkk/event-simulator/blob/master/LICENSE).
