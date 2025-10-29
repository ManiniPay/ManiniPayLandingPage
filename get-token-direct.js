/**
 * Direct Token Generator - Same as before
 * Run: node get-token-direct.js
 * 
 * This generates an access token you can paste directly into FALLBACK_ACCESS_TOKEN
 * Then it auto-refreshes every 50 minutes using the refresh token
 */

const readline = require('readline');
const https = require('https');
const querystring = require('querystring');

const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';
const REDIRECT_URI = 'https://manini-pay-landing-page.vercel.app/';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔐 Direct Token Generator (Same as Last Time)\n');
console.log('Step 1: Get authorization code\n');
console.log('Open this URL in browser:');
console.log(`\nhttps://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(REDIRECT_URI)}\n`);
console.log('After authorization, copy the "code" from the redirect URL.\n');

rl.question('Paste the authorization code here: ', async (code) => {
  try {
    // Extract code from URL if full URL was pasted
    let codeParam = code.trim();
    if (codeParam.includes('code=')) {
      codeParam = codeParam.split('code=')[1].split('&')[0].split('?')[1] || codeParam.split('code=')[1].split('&')[0];
    }
    
    console.log('\n🔄 Generating tokens...\n');
    
    const postData = querystring.stringify({
      code: codeParam,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const data = await new Promise((resolve, reject) => {
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
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    if (data.access_token && data.refresh_token) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n✅ TOKENS GENERATED:\n');
      
      console.log('📋 ACCESS TOKEN (for FALLBACK_ACCESS_TOKEN):');
      console.log(data.access_token);
      console.log('\n📋 REFRESH TOKEN (for REFRESH_TOKEN - recommended):');
      console.log(data.refresh_token);
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      console.log('\n✨ UPDATE YOUR CODE:\n');
      console.log('Option 1 (Recommended - Auto-refreshes forever):');
      console.log('  Line 28: const REFRESH_TOKEN = "' + data.refresh_token + '";\n');
      
      console.log('Option 2 (Quick fix - expires in 1 hour):');
      console.log('  Line 31: const FALLBACK_ACCESS_TOKEN = "' + data.access_token + '";\n');
      
      console.log('🎉 After updating, tokens will auto-refresh every 50 minutes!\n');
    } else {
      console.error('❌ Error:', data);
      console.log('\nPossible issues:');
      console.log('1. Code expired (get a new one)');
      console.log('2. Redirect URI mismatch');
      console.log('3. Invalid authorization code');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  rl.close();
});

