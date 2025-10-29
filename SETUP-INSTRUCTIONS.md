# 🚀 Fully Automated Setup - One-Time Client Action Required

## For Client (One-Time Only - Takes 2 Minutes):

Send this to your client:

---

**SUBJECT: One-Time Zoho Setup (2 minutes)**

Hi,

I need you to do a quick one-time setup (2 minutes) to enable automated token management. After this, everything runs automatically forever.

### Step 1: Add Redirect URI (One-Time)
1. Go to: https://api-console.zoho.com/
2. Find your app (Client ID: `1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP`)
3. Add this redirect URI: `https://manini-pay-landing-page.vercel.app/`
4. Click **Save**

### Step 2: Visit This URL Once
After deploying, visit:
```
https://manini-pay-landing-page.vercel.app/api/auto-setup
```

It will automatically:
- ✅ Redirect to Zoho
- ✅ Get your authorization
- ✅ Generate refresh token
- ✅ Show you the code to paste

That's it! After this one-time setup, tokens refresh automatically forever.

---

## For You (After Client Does Step 1):

1. **Deploy to Vercel**
2. **Send client the URL**: `/api/auto-setup`
3. **Copy the refresh token** they provide
4. **Paste in code**: Line 28 of `contactSection.jsx`

**Done!** After this, everything is 100% automated.

---

## Alternative: If Redirect URI Already Exists

If the redirect URI `https://manini-pay-landing-page.vercel.app/` is already in Zoho Console, you can skip Step 1 and just visit `/api/auto-setup` directly!

