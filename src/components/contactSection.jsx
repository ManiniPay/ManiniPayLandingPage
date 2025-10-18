import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Rocket, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from './ui/hooks/use-toast';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Zoho credentials
  const ZOHO_CLIENT_ID = '1000.IIGZ8L7NK6XUX2DRRV4FP08IL7T8WP';
  const ZOHO_CLIENT_SECRET = '16fac23924ba4667b2a23349664380a12c6e9fb6c3';
  
  // Fallback: Pre-generated access token (generate once manually and paste here)
    const FALLBACK_ACCESS_TOKEN = '1000.001fa0cc9ea936e19663d52bf895f31f.69818db46d6768cfd1ace477c8ddce9d';

  // Token management functions
  const getStoredToken = () => {
    const tokenData = localStorage.getItem('zoho_token');
    if (tokenData) {
      const parsed = JSON.parse(tokenData);
      // Check if token is still valid (not expired)
      if (parsed.expires_at > Date.now()) {
        return parsed.access_token;
      }
    }
    return null;
  };

  const storeToken = (tokenData) => {
    const expiresAt = Date.now() + (tokenData.expires_in * 1000);
    localStorage.setItem('zoho_token', JSON.stringify({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: expiresAt
    }));
  };

  const generateAccessToken = async () => {
    try {
      // Method 1: Try using refresh token if available
      const storedToken = localStorage.getItem('zoho_token');
      if (storedToken) {
        const parsed = JSON.parse(storedToken);
        if (parsed.refresh_token) {
          console.log('Using refresh token to get new access token...');
          const refreshUrl = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${parsed.refresh_token}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&redirect_uri=https://manini-pay-landing-page.vercel.app/&grant_type=refresh_token`;
          
          const response = await fetch(refreshUrl);
          const tokenData = await response.json();
          
          if (tokenData.access_token) {
            console.log('Token refreshed successfully:', tokenData);
            storeToken(tokenData);
            return tokenData.access_token;
          }
        }
      }

      // Method 2: Self Client not supported (400 error expected)
      console.log('Self Client approach not supported for this application (400 error expected)');

      // Method 4: Use fallback token if available
      if (FALLBACK_ACCESS_TOKEN && FALLBACK_ACCESS_TOKEN !== 'YOUR_PRE_GENERATED_ACCESS_TOKEN_HERE') {
        console.log('Using fallback access token...');
        return FALLBACK_ACCESS_TOKEN;
      }

      // Method 3: If all else fails, show error with instructions
      throw new Error('Unable to generate access token automatically. Self Client is not supported. Please generate an access token manually once using the URLs provided and paste it in FALLBACK_ACCESS_TOKEN.');
      
    } catch (error) {
      console.error('Token generation error:', error);
      throw error;
    }
  };

  const getValidAccessToken = async () => {
    // First, try to get stored token
    let accessToken = getStoredToken();
    
    if (accessToken) {
      console.log('Using stored access token');
      return accessToken;
    }
    
    // If no valid stored token, generate a new one
    console.log('No valid stored token, generating new one...');
    accessToken = await generateAccessToken();
    return accessToken;
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, password } = formData;
    if (!firstName || !lastName || !email || !phone || !password) {
      return 'All fields are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return 'Invalid phone number.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const err = validateForm();
    if (err) {
      toast({
        title: 'Validation Error',
        description: err,
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Get a valid access token (either from storage or generate new one)
      const accessToken = await getValidAccessToken();
      console.log('Using access token:', accessToken);

      // Zoho CRM Lead creation payload using form data
        // Try minimal payload - just name and email
        const leadData = {
          data: [
            {
              First_Name: formData.firstName,
              Last_Name: formData.lastName,
              Email: formData.email
            }
          ]
        };

      console.log('Sending lead data to Zoho CRM:', JSON.stringify(leadData, null, 2));
      
        // Try v2 API first (more stable)
        const response = await fetch('https://www.zohoapis.com.au/crm/v2/Leads', {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Failed to parse error response' };
        }
        
        console.error('Zoho CRM Error Details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          payload: leadData,
          responseText: await response.text()
        });
        
        // Log the full error for debugging
        console.error('Full error response:', errorData);
        
        // Show detailed error in UI for debugging
        toast({
          title: 'Debug Info',
          description: `Status: ${response.status} | Error: ${JSON.stringify(errorData)}`,
          variant: 'destructive',
        });
        
        throw new Error(`Zoho CRM Error (${response.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Zoho CRM Success:', data);
      
      toast({
        title: 'Success',
        description: 'Thank you! Your information has been saved and we\'ll contact you soon.',
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      console.error('Error:', error);
      
      toast({
        title: 'Submission Failed',
        description: error.message || 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact / Signup Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-gray-200">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-green-500 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tr from-green-400 to-transparent rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-xl sm:rounded-2xl mb-4">
                  <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                  Join the Movement
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Join our community and help shape the future of financial access
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>First Name *</span>
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      required
                      className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Last Name *</span>
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      required
                      className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Email Address *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (123) 456-7890"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                      className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Password *</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                    className="bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                  />
                </div>

                <div className="pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Join the Movement</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your privacy is our priority—we never share your data without your consent. Join thousands of others shaping the future of financial access.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info & CTAs */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
                Contact Us
              </h4>
              <div className="space-y-4 text-gray-700">
  {/* Address 1 */}
  <h5 className="text-sm sm:text-base font-semibold text-gray-900">Address 1</h5>
  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-sm">
        Level 1, Dalmax Building Lot1 Nasau Backroad, Fiji
      </span>
    </div>
    <div className="flex items-center space-x-3">
      <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
      <a
        href="mailto:welcome@maninipay.com"
        className="text-sm text-gray-700 hover:text-green-600 transition-colors"
      >
        welcome@maninipay.com
      </a>
    </div>
    <div className="flex items-center space-x-3">
      <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
      <a
        href="tel:+61451059746"
        className="text-sm text-gray-700 hover:text-green-600 transition-colors"
      >
        +61 4 51059746
      </a>
    </div>
  </div>

  {/* Gap between addresses */}
  <div className="my-4 border-t border-gray-200"></div>

  {/* Address 2 */}
  <h5 className="text-sm sm:text-base font-semibold text-gray-900">Address 2</h5>
  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-sm">
        AMP Tower, 140 St Georges Terrace, Perth WA 6001
      </span>
    </div>
    <div className="flex items-center space-x-3">
      <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
      <a
        href="mailto:welcome@maninipay.com"
        className="text-sm text-gray-700 hover:text-green-600 transition-colors"
      >
        welcome@maninipay.com
      </a>
    </div>
    <div className="flex items-center space-x-3">
      <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
      <a
        href="tel:+61451059746"
        className="text-sm text-gray-700 hover:text-green-600 transition-colors"
      >
        +61 4 51059746
      </a>
    </div>
   
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
