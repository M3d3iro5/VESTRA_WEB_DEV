"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function PigChart({ data, darkMode }) {
  return (
    <div className="w-full h-[300px] select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEspessura" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#3b82f6" : "#2563eb"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#3b82f6" : "#2563eb"}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorCorrosao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
          <XAxis
            dataKey="km"
            stroke={darkMode ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickFormatter={(val) => `Km ${val}`}
          />
          <YAxis
            stroke={darkMode ? "#94a3b8" : "#64748b"}
            fontSize={12}
            unit="mm"
            domain={[0, 15]} // Espessura do duto
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#0f172a" : "#fff",
              borderColor: darkMode ? "#334155" : "#e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: darkMode ? "#94a3b8" : "#64748b" }}
          />
          <ReferenceLine
            y={4}
            label="Limite Crítico"
            stroke="#ef4444"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="espessura"
            stroke={darkMode ? "#3b82f6" : "#2563eb"}
            fillOpacity={1}
            fill="url(#colorEspessura)"
            name="Parede Nominal"
          />
          <Area
            type="monotone"
            dataKey="perda"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#colorCorrosao)"
            name="Perda por Corrosão"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
