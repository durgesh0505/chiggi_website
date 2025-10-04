# Chiggi.us - Personal Website

> Two hearts, one journey — Chirag & Jiggi's personal website

![Website Status](https://img.shields.io/badge/status-active-success)
![Theme](https://img.shields.io/badge/theme-neumorphic-blue)
![Responsive](https://img.shields.io/badge/responsive-yes-green)

## 🌟 Features

- ✨ **Modern Neumorphic Design** - Soft, elegant UI with depth
- 🌓 **Light/Dark Theme Toggle** - User preference saved to localStorage
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast & Lightweight** - Pure vanilla JavaScript, no frameworks
- ♿ **Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data
- 📦 **PWA Ready** - Progressive Web App with manifest
- 🎯 **Dynamic Content** - Content loaded from config.json

## 🚀 Quick Start

### Prerequisites

- A modern web browser
- Your couple photo (named `chirag_jiggi_main.jpg`)

### Setup

1. **Add Your Photo**
   ```bash
   # Place your photo in the images folder
   cp your-photo.jpg images/chirag_jiggi_main.jpg
   ```

2. **Customize Content**

   Edit `config.json` to update all text content:
   - Home page intro and description
   - Chirag's about, work, spiritual side, passions
   - Jiggi's intro and 5 sections
   - Footer blessing text

3. **Local Testing**

   Open `index.html` in your browser or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Or use Live Server in VS Code
   ```

4. **Deploy to GitHub Pages**

   See [Deployment Guide](#-deployment) below

## 📁 Project Structure

```
chiggi_website/
├── index.html                  # Main HTML file
├── app.js                      # JavaScript (theme, tabs, config loader)
├── config.json                 # Content data (editable)
├── manifest.json              # PWA manifest
├── robots.txt                 # SEO crawler instructions
├── CNAME                      # Custom domain
├── .gitignore                 # Git ignore file
├── UI_Design_Update/          # Neumorphic design system
│   ├── neumorphic-ui.css     # Main CSS import
│   ├── core/                  # Variables, base styles
│   ├── themes/               # Light/dark themes
│   ├── components/           # UI components
│   └── utils/                # Utility classes
├── images/                    # Image assets
│   └── chirag_jiggi_main.jpg # Hero image (ADD THIS)
└── README.md                  # This file
```

## 🎨 Design System

The website uses the **UI_Design_Update** neumorphic design system with:

- **Components**: Buttons, cards, tabs, forms, navigation
- **Layout**: Grid, flexbox, container utilities
- **Themes**: Light (default) and dark mode
- **Animations**: Physics-based spring animations
- **Responsive**: Mobile-first approach

### Using Existing Classes

```html
<!-- Cards -->
<div class="card">Your content</div>

<!-- Buttons -->
<button class="btn btn-primary">Click me</button>

<!-- Tabs -->
<div class="tabs">
  <button class="tab active">Tab 1</button>
  <button class="tab">Tab 2</button>
</div>

<!-- Grid Layout -->
<div class="grid grid-cols-2 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

See `UI_Design_Update/README.md` for complete documentation.

## ⚙️ Configuration

### Editing Content

All text content is managed in `config.json`:

```json
{
  "site": {
    "title": "Chiggi.us",
    "footer": "Your blessing text"
  },
  "home": {
    "intro": "Your poetic intro",
    "description": "Your description"
  },
  "chirag": {
    "about_me": "About text",
    "my_work": "Work text",
    "spiritual_side": "Spiritual text",
    "passions": [
      { "name": "Project 1", "desc": "Description" }
    ]
  },
  "jiggi": {
    "intro": "Intro text",
    "sections": [
      { "title": "Title", "text": "Text" }
    ]
  }
}
```

### Theme Toggle

The theme system:
- Default: Light theme
- Stored in: localStorage
- Manual toggle: Click sun/moon button (top-right)
- Automatic: Respects OS preference if not manually set

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px (bottom navigation)
- **Tablet**: 768px - 1023px (2-column grid)
- **Desktop**: 1024px+ (full layout)

## 🚢 Deployment

### GitHub Pages Setup

1. **Initialize Git and Push**
   ```bash
   git init
   git add .
   git commit -m "🚀 Initial commit: Chiggi.us personal website"
   git branch -M main
   git remote add origin https://github.com/durgesh0505/chiggi_website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from `main` branch
   - Root directory: `/` (root)
   - Click Save

3. **Configure Custom Domain** (Optional)

   The `CNAME` file is already included. Configure DNS at your domain registrar:

   **DNS Records:**
   ```
   Type    Name    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     durgesh0505.github.io
   ```

   Then in GitHub Pages settings:
   - Enter custom domain: `chiggi.us`
   - Enable "Enforce HTTPS"

4. **Verify Deployment**

   Your site will be live at:
   - GitHub Pages: `https://durgesh0505.github.io/chiggi_website`
   - Custom domain: `https://chiggi.us` (after DNS propagation)

## 🧪 Testing Checklist

### Before Deployment

- [ ] Add your photo: `images/chirag_jiggi_main.jpg`
- [ ] Update `config.json` with your content
- [ ] Test light/dark theme toggle
- [ ] Test all three tabs (Home, Chirag, Jiggi)
- [ ] Test on mobile, tablet, desktop
- [ ] Test browser back/forward navigation
- [ ] Verify all content loads from config.json

### After Deployment

- [ ] Verify site loads correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Check SEO meta tags (view page source)
- [ ] Test social media sharing preview
- [ ] Run Lighthouse audit (aim for >90 score)

## 🔧 Development

### Local Development Server

```bash
# Python 3
python -m http.server 8000

# PHP
php -S localhost:8000

# Node.js (npx)
npx serve
```

Then open: `http://localhost:8000`

### Making Changes

1. Edit `config.json` for content changes
2. Edit `index.html` for structure changes
3. Edit `app.js` for functionality changes
4. Use existing CSS classes from `UI_Design_Update/`
5. Test locally before deploying
6. Commit and push to GitHub

## 📊 Performance

Target metrics:
- **Performance**: >90 (Lighthouse)
- **Accessibility**: >95 (Lighthouse)
- **Best Practices**: >95 (Lighthouse)
- **SEO**: >95 (Lighthouse)
- **Load Time**: <2 seconds
- **Total Size**: <500KB

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Neumorphic design system
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **GitHub Pages** - Static site hosting
- **PWA** - Progressive Web App ready

## 📝 License

This is a personal website. Feel free to use the code structure for your own projects.

## 💝 With Blessings

> With blessings of Shirdi Sai Baba & Bal Krishna

---

**Created with love by Chirag & Jiggi**

**Website**: [chiggi.us](https://chiggi.us)
