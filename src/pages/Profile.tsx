import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Phone, MapPin, Save, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  marketing_emails: boolean;
}

export default function Profile() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    marketing_emails: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      loadProfile();
    }
  }, [user, authLoading, navigate]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_profiles')
        .select('*')
        .eq('id', user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfileData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          city: data.city || '',
          state: data.state || '',
          zip_code: data.zip_code || '',
          marketing_emails: data.marketing_emails || false,
        });
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('customer_profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone || null,
          address_line1: profileData.address_line1 || null,
          address_line2: profileData.address_line2 || null,
          city: profileData.city || null,
          state: profileData.state || null,
          zip_code: profileData.zip_code || null,
          marketing_emails: profileData.marketing_emails,
        })
        .eq('id', user!.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FAC107] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#FAC107] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">Profile updated successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={profileData.last_name}
                    onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold mb-2 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profileData.email}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block font-bold mb-2 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Shipping Address</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-bold mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={profileData.address_line1}
                    onChange={(e) => setProfileData({ ...profileData, address_line1: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Address Line 2</label>
                  <input
                    type="text"
                    value={profileData.address_line2}
                    onChange={(e) => setProfileData({ ...profileData, address_line2: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block font-bold mb-2">City</label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2">State</label>
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                      placeholder="GA"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={profileData.zip_code}
                      onChange={(e) => setProfileData({ ...profileData, zip_code: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#FAC107] focus:outline-none"
                      placeholder="30301"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-6">
              <h2 className="text-xl font-bold mb-4">Preferences</h2>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileData.marketing_emails}
                  onChange={(e) => setProfileData({ ...profileData, marketing_emails: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[#FAC107] focus:ring-[#FAC107]"
                />
                <span className="text-gray-700">
                  Send me updates about new flavas, special offers, and events
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#FAC107] text-black py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
