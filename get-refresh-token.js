/**
 * One-time script to get Zoho Refresh Token
 * 
 * REQUIREMENTS: Node.js 18+ (for built-in fetch)
 * Run this once: node get-refresh-token.js
 * 
 * Then paste the refresh_token into REFRESH_TOKEN constant in contactSection.jsx
 * After that, tokens will automatically refresh forever!
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

console.log('\n🔐 Zoho Refresh Token Generator\n');
console.log('This script will help you get a refresh token that works forever.');
console.log('You only need to run this ONCE!\n');
console.log('Step 1: Open this URL in your browser:\n');
console.log(`https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(REDIRECT_URI)}\n`);
console.log('Step 2: After authorization, you will be redirected.');
console.log('Step 3: Copy the "code" parameter from the redirect URL.\n');

rl.question('Paste the authorization code here: ', async (code) => {
  try {
    const codeParam = code.trim().split('code=').pop().split('&')[0].split('?').pop();
    
    console.log('\n🔄 Exchanging code for tokens...\n');
    
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
      console.log('✅ Success! Here are your tokens:\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n📋 REFRESH TOKEN (paste this in code - NEVER expires):');
      console.log(data.refresh_token);
      console.log('\n📋 ACCESS TOKEN (expires in 1 hour, but will auto-refresh):');
      console.log(data.access_token);
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n✨ Copy the REFRESH TOKEN above and paste it into:');
      console.log('   src/components/contactSection.jsx');
      console.log('   Line 38: const REFRESH_TOKEN = "PASTE_HERE";');
      console.log('\n🎉 After that, your app will automatically renew tokens forever!\n');
    } else {
      console.error('❌ Error:', data);
      console.log('\nMake sure:');
      console.log('1. The redirect URI is set correctly in Zoho console');
      console.log('2. You copied the full code from the URL');
      console.log('3. The code hasn\'t expired (get a new one)');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  rl.close();
});

