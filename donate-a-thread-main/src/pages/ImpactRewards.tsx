import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Droplets, Leaf, Trees, Trophy } from 'lucide-react';

const ImpactRewards = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Impact & Rewards</h1>
        <p className="text-gray-500">See how your donations are saving the planet!</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ImpactCard
          title="Eco Points"
          value="2,400"
          subtitle="Lifetime Earned"
          icon={<Trophy className="h-6 w-6 text-yellow-500" />}
          color="bg-yellow-50"
        />
        <ImpactCard
          title="Water Saved"
          value="12,000 L"
          subtitle="~ 240 Showers"
          icon={<Droplets className="h-6 w-6 text-blue-500" />}
          color="bg-blue-50"
        />
        <ImpactCard
          title="CO2 Reduced"
          value="450 kg"
          subtitle="~ 45 Trees Planted"
          icon={<Leaf className="h-6 w-6 text-green-500" />}
          color="bg-green-50"
        />
        <ImpactCard
          title="Trees Planted"
          value="5"
          subtitle="By our partners"
          icon={<Trees className="h-6 w-6 text-emerald-500" />}
          color="bg-emerald-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Level Progress */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Current Level: <span className="text-green-600">Green Guardian</span></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2 text-gray-600">
              <span>2,400 Points</span>
              <span>Next Level: 5,000</span>
            </div>
            <Progress value={48} className="h-3 bg-gray-200" />
            <p className="text-xs text-gray-500 mt-2">Donate 26kg more clothes to reach "Eco Warrior" status!</p>
          </CardContent>
        </Card>

        {/* Badges Collection */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <BadgeItem name="First Donation" icon="🌟" unlocked />
              <BadgeItem name="100kg Club" icon="⚖️" unlocked />
              <BadgeItem name="Water Saver" icon="💧" unlocked />
              <BadgeItem name="Super Donor" icon="🦸" unlocked={false} />
              <BadgeItem name="Recycle Pro" icon="♻️" unlocked={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

type ImpactCardProps = { title: string; value: string; subtitle: string; icon: React.ReactNode; color: string };
const ImpactCard = ({ title, value, subtitle, icon, color }: ImpactCardProps) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-all">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <p className="font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </CardContent>
  </Card>
);

const BadgeItem = ({ name, icon, unlocked }: { name: string; icon: string; unlocked: boolean }) => (
  <div className={`flex flex-col items-center p-3 rounded-lg border ${unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 opacity-50 grayscale'}`}>
    <div className="text-3xl mb-1">{icon}</div>
    <span className="text-xs font-medium text-center w-20 truncate">{name}</span>
  </div>
);

export default ImpactRewards;
