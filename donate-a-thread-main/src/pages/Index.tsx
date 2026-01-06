import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Truck, Heart, ArrowRight } from 'lucide-react';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-green-50 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
          Give Your Clothes a Second Life
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A pickup-based platform for unused clothes. Reduce textile pollution and support livelihoods.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Donate Clothes <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline">Sign Up</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Schedule Pickup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Select a convenient time and we'll collect your donations from your doorstep.</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Recycle & Reuse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your clothes are sorted and sent to weavers or recyclers, reducing waste.</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Make an Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Support a circular economy and help those in need with your contributions.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
