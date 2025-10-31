

## Week 10 Lab: Style

### 1. **How CSS Works**

CSS uses *selectors* to target HTML elements and apply *rules*.

```css
selector {
  property: value;
}
```

### 2. **Selectors to Know**

| Selector           | What It Targets               | Example                                   |
| ------------------ | ----------------------------- | ----------------------------------------- |
| `element`          | All of that HTML element      | `p { color: blue; }`                      |
| `.class`           | Elements with that class name | `.button { background: pink; }`           |
| `#id`              | One element with that ID      | `#main { padding: 20px; }`                |
| `element:hover`    | Element when hovered          | `button:hover { transform: scale(1.1); }` |
| `element child`    | A child inside another        | `div p { color: gray; }`                  |
| `element, element` | Multiple elements             | `h1, h2 { font-family: sans-serif; }`     |

**Tip:** CSS files are read top to bottom, and when rules conflict, the *most specific* selector wins.

---

## Properties to Explore

### **A. General Page Styling**

Try these on `body`, `div`, or `section`:

* `background-color`
* `background-image`
* `background-size`
* `color`
* `font-family`
* `font-size`
* `line-height`
* `text-align`
* `margin`
* `padding`
* `border`
* `border-radius`
* `box-shadow`

---

### **B. Buttons**

Target your button with `button { ... }` and `button:hover { ... }`.

Try:

* `background-color`
* `color`
* `border`
* `border-radius`
* `padding`
* `font-weight`
* `text-transform`
* `cursor`
* `box-shadow`
* `transition`
* `transform`

Example:

```css
button {
  background-color: cornflowerblue;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  transition: transform 0.2s;
}
button:hover {
  transform: scale(1.1);
}
```

---

### **C. Sliders (`<input type="range">`)**

You can target sliders and their subparts:

* `input[type=range]` – the overall slider
* `::-webkit-slider-thumb` – the handle
* `::-webkit-slider-runnable-track` – the line

Start simple:

```css
input[type=range] {
  accent-color: hotpink;
}
```

Then customize:

```css
input[type=range]::-webkit-slider-thumb {
  background: black;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}
```

---

### **D. Layout & Positioning**

Experiment with:

* `display` (`block`, `inline-block`, `flex`, `grid`)
* `justify-content`
* `align-items`
* `gap`
* `position` (`relative`, `absolute`, `fixed`)
* `top`, `left`, `right`, `bottom`
* `width`, `height`
* `max-width`, `min-width`

---

### **E. Visual Effects**

Try these for creative flair:

* `opacity`
* `filter` (`blur()`, `brightness()`, `contrast()`, `hue-rotate()`)
* `transform` (`scale()`, `rotate()`, `translate()`)
* `transition` (`property duration easing`)
* `mix-blend-mode`
* `cursor`

---

### **F. Extra Fun**

Play around with:

* `box-shadow`
* `text-shadow`
* `clip-path`
* `background: linear-gradient()`
* `border-image`
