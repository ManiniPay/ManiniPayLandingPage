# Vercel Environment Variables Setup

## 🔑 One-Time Setup Required

After deploying to Vercel, you need to set **ONE environment variable** for automatic token renewal:

### Step 1: Get Your Refresh Token

**Option A: Using the Script (Easiest)**
```bash
node get-refresh-token.js
```

**Option B: Manual Method**

1. Open this URL in your browser:
```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP&response_type=code&access_type=offline&redirect_uri=https://manini-pay-landing-page.vercel.app/
```

2. After authorization, copy the `code` from the redirect URL

3. Run this in browser console (F12):
```javascript
fetch('https://accounts.zoho.com/oauth/v2/token', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({
    code: 'PASTE_CODE_HERE',
    client_id: '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP',
    client_secret: '16fac23924ba4667b2a23349664380a12c6e9fb6c3',
    redirect_uri: 'https://manini-pay-landing-page.vercel.app/',
    grant_type: 'authorization_code'
  })
})
.then(r => r.json())
.then(d => console.log('✅ Refresh Token:', d.refresh_token));
```

4. Copy the `refresh_token` from the console output

### Step 2: Add to Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Add these variables:

| Name | Value |
|------|-------|
| `ZOHO_REFRESH_TOKEN` | Paste your refresh token here |

**That's it!** Tokens will automatically renew forever.

### Optional (More Secure):
You can also add these as environment variables (currently hardcoded):
- `ZOHO_CLIENT_ID` = `1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP`
- `ZOHO_CLIENT_SECRET` = `16fac23924ba4667b2a23349664380a12c6e9fb6c3`

## ✅ After Setup

- ✅ Tokens automatically refresh every ~55 minutes
- ✅ No manual intervention needed
- ✅ Works forever (refresh tokens don't expire)
- ✅ Automatic retry on failures
- ✅ All token management happens server-side (secure)

## 🚨 Important

- **Refresh token never expires** - you only set this up once
- **Never commit refresh tokens** to GitHub
- **Store in Vercel environment variables** only

