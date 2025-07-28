# AI-Powered Airtable Support Assistant

A lightweight web application that demonstrates how AI can diagnose Airtable formula errors, API issues, and workflow problems, returning clear, customer-facing resolutions.

![Airtable Support Assistant](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-blue) ![Vite](https://img.shields.io/badge/Vite-4.4.5-purple)

## ✨ Features

### 🎯 Core Functionality

- **Error Analysis**: Supports Formula Errors, API Errors, and Workflow Issues
- **AI Integration**: Real AI analysis via OpenRouter API with fallback to mock responses
- **Demo Mode**: 10 preloaded sample tickets for instant testing
- **Copy to Clipboard**: One-click copying of suggested fixes
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🎨 UI/UX

- **Airtable Brand Colors**: Professional blue and gray color scheme
- **Card-based Layout**: Clean, modern interface design
- **Loading States**: Smooth animations and progress indicators
- **Error Handling**: Graceful fallbacks and user-friendly error messages

### 🔧 Technical Features

- **TypeScript**: Full type safety and IntelliSense support
- **Environment Variables**: Secure API key management
- **Static Site Ready**: Optimized for Netlify, Vercel, and other static hosts
- **Mock AI Service**: Works offline with realistic demo responses

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- (Optional) OpenRouter API key for live AI integration

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd airtable-demo
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

3. **Configure API (Optional):**
   Edit `.env` file:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_MODEL=moonshotai/kimi-k2
VITE_APP_MODE=demo
```

4. **Start development server:**

```bash
npm run dev
```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🎮 Usage

### Demo Mode (Default)

- Toggle **Demo Mode ON** in the header
- Select from 10 preloaded error examples
- Instant analysis with mock AI responses
- Perfect for demonstrations and testing

### Live AI Mode

- Toggle **Demo Mode OFF** in the header
- Requires OpenRouter API key in `.env`
- Real AI analysis of custom error messages
- Automatic fallback to demo responses if API fails

### Error Types Supported

1. **Formula Error**: Syntax errors, data type mismatches, invalid functions
2. **API Error**: Authentication issues, rate limits, malformed requests
3. **Workflow Issue**: Automation failures, missing data, script errors

## 🏗️ Project Structure

```
airtable-demo/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation with demo toggle
│   │   ├── ErrorInput.tsx   # Error input form
│   │   ├── DemoModeSelector.tsx  # Demo ticket selector
│   │   ├── ResultDisplay.tsx     # AI analysis results
│   │   └── LoadingSpinner.tsx    # Loading animations
│   ├── services/           # API and mock services
│   │   ├── mockAI.ts       # Demo mode responses
│   │   └── openRouterAPI.ts # Live AI integration
│   ├── hooks/              # Custom React hooks
│   │   └── useClipboard.ts # Copy to clipboard functionality
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # App-wide type definitions
│   ├── data/               # Static data
│   │   └── demo-data.json  # Sample error tickets
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

| Variable                  | Description                    | Default              | Required |
| ------------------------- | ------------------------------ | -------------------- | -------- |
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key for live AI | -                    | No\*     |
| `VITE_OPENROUTER_MODEL`   | AI model to use                | `moonshotai/kimi-k2` | No       |
| `VITE_APP_MODE`           | Default app mode               | `demo`               | No       |

\*Required only for live AI integration. App works fully in demo mode without API key.

### Customizing Demo Data

Edit `src/data/demo-data.json` to add your own sample error tickets:

```json
{
  "id": 11,
  "type": "Formula Error",
  "error": "Your custom error message",
  "explanation": "What's happening explanation",
  "fix": "Step-by-step fix instructions"
}
```

## 🚀 Deployment

### Static Site Deployment (Recommended)

**Netlify:**

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

**Vercel:**

1. Import project to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in Vercel dashboard

**Manual Build:**

```bash
npm run build
# Upload 'dist' folder to your hosting provider
```

### Environment Variables for Production

Set these in your hosting platform:

```env
VITE_OPENROUTER_API_KEY=your_production_api_key
VITE_OPENROUTER_MODEL=moonshotai/kimi-k2
VITE_APP_MODE=demo
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Adding New Error Types

1. Update `ErrorType` in `src/types/index.ts`
2. Add handling in `src/services/mockAI.ts`
3. Update `src/components/ErrorInput.tsx` dropdown options

### Customizing Styles

The app uses Tailwind CSS with custom Airtable brand colors defined in `tailwind.config.js`:

```javascript
colors: {
  airtable: {
    blue: '#2D7FF9',
    'blue-dark': '#1E5FCC',
    'blue-light': '#E6F2FF',
    gray: '#6B7280',
    'gray-light': '#F9FAFB',
    'gray-dark': '#374151',
  },
}
```

## 🔍 API Integration

### OpenRouter Setup

1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Generate an API key
3. Add to `.env` file
4. Choose your preferred model (Claude, GPT-4, etc.)

### Supported Models

- `anthropic/claude-3-haiku` (Fast, cost-effective)
- `anthropic/claude-3-sonnet` (Balanced performance)
- `openai/gpt-3.5-turbo` (OpenAI alternative)
- `openai/gpt-4` (Highest quality)

## 🐛 Troubleshooting

### Common Issues

**TypeScript Errors:**

```bash
npm install  # Ensure all dependencies are installed
```

**API Not Working:**

- Check `.env` file exists and has correct API key
- Verify API key is valid in OpenRouter dashboard
- App will fallback to demo mode automatically

**Build Failures:**

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Styling Issues:**

```bash
npm run dev  # Ensure Tailwind is processing correctly
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or issues:

- Open an issue on GitHub
- Check the troubleshooting section above
- Review the demo mode for expected behavior

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
