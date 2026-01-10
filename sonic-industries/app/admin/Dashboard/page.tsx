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
  CartesianGrid,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, Users } from "lucide-react";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

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

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-slate-600">Track your business performance and insights</p>
          </div>
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  days === d
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:shadow-md"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Products"
            value={summary.products}
            icon={<Package className="w-6 h-6" />}
            color="indigo"
            trend="+12%"
          />
          <StatCard
            title="Orders"
            value={summary.orders}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="emerald"
            trend="+8%"
          />
          <StatCard
            title="Revenue"
            value={`₹${summary.revenue?.toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="amber"
            trend="+15%"
          />
          <StatCard
            title="New Leads"
            value={summary.leads}
            icon={<Users className="w-6 h-6" />}
            color="rose"
            trend="+23%"
          />
        </div>

        {/* ORDERS & REVENUE TREND */}
        <Card title="Orders & Revenue Trend" subtitle="Daily performance overview">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={analytics.ordersByDate}>
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="_id"
                stroke="#64748b"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", r: 5 }}
                activeDot={{ r: 7 }}
                fill="url(#orderGradient)"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: "#22c55e", r: 5 }}
                activeDot={{ r: 7 }}
                fill="url(#revenueGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* ROW 1 */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Order Status" subtitle="Current order distribution">
            <PieChartBox
              data={analytics.orderStatus}
              nameKey="_id"
              valueKey="value"
            />
          </Card>

          <Card title="Revenue Breakdown" subtitle="Income sources analysis">
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
          <Card title="Top Products" subtitle="Best performing products">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topProducts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                  {topProducts.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Payment Method Split" subtitle="Transaction methods">
            <PieChartBox data={paymentSplit} nameKey="_id" valueKey="count" />
          </Card>
        </div>

        {/* ROW 3 */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Leads Funnel" subtitle="Lead engagement status">
            <PieChartBox
              data={[
                { name: "Read", value: leadsFunnel.read },
                { name: "Unread", value: leadsFunnel.unread },
              ]}
              donut
            />
          </Card>

          <Card title="Recent Activity" subtitle="Latest updates">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-indigo-600" />
                  Recent Orders
                </h4>
                <div className="space-y-2">
                  {activity.orders.map((o: any) => (
                    <div
                      key={o._id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        #{o.orderNumber}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-900">
                          ₹{o.final_price}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            o.status === "delivered"
                              ? "bg-emerald-100 text-emerald-700"
                              : o.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  New Leads
                </h4>
                <div className="space-y-2">
                  {activity.leads.map((l: any) => (
                    <div
                      key={l._id}
                      className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <p className="text-sm text-slate-700">{l.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({
  title,
  value,
  icon,
  color,
  trend,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}) {
  const colorClasses = {
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    emerald: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    amber: "bg-gradient-to-br from-amber-500 to-amber-600",
    rose: "bg-gradient-to-br from-rose-500 to-rose-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`${
            colorClasses[color as keyof typeof colorClasses]
          } p-3 rounded-xl text-white shadow-md`}
        >
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </div>
        )}
      </div>
      <p className="text-sm text-slate-600 mb-1 font-medium">{title}</p>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
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
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-slate-100">
          <p className="text-sm font-semibold text-slate-900">
            {payload[0].name}
          </p>
          <p className="text-lg font-bold text-indigo-600">
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={donut ? 70 : 0}
            outerRadius={100}
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name}: ${(percent! * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-sm text-slate-600 font-medium">
              {item[nameKey]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}