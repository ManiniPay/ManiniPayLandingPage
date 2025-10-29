// Server-side token refresh endpoint - avoids CORS issues
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Missing refreshToken' });
    }

    const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
    const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';

    // Try multiple redirect URIs and Zoho domains
    const redirectUris = [
      'https://manini-pay-landing-page.vercel.app/',
      'https://maninipay.com/',
      'https://www.maninipay.com/'
    ];

    const zohoDomains = ['accounts.zoho.com.au', 'accounts.zoho.com'];

    let lastError = null;

    for (const domain of zohoDomains) {
      for (const redirectUri of redirectUris) {
        try {
          const refreshUrl = `https://${domain}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&redirect_uri=${encodeURIComponent(redirectUri)}&grant_type=refresh_token`;

          const response = await fetch(refreshUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          const tokenData = await response.json();

          if (tokenData.access_token) {
            // Success!
            return res.status(200).json({
              success: true,
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token || refreshToken,
              expires_in: tokenData.expires_in || 3600
            });
          } else if (tokenData.error && !tokenData.error.includes('invalid_code')) {
            lastError = tokenData;
          }
        } catch (error) {
          lastError = error.message;
        }
      }
    }

    // All attempts failed
    return res.status(400).json({
      error: 'Failed to refresh token',
      details: lastError
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

