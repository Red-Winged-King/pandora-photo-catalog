# Pandora collection — standalone GitHub Pages catalog

126 PDF pages · 7,806 photographed items. Prices, product codes and descriptions transcribed from a supplier-provided catalog. **Brand authenticity, materials, and availability are not independently verified.**

## Getting online

1. Create a **new public GitHub repository** (e.g. `pandora-photo-catalog`).
2. Upload the contents of this folder into the **root of the new repository** (not a subfolder). Upload `index.html`, `style.css`, `app.js`, `data.js`, and all six `photos-*.js` files (the optional README/audit can be uploaded too).
3. Go to **Settings → Pages → Build and deployment**; choose **Deploy from a branch**, branch **main**, folder **/(root)**, save.
4. The site URL will have the form `https://YOUR-USERNAME.github.io/pandora-photo-catalog/` once GitHub Pages finishes publishing.

## Password

The entry password configured in the HTML is `no`. This is a **visual login screen only**. All source code and catalog photos remain publicly readable on GitHub Pages or a public GitHub repository. For actual private access use hosting with server-side authentication, not GitHub Pages.

## Features

- Search by supplier product code or archive code
- Filter by collection, supplier price and PDF page
- Image previews using compressed, cropped photo grids
- Shopping bag in browser local storage, copied order summary, CSV export
- Mobile friendly; no backend or external services required

The page images are generated from original extracted catalog photos, one 8×8 sheet per source page. Each catalog tile uses its PDF grid coordinate. Photos remain inside the six `photos-*.js` files, so no external image folders are necessary. Only the chunks needed for the currently visible items are loaded.
