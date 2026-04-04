"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsPanel({ data }) {
  return (
    <div style={{ marginBottom: "40px", height: "300px", width: "100%" }}>
      <h2>📊 Device & Alert Analytics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
