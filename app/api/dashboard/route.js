import { serverSupabase } from '../../../lib/serverSupabase';

export async function GET() {
  try {
    const { data: devices } = await serverSupabase.from('devices').select('*');
    const { data: users } = await serverSupabase.from('users').select('id,name,role');

    const kpis = [
      { title: 'Active Users', value: users.length, trend: 12 },
      { title: 'Devices Online', value: devices.filter(d => d.status === 'Active').length, trend: 5 },
      { title: 'New Signups', value: 87, trend: -3 },
    ];

    const chartData = [
      { date: 'Jan', value: 200 },
      { date: 'Feb', value: 400 },
      { date: 'Mar', value: 300 },
      { date: 'Apr', value: 500 },
      { date: 'May', value: 450 },
    ];

    return new Response(JSON.stringify({ devices, users, kpis, chartData }), { status: 200 });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch dashboard data' }), { status: 500 });
  }
}
