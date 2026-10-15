// =====================================================
// 1. SITE SETTINGS - change links and text here
// =====================================================
const CONFIG = {
  facebookUrl: "https://www.facebook.com/profile.php?id=61595410284385",
  announcement: "A little love, handmade just for you ♡",
  tagline: "For all the love you don't know how to say.",
  showFutureSection: true, // false hides "More ways to say it are on the way"

  // Names shown on the category filter buttons. Add a line for every new category.
  categoryNames: {
    "fuzzy-bouquets": "Fuzzy Bouquets",
    "framed-gifts": "Framed Gifts",
    "personalized-gifts": "Personalized Gifts"
  },

  // Swatch dot colors. The "value" of a variant (e.g. "pink") picks its dot color.
  // Add a line here when you add a new color. Unknown colors get a beige dot.
  swatchColors: {
    pink: "var(--color-pink)",
    purple: "var(--color-purple)",
    blue: "var(--color-blue)",
    white: "var(--color-white)",
    gold: "var(--color-beige)",
    brown: "var(--color-brown)",
    red: "var(--color-red)",
    black: "var(--color-black)"
  }
};

// =====================================================
// 2. VALORA PRODUCT CATALOG
// Add, edit, or remove products in this section.
//
// - NEW PRODUCT: copy a whole { ... } block, paste it below, give it a new id.
// - name / price / description: edit the text or number (price has no peso sign).
// - category: "fuzzy-bouquets", "framed-gifts", "personalized-gifts" (or your own).
// - PHOTOS: image: "images/products/your-file.jpg"
//     null  = no photo yet (the "No model photo yet" placeholder shows)
//     A path = that photo shows. If the file is missing, the placeholder shows anyway.
// - ADD A COLOR/OPTION: add one more { name, value, image, available } line to variants.
// - MARK A COLOR UNAVAILABLE: set available: false (shows "Currently unavailable").
// - MARK A PRODUCT UNAVAILABLE: set available: false on the product (it is hidden).
// - FEATURE A PRODUCT: featured: true (featured products are listed first).
// - NO OPTIONS (e.g. a framed gift): use variants: [] and put a photo in the
//   product's own  image:  field. Variants can also be sizes or frame colors,
//   e.g. { name: "Small", value: "small", image: null, available: true }.
// =====================================================
const products = [
  {
    id: "model-1",
    name: "Fuzzy Bouquet — Model 1",
    category: "fuzzy-bouquets",
    price: 149,
    description: "For the little moments that mean everything. A soft, handmade bouquet for the person who makes your ordinary days feel a little more special. Because sometimes, 'I thought of you' is the sweetest thing you can say.",
    image: null,
    variants: [
      { name: "Pink",   value: "pink",   image: "images/products/model-1-pink.jpg",   available: true },
      { name: "Purple", value: "purple", image: "images/products/model-1-purple.jpg", available: true },
      { name: "Blue",   value: "blue",   image: "images/products/model-1-blue.jpg",   available: true },
      { name: "Red",   value: "red",   image: "images/products/model-1-red.jpg",   available: true },
      { name: "Black",   value: "black",   image: "images/products/model-1-black.jpg",   available: true }
    ],
    featured: true,
    available: true
  },
  {
    id: "model-2",
    name: "Fuzzy Bouquet — Model 2",
    category: "fuzzy-bouquets",
    price: 219,
    description: "For the feelings that deserve a little more room to bloom. A thoughtful handmade bouquet for the person you appreciate, miss, admire, or simply want to make smile. No perfect words needed—just a gift that says, 'You matter to me.'",
    image: null,
    variants: [
      { name: "Pink",   value: "pink",   image: "images/products/model-2-pink.jpg",   available: true },
      { name: "Purple", value: "purple", image: "images/products/model-2-purple.jpg", available: true },
      { name: "Blue",   value: "blue",   image: "images/products/model-2-blue.jpg",   available: true },
      { name: "Red",   value: "red",   image: "images/products/model-2-red.jpg",   available: true },
      { name: "Black",   value: "black",   image: "images/products/model-2-black.jpg",   available: true }
    ],
    featured: false,
    available: true
  },
  {
    id: "model-3",
    name: "Fuzzy Bouquet — Model 3",
    category: "fuzzy-bouquets",
    price: 359,
    description: "For the kind of love that stays with someone long after the moment has passed. A more expressive handmade bouquet for meaningful surprises, special milestones, and feelings you've been keeping close to your heart.",
    image: null,
    variants: [
      { name: "Pink",   value: "pink",   image: "images/products/model-3-pink.jpg",   available: true },
      { name: "Purple", value: "purple", image: "images/products/model-3-purple.jpg", available: true },
      { name: "Blue",   value: "blue",   image: "images/products/model-3-blue.jpg",   available: true },
      { name: "Red",   value: "red",   image: "images/products/model-3-red.jpg",   available: true },
      { name: "Black",   value: "black",   image: "images/products/model-3-black.jpg",   available: true }
    ],
    featured: false,
    available: true
  }
];

// Gift finder messages (edit freely; keep them honest, no guarantees)
const giftMessages = {
  special: "For someone special, a handmade bouquet can say what words can't. Have a look at the gifts below and pick the one that feels like them.",
  bestfriend: "Your best friend knows you well. Browse the gifts below and choose the one that feels like your friendship.",
  thankyou: "A little thank-you goes a long way. See the gifts below and find something small that says it for you.",
  justbecause: "No reason needed. Take a look at the gifts below and pick one that feels like a happy surprise."
};

// =====================================================
// 3. HELPERS (you normally do not need to edit below)
// =====================================================
const $ = (selector) => document.querySelector(selector);
const peso = (n) => "₱" + Number(n).toLocaleString("en-PH");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// A designed placeholder shown instead of a missing photo.
function makePlaceholder(text, subText) {
  const box = el("div", "ph");
  box.innerHTML = '<svg aria-hidden="true"><use href="#flower"/></svg>';
  box.append(el("p", "ph-text", text), el("small", "", subText));
  return box;
}

// Puts a photo into a box. No path, or a file that fails to load, shows the placeholder.
// The error handler runs once and removes the <img>, so it can never loop.
function showImage(box, src, alt, text, subText) {
  box.replaceChildren();
  const usePlaceholder = () => box.replaceChildren(makePlaceholder(text, subText));
  if (!src) { usePlaceholder(); return; }
  const img = new Image();
  img.alt = alt;
  img.addEventListener("error", usePlaceholder, { once: true });
  img.src = src;
  box.append(img);
}

// =====================================================
// 4. PRODUCT CARDS
// =====================================================
function createCard(product) {
  const variants = product.variants || [];
  let selected = variants.findIndex((v) => v.available !== false); // each card keeps its own choice
  const hasChoice = selected !== -1;

  const card = el("article", "card reveal");
  const media = el("div", "media");
  const body = el("div", "card-body");
  const chosen = el("p", "chosen");
  const status = el("p", "status");
  status.setAttribute("aria-live", "polite");
  const swatchButtons = [];

  body.append(el("h3", "", product.name), el("p", "price", peso(product.price)), el("p", "desc", product.description));

  if (variants.length) {
    const group = el("div", "swatches");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Choose an option for " + product.name);
    variants.forEach((variant, index) => {
      const button = el("button", "swatch");
      button.type = "button";
      const dot = el("span", "dot");
      dot.style.setProperty("--dot", CONFIG.swatchColors[variant.value] || "var(--color-beige)");
      const name = el("span", "", variant.name);
      button.append(dot, name);
      if (variant.available === false) {
        button.disabled = true;
        name.append(el("span", "note", "Currently unavailable"));
      } else {
        button.addEventListener("click", () => { selected = index; update(); status.textContent = ""; });
      }
      swatchButtons.push(button);
      group.append(button);
    });
    body.append(group, chosen);
  }

  const order = el("a", "btn btn-primary", "Message to Order");
  order.href = CONFIG.facebookUrl;
  order.target = "_blank";
  order.rel = "noopener noreferrer";
  order.dataset.fb = "";
  const copy = el("button", "btn btn-ghost", "Copy Order Details");
  copy.type = "button";
  const actions = el("div", "actions");
  actions.append(order, copy);
  body.append(actions, status);
  card.append(media, body);

  function orderMessage() {
    const v = variants[selected];
    return "Hi VALORA! I'm interested in " + product.name + " (" + peso(product.price) + ")" +
      (v ? " in " + v.name : "") + ". I'd like to ask about placing an order.";
  }

  function update() {
    const v = variants[selected];
    const alt = product.name + (v ? " in " + v.name : "");
    showImage(media, v ? v.image : product.image, alt, "No model photo yet", "Photo coming soon ♡");
    swatchButtons.forEach((b, i) => b.setAttribute("aria-pressed", String(i === selected)));
    chosen.textContent = v ? "Selected: " + v.name : "Currently unavailable";
    actions.hidden = variants.length > 0 && !hasChoice;
  }

  copy.addEventListener("click", () => copyText(orderMessage(), body, status));
  update();
  return card;
}

// Copies text. If the browser blocks it, shows the text selected so it can be copied by hand.
async function copyText(text, container, status) {
  container.querySelectorAll(".manual").forEach((n) => n.remove());
  try {
    if (!navigator.clipboard) throw new Error("no clipboard");
    await navigator.clipboard.writeText(text);
    status.textContent = "Copied! Paste it into your message to VALORA ♡";
  } catch (error) {
    const box = el("textarea", "manual");
    box.readOnly = true;
    box.rows = 3;
    box.value = text;
    box.setAttribute("aria-label", "Order details to copy");
    container.append(box);
    box.select();
    status.textContent = "Press Ctrl+C (or hold and tap Copy) to copy the selected text.";
  }
}

// =====================================================
// 5. LIST + CATEGORY FILTERS
// =====================================================
let activeCategory = "all";
const visibleProducts = () =>
  products.filter((p) => p.available !== false)
          .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

function renderProducts() {
  const grid = $("#product-grid");
  grid.replaceChildren();
  const list = visibleProducts().filter((p) => activeCategory === "all" || p.category === activeCategory);
  list.forEach((p) => grid.append(createCard(p)));
  if (!list.length) grid.append(el("p", "empty", "New gifts are on the way ♡"));
  observeReveals();
}

function renderFilters() {
  const box = $("#filters");
  const categories = [...new Set(visibleProducts().map((p) => p.category))];
  if (categories.length < 2) { box.hidden = true; return; } // no filters needed for one category
  box.hidden = false;
  const items = [["all", "All"]].concat(categories.map((c) => [c, CONFIG.categoryNames[c] || c]));
  items.forEach(([value, label]) => {
    const button = el("button", "", label);
    button.type = "button";
    button.setAttribute("aria-pressed", String(value === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = value;
      box.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      renderProducts();
    });
    box.append(button);
  });
}

// =====================================================
// 6. NAVIGATION, GIFT FINDER, SCROLL REVEAL
// =====================================================
function setupNav() {
  const toggle = $("#nav-toggle");
  const menu = $("#nav-menu");
  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

function setupFinder() {
  $("#finder").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#finder-result").textContent = giftMessages[$("#occasion").value] || "";
    $("#gifts .grid").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("in"); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12 })
  : null;

function observeReveals() {
  document.querySelectorAll(".reveal:not(.in)").forEach((n) =>
    revealObserver ? revealObserver.observe(n) : n.classList.add("in"));
}

function setupLogo() {
  const logo = $("#logo");
  const show = () => { logo.hidden = false; };
  if (logo.complete && logo.naturalWidth) show();
  logo.addEventListener("load", show); // if the file is missing, the text wordmark stays
}

// =====================================================
// 7. START
// =====================================================
try {
  document.documentElement.classList.add("js"); // content is only hidden for animation while JS runs
  $("#announce").textContent = CONFIG.announcement;
  document.querySelectorAll("[data-tagline]").forEach((n) => (n.textContent = CONFIG.tagline));
  document.querySelectorAll("[data-fb]").forEach((a) => (a.href = CONFIG.facebookUrl));
  $("#year").textContent = new Date().getFullYear();
  $("#future").hidden = !CONFIG.showFutureSection;
  document.querySelectorAll(".media[data-src]").forEach((box) =>
    showImage(box, box.dataset.src, box.dataset.alt, box.dataset.text, box.dataset.sub));
  setupLogo();
  setupNav();
  setupFinder();
  renderFilters();
  renderProducts();
  observeReveals();
} catch (error) {
  document.documentElement.classList.remove("js"); // fail safe: show everything
  console.error("VALORA script error:", error);
}
