import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, MapPin, Package } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const OrderReceipt = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [statusStep, setStatusStep] = useState(1);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    // Simulate real-time status updates
    const timers = [
      setTimeout(() => { setStatusStep(2); setProgress(50); }, 3000), // Driver Assigned
      setTimeout(() => { setStatusStep(3); setProgress(75); }, 8000), // On the Way
      setTimeout(() => { setStatusStep(4); setProgress(100); }, 15000), // Arrived
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!order) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">No Order Found</h1>
            <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
        </div>
      </DashboardLayout>
    );
  }

  const steps = [
    { id: 1, label: 'Scheduled', icon: <CheckCircle className="h-5 w-5" /> },
    { id: 2, label: 'Driver Assigned', icon: <Truck className="h-5 w-5" /> },
    { id: 3, label: 'On the Way', icon: <MapPin className="h-5 w-5" /> },
    { id: 4, label: 'Arrived', icon: <Package className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 flex flex-col justify-center items-center min-h-[80vh] gap-8">
        
        {/* Real-time Status Tracker */}
        <Card className="w-full max-w-2xl border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-center text-gray-700">Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-8">
              <Progress value={progress} className="h-2 bg-gray-100" />
            </div>
            <div className="flex justify-between relative">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      statusStep >= step.id 
                        ? 'bg-green-600 text-white shadow-lg scale-110' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    statusStep >= step.id ? 'text-green-700' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Dynamic Status Message */}
            <div className="mt-8 text-center bg-green-50 p-4 rounded-lg animate-pulse">
               <p className="text-green-800 font-semibold">
                 {statusStep === 1 && "Looking for a nearby Pickup Partner..."}
                 {statusStep === 2 && "Partner assigned! Rajesh is reviewing your request."}
                 {statusStep === 3 && "Rajesh is on the way to your location (Estimated: 5 mins)."}
                 {statusStep === 4 && "Partner has arrived! Please hand over the clothes."}
               </p>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Card */}
        <Card className="w-full max-w-md text-center border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex justify-between border-b pb-2 border-green-200">
              <span className="font-semibold">Order ID:</span>
              <span>#{order.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-green-200">
              <span className="font-semibold">Date:</span>
              <span>{order.pickup_date}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-green-200">
              <span className="font-semibold">Time:</span>
              <span>{order.pickup_time}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-green-200">
              <span className="font-semibold">Items:</span>
              <span>{order.quantity} ({order.cloth_type})</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-green-200">
              <span className="font-semibold">Current Status:</span>
              <span className="text-green-700 font-bold">
                 {statusStep === 4 ? 'Arrived' : 'In Progress'}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrderReceipt;
