# Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Supabase project

### Step 1: Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit: Office website with admin dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/office-website.git
git push -u origin main
\`\`\`

### Step 2: Deploy to Vercel

1. **Connect GitHub to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \`\`\`

3. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your admin dashboard will be live!

### Step 3: Share Admin Access

Once deployed, share with other admins:
- **URL**: `https://your-project.vercel.app/admin-login`
- **Password**: `ttxx.1234`
- **Email**: Any email they prefer

## 🔧 Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📱 Admin Features

- Content Management (Services, News, Events)
- Document & Gallery Management
- User Message Management
- Site Settings & Configuration
- User Access Management

## 🔐 Security

- Password-protected admin access
- Secure file uploads via Supabase Storage
- Database security with Row Level Security (RLS)
- Session management

## 📞 Support

For technical support, contact the system administrator.
