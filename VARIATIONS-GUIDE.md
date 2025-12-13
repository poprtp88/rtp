# 📁 Website Variations Guide

## Overview

This repository supports multiple website variations (agents/affiliates) that share the same core resources but have unique designs and affiliate links.

## Structure

```
poprtp.com/                    ← Root (main website)
├── index.html                 ← Main site layout
├── styles.css                 ← Main site design
├── platforms-config.js        ← Main site affiliate links
├── script.js                  ← SHARED: Core logic
├── game-data.js               ← SHARED: Game database
├── images/                    ← SHARED: All game images
├── banner/                    ← SHARED: All banners
├── asset/                     ← SHARED: Platform logos
├── tg/                        ← SHARED: Telegram icon
│
├── lucas/                     ← poprtp.com/lucas/
│   ├── index.html             ← Lucas's layout
│   ├── styles.css             ← Lucas's design (Red Fire)
│   └── platforms-config.js    ← Lucas's affiliate links
│
├── maria/                     ← poprtp.com/maria/
│   ├── index.html             ← Maria's layout
│   ├── styles.css             ← Maria's design (Purple Neon)
│   └── platforms-config.js    ← Maria's affiliate links
│
└── [new-agent]/               ← Add more here!
    ├── index.html
    ├── styles.css
    └── platforms-config.js
```

## How It Works

### Shared Resources (from root `/`)
All variations load these from the **root** directory:
- `/script.js` - Main JavaScript logic
- `/game-data.js` - Game database
- `/provider_image_lists.js` - Provider images
- `/game_popularity.js` - Popularity data
- `/images/*` - All game images
- `/banner/*` - All banners
- `/asset/*` - Platform logos
- `/tg/*` - Telegram icon

### Local Resources (per variation)
Each variation has its **own**:
- `index.html` - Layout (with their branding)
- `styles.css` - Colors and design
- `platforms-config.js` - Affiliate links

## Adding a New Variation

### Step 1: Create Folder
```
mkdir john
```

### Step 2: Create Files
Copy from an existing variation (e.g., lucas):
```
cp lucas/index.html john/
cp lucas/styles.css john/
cp lucas/platforms-config.js john/
```

### Step 3: Customize index.html
Edit `john/index.html`:
- Change `<title>` to "JOHN RTP - Sistema RTP"
- Change canonical URL to `https://poprtp.com/john/`
- Change logo text to "JOHN RTP"
- Change terminal prompt to `john@rtp:~$`
- Change Telegram link

### Step 4: Customize styles.css
Edit `john/styles.css`:
- Change color variables in `:root`
- Available themes: Blue, Red, Purple, Green, Gold

### Step 5: Customize platforms-config.js
Edit `john/platforms-config.js`:
```javascript
const PLATFORMS_CONFIG = [
    { id: 1, url: 'https://john-affiliate-link-1.com' },
    { id: 2, url: 'https://john-affiliate-link-2.com' },
    // ... etc
];
```

### Step 6: Push to GitHub
```bash
git add john/
git commit -m "Add John variation"
git push
```

### Step 7: Access
Visit: `https://poprtp.com/john/`

## Path References

### In Variation HTML Files

**Local files** (same folder):
```html
<link rel="stylesheet" href="styles.css">
<script src="platforms-config.js"></script>
```

**Root/Parent files** (use `../` to go up one level):
```html
<link rel="icon" href="../asset/favicon/favicon.jpg">
<img src="../banner/1%20(1).jpg">
<script src="../script.js"></script>
<script src="../game-data.js"></script>
```

**IMPORTANT:** Use `../` (relative parent) NOT `/` (absolute root)!

## Available Color Themes

### 🔵 Blue Cyberpunk
```css
--accent-cyan: #00f0ff;
--accent-green: #00ff88;
--bg-primary: #050a1e;
```

### 🔴 Red Fire
```css
--accent-cyan: #ff0055;
--accent-green: #ff6600;
--bg-primary: #1e0505;
```

### 🟣 Purple Neon
```css
--accent-cyan: #b800ff;
--accent-green: #00ffcc;
--bg-primary: #1a0a2e;
```

### 🟢 Green Matrix
```css
--accent-cyan: #00ff66;
--accent-green: #00ff99;
--bg-primary: #001a0a;
```

### 🟡 Gold Premium
```css
--accent-cyan: #ffd700;
--accent-green: #ffcc00;
--bg-primary: #1a1400;
```

## URLs

| Variation | URL |
|-----------|-----|
| Main Site | https://poprtp.com/ |
| Lucas | https://poprtp.com/lucas/ |
| Maria | https://poprtp.com/maria/ |
| [New] | https://poprtp.com/[name]/ |

## Checklist for New Variation

- [ ] Create folder: `[name]/`
- [ ] Create `index.html` (copy from existing)
- [ ] Create `styles.css` (customize colors)
- [ ] Create `platforms-config.js` (YOUR affiliate links)
- [ ] Update title and branding in index.html
- [ ] Update canonical URL
- [ ] Update Telegram link
- [ ] Test locally
- [ ] Push to GitHub
- [ ] Verify at https://poprtp.com/[name]/

---

**Created:** December 2025
**Main Site:** https://poprtp.com/

