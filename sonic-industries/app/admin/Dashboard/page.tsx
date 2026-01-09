"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [revenueSplit, setRevenueSplit] = useState<any>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [paymentSplit, setPaymentSplit] = useState<any[]>([]);
  const [leadsFunnel, setLeadsFunnel] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/summary?days=${days}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/analytics?days=${days}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/revenue-breakdown?days=${days}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/topProducts?days=${days}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/payment-split?days=${days}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/leads-trends?days=${days}`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/recent-activity`
      ),
    ]).then(([s, a, r, tp, ps, lf, ra]) => {
      setSummary(s.data);
      setAnalytics(a.data);
      setRevenueSplit(r.data);
      setTopProducts(tp.data);
      setPaymentSplit(ps.data);
      setLeadsFunnel(lf.data);
      setActivity(ra.data);
      setLoading(false);
    });
  }, [days]);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-lg text-sm ${
                days === d ? "bg-indigo-600 text-white" : "bg-white border"
              }`}
            >
              Last {d} days
            </button>
          ))}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Products" value={summary.products} />
        <StatCard title="Orders" value={summary.orders} />
        <StatCard title="Revenue" value={`₹${summary.revenue}`} />
        <StatCard title="New Leads" value={summary.leads} />
      </div>

      {/* ORDERS & REVENUE */}
      <Card title="Orders & Revenue Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.ordersByDate}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" />
            <Line type="monotone" dataKey="revenue" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ROW 1 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Order Status">
          <PieChartBox
            data={analytics.orderStatus}
            nameKey="_id"
            valueKey="value"
          />
        </Card>

        <Card title="Revenue Breakdown">
          <PieChartBox
            data={[
              { name: "Online", value: revenueSplit.online },
              { name: "COD", value: revenueSplit.cod },
              { name: "Discounts", value: revenueSplit.discount },
            ]}
          />
        </Card>
      </div>

      {/* ROW 2 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Top Products">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Payment Method Split">
          <PieChartBox data={paymentSplit} nameKey="_id" valueKey="count" />
        </Card>
      </div>

      {/* ROW 3 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Leads Funnel">
          <PieChartBox
            data={[
              { name: "Read", value: leadsFunnel.read },
              { name: "Unread", value: leadsFunnel.unread },
            ]}
            donut
          />
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Recent Orders</h4>
              {activity.orders.map((o: any) => (
                <p key={o._id}>
                  #{o.orderNumber} — ₹{o.final_price} ({o.status})
                </p>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2">New Leads</h4>
              {activity.leads.map((l: any) => (
                <p key={l._id}>{l.subject}</p>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function PieChartBox({
  data,
  nameKey = "name",
  valueKey = "value",
  donut = false,
}: {
  data: any[];
  nameKey?: string;
  valueKey?: string;
  donut?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          innerRadius={donut ? 60 : 0}
          outerRadius={90}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
