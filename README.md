# Hassan Farooq - Retro GameBoy Portfolio

## Project Tree

```
retro-portfolio/
├── public/
│   └── icons/            <-- PUT YOUR PNG ICONS HERE
│       ├── about.png
│       ├── skills.png
│       ├── websites.png
│       ├── games.png
│       ├── neuro.png
│       ├── publications.png
│       ├── contacts.png
│       ├── github.png
│       ├── linkedin.png
│       ├── instagram.png
│       ├── star.png
│       └── menu.png
├── src/
│   ├── components/
│   │   ├── PixelMonster.tsx
│   │   └── ScreenDecor.tsx
│   ├── utils/
│   │   ├── audio.ts
│   │   └── cn.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Setup Instructions

### 1. Create project from scratch

```bash
npm create vite@latest retro-portfolio -- --template react-ts
cd retro-portfolio
```

### 2. Install dependencies

```bash
npm install clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/vite
```

### 3. Replace vite.config.ts with:

```ts
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

### 4. Copy all files from `src/` and `index.html` as shown below

### 5. Add your icon PNGs to `public/icons/`

### 6. Run

```bash
npm run dev      # development
npm run build    # production build
```

### 7. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and connect to Vercel dashboard.
