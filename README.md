# bl-scroll

A very simple and light weight vertical scroll tool with no dependencies. Can be used on any DOM element.

# Installation

`npm install bl-scroll --save`

# Usage

``` javascript
var scroll = require("bl-scroll");

// For document.body
scroll(scrollTop, interval, fps);

//For any othe DOM element
var el = document.querySelector('whatever');
el.scroll = scroll;
el.scroll(scrollTop, interval, fps);

//Or basically
scroll.call(el, scrollTop, interval, fps);
```
## Parameters:

* **scrollTop:** Value in pixels (default 0),
* **interval:** Value in milliseconds (default 400),
* **fps:** Frames per second (default 40)
