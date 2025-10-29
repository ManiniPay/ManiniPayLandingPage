// OAuth callback endpoint - handles the redirect from Zoho
export default async function handler(req, res) {
  const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
  const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';
  const origin = req.headers.origin || 'https://manini-pay-landing-page.vercel.app';
  const REDIRECT_URI = `${origin}/api/oauth-callback`;

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
              <title>✅ Refresh Token Generated</title>
              <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
                .container { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
                h1 { color: #4CAF50; text-align: center; margin-bottom: 30px; }
                .token-box { background: #f9f9f9; padding: 20px; border: 3px solid #4CAF50; border-radius: 8px; margin: 20px 0; font-family: 'Courier New', monospace; word-break: break-all; font-size: 14px; line-height: 1.6; }
                .instructions { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3; }
                button { background: #4CAF50; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 10px 5px; transition: background 0.3s; }
                button:hover { background: #45a049; }
                button:active { transform: scale(0.98); }
                .success-icon { font-size: 60px; text-align: center; margin: 20px 0; }
                code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
                .warning { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="success-icon">✅</div>
                <h1>Refresh Token Generated Successfully!</h1>
                
                <div class="instructions">
                  <h3>📋 Your Refresh Token:</h3>
                  <div class="token-box" id="refreshToken">${tokenData.refresh_token}</div>
                  <div style="text-align: center;">
                    <button onclick="copyToken()">📋 Copy Token</button>
                    <button onclick="window.close()">Close Window</button>
                  </div>
                </div>

                <div class="instructions">
                  <h3>📝 Next Steps:</h3>
                  <ol style="line-height: 2;">
                    <li>Open: <code>src/components/contactSection.jsx</code></li>
                    <li>Find line <strong>28</strong>: <code>const REFRESH_TOKEN = '';</code></li>
                    <li>Replace with: <code>const REFRESH_TOKEN = '${tokenData.refresh_token}';</code></li>
                    <li>Save the file</li>
                  </ol>
                </div>

                <div class="warning">
                  <strong>⚠️ Important:</strong><br>
                  • This refresh token <strong>NEVER expires</strong><br>
                  • Keep it <strong>secret</strong> - never commit to public repositories<br>
                  • After setting it, tokens will auto-refresh every 50 minutes automatically
                </div>

                <div style="text-align: center; margin-top: 30px; color: #666;">
                  <small>✨ Your tokens will now auto-refresh forever! ✨</small>
                </div>
              </div>
              <script>
                function copyToken() {
                  const token = document.getElementById('refreshToken').textContent;
                  navigator.clipboard.writeText(token).then(() => {
                    const btn = event.target;
                    const original = btn.textContent;
                    btn.textContent = '✅ Copied!';
                    btn.style.background = '#45a049';
                    setTimeout(() => {
                      btn.textContent = original;
                      btn.style.background = '#4CAF50';
                    }, 2000);
                  }).catch(() => {
                    alert('Please manually copy the token');
                  });
                }
              </script>
            </body>
          </html>
        `);
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.status(400).send(`
          <html><body style="font-family: Arial; padding: 50px; text-align: center;">
            <h1 style="color: red;">❌ Error Getting Refresh Token</h1>
            <pre>${JSON.stringify(tokenData, null, 2)}</pre>
            <p><a href="/api/get-refresh-token">Try Again</a></p>
          </body></html>
        `);
      }
    } catch (error) {
      res.setHeader('Content-Type', 'text/html');
      res.status(500).send(`
        <html><body style="font-family: Arial; padding: 50px; text-align: center;">
          <h1 style="color: red;">❌ Error: ${error.message}</h1>
          <p><a href="/api/get-refresh-token">Try Again</a></p>
        </body></html>
      `);
    }
    return;
  }

  // If no code, redirect to authorization
  res.redirect(302, '/api/get-refresh-token');
}

