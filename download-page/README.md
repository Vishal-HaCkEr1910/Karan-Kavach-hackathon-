# Antivirus Website

A modern, responsive website built with React and Tailwind CSS to showcase your antivirus software.

## Features

- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🛡️ Showcase antivirus features
- 👥 Developer team cards
- 📖 Usage guide section
- 💾 Download section

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Extract the zip file
2. Open terminal in the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Project

Start the development server:

```bash
npm start
```

The website will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The build files will be in the `build` folder.

## Customization

### Adding Your .exe File

1. Place your antivirus `.exe` file in the `public` folder
2. Update the download link in `src/components/Download.js`

### Updating Developer Information

Edit the `developers` array in `src/components/DeveloperCards.js` with your team information.

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Import your repository
4. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/antivirus-website",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## Project Structure

```
antivirus-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Features.js
│   │   ├── UsageGuide.js
│   │   ├── DeveloperCards.js
│   │   ├── Download.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Tech Stack

- React 18
- Tailwind CSS 3
- JavaScript (ES6+)

## License

MIT License - feel free to use this for your project!
