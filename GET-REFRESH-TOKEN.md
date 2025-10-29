# Quick Guide: Get Your Refresh Token

## Method 1: Browser Console (Easiest - No Script Needed)

### Step 1: Get Authorization Code

1. **Open this URL in your browser:**
```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP&response_type=code&access_type=offline&redirect_uri=https://manini-pay-landing-page.vercel.app/
```

2. **After authorization, copy the `code` from the redirect URL**

### Step 2: Exchange for Refresh Token

1. **Open browser console** (Press F12 → Console tab)

2. **Paste this code** (replace `YOUR_CODE` with the code from Step 1):

```javascript
fetch('https://accounts.zoho.com/oauth/v2/token', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({
    code: 'YOUR_CODE_HERE',
    client_id: '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP',
    client_secret: '16fac23924ba4667b2a23349664380a12c6e9fb6c3',
    redirect_uri: 'https://manini-pay-landing-page.vercel.app/',
    grant_type: 'authorization_code'
  })
})
.then(r => r.json())
.then(d => {
  console.log('\n✅ SUCCESS!\n');
  console.log('📋 REFRESH TOKEN (copy this):');
  console.log(d.refresh_token);
  console.log('\n📋 ACCESS TOKEN (expires in 1 hour):');
  console.log(d.access_token);
  console.log('\n✨ Copy the REFRESH TOKEN and paste it in contactSection.jsx line 28');
});
```

3. **Copy the `refresh_token`** from the console output

4. **Paste it in your code:**
   - Open `src/components/contactSection.jsx`
   - Find line 28: `const REFRESH_TOKEN = '';`
   - Paste your refresh token: `const REFRESH_TOKEN = 'paste_here';`

## Method 2: Using the Script

```bash
node get-refresh-token.js
```

Follow the prompts - it will guide you through the process.

## ⚠️ Important Notes

- **Refresh tokens never expire** - you only do this ONCE
- **Keep it secret** - don't commit to public repos
- **After setting it**, tokens will auto-refresh every 50 minutes

