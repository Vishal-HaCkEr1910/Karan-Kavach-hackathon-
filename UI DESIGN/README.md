# Neumorphic Dashboard

A high-fidelity, pixel-perfect React dashboard with neumorphic design system.

## Features

- **3-Column Layout**: Sidebar (240px), Main Content (Flexible), Right Stats Panel (300px)
- **Neumorphic Design System**:
  - "Out" Effect (Elevated): `box-shadow: 10px 10px 20px #111215, -5px -5px 15px #2d3138`
  - "In" Effect (Sunken): `box-shadow: inset 4px 4px 8px #111215, inset -4px -4px 8px #2d3138`
- **Glassmorphism** on right panel with `backdrop-filter: blur(10px)`
- **Progress Rings** with conic gradients (Pink, Purple, Cyan)
- **Animated Bar Charts** with glowing highlights
- **Framer Motion** animations for smooth pop-in effects

## Tech Stack

- **React 18** - UI Framework
- **Tailwind CSS** - Styling with custom neumorphic utilities
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **Vite** - Build tool

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Background | `#1a1c20` | Main container |
| Darker Shadow | `#111215` | Shadow dark side |
| Light Shadow | `#2d3138` | Shadow light side |
| Card Background | `#1e2024` | Elevated cards |
| Pink Accent | `#f53d7a` | Highlights, rings |
| Purple Accent | `#a855f7` | Secondary accent |
| Cyan Accent | `#4ceccb` | CTAs, highlights |

## Project Structure

```
src/
├── main.jsx          # React entry point
├── index.css         # Global styles & Tailwind
└── Dashboard.jsx     # Main dashboard component
    ├── Sidebar       # Navigation & profile
    ├── KPICard       # Views, Visits, Orders
    ├── SalesCard     # Pink-glowing sales card
    ├── StatsGrid     # Progress rings
    ├── ActivityCard  # Activity metrics
    ├── RightPanel    # Revenue stats & bar chart
    └── BarChart      # Weekly overview
```

## License

MIT
