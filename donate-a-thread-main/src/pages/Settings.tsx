import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const Settings = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from backend
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            phone: response.data.phone || '',
            address: '',
          });
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          // Fallback to user from context
          if (user) {
            setFormData({
              name: user.name || '',
              email: user.email || '',
              phone: '',
              address: '',
            });
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // For now, just show success message
    // In production, you'd update the backend
    toast({
      title: "Settings Saved",
      description: "Your profile information has been updated.",
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account preferences.</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Default Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                placeholder="Enter your default address"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <Switch id="email-notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notif">SMS Notifications</Label>
              <Switch id="sms-notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="promo-notif">Marketing Updates</Label>
              <Switch id="promo-notif" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
