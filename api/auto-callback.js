// Auto callback handler - redirects back to auto-setup with code
export default async function handler(req, res) {
  const code = req.query.code;
  
  if (code) {
    // Redirect to auto-setup with the code
    res.redirect(302, `/api/auto-setup?code=${code}`);
  } else {
    // No code, go back to start
    res.redirect(302, '/api/auto-setup');
  }
}

