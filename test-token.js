const https = require('https');

const accessToken = '1000.b424b3d11cd677e050b15b658cb00551.1454b21f01609dc37490271a1c43df99';

const testData = {
  data: [
    {
      First_Name: 'Test',
      Last_Name: 'User',
      Email: 'test@example.com'
    }
  ]
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'www.zohoapis.com.au',
  path: '/crm/v2/Leads',
  method: 'POST',
  headers: {
    'Authorization': `Zoho-oauthtoken ${accessToken}`,
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log('Testing access token...\n');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    if (res.statusCode === 401) {
      console.log('❌ Token is INVALID or EXPIRED');
      console.log('Response:', JSON.stringify(data, null, 2));
      console.log('\n💡 Solution: Token needs to be refreshed using REFRESH_TOKEN');
    } else if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ Token is VALID!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.log(`⚠️ Status: ${res.statusCode}`);
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(postData);
req.end();

