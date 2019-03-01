# Oboro

An easy way to print all your Blogger blog-posts in a simple list with links and dates.

## Setup

Include the next script tag:

```html
<script src="https://cdn.jsdelivr.net/gh/1e90ff/oboro@1.0.0/oboro.min.js"></script>
```

## Usage

```javascript
oboro({
  container: "#archive",            // [string] Required, DOM element to append the list.
  dateFormat: "({d} de {m}., {y})", // [string] Optional, format for date display.
  monthsLabels: [                   // [array]  Optional, naming for months display.
    "ene", "feb", "mar", "abr",
    "may", "jun", "jul", "ago",
    "sep", "oct", "nov", "dic"
  ]
});
```

## Output

```html
<div id="archive">
  <ul class="oboro">
    <li class="oboro-item">
      <a class="oboro-item__link" href="{permalink}" title="Lorem ipsum">Lorem ipsum</a>
      <span class="oboro-item__date">(2 de feb., 2019)</span>
    </li>
  </ul>
</div>
```

## License

See LICENSE file for more details.
