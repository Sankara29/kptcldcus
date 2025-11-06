// import React from 'react'
// import Chart from 'react-apexcharts'

// const FlowrateLineChart = ({ categories, data }) => {
//   const options = {
//     chart: {
//       id: 'flowrate-line',
//       zoom: { enabled: true },
//       toolbar: { show: false }
//     },
//     xaxis: {
//       categories: categories,
//       title: { text: 'Date Time' },
//       labels: {
//         rotate: -45,
//         formatter: val => new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       }
//     },
//     yaxis: {
//       title: { text: 'Flowrate (L/s)' },
//     },
//     tooltip: {
//       x: { format: 'dd MMM yyyy HH:mm' },
//       y: { formatter: (val) => `${val} L/s` }
//     },
//     dataLabels: { enabled: false },
//     stroke: {
//       curve: 'smooth',
//       width: 2
//     },
//     grid: {
//       borderColor: '#e0e0e0',
//       row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }
//     },
//     colors: ['#00BFFF']
//   }

//   const series = [
//     {
//       name: 'Flowrate',
//       data: data
//     }
//   ]

//   return <Chart options={options} series={series} type="line" height={350} />
// }

// export default FlowrateLineChart


// import React from "react";
// import ApexCharts from "react-apexcharts";

// const FlowrateLineChart = ({ rawData }) => {
//   // Step 1: Filter Smartly
//   const filterSignificantFlowrates = (data) => {
//     const sorted = [...data].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
//     return sorted.filter((item, index, arr) => {
//       const prev = arr[index - 1];
//       const next = arr[index + 1];
//       const flow = parseFloat(item.flowrate);
//       if (!isNaN(flow) && flow !== 0) return true;

//       const beforeNonZero = prev && parseFloat(prev.flowrate) !== 0;
//       const afterNonZero = next && parseFloat(next.flowrate) !== 0;
//       return beforeNonZero || afterNonZero;
//     });
//   };

//   const filtered = filterSignificantFlowrates(rawData);

//   // Step 2: Energy Usage Calculation
//   const energyTable = [];
//   for (let i = 1; i < filtered.length; i++) {
//     const start = filtered[i - 1];
//     const end = filtered[i];
//     const energyUsed = parseFloat(end.live_energy_data) - parseFloat(start.live_energy_data);

//     energyTable.push({
//       startTime: start.datetime,
//       endTime: end.datetime,
//       energyStart: parseFloat(start.live_energy_data),
//       energyEnd: parseFloat(end.live_energy_data),
//       energyUsed: +energyUsed.toFixed(3),
//     });
//   }

//   // Step 3: Prepare Chart Data
//   const chartOptions = {
//     chart: {
//       type: "line",
//       height: 350,
//       zoom: { enabled: true },
//     },
//     xaxis: {
//       categories: filtered.map((d) => d.datetime),
//       title: { text: "Datetime" },
//       labels: { rotate: -45 },
//     },
//     yaxis: {
//       title: { text: "Flowrate" },
//     },
//     tooltip: {
//       x: { format: "dd MMM HH:mm" },
//       y: {
//         formatter: (val) => `${val} LPM`,
//       },
//     },
//   };

//   const chartSeries = [
//     {
//       name: "Flowrate",
//       data: filtered.map((d) => parseFloat(d.flowrate)),
//     },
//   ];

//   return (
//     <div>
//       <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
//       <h3 className="mt-4 text-lg font-semibold">Energy Usage Table</h3>
//       <table className="w-full text-sm mt-2 border border-gray-300">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-2 border">Start Time</th>
//             <th className="p-2 border">End Time</th>
//             <th className="p-2 border">Energy Start (kWh)</th>
//             <th className="p-2 border">Energy End (kWh)</th>
//             <th className="p-2 border">Energy Used (kWh)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {energyTable.map((row, i) => (
//             <tr key={i} className="text-center">
//               <td className="p-2 border">{row.startTime}</td>
//               <td className="p-2 border">{row.endTime}</td>
//               <td className="p-2 border">{row.energyStart}</td>
//               <td className="p-2 border">{row.energyEnd}</td>
//               <td className="p-2 border font-bold">{row.energyUsed}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FlowrateLineChart;


import React from "react";
import ApexCharts from "react-apexcharts";

const FlowrateLineChart = ({ rawData }) => {
  // --- Helpers ---
  const parseEnergy = (val) => {
    const num = parseFloat(val);
    return isNaN(num) || val === null || val === "" ? null : num;
  };

  const getSafeEnergyValue = (data, index) => {
    const current = parseEnergy(data[index]?.live_energy_data);
    if (current !== null) return current;

    let prev = null;
    let next = null;
    let prevIndex = -1;
    let nextIndex = -1;

    // Find previous valid
    for (let i = index - 1; i >= 0; i--) {
      const val = parseEnergy(data[i]?.live_energy_data);
      if (val !== null) {
        prev = val;
        prevIndex = i;
        break;
      }
    }

    // Find next valid
    for (let i = index + 1; i < data.length; i++) {
      const val = parseEnergy(data[i]?.live_energy_data);
      if (val !== null) {
        next = val;
        nextIndex = i;
        break;
      }
    }

    if (prev !== null && next !== null) {
      const stepRatio = (index - prevIndex) / (nextIndex - prevIndex);
      return prev + stepRatio * (next - prev);
    }

    return prev ?? next ?? 0;
  };

  // Step 1: Filter Smartly
  const filterSignificantFlowrates = (data) => {
    const sorted = [...data].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return sorted.filter((item, index, arr) => {
      const flow = parseFloat(item.flowrate);
      if (!isNaN(flow) && flow !== 0) return true;

      const prev = arr[index - 1];
      const next = arr[index + 1];
      const beforeNonZero = prev && parseFloat(prev.flowrate) !== 0;
      const afterNonZero = next && parseFloat(next.flowrate) !== 0;
      return beforeNonZero || afterNonZero;
    });
  };

  const filtered = filterSignificantFlowrates(rawData);

  // Step 2: Energy Usage Table
  const energyTable = [];
  for (let i = 1; i < filtered.length; i++) {
    const energyStart = getSafeEnergyValue(filtered, i - 1);
    const energyEnd = getSafeEnergyValue(filtered, i);
    const energyUsed = energyEnd - energyStart;

    energyTable.push({
      startTime: filtered[i - 1].datetime,
      endTime: filtered[i].datetime,
      energyStart: +energyStart.toFixed(3),
      energyEnd: +energyEnd.toFixed(3),
      energyUsed: +energyUsed.toFixed(3),
    });
  }

  // Step 3: ApexChart
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: true },
    },
    xaxis: {
      categories: filtered.map((d) => d.datetime),
      title: { text: "Datetime" },
      labels: { rotate: -45 },
    },
    yaxis: {
      title: { text: "Flowrate (m³/h)" },
    },
    tooltip: {
      x: { format: "dd MMM HH:mm" },
      y: {
        formatter: (val) => `${val} m³/h`,
      },
    },
  };


  const chartSeries = [
    {
      name: "Flowrate",
      data: filtered.map((d) => parseFloat(d.flowrate)),
    },
  ];

  return (
    <div>
      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />

      {/* <h3 className="mt-4 text-lg font-semibold">Energy Usage Table</h3>
      <table className="w-full text-sm mt-2 border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Start Time</th>
            <th className="p-2 border">End Time</th>
            <th className="p-2 border">Energy Start (kWh)</th>
            <th className="p-2 border">Energy End (kWh)</th>
            <th className="p-2 border">Energy Used (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {energyTable.map((row, i) => (
            <tr key={i} className="text-center">
              <td className="p-2 border">{row.startTime}</td>
              <td className="p-2 border">{row.endTime}</td>
              <td className="p-2 border">{row.energyStart}</td>
              <td className="p-2 border">{row.energyEnd}</td>
              <td className="p-2 border font-bold">{row.energyUsed}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default FlowrateLineChart;

