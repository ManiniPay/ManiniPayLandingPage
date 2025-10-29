# Automatic Zoho Token Renewal Setup

## ✅ How It Works

The code now **automatically renews access tokens** before they expire:
- ✅ **Proactive renewal**: Tokens refresh 5 minutes before expiry
- ✅ **Automatic retry**: If a token expires, it automatically gets a new one
- ✅ **No manual intervention**: Once set up, runs forever

## 🔑 One-Time Setup (Required)

You only need to do this **ONCE** to get a refresh token:

### Option 1: Using the Script (Easiest)

1. **Run the script:**
   ```bash
   node get-refresh-token.js
   ```

2. **Follow the prompts:**
   - It will show you a URL to open in your browser
   - Authorize the app
   - Copy the code from the redirect URL
   - Paste it into the script
   - It will give you the refresh token

3. **Update the code:**
   - Open `src/components/contactSection.jsx`
   - Find line 38: `const REFRESH_TOKEN = '';`
   - Paste your refresh token there: `const REFRESH_TOKEN = 'your_refresh_token_here';`

### Option 2: Manual Method

1. **Get Authorization Code:**
   - Open this URL in browser:
   ```
   https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP&response_type=code&access_type=offline&redirect_uri=https://manini-pay-landing-page.vercel.app/
   ```
   - After authorization, you'll be redirected with a `code` parameter
   - Copy the `code` value

2. **Exchange for Tokens:**
   - Open browser console (F12)
   - Run this (replace YOUR_CODE):
   ```javascript
   fetch('https://accounts.zoho.com/oauth/v2/token', {
     method: 'POST',
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     body: new URLSearchParams({
       code: 'YOUR_CODE',
       client_id: '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP',
       client_secret: '16fac23924ba4667b2a23349664380a12c6e9fb6c3',
       redirect_uri: 'https://manini-pay-landing-page.vercel.app/',
       grant_type: 'authorization_code'
     })
   })
   .then(r => r.json())
   .then(d => console.log('Refresh Token:', d.refresh_token));
   ```

3. **Copy the refresh_token** from console

4. **Paste in code:**
   - Open `src/components/contactSection.jsx`
   - Line 38: `const REFRESH_TOKEN = 'paste_here';`

## 🎉 After Setup

That's it! Once you paste the refresh token:
- ✅ Access tokens automatically renew every ~55 minutes
- ✅ No manual intervention needed
- ✅ Works forever (refresh tokens don't expire)
- ✅ Handles domain changes automatically
- ✅ Retries on failures

## 🔍 Troubleshooting

### "Invalid token" error
- Make sure `REFRESH_TOKEN` constant is set correctly
- Check that the redirect URI in Zoho matches your domain
- Try getting a new refresh token

### "Invalid redirect URI" error
- Update redirect URIs in Zoho Console to include:
  - `https://manini-pay-landing-page.vercel.app/`
  - `https://maninipay.com/`
  - `https://www.maninipay.com/`

## 📝 Important Notes

- **Refresh tokens don't expire** (unlike access tokens)
- **You only need to set this up once**
- **The refresh token is secret** - don't commit it to public repos
- **Access tokens auto-renew** - no manual refresh needed

