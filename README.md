# SoleSense App - Simplified React + Vite

A clean, simplified React application for pressure simulation visualization.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
solesense-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Heatmap.tsx
│   │   ├── InputPanel.tsx
│   │   ├── MetricsPanel.tsx
│   │   ├── SimulationControls.tsx
│   │   ├── Slider.tsx
│   │   └── ToggleGroup.tsx
│   ├── styles/
│   │   └── index.css        # Global styles with Tailwind
│   ├── types/
│   │   └── simulation.ts    # TypeScript type definitions
│   ├── utils/
│   │   └── api.ts           # API client functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite environment types
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Key Improvements

### Simpler Code Structure
- **No complex routing**: Single-page application
- **No state management libraries**: Pure React useState/useEffect
- **Minimal dependencies**: Only React, Vite, Tailwind CSS, and lucide-react for icons
- **Self-contained components**: Each component is independent and easy to understand

### Clean Component Architecture
- `Button.tsx` - Reusable button with variant support
- `Slider.tsx` - Range input with label and unit display
- `ToggleGroup.tsx` - Button group for selecting options
- `InputPanel.tsx` - Configuration inputs panel
- `Heatmap.tsx` - Canvas-based visualization
- `SimulationControls.tsx` - Run/reset simulation controls
- `MetricsPanel.tsx` - Display simulation metrics

### Removed Complexity
- ❌ No shadcn/ui (40+ component files)
- ❌ No React Query
- ❌ No React Router
- ❌ No form libraries
- ❌ No toast/sonner notifications
- ✅ Just clean, simple React components

## 🎨 Styling

Uses Tailwind CSS with custom design tokens for the dark technical theme:
- Primary color: Cyan (`hsl(187, 85%, 53%)`)
- Background: Dark blue-gray (`hsl(222, 47%, 6%)`)
- Cards: Slightly lighter (`hsl(222, 47%, 8%)`)
- Grid background pattern for technical aesthetic

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:5000
```

### Backend API

The app expects a backend API at `http://127.0.0.1:5000` by default with the following endpoint:

```
POST /simulate
{
  "body_weight": 70,
  "foot_size": 42,
  "arch_type": "normal",
  "activity_mode": "walking",
  "sole_stiffness": 0.4,
  "material_durability": 0.6,
  "steps": 1000
}
```

## 📦 Dependencies

### Production
- `react` & `react-dom` - UI framework
- `lucide-react` - Icon library

### Development
- `vite` - Build tool
- `typescript` - Type safety
- `tailwindcss` - Styling
- `@vitejs/plugin-react` - React support for Vite

## 🌟 Features

- ⚡ Fast development with Vite HMR
- 🎨 Beautiful dark-themed UI
- 📊 Canvas-based heatmap visualizations
- 🔧 Configurable simulation parameters
- 📱 Responsive layout
- 🎯 Type-safe with TypeScript
- 🧩 Clean component architecture
- 📦 Minimal dependencies

## 🔨 Building

```bash
# Development build
npm run build

# The output will be in the `dist/` directory
```

## 📝 License

Educational use only.
