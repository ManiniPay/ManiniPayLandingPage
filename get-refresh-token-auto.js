/**
 * Fully Automated Zoho Refresh Token Generator
 * 
 * Run: node get-refresh-token-auto.js
 * 
 * This script will:
 * 1. Automatically open your browser
 * 2. Handle OAuth authorization
 * 3. Get the refresh token automatically
 * 4. Display it for you to copy
 */

const http = require('http');
const https = require('https');
const querystring = require('querystring');
const { exec } = require('child_process');
const url = require('url');

const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';
const REDIRECT_URI = 'http://localhost:3001/auth/callback';

let server;
let authCode = null;

console.log('\n🚀 Automated Zoho Refresh Token Generator\n');
console.log('This will open your browser automatically...\n');

// Start local server to catch OAuth redirect
function startLocalServer() {
  return new Promise((resolve, reject) => {
    server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      
      if (parsedUrl.pathname === '/auth/callback') {
        authCode = parsedUrl.query.code;
        
        if (authCode) {
          // Send success page to browser
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <head><title>Authorization Successful</title></head>
              <body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f0f0;">
                <h1 style="color: #4CAF50;">✅ Authorization Successful!</h1>
                <p>You can close this window and return to the terminal.</p>
                <p style="color: #666;">Processing token exchange...</p>
              </body>
            </html>
          `);
          
          // Close server after getting code
          setTimeout(() => {
            server.close();
            resolve(authCode);
          }, 1000);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end('<h1>Error: No authorization code received</h1>');
          server.close();
          reject(new Error('No authorization code received'));
        }
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    server.listen(3001, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('✅ Local server started on port 3001\n');
        resolve();
      }
    });
  });
}

// Open browser automatically
function openBrowser(authUrl) {
  return new Promise((resolve, reject) => {
    const platform = process.platform;
    let command;

    if (platform === 'win32') {
      command = `start "" "${authUrl}"`;
    } else if (platform === 'darwin') {
      command = `open "${authUrl}"`;
    } else {
      command = `xdg-open "${authUrl}"`;
    }

    exec(command, (error) => {
      if (error) {
        console.log('⚠️  Could not open browser automatically.');
        console.log('Please open this URL manually:');
        console.log(authUrl);
        reject(error);
      } else {
        console.log('🌐 Browser opened automatically!\n');
        console.log('📋 Please authorize the application in your browser...\n');
        resolve();
      }
    });
  });
}

// Exchange authorization code for tokens
async function exchangeCodeForTokens(code) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      code: code,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const options = {
      hostname: 'accounts.zoho.com',
      path: '/oauth/v2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.access_token && data.refresh_token) {
            resolve(data);
          } else {
            reject(new Error(JSON.stringify(data)));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Update Zoho redirect URI to use localhost
async function updateRedirectURI() {
  // First, update the redirect URI in the auth URL
  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  
  return authUrl;
}

// Main execution
async function main() {
  try {
    // Update redirect URI in Zoho Console first
    console.log('⚠️  IMPORTANT: First, update your Zoho OAuth app settings:');
    console.log('   1. Go to: https://api-console.zoho.com/');
    console.log('   2. Select your app (Client ID: ' + ZOHO_CLIENT_ID + ')');
    console.log('   3. Add redirect URI: ' + REDIRECT_URI);
    console.log('   4. Click Save\n');
    console.log('Press Enter after updating Zoho settings...');
    
    await new Promise(resolve => {
      process.stdin.once('data', () => resolve());
    });

    // Start local server
    await startLocalServer();

    // Get auth URL with localhost redirect
    const authUrl = await updateRedirectURI();

    // Open browser
    try {
      await openBrowser(authUrl);
    } catch (error) {
      // Continue even if browser opening fails
    }

    // Wait for authorization code
    console.log('⏳ Waiting for authorization...');
    console.log('   (This may take up to 2 minutes)\n');

    let code;
    const timeout = setTimeout(() => {
      if (!authCode) {
        console.error('❌ Timeout: No authorization received within 2 minutes');
        console.log('\nPlease try again or check the redirect URI in Zoho console.');
        process.exit(1);
      }
    }, 120000); // 2 minute timeout

    // Wait for code
    while (!authCode) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    clearTimeout(timeout);
    code = authCode;

    console.log('✅ Authorization code received!\n');
    console.log('🔄 Exchanging code for tokens...\n');

    // Exchange code for tokens
    const tokenData = await exchangeCodeForTokens(code);

    // Display results
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ SUCCESS! Tokens generated:\n');
    console.log('📋 REFRESH TOKEN (paste this in code - NEVER expires):');
    console.log(tokenData.refresh_token);
    console.log('\n📋 ACCESS TOKEN (expires in 1 hour, will auto-refresh):');
    console.log(tokenData.access_token);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✨ Next Steps:');
    console.log('   1. Open: src/components/contactSection.jsx');
    console.log('   2. Find line 28: const REFRESH_TOKEN = "";');
    console.log('   3. Paste: const REFRESH_TOKEN = "' + tokenData.refresh_token + '";');
    console.log('\n🎉 After that, your app will automatically renew tokens every 50 minutes!\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (server) server.close();
    process.exit(1);
  }
}

// Handle process interruption
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Process interrupted');
  if (server) server.close();
  process.exit(0);
});

// Run main function
main();

