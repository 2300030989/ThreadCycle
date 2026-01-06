import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Shirt, Award } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';

// Mock Data for Visuals
const donationData = [
  { month: 'Jan', weight: 12 },
  { month: 'Feb', weight: 19 },
  { month: 'Mar', weight: 15 },
  { month: 'Apr', weight: 25 },
  { month: 'May', weight: 32 },
  { month: 'Jun', weight: 40 },
];

const clothTypeData = [
  { name: 'Shirts', value: 35 },
  { name: 'Pants', value: 25 },
  { name: 'Sarees', value: 20 },
  { name: 'Others', value: 20 },
];

const COLORS = ['#16a34a', '#22c55e', '#86efac', '#bbf7d0'];

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Donated"
          value="143 kg"
          icon={<Shirt className="h-8 w-8 text-blue-500" />}
          color="bg-blue-50"
        />
        <StatCard
          title="CO2 Saved"
          value="450 kg"
          icon={<Leaf className="h-8 w-8 text-green-500" />}
          color="bg-green-50"
        />
        <StatCard
          title="Eco Points"
          value="2,400"
          icon={<Award className="h-8 w-8 text-yellow-500" />}
          color="bg-yellow-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Donation Trends */}
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle className="text-gray-700">Donation Analysis (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cloth Types Distribution */}
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle className="text-gray-700">Donation Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clothTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {clothTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <div className="ml-4 space-y-2">
                {clothTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    {entry.name} ({entry.value}%)
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Upcoming Pickups */}
      <Card className="shadow-sm border-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-gray-700">Recent Pickups</CardTitle>
          <Link to="/schedule-pickup">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">New Pickup</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">#ORD-001</td>
                  <td className="px-4 py-3">2024-03-15</td>
                  <td className="px-4 py-3">Mixed Clothes (5kg)</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span></td>
                  <td className="px-4 py-3 font-semibold text-green-600">+50</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">#ORD-002</td>
                  <td className="px-4 py-3">2024-03-20</td>
                  <td className="px-4 py-3">Old Sarees</td>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Scheduled</span></td>
                  <td className="px-4 py-3 text-gray-400">Pending</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">#ORD-003</td>
                  <td className="px-4 py-3">2024-02-10</td>
                  <td className="px-4 py-3">Winter Jackets</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span></td>
                  <td className="px-4 py-3 font-semibold text-green-600">+120</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) => (
  <Card className="shadow-sm border-none hover:shadow-md transition-shadow">
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </CardContent>
  </Card>
);

export default Dashboard;
