# Deployment Guide

## Quick Deploy Options

### 1. Netlify (Recommended)

1. Push your code to GitHub/GitLab
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### 2. Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Add environment variables in Vercel dashboard

### 3. Manual Static Hosting

1. Run: `npm run build`
2. Upload `dist/` folder contents to your web server
3. Configure environment variables on your hosting platform

## Environment Variables for Production

```env
VITE_OPENROUTER_API_KEY=your_production_api_key
VITE_OPENROUTER_MODEL=moonshotai/kimi-k2
VITE_APP_MODE=demo
```

## Build Output

- **Total size**: ~160KB (gzipped: ~52KB)
- **CSS**: 14KB (gzipped: 3KB)
- **JS**: 160KB (gzipped: 52KB)
- **HTML**: 0.76KB

## Performance Features

✅ Code splitting and tree shaking  
✅ CSS optimization and purging  
✅ Asset compression  
✅ Source maps for debugging  
✅ Static asset caching

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

The app is ready for production deployment! 🚀
