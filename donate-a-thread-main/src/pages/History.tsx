import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/mockApi';

const History = () => {
  const { token, user } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['pickups'],
    queryFn: async () => {
      // Use Mock API instead of axios for GitHub Pages
      const res = await mockApi.getPickups();
      return res.data;
    },
    enabled: !!token,
    refetchInterval: 10000,
  });

  type PickupRow = {
    id: number;
    pickup_date: string;
    pickup_time: string;
    quantity: string;
    cloth_type: string;
    condition: string;
    status: string;
    address: string;
  };
  const rows: PickupRow[] = Array.isArray(data) ? (data as PickupRow[]) : [];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Donation History (Mock Mode)</h1>
        <p className="text-gray-500">View and track your past contributions locally.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">{user?.name || 'Guest'}</p>
              <p className="text-gray-500">{user?.email || 'guest@example.com'}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">{rows.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-700">{new Date().toLocaleString()}</p>
              <button onClick={() => refetch()} className="text-sm text-blue-600">Refresh</button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {isError && <p className="text-red-600">Unable to load history.</p>}
          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Condition</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                        No donations found in local storage.
                      </td>
                    </tr>
                  ) : (
                    rows.map((p: PickupRow) => (
                      <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">#{p.id}</td>
                        <td className="px-4 py-3">{p.pickup_date}</td>
                        <td className="px-4 py-3">{p.pickup_time}</td>
                        <td className="px-4 py-3">{p.quantity}kg ({p.cloth_type})</td>
                        <td className="px-4 py-3">{p.condition}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs max-w-[150px] truncate">{p.address}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default History;
