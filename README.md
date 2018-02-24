# SauronStyle

JavaScript library to observe style changes on any DOM element. For an observed element, on every computedStyle change returns a difference object.

Works on top of `window.MutationObserver` and `window.getComputedStyle` so if your target browsers do not support these global interfaces, unfortunately, it won't help you.

## Assumptions and How It Works
SauronStyle watches element attribute changes, such as `class` and `style`. Apparently, any change of those might cause computed CSS changes as well.

Another way of affecting element representation is via external stylesheets. They could be added by inserting `style` or `link` elements into a document or removing any of them. This is also watched by SauronStyle.

Since `getComputedStyle` method is used, reported changes are always sent in a kind of *normalized* form. For example, setting `transform: rotate(-2deg)` for an element will cause the following difference to be reported:

```javascript
{
  transform: {
    cur: "matrix(0.999391, -0.0348995, 0.0348995, 0.999391, 0, 0)",
    prev: "none"
  }
}
```

Another drawback of using computed style watching is that not only "atomic" CSS props are updated but also compound ones, and vice versa. For example, setting `background: red` will cause the following difference:

```javascript
{
  background: {
    cur: "rgb(255, 255, 0) none repeat scroll 0% 0% / auto padding-box border-box",
    prev: "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  },
  "backgroundColor": {
    cur: "rgb(255, 255, 0)",
    prev: "rgba(0, 0, 0, 0)"
  }
}
```
Written above means you should use the difference with care.

### Low Performance

Currently, performance is one of strong considerations about project viability. Due to `getComputedStyle` usage, the library is inherently slow - on my MacBook 2013 it takes about *1-5ms* to get computedStyle copy for 1 element.

**Be extremely careful when adding listeners to more than 50-100 elements!**

If the library becomes used widely, I'll possibly think about implementing smarter style difference algorithms but the worst-case scenario performance will always gravitate towards asympote, i.e. be slow.


## ToDo
- **not covered cases:**
  - transitions on parents
- ~split library into modules~
- ~lint~
- test it:
  - write unit tests
  - add integration tests
  - performance tests
- set up build:
  - ~make it work for browsers~
  - CommonJS
  - import
- add CI (try travis?)
  - add deploy to some (free) CDN
- promo
  - create github page
  - write a blog article
  - publish to dev.to
  - publish to twitter/facebook

