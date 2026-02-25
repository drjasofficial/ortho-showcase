# 📸 Orthodontic Case Showcase - Content Management Guide

This guide explains how to add, edit, and manage your cases and photos.

---

## �️ Preview Website Before Uploading

### Method 1: Double-Click (Quick Preview)
Simply double-click `index.html` in your folder to open it in your browser.

### Method 2: Local Server (Recommended)
For full functionality, run a local server:

1. Open **PowerShell** or **Terminal**
2. Navigate to your project folder:
   ```powershell
   cd C:\Users\jaspr\.gemini\antigravity\scratch\ortho-showcase
   ```
3. Start the server:
   ```powershell
   python -m http.server 3000
   ```
4. Open **http://localhost:3000** in your browser
5. Press `Ctrl + C` in terminal to stop the server

> 💡 **Tip:** Always preview your changes locally before uploading to GitHub!

---

## �📁 Folder Structure

```
ortho-showcase/
├── index.html              ← Homepage
├── cases.html              ← Case gallery
├── contact.html            ← Contact page
├── case-001.html           ← Individual case pages
├── case-002.html
├── assets/
│   ├── images/
│   │   ├── cases/
│   │   │   ├── case-001/   ← Photos for case 1
│   │   │   │   ├── extraoral-frontal-pre.webp
│   │   │   │   ├── extraoral-frontal-post.webp
│   │   │   │   ├── intraoral-upper-pre.webp
│   │   │   │   └── ...
│   │   │   └── case-002/   ← Photos for case 2
│   │   └── profile/        ← Your profile photo
│   └── xrays/              ← X-ray images
├── css/
└── js/
```

---

## 📷 Photo Requirements

### Recommended Image Sizes

| Photo Type | Recommended Size | Aspect Ratio |
|------------|------------------|--------------|
| Extraoral (Frontal/Profile) | 800×1000 px | 4:5 (portrait) |
| Intraoral | 1000×750 px | 4:3 (landscape) |
| X-rays (OPG/Ceph) | 1200×600 px | 2:1 (wide) |
| Case Card Thumbnail | 600×400 px | 3:2 |

### Photo Naming Convention

Use this naming pattern for consistency:
```
[view]-[stage].webp

Examples:
extraoral-frontal-pre.webp
extraoral-frontal-post.webp
extraoral-profile-pre.webp
extraoral-smile-post.webp
intraoral-upper-pre.webp
intraoral-lower-post.webp
intraoral-right-pre.webp
opg-pre.webp
ceph-post.webp
```

---

## ✏️ How to Add a New Case

### Step 1: Prepare Your Images

1. **Crop and resize** images to recommended sizes
2. **Add watermarks** using Canva or iLoveIMG (see watermarking section below)
3. Create a new folder: `assets/images/cases/case-XXX/`
4. Save all images in that folder

### Step 2: Create the Case Page

1. **Copy** `case-template.html`
2. **Rename** it to `case-XXX.html` (e.g., `case-003.html`)
3. **Edit** the file and update:

```html
<!-- Update the title -->
<title>Case 003 | Dr. Jaspreet Singh</title>

<!-- Update case tags -->
<span class="case-tag">Class II Division 1</span>
<span class="case-tag">Extraction</span>

<!-- Update case title -->
<h1 class="case-title">Your Case Title Here</h1>

<!-- Update patient info -->
<div class="info-value">18 Years</div>  <!-- Age -->
<div class="info-value">Female</div>     <!-- Gender -->
<div class="info-value">24 Months</div>  <!-- Duration -->
<div class="info-value">MBT 0.022</div>  <!-- Appliance -->
```

### Step 3: Add Your Images

Find the image placeholders and replace with your images:

**Before (placeholder):**
```html
<div class="protected-image" style="background:linear-gradient(135deg,#667eea,#764ba2);height:250px;"></div>
```

**After (your image):**
```html
<div class="protected-image" style="background-image:url('assets/images/cases/case-003/extraoral-frontal-pre.webp');"></div>
```

### Step 4: Add to Case Gallery

Open `cases.html` and add a new case card:

```html
<article class="case-card">
  <a href="case-003.html">
    <div class="case-image-container">
      <div class="protected-image" style="background-image:url('assets/images/cases/case-003/thumbnail.webp');height:200px;"></div>
      <div class="image-overlay"></div>
      <span class="case-badge">Class II</span>
    </div>
    <div class="case-content">
      <h3 class="case-title">Your Case Title</h3>
      <div class="case-meta">
        <span>⏱️ 24 months</span>
        <span>👤 Age: 18 yr, Female</span>
      </div>
      <p class="case-description">Brief description of the case.</p>
      <span class="case-link">View Case →</span>
    </div>
  </a>
</article>
```

---

## 🖼️ Adding Watermarks

### Free Online Tools

1. **Canva** (https://www.canva.com) - Best for text watermarks
2. **iLoveIMG** (https://www.iloveimg.com/watermark-image) - Batch processing

### Watermark Text to Use
```
Dr. Jaspreet Singh
MDS Orthodontics | PGIMER
```

### Best Practices
- ✅ Place diagonally across the image
- ✅ Use 30-50% opacity
- ✅ Cover important areas (not just corners)
- ❌ Don't make it too small or only in corners

---

## 📝 Editing Existing Content

### Update Contact Information

Edit these files:
- `index.html` - Lines 167-172 (contact section)
- `contact.html` - All contact cards

Find and replace:
```html
<!-- Email -->
<p>contact@drjaspreetsingh.com</p>

<!-- Phone -->
<p>+91 98765 43210</p>
```

### Update About Me Section

Edit `index.html`, find the `<section id="about">` and update:
- Your credentials
- Your bio text
- Your profile image (add to `assets/images/profile/`)

---

## 🚀 Deploying to GitHub Pages

### First-Time Setup

1. **Create GitHub Account** at https://github.com
2. **Create New Repository**:
   - Click "New" → Name it `ortho-showcase`
   - Make it **Public**
   - Don't initialize with README

3. **Upload Your Files**:
   - Go to your new repository
   - Click "Add file" → "Upload files"
   - Drag all files from `ortho-showcase` folder
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to repository **Settings**
   - Click **Pages** (left sidebar)
   - Source: Select **main** branch
   - Click **Save**

5. **Your site is live!**
   - URL: `https://YOUR-USERNAME.github.io/ortho-showcase`

### Updating Your Site

After making changes locally:

**Option A: Direct Upload (Easy)**
1. Go to your repository on GitHub
2. Navigate to the file you changed
3. Click the pencil icon (Edit)
4. Make changes or upload new file
5. Click "Commit changes"

**Option B: GitHub Desktop (Better for multiple files)**
1. Download GitHub Desktop (https://desktop.github.com)
2. Clone your repository
3. Make changes locally
4. Click "Commit" then "Push"

---

## 🎨 Quick Reference: CSS Classes

| Class | Purpose |
|-------|---------|
| `.protected-image` | Image with protection (no right-click/drag) |
| `.case-card` | Case preview card in gallery |
| `.case-badge` | Tag/label on case cards |
| `.gallery-item` | Individual photo in case detail |
| `.btn-primary` | Teal colored button |
| `.btn-secondary` | White outlined button |

---

## ❓ Need Help?

Common issues:
- **Images not showing?** Check file path - use forward slashes `/`
- **Layout broken?** Ensure HTML tags are properly closed
- **Changes not live?** GitHub Pages can take 1-2 minutes to update

Files to reference:
- `css/styles.css` - All styling
- `js/protection.js` - Image protection
- `case-template.html` - Case page structure
