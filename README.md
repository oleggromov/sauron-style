# SauronStyle 👁

JavaScript library to observe style changes on any DOM element. For an observed element, on every computed style change returns a difference object.

Works on top of `window.MutationObserver` and `window.getComputedStyle` so if your target browsers do not support these global interfaces, unfortunately, it won't help you.

**⚠️ Current implementation is SLOW!** Don't try to use it on many elements. What is many exactly? Depends on your clients' performance, but likely it's something over 50-100 elements at once on a usual modern laptop.

## Assumptions and How It Works
SauronStyle watches element attribute changes, such as `class` and `style`. Apparently, any change of those might cause computed CSS changes as well. In the same way changes to parent elements can affect the styling of an observable element. Consider, for instance, class `orange` applied to a parent when a stylesheet has the following line:

```css
.orange .watchedElement {
  height: 250px;
}
```

Without observing parent element `class` attribute changes we won't be able to spot such a change on `.watchedElement`.

Another way of affecting element representation is via external stylesheets. They could be added by inserting `style` or `link` elements into a document or removing any of them. This is also watched by SauronStyle.

Since `getComputedStyle` method is used, reported changes are always sent in [resolved form](https://developer.mozilla.org/en-US/docs/Web/CSS/resolved_value). For example, setting `transform: rotate(-2deg)` for an element will cause the following difference to be reported:

```javascript
{
  transform: {
    cur: "matrix(0.999391, -0.0348995, 0.0348995, 0.999391, 0, 0)",
    prev: "none"
  }
}
```

Another drawback of using computed style watching is that not only longhand CSS props are updated but also shorthand ones, and vice versa. For example, setting `background: red` will cause the following difference:

```javascript
{
  background: {
    cur: "rgb(255, 255, 0) none repeat scroll 0% 0% / auto padding-box border-box",
    prev: "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
  },
  backgroundColor: {
    cur: "rgb(255, 255, 0)",
    prev: "rgba(0, 0, 0, 0)"
  }
}
```
Written above means you should use the difference with care.

### ⚠️ Low Performance

Currently, performance is one of the strong considerations about project viability. Due to `getComputedStyle` usage, the library is inherently slow - on my MacBook 2013, it takes about *1-5ms* to get a copy of computed styles for 1 element.

**Be extremely careful when adding listeners to more than 50-100 elements!**

If the library becomes used widely, I'll possibly think about implementing smarter style difference algorithms but the worst-case scenario performance will always gravitate towards asymptote, i.e. be slow.


## ToDo
- **not covered cases:**
  - handle transitions on parents with account for [browser differences](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle#Notes)
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

