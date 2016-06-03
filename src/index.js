/**
 * Utility that checks whether provided object exists
 * @param {*} obj
 * @returns {boolean}
 * @private
 */
function exists (obj) {
  return typeof obj !== 'undefined' && obj !== null;
}


/**
 * Cross-browser bridge that creates event object
 * @param {string} event_type Event identifier
 * @returns {Event} Event object
 * @private
 */
function setupEvent (event_type) {
  let event;

  if (exists(document.createEvent)) {
    // modern browsers
    event = document.createEvent('HTMLEvents');
    event.initEvent(event_type, true, true);
  } else if (exists(document.createEventObject)) {
    // IE9-
    event = document.createEventObject();
    event.eventType = event_type;
    event.eventName = event_type;
  }
  return event;
}


/**
 * Cross-browser bridge that fires an event object on target object
 * @param {Object} target_object Any object that can fire an event
 * @param {Event} event Event object
 * @param {string} event_type Event identifier
 * @private
 */
function fireEvent (target_object, event, event_type) {
  const on_event_type = 'on' + event_type;

  if (exists(target_object.dispatchEvent)) {
    // modern browsers
    target_object.dispatchEvent(event);
  } else if (exists(target_object.fireEvent)) {
    // IE9-
    target_object.fireEvent(on_event_type, event);
  } else if (exists(target_object[event_type])) {
    target_object[event_type]();
  } else if (exists(target_object[on_event_type])) {
    target_object[on_event_type]();
  }
}


/**
 * Fires an event of provided type on provided object
 * @param {Object} target_object Any object that can fire an event
 * @param {string} event_type Event identifier
 * @example
 * simulateEvent(window, 'scroll');
 */
export function simulateEvent (target_object, event_type) {
  if (!exists(target_object)) {
    throw new TypeError('simulateEvent: target object must be defined');
  }

  if (typeof event_type !== 'string') {
    throw new TypeError('simulateEvent: event type must be a string');
  }

  const event = setupEvent(event_type);
  fireEvent(target_object, event, event_type);
}


// default properties of mouse event
const default_properties = {
  type: 'click',
  canBubble: true,
  cancelable: true,
  view: window,
  detail: 0,
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  button: 0,
  relatedTarget: null
};


// used to convert custom keywords with mouse button names to associated numbers
const button_keywords = {
  'left': 0,
  'middle': 1,
  'center': 1,
  'right': 2
};


/**
 * Constructs mouse event properties object, translates button keywords
 * @param {Object} custom_properties
 * @returns {Object}
 * @private
 */
function sanitizeProperties (custom_properties) {
  const properties = Object.assign({}, default_properties, custom_properties);

  // convert button keyword to associated number
  if (typeof properties.button === 'string') {
    properties.button = button_keywords[properties.button];
  }

  return properties;
}


/**
 * Constructs mouse event object
 * @param {Object} properties
 * @returns {Event}
 * @private
 */
function setupMouseEvent (properties) {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent(
    properties.type,
    properties.canBubble,
    properties.cancelable,
    properties.view,
    properties.detail,
    properties.screenX,
    properties.screenY,
    properties.clientX,
    properties.clientY,
    properties.ctrlKey,
    properties.altKey,
    properties.shiftKey,
    properties.metaKey,
    properties.button,
    properties.relatedTarget
  );
  return event;
}


/**
 * Fires a mouse event on provided object
 * @param {Object} target_object
 * @param {Object} custom_properties
 * @example
 * simulateMouseEvent(window, {type: 'mousedown', button: 'right'});
 */
export function simulateMouseEvent (target_object, custom_properties = {}) {
  var properties = sanitizeProperties(custom_properties);
  var event = setupMouseEvent(properties);
  target_object.dispatchEvent(event);

}
