import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Rocket, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from './ui/hooks/use-toast';

export default function ContactSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Refresh token - Auto-refreshes tokens every 50 minutes (never expires)
  const REFRESH_TOKEN = '1000.57657ba28c8bf791eead98ae6c1d2c21.a6db916f26c2b7350dbce2fbbd9590ce';
  
  // Fallback: Pre-generated access token (for immediate use)
  const FALLBACK_ACCESS_TOKEN = '1000.b424b3d11cd677e050b15b658cb00551.1454b21f01609dc37490271a1c43df99';

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

  const refreshAccessTokenFromRefreshToken = async (refreshToken) => {
    try {
      // Use server-side endpoint to avoid CORS issues
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        }),
      });

      const data = await response.json();

      if (data.success && data.access_token) {
        console.log('✅ Token refreshed successfully via server');
        const tokenData = {
          access_token: data.access_token,
          refresh_token: data.refresh_token || refreshToken,
          expires_in: data.expires_in || 3600
        };
        storeToken(tokenData);
        return data.access_token;
      } else {
        console.error('Token refresh failed:', data);
        return null;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  };

  const generateAccessToken = async () => {
    try {
      // Method 1: Try using refresh token from localStorage
      const storedToken = localStorage.getItem('zoho_token');
      if (storedToken) {
        try {
          const parsed = JSON.parse(storedToken);
          if (parsed.refresh_token) {
            console.log('Using refresh token from storage to get new access token...');
            const newToken = await refreshAccessTokenFromRefreshToken(parsed.refresh_token);
            if (newToken) return newToken;
          }
        } catch (e) {
          console.error('Error reading stored token:', e);
        }
      }

      // Method 2: Try using constant refresh token
      if (REFRESH_TOKEN && REFRESH_TOKEN.trim() !== '') {
        console.log('Using constant refresh token to generate new access token...');
        const newToken = await refreshAccessTokenFromRefreshToken(REFRESH_TOKEN);
        if (newToken) {
          // Store it for future use
          const tokenData = {
            access_token: newToken,
            refresh_token: REFRESH_TOKEN,
            expires_in: 3600
          };
          storeToken(tokenData);
          return newToken;
        }
      }

      // Method 3: Use fallback token if available
      if (FALLBACK_ACCESS_TOKEN && FALLBACK_ACCESS_TOKEN !== 'YOUR_PRE_GENERATED_ACCESS_TOKEN_HERE') {
        console.log('Using fallback access token...');
        return FALLBACK_ACCESS_TOKEN;
      }

      // Method 4: If all else fails
      throw new Error('Unable to generate access token. Please check REFRESH_TOKEN or FALLBACK_ACCESS_TOKEN.');
      
    } catch (error) {
      console.error('Token generation error:', error);
      throw error;
    }
  };

  const getValidAccessToken = async () => {
    // Clear any invalid stored tokens first
    const storedToken = getStoredToken();
    if (!storedToken) {
      // Clear localStorage if token expired
      localStorage.removeItem('zoho_token');
    }
    
    // First, try to get stored token (with 5 min buffer)
    if (storedToken) {
      const bufferTime = 5 * 60 * 1000; // 5 minutes
      const tokenData = localStorage.getItem('zoho_token');
      if (tokenData) {
        try {
          const parsed = JSON.parse(tokenData);
          if (parsed.expires_at > (Date.now() + bufferTime)) {
            console.log('Using stored access token');
            return storedToken;
          }
        } catch (e) {
          // Invalid token, clear it
          localStorage.removeItem('zoho_token');
        }
      }
    }
    
    // If no valid stored token, generate a new one
    console.log('No valid stored token, generating new one...');
    const accessToken = await generateAccessToken();
    return accessToken;
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, password } = formData;
    if (!firstName || !lastName || !phone || !password) {
      return 'First name, last name, phone, and password are required.';
    }
    // Only validate email format if email is provided
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return 'Invalid email format.';
      }
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
        // Try minimal payload - name and email (if provided)
        const leadData = {
          data: [
            {
              First_Name: formData.firstName,
              Last_Name: formData.lastName,
              ...(formData.email && formData.email.trim() !== '' ? { Email: formData.email } : {})
            }
          ]
        };

      console.log('Sending lead data to Zoho CRM:', JSON.stringify(leadData, null, 2));
      
        // Use backend proxy to avoid CORS issues
        const response = await fetch('/api/zoho-leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            leadData: leadData,
            accessToken: accessToken
          }),
        });

      if (!response.ok) {
        // Read response once
        const responseText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText || 'Failed to parse error response' };
        }
        
        console.error('Zoho CRM Error Details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          payload: leadData
        });
        
        // Handle 401 - token expired, clear and try refresh
        if (response.status === 401) {
          console.log('Token expired, clearing stored token and retrying...');
          localStorage.removeItem('zoho_token');
          
          // Try once more with fresh token
          try {
            const newAccessToken = await getValidAccessToken();
            console.log('Retrying with new token...');
            
            const retryResponse = await fetch('/api/zoho-leads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                leadData: leadData,
                accessToken: newAccessToken
              }),
            });
            
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              console.log('✅ Success after token refresh');
              
              if (retryData.success && retryData.data && retryData.data.data && retryData.data.data[0]) {
                const leadInfo = retryData.data.data[0];
                navigate('/success', { 
                  state: { 
                    leadId: leadInfo.details.id,
                    leadData: {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      email: formData.email,
                      phone: formData.phone
                    }
                  } 
                });
                return;
              }
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
        }
        
        // Show user-friendly error message
        let errorMessage = 'Something went wrong. Please try again later.';
        
        if (response.status === 401) {
          errorMessage = 'Authentication failed. Please refresh the page and try again, or check that REFRESH_TOKEN is set.';
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.details && errorData.details.message) {
          errorMessage = errorData.details.message;
        }
        
        toast({
          title: '❌ Submission Failed',
          description: errorMessage,
          variant: 'destructive',
        });
        
        throw new Error(`Zoho CRM Error (${response.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Zoho CRM Success:', data);
      
      // Check if the API response indicates success
      if (data.success && data.data && data.data.data && data.data.data[0]) {
        const leadInfo = data.data.data[0];
        
        // Navigate to success page with lead ID
        navigate('/success', { 
          state: { 
            leadId: leadInfo.details.id,
            leadData: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone
            }
          } 
        });
      } else {
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
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Show user-friendly error message
      let errorMessage = 'Something went wrong. Please try again later.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: '❌ Submission Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Professional Sparkle Background with Rays and Particles
  const SparkleBackground = () => {
    const sparkleCount = 30;
    const rayCount = 6;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Rays/Beams */}
        {Array.from({ length: rayCount }, (_, i) => {
          const angle = (360 / rayCount) * i;
          const delay = (i * 0.3) % 4;
          return (
            <div
              key={`ray-contact-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: '2px',
                height: '150%',
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  rgba(74, 222, 128, 0.1) 20%,
                  rgba(34, 197, 94, 0.3) 50%,
                  rgba(74, 222, 128, 0.1) 80%,
                  transparent 100%)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'center',
                animation: `ray-rotate 20s linear infinite`,
                animationDelay: `${delay}s`,
                boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
              }}
            />
          );
        })}

        {/* Sparkle Particles */}
        {Array.from({ length: sparkleCount }, (_, i) => {
          const size = 2 + (i % 3);
          const left = (i * 23.7) % 100;
          const top = (i * 31.3) % 100;
          const delay = (i * 0.15) % 3;
          const duration = 3 + (i % 4);
          const opacity = 0.6 + (i % 3) * 0.15;
          return (
            <div
              key={`sparkle-contact-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: `rgba(74, 222, 128, ${opacity})`,
                boxShadow: `
                  0 0 ${size * 2}px rgba(74, 222, 128, 0.8),
                  0 0 ${size * 4}px rgba(34, 197, 94, 0.6),
                  0 0 ${size * 6}px rgba(16, 185, 129, 0.4)
                `,
                animation: `sparkle-twinkle ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Moving Particles */}
        {Array.from({ length: Math.floor(sparkleCount * 0.6) }, (_, i) => {
          const size = 1 + (i % 2);
          const left = (i * 37.1) % 100;
          const duration = 8 + (i % 6);
          const delay = (i * 0.2) % 5;
          const animType = i % 3 === 0 ? 'particle-float' : i % 3 === 1 ? 'particle-float-left' : 'particle-float-right';
          return (
            <div
              key={`particle-contact-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                backgroundColor: `rgba(34, 197, 94, ${0.7 + (i % 2) * 0.2})`,
                boxShadow: `
                  0 0 ${size * 3}px rgba(74, 222, 128, 0.9),
                  0 0 ${size * 6}px rgba(34, 197, 94, 0.7)
                `,
                animation: `${animType} ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Glowing Orbs */}
        {Array.from({ length: Math.floor(sparkleCount * 0.2) }, (_, i) => {
          const size = 4 + (i % 3);
          const left = (i * 47.3) % 100;
          const top = (i * 53.7) % 100;
          const duration = 12 + (i % 8);
          const delay = (i * 0.4) % 6;
          return (
            <div
              key={`orb-contact-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: `rgba(16, 185, 129, 0.4)`,
                boxShadow: `
                  0 0 ${size * 4}px rgba(74, 222, 128, 0.8),
                  0 0 ${size * 8}px rgba(34, 197, 94, 0.6),
                  0 0 ${size * 12}px rgba(16, 185, 129, 0.4)
                `,
                animation: `orb-pulse ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-20 text-white relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at top, #0a0a0a 0%, #000000 50%, #0a1628 100%)`,
      }}
    >
      {/* Sparkle Background */}
      <SparkleBackground />
      
      {/* Sparkle Animation CSS */}
      <style>{`
        @keyframes ray-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
            opacity: 0.3;
          }
        }
        @keyframes sparkle-twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes particle-float {
          0% {
            transform: translateY(calc(100vh + 50px)) translateX(0) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(30px) scale(1);
            opacity: 0;
          }
        }
        @keyframes particle-float-left {
          0% {
            transform: translateY(calc(100vh + 50px)) translateX(0) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(-25px) scale(1);
            opacity: 0;
          }
        }
        @keyframes particle-float-right {
          0% {
            transform: translateY(calc(100vh + 50px)) translateX(0) scale(0.5);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) translateX(40px) scale(1);
            opacity: 0;
          }
        }
        @keyframes orb-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.3);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact / Signup Form */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border"
            style={{ borderColor: "rgba(45, 122, 68, 0.6)" }}
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle at top, rgba(45,122,68,0.85), transparent 60%)" }}
              ></div>
              <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle at bottom, rgba(45,122,68,0.6), transparent 60%)" }}
              ></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl mb-4"
                  style={{ background: "linear-gradient(135deg, #2D7A44, #183f24)" }}
                >
                  <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  Join the Movement
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  Join our community and help shape the future of financial access
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-gray-300 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#2D7A44" }}
                      ></span>
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
                      className="h-10 sm:h-12 bg-gray-800/50 border-gray-700 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-500 text-white hover:bg-gray-800/70 focus:bg-gray-800/80 focus:ring-2"
                      style={{ outline: "none", boxShadow: "0 0 0 1px transparent" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-gray-300 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#2D7A44" }}
                      ></span>
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
                      className="h-10 sm:h-12 bg-gray-800/50 border-gray-700 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-500 text-white hover:bg-gray-800/70 focus:bg-gray-800/80 focus:ring-2"
                      style={{ outline: "none", boxShadow: "0 0 0 1px transparent" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-300 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#2D7A44" }}
                      ></span>
                      <span>Email Address</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com (optional)"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="h-10 sm:h-12 bg-gray-800/50 border-gray-700 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-500 text-white hover:bg-gray-800/70 focus:bg-gray-800/80 focus:ring-2"
                      style={{ outline: "none", boxShadow: "0 0 0 1px transparent" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-300 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#2D7A44" }}
                      ></span>
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
                      className="h-10 sm:h-12 bg-gray-800/50 border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-500 text-white hover:bg-gray-800/70 focus:bg-gray-800/80"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-300 flex items-center space-x-2"
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
                    className="bg-gray-800/50 border-gray-700 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-500 text-white hover:bg-gray-800/70 focus:bg-gray-800/80 focus:ring-2"
                    style={{ outline: "none", boxShadow: "0 0 0 1px transparent" }}
                  />
                </div>

                <div className="pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, #2D7A44, #183f24)",
                      boxShadow: "0 0 25px rgba(45,122,68,0.55)",
                    }}
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

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border"
                  style={{
                    backgroundColor: "rgba(13, 37, 23, 0.9)",
                    borderColor: "rgba(45,122,68,0.6)",
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#2D7A44" }}
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Your privacy is our priority—we never share your data without your consent. Join thousands of others shaping the future of financial access.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info & CTAs */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
                Contact Us
              </h4>
              <div className="space-y-4 text-gray-300">
  {/* Address 1 */}
  <h5 className="text-sm sm:text-base font-semibold text-white">Address 1</h5>
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
        className="text-sm text-gray-300 hover:text-green-400 transition-colors"
      >
        welcome@maninipay.com
      </a>
    </div>
    <div className="flex items-center space-x-3">
      <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
      <a
        href="tel:+61451059746"
        className="text-sm text-gray-300 hover:text-green-400 transition-colors"
      >
        +61 4 51059746
      </a>
    </div>
  </div>

  {/* Gap between addresses */}
  <div className="my-4 border-t border-gray-200"></div>

  {/* Address 2 */}
  <h5 className="text-sm sm:text-base font-semibold text-white">Address 2</h5>
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
        className="text-sm text-gray-300 hover:text-green-400 transition-colors"
      >
        welcome@maninipay.com
      </a>
    </div>
    <div className="flex items-center space-x-3">
      <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
      <a
        href="tel:+61451059746"
        className="text-sm text-gray-300 hover:text-green-400 transition-colors"
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