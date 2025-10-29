// Temporary API endpoint to get refresh token automatically
// Visit: https://your-vercel-url.vercel.app/api/get-refresh-token
// It will handle everything automatically

export default async function handler(req, res) {
  const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
  const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';
  const REDIRECT_URI = `${req.headers.origin || 'https://manini-pay-landing-page.vercel.app'}/api/oauth-callback`;

  // If this is the OAuth callback
  if (req.query.code) {
    try {
      const code = req.query.code;
      
      // Exchange code for tokens
      const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          client_id: ZOHO_CLIENT_ID,
          client_secret: ZOHO_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.refresh_token) {
        // Display success page with refresh token
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Refresh Token Generated</title>
              <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
                .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #4CAF50; }
                .token-box { background: #f9f9f9; padding: 15px; border: 2px solid #4CAF50; border-radius: 5px; margin: 20px 0; font-family: monospace; word-break: break-all; }
                .instructions { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
                button { background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
                button:hover { background: #45a049; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>✅ Refresh Token Generated Successfully!</h1>
                <div class="instructions">
                  <h3>📋 Your Refresh Token:</h3>
                  <div class="token-box" id="refreshToken">${tokenData.refresh_token}</div>
                  <button onclick="copyToken()">📋 Copy Token</button>
                  <p style="margin-top: 20px;"><strong>Next Steps:</strong></p>
                  <ol>
                    <li>Open: <code>src/components/contactSection.jsx</code></li>
                    <li>Find line 28: <code>const REFRESH_TOKEN = '';</code></li>
                    <li>Paste the token above</li>
                  </ol>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px;">
                  <strong>⚠️ Important:</strong> This token never expires. Keep it secure and never commit it to public repositories.
                </div>
              </div>
              <script>
                function copyToken() {
                  const token = document.getElementById('refreshToken').textContent;
                  navigator.clipboard.writeText(token).then(() => {
                    alert('✅ Refresh token copied to clipboard!');
                  });
                }
              </script>
            </body>
          </html>
        `);
      } else {
        res.status(400).json({ error: 'Failed to get refresh token', details: tokenData });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  // Initial request - redirect to Zoho authorization
  const callbackUri = `${req.headers.origin || 'https://manini-pay-landing-page.vercel.app'}/api/oauth-callback`;
  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(callbackUri)}`;
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Getting Refresh Token...</title>
        <meta http-equiv="refresh" content="2;url=${authUrl}">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
          .card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
          .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #4CAF50; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 30px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          h2 { color: #333; }
          a { color: #4CAF50; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>🚀 Automatically redirecting to Zoho...</h2>
          <div class="spinner"></div>
          <p>If you're not redirected in 2 seconds, <a href="${authUrl}">click here</a></p>
        </div>
      </body>
    </html>
  `);
}

