# Option 2: Update Fallback Token (Temporary Fix)

## What is a Fallback Token?

A **fallback token** is a backup access token that your app uses when:
- No refresh token is available
- Stored tokens have expired
- Token refresh fails

**⚠️ Important:** Access tokens expire in **1 hour**, so this is only a temporary solution.

---

## Step-by-Step Instructions:

### Step 1: Get a Fresh Access Token

#### Method A: Using Browser Console (Easiest)

1. **Open this URL in your browser:**
   ```
   https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP&response_type=code&access_type=offline&redirect_uri=https://manini-pay-landing-page.vercel.app/
   ```

2. **Log in and authorize** the application

3. **After authorization**, you'll be redirected to a URL like:
   ```
   https://manini-pay-landing-page.vercel.app/?code=1000.ABC123XYZ789...
   ```
   Copy the `code` value (everything after `code=`)

4. **Open Browser Console** (Press F12 → Console tab)

5. **Run this code** (replace `YOUR_CODE` with the code you copied):
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
     console.log('✅ ACCESS TOKEN:', d.access_token);
     console.log('✅ REFRESH TOKEN:', d.refresh_token);
     console.log('\n📋 Copy the ACCESS TOKEN above');
   });
   ```

6. **Copy the `access_token`** from the console

#### Method B: Using the Auto-Setup Endpoint

1. **Visit**: `https://manini-pay-landing-page.vercel.app/api/auto-setup`
2. Follow the prompts
3. Copy both the **ACCESS TOKEN** and **REFRESH TOKEN** shown

---

### Step 2: Update the Code

1. **Open**: `src/components/contactSection.jsx`

2. **Find line 31** (or search for `FALLBACK_ACCESS_TOKEN`):
   ```javascript
   const FALLBACK_ACCESS_TOKEN = '1000.001fa0cc9ea936e19663d52bf895f31f.69818db46d6768cfd1ace477c8ddce9d';
   ```

3. **Replace it with your new access token**:
   ```javascript
   const FALLBACK_ACCESS_TOKEN = 'YOUR_NEW_ACCESS_TOKEN_HERE';
   ```

4. **Save the file**

5. **Redeploy** your application to Vercel

---

### Step 3: Test

1. **Submit a test form** on your website
2. **It should work** for the next hour
3. **After 1 hour**, the token will expire and you'll get 401 errors again

---

## ⚠️ Limitations of Option 2:

### Problems:
- ❌ **Token expires in 1 hour** - you'll need to update it every hour
- ❌ **Not scalable** - can't keep updating manually
- ❌ **Temporary solution only**

### When to Use:
- ✅ **Emergency fix** when site is broken
- ✅ **Testing** to verify everything else works
- ✅ **Short-term** until you can set up Option 1

---

## 🎯 Recommended: Use Option 1 Instead

**Option 1 (Refresh Token)** is better because:
- ✅ **Never expires** - works forever
- ✅ **Auto-refreshes** every 50 minutes
- ✅ **Set it once** - never touch it again
- ✅ **Production-ready**

### To Switch to Option 1:
1. Get the **refresh token** (not access token) from Step 1
2. Paste it in line 28: `const REFRESH_TOKEN = 'paste_refresh_token_here';`
3. Save and deploy
4. **Done forever!**

---

## Quick Comparison:

| Feature | Option 2 (Fallback Token) | Option 1 (Refresh Token) |
|---------|---------------------------|--------------------------|
| **Expires** | ✅ Yes (1 hour) | ❌ Never |
| **Auto-refresh** | ❌ No | ✅ Yes (every 50 min) |
| **Manual updates** | ✅ Needed hourly | ❌ Never |
| **Best for** | Testing/Emergency | Production |

---

## Summary:

**Option 2 is a quick temporary fix**, but **Option 1 is the permanent solution**. 

Use Option 2 only if:
- You need the site working RIGHT NOW
- You'll set up Option 1 within a few hours
- You're just testing

Otherwise, go straight to **Option 1** for a permanent solution!

