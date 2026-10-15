# VALORA Website

Plain HTML, CSS and JavaScript. No installs, no build step.

## 1. Open the website
Double-click `index.html`. It opens in your browser. (Keep the files in the same folder.)

## What each file does
- `index.html`: page structure and text.
- `style.css`: colors (top of the file), layout, animations.
- `script.js`: settings, the **product list**, and all interactions.

## 2. Replace the logo
Save your logo as `images/logo.png`. If the file is missing, the text "VALORA" shows instead.

## 3. Replace the hero image (and the About image)
Save `images/hero-bouquet.jpg` (and `images/about-valora.jpg`). Until then, a designed placeholder shows. To use another file name, change `data-src` on that `<div class="media">` in `index.html`.

## 4. Replace product photos
Put the photo in `images/products/`, then in `script.js` set the variant's `image` to its path:

```js
{ name: "Purple", value: "purple", image: "images/products/model-1-purple.jpg", available: true }
```

## 5. Leave a photo missing
- `image: null` means "no photo yet". The card shows **No model photo yet**.
- A path to a file that doesn't exist also shows the placeholder. Nothing breaks.
- A missing photo does **not** make a color unavailable.

## 6. Add a new bouquet model
In `script.js`, copy a whole `{ ... }` block inside `const products = [ ... ]`, paste it after the last one (add a comma between blocks), then change `id`, `name`, `price`, `description` and the photo paths.

## 7. Add a framed gift
Add a product with `category: "framed-gifts"`. With no options, use `variants: []` and set the product's own `image`:

```js
{
  id: "framed-1", name: "Framed Gift", category: "framed-gifts",
  price: 499, description: "Your description.",
  image: null, variants: [], featured: false, available: true
}
```

For frame colors or sizes, fill `variants` instead (for example `{ name: "Small", value: "small", image: null, available: true }`). Category filter buttons appear automatically once there are two or more categories.

## 8. Change prices
Edit `price` (numbers only, no ₱ sign).

## 9. Edit descriptions
Edit `description` in the product.

## 10. Add or remove colors
Add or delete a line in `variants`. A new color name gets a beige dot unless you add it to `swatchColors` in `CONFIG`.

## 11. Mark something unavailable
- Color: `available: false` on that variant. It is disabled and shows "Currently unavailable".
- Product: `available: false` on the product. It is hidden.

## 12. Change the Facebook URL
Edit `facebookUrl` in `CONFIG` at the top of `script.js`. It updates every button. (The links in `index.html` are a backup for when JavaScript is off.)

## 13. Change the announcement bar and tagline
Edit `announcement` and `tagline` in `CONFIG` in `script.js`.

## Notes
- The site is an inquiry storefront: buttons open Facebook, and "Copy Order Details" prepares a message you paste there. Nothing is ordered on the site.
- Hide "More ways to say it are on the way" with `showFutureSection: false`.
- Fonts come from Google Fonts; fallback fonts are used if they can't load.
