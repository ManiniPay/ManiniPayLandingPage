import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { useToast } from './ui/hooks/use-toast';
import {
  Rocket,
  Mail,
  Phone,
  MapPin,
  Heart,
  Share2,
  CheckCircle,
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Starting secure form submission with data:', formData);

      // Method 1: Direct form submission to Zoho (most secure)
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = 'https://crm.zoho.com.au/crm/WebToLeadForm';
      formElement.target = '_blank'; // Open in new tab
      formElement.style.display = 'none';

      // Add hidden fields with exact Zoho parameters
      const hiddenFields = {
        xnQsjsdp:
          '1ad2dd5868f802bf0440398f97b5e0caeb7a9d08dde829128e0018c73dd958d3',
        zc_gad: '',
        xmIwtLD:
          '85f1df3911a2ad662d0661bd33f20b31e0f4a15087ce8c8334f2075da62ae36e009680dc7680c01e941ccf4e29a63e9e',
        actionType: 'TGVhZHM=',
        'First Name': formData.firstName,
        'Last Name': formData.lastName,
        Email: formData.email,
        Phone: formData.phone || '',
        Company: formData.company || '',
        Description: formData.message || '',
        'Lead Source': 'Web Research',
        'Lead Status': 'Not Contacted',
      };

      // Create and append input elements
      Object.entries(hiddenFields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        formElement.appendChild(input);
      });

      // Append form to body, submit, then remove
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);

      // Show success message
      toast({
        title: 'Thank You!',
        description:
          "Your information has been submitted successfully! We'll be in touch soon.",
      });

      console.log('Form submitted successfully using direct method');

      // Reset form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        industry: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);

      // Fallback method: Use fetch API for more secure submission
      try {
        const formDataObj = new FormData();
        formDataObj.append(
          'xnQsjsdp',
          '1ad2dd5868f802bf0440398f97b5e0caeb7a9d08dde829128e0018c73dd958d3'
        );
        formDataObj.append('zc_gad', '');
        formDataObj.append(
          'xmIwtLD',
          '85f1df3911a2ad662d0661bd33f20b31e0f4a15087ce8c8334f2075da62ae36e009680dc7680c01e941ccf4e29a63e9e'
        );
        formDataObj.append('actionType', 'TGVhZHM=');
        formDataObj.append('First Name', formData.firstName);
        formDataObj.append('Last Name', formData.lastName);
        formDataObj.append('Email', formData.email);
        formDataObj.append('Phone', formData.phone || '');
        formDataObj.append('Company', formData.company || '');
        formDataObj.append('Description', formData.message || '');
        formDataObj.append('Lead Source', 'Web Research');
        formDataObj.append('Lead Status', 'Not Contacted');

        // Use fetch with no-cors mode to avoid CORS issues
        await fetch('https://crm.zoho.com.au/crm/WebToLeadForm', {
          method: 'POST',
          mode: 'no-cors',
          body: formDataObj,
        });

        toast({
          title: 'Submitted Successfully!',
          description:
            "Your information has been sent. We'll contact you soon!",
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          industry: '',
          message: '',
        });
      } catch (fetchError) {
        console.error('Fetch fallback also failed:', fetchError);
        toast({
          title: 'Submission Error',
          description:
            'There was an issue with your submission. Please try again or contact us directly.',
          variant: 'destructive',
        });
      }
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
        {/* Impact & Community Stories Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Impact & <span className="text-green-600">Community Stories</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
            We’re on a journey together — building a platform that makes digital payments simple, affordable, and trusted for our Pacific people.
           <br /> This is about you, your family, and your village. We’d love to hear your voice:

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
            <div className="text-center">
              <div className="text-sm sm:text-lg text-gray-600 mb-2">
                • How is financial exclusion felt in your community?
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-lg text-gray-600 mb-2">
                • What could life look like with instant, secure access?
              </div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-green-600 font-semibold">
            
             Your stories and dreams will help shape a service designed for our people, by our people.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-gray-200">
            {/* Background Pattern */}
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
                  Sign Up & Impact Pool
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Join our community and help shape the future of financial
                  access
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
                      <span>Phone Number</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Company/Organization</span>
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company or organization"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 text-gray-900 hover:bg-gray-100 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="industry"
                      className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Industry</span>
                    </Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, industry: value }))
                      }
                    >
                      <SelectTrigger className="h-10 sm:h-12 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 text-left text-gray-900 hover:bg-gray-100 focus:bg-white">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 rounded-xl text-gray-900 shadow-lg">
                        <SelectItem
                          value="fintech"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Fintech
                        </SelectItem>
                        <SelectItem
                          value="banking"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Banking
                        </SelectItem>
                        <SelectItem
                          value="technology"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Technology
                        </SelectItem>
                        <SelectItem
                          value="nonprofit"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Non-Profit
                        </SelectItem>
                        <SelectItem
                          value="government"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Government
                        </SelectItem>
                        <SelectItem
                          value="education"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Education
                        </SelectItem>
                        <SelectItem
                          value="healthcare"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Healthcare
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="hover:bg-green-50 focus:bg-green-50 text-gray-900"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-700 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Share Your Story or Message *</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your interest in Manini Pay, share your community's needs, or ask questions..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                    className="bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-lg sm:rounded-xl transition-all duration-300 placeholder:text-gray-400 resize-none min-h-[100px] sm:min-h-[120px] text-gray-900 hover:bg-gray-100 focus:bg-white"
                  />
                </div>

                <div className="pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Join Early Impact</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Your privacy is our priority—we never share your data
                    without your consent. Join thousands of others shaping the
                    future of financial access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info & CTAs - Responsive Stack */}
          <div className="space-y-6 sm:space-y-8">
            {/* Early Access CTA */}
           

          

            {/* Direct Contact */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
                Get Involved
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-green-600 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      General Inquiries
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">
                      welcome@maninipay.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-green-500 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      Phone
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">
                      +61 4 51059746
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-green-400 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      Pacific Region
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">
                      Serving Pacific & Asia-Pacific Communities
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Us Summary */}
<div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">
    Contact Us
  </h4>
  <div className="space-y-3 text-gray-700">
    <div className="flex items-center space-x-3">
      <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-sm">
        Level 28, 140 St Georges Terrace, Perth 6000
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
    <div className="flex items-center space-x-3">
      <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-sm">Serving Pacific & Asia-Pacific Communities</span>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
}
