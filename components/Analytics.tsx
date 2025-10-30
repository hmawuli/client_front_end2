
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { MOCK_ANALYTICS_DATA } from '../constants';
import type { AnalyticsPeriod } from '../types';

const COLORS = ['#4f46e5', '#0ea5e9']; // primary, secondary from default theme

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState<AnalyticsPeriod>('daily');

  const data = MOCK_ANALYTICS_DATA[period];
  
  const visitorData = [{ name: 'Unique', value: data.reduce((acc, item) => acc + item.unique, 0) }, { name: 'Returning', value: data.reduce((acc, item) => acc + item.returning, 0) }];

  const exportToCSV = () => {
    const headers = "Date,Page Views,Unique Visitors,Returning Visitors\n";
    const csvContent = data.map(row => 
      `${row.date},${row.views},${row.unique},${row.returning}`
    ).join("\n");

    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `analytics_${period}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-base-100 p-6 rounded-xl shadow-md">
        <h3 className="text-text-secondary text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-base-200 text-text-primary">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="bg-base-100 rounded-lg p-1 flex space-x-1">
            {(['daily', 'weekly', 'monthly'] as AnalyticsPeriod[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  period === p ? 'bg-primary text-white' : 'hover:bg-base-300'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={exportToCSV} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard title="Total Views" value={data.reduce((acc, item) => acc + item.views, 0).toLocaleString()} />
         <StatCard title="Unique Visitors" value={data.reduce((acc, item) => acc + item.unique, 0).toLocaleString()} />
         <StatCard title="Returning Visitors" value={data.reduce((acc, item) => acc + item.returning, 0).toLocaleString()} />
      </div>

      <div className="bg-base-100 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Page Views Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
            <XAxis dataKey="date" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-base-200)', border: '1px solid var(--color-base-300)' }}/>
            <Legend />
            <Line type="monotone" dataKey="views" name="Total Views" stroke="var(--color-primary)" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="unique" name="Unique Visitors" stroke="var(--color-secondary)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-100 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Visitor Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
             <BarChart data={visitorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
                <XAxis type="number" stroke="var(--color-text-secondary)"/>
                <YAxis type="category" dataKey="name" stroke="var(--color-text-secondary)"/>
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-base-200)', border: '1px solid var(--color-base-300)' }}/>
                <Bar dataKey="value" fill="var(--color-accent)" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Unique vs Returning</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={visitorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {visitorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--color-base-200)', border: '1px solid var(--color-base-300)' }}/>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
