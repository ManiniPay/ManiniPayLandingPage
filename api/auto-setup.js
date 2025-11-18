// Fully automated token setup - no manual steps needed
// Visit: https://manini-pay-landing-page.vercel.app/api/auto-setup
// Everything is handled automatically

export default async function handler(req, res) {
  const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
  const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';
  
  // Try multiple redirect URIs automatically (one should already be configured)
  const possibleRedirectUris = [
    'https://manini-pay-landing-page.vercel.app/',
    'https://manini-pay-landing-page.vercel.app',
    'https://maninipay.com/',
    'https://maninipay.com',
    'https://www.maninipay.com/',
    'https://www.maninipay.com',
    `${req.headers.origin || 'https://manini-pay-landing-page.vercel.app'}/api/auto-callback`,
    `${req.headers.origin || 'https://manini-pay-landing-page.vercel.app'}/`
  ];

  // If code is provided, exchange for tokens
  if (req.query.code) {
    let lastError = null;
    
    for (const redirectUri of possibleRedirectUris) {
      try {
        const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            code: req.query.code,
            client_id: ZOHO_CLIENT_ID,
            client_secret: ZOHO_CLIENT_SECRET,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
          })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.refresh_token) {
          // Success! Display the token
          res.setHeader('Content-Type', 'text/html');
          return res.status(200).send(generateSuccessPage(tokenData.refresh_token, tokenData.access_token));
        } else if (tokenData.error && !tokenData.error.includes('invalid')) {
          lastError = tokenData;
        }
      } catch (error) {
        lastError = error.message;
      }
    }

    // If all failed, show error
    res.setHeader('Content-Type', 'text/html');
    return res.status(400).send(generateErrorPage(lastError));
  }

  // Start OAuth flow - try first redirect URI
  const redirectUri = possibleRedirectUris[0];
  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Auto Setup</title>
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta http-equiv="refresh" content="1;url=${authUrl}">
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #f5f5f5; }
          .card { background: white; padding: 30px; border-radius: 10px; max-width: 500px; margin: 0 auto; }
          .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #4CAF50; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>🚀 Automatically redirecting...</h2>
          <div class="spinner"></div>
          <p>If not redirected, <a href="${authUrl}">click here</a></p>
        </div>
      </body>
    </html>
  `);
}

function generateSuccessPage(refreshToken, accessToken) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>✅ Token Generated</title>
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <style>
          body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
          .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #4CAF50; text-align: center; }
          .token-box { background: #f9f9f9; padding: 15px; border: 2px solid #4CAF50; border-radius: 5px; margin: 20px 0; font-family: monospace; word-break: break-all; }
          button { background: #4CAF50; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 10px; }
          button:hover { background: #45a049; }
          .instructions { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Refresh Token Generated!</h1>
          <div class="token-box" id="token">const REFRESH_TOKEN = '${refreshToken}';</div>
          <div style="text-align: center;">
            <button onclick="copyCode()">📋 Copy Code</button>
          </div>
          <div class="instructions">
            <h3>Next Steps:</h3>
            <ol>
              <li>Open: <code>src/components/contactSection.jsx</code></li>
              <li>Find line 28</li>
              <li>Replace with the code above</li>
              <li>Save</li>
            </ol>
          </div>
        </div>
        <script>
          function copyCode() {
            const code = document.getElementById('token').textContent;
            navigator.clipboard.writeText(code).then(() => {
              alert('✅ Copied! Paste it in contactSection.jsx line 28');
            });
          }
        </script>
      </body>
    </html>
  `;
}

function generateErrorPage(error) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Setup Error</title>
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <style>
          body { font-family: Arial; text-align: center; padding: 50px; background: #f5f5f5; }
          .error { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
          .error h1 { color: red; }
        </style>
      </head>
      <body>
        <div class="error">
          <h1>⚠️ Setup Required</h1>
          <p>The redirect URI needs to be added in Zoho Console.</p>
          <p>Please add this redirect URI to your Zoho app:</p>
          <code style="background: #f4f4f4; padding: 10px; display: block; margin: 20px 0;">
            https://manini-pay-landing-page.vercel.app/api/auto-callback
          </code>
          <p><a href="/api/auto-setup">Try Again</a></p>
        </div>
      </body>
    </html>
  `;
}

