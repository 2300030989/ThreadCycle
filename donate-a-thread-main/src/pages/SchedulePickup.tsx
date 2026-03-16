import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';
import { mockApi } from '@/mockApi';

import DashboardLayout from '@/components/DashboardLayout';

const SchedulePickup = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    pickup_date: '',
    pickup_time: '',
    address: '',
    lat: null as number | null,
    lng: null as number | null,
    cloth_type: '',
    condition: '',
    quantity: '',
    notes: '',
  });

  useEffect(() => {
    // Restore form data if available
    const savedData = localStorage.getItem('pendingPickupData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      // Optional: Clear it so it doesn't persist forever, or keep it until successful submission
    }
  }, []);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude} (You can edit this address)`,
          });
          toast({ title: 'Location Fetched', description: 'Coordinates saved.' });
        },
        (error) => {
          toast({ variant: 'destructive', title: 'Location Error', description: error.message });
        }
      );
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Geolocation is not supported by this browser.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isAuthenticated || !token) {
         // Save data and redirect to login
         localStorage.setItem('pendingPickupData', JSON.stringify(formData));
         toast({ title: "Login Required", description: "Please login to confirm your pickup." });
         navigate('/login', { state: { from: '/schedule-pickup' } });
         return;
      }

      // Use Mock API instead of axios for GitHub Pages
      const response = await mockApi.createPickup(formData);
      
      // Clear saved data on success
      localStorage.removeItem('pendingPickupData');
      
      navigate('/order-receipt', { state: { order: response.data } });
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to schedule pickup in mock mode',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
           <h1 className="text-3xl font-bold text-gray-800">Schedule Pickup</h1>
           <p className="text-gray-500">Book a slot for our team to collect your donation.</p>
        </div>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Pickup Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Pickup Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.pickup_date}
                  onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Pickup Time</Label>
                <Input
                  id="time"
                  type="text"
                  placeholder="e.g. 10 AM - 12 PM"
                  value={formData.pickup_time}
                  onChange={(e) => setFormData({ ...formData, pickup_time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex gap-2">
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                  required
                />
                <Button type="button" variant="outline" size="icon" onClick={handleLocation}>
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cloth Type</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, cloth_type: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mixed Clothes">Mixed Clothes</SelectItem>
                    <SelectItem value="Shirts/Pants">Shirts/Pants</SelectItem>
                    <SelectItem value="Sarees/Ethnic">Sarees/Ethnic</SelectItem>
                    <SelectItem value="Winter Wear">Winter Wear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select onValueChange={(val) => setFormData({ ...formData, condition: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Good">Good (Re-wearable)</SelectItem>
                    <SelectItem value="Worn out">Worn out (Recyclable)</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (Approx. kg)</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g. 5"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions for pickup"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Confirm Pickup
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePickup;
