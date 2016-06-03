import {simulateEvent, simulateMouseEvent} from './../src/';


describe('simulateEvent', function () {

  it('should fire window.onscroll event', function () {
    let event_happened = false;
    window.addEventListener('scroll', () => event_happened = true);
    simulateEvent(window, 'scroll');
    expect(event_happened).toEqual(true);
  });

  it('should not fire an event twice', function () {
    let event_counter = 0;
    window.addEventListener('scroll', () => event_counter++);
    simulateEvent(window, 'scroll');
    expect(event_counter).toEqual(1);
  });

});


describe('simulateMouseEvent', function () {

  let elm;

  beforeEach(function () {
    elm = document.body.appendChild(document.createElement('div'));
  });

  afterEach(function () {
    elm.parentNode.removeChild(elm);
  });

  it('should fire the event', function () {
    let event_happened = false;
    elm.addEventListener('click', () => event_happened = true);
    simulateMouseEvent(elm);
    expect(event_happened).toEqual(true);
  });

  it('should use default properties', function () {
    let button_pressed = -1;
    elm.addEventListener('click', (event) => button_pressed = event.button);
    simulateMouseEvent(elm);
    expect(button_pressed).toEqual(0);
  });

  it('should use default properties', function () {
    let button_pressed = -1;
    elm.addEventListener('mousedown', (event) => button_pressed = event.button);
    simulateMouseEvent(elm, {type: 'mousedown', button: 'right'});
    expect(button_pressed).toEqual(2);
  });

});
