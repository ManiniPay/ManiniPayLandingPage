# 🚀 Fully Automated Refresh Token Setup

## Method 1: Using Vercel Endpoint (Fully Automated - No Manual Steps)

### Step 1: Deploy Your Code to Vercel
1. Push your code to GitHub
2. Deploy to Vercel

### Step 2: Add Redirect URI in Zoho Console
1. Go to: https://api-console.zoho.com/
2. Select your app (Client ID: `1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP`)
3. Add redirect URI: `https://manini-pay-landing-page.vercel.app/api/get-refresh-token`
4. Click **Save**

### Step 3: Visit the Automated Endpoint
**Simply visit this URL (replace with your Vercel URL):**
```
https://manini-pay-landing-page.vercel.app/api/get-refresh-token
```

**That's it!** It will:
- ✅ Automatically redirect you to Zoho
- ✅ Handle authorization
- ✅ Exchange code for tokens
- ✅ Display your refresh token
- ✅ Give you a copy button

Just copy the refresh token and paste it in your code!

---

## Method 2: Using Local Script (After Adding Localhost Redirect)

### Step 1: Add Localhost Redirect in Zoho
1. Go to: https://api-console.zoho.com/
2. Add redirect URI: `http://localhost:3001/auth/callback`
3. Save

### Step 2: Run the Script
```bash
node get-refresh-token-auto.js
```

The script will:
- ✅ Start a local server
- ✅ Open your browser automatically
- ✅ Wait for authorization
- ✅ Get the refresh token automatically
- ✅ Display it in the terminal

---

## 🎯 Recommended: Method 1 (Vercel Endpoint)

Method 1 is easiest because:
- No local server needed
- Works from any device
- Fully automated in browser
- One-click copy button

