// Vercel Serverless API endpoint for Zoho CRM integration
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
    const { leadData, accessToken } = req.body;

    if (!leadData || !accessToken) {
      return res.status(400).json({ error: 'Missing leadData or accessToken' });
    }

    // Forward request to Zoho CRM API
    const zohoResponse = await fetch('https://www.zohoapis.com.au/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const responseData = await zohoResponse.json();

    if (!zohoResponse.ok) {
      console.error('Zoho API Error:', responseData);
      return res.status(zohoResponse.status).json({
        error: 'Zoho API Error',
        details: responseData,
        status: zohoResponse.status
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
