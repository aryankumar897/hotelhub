import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Reach from "./Reach";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('area'); // 'area' or 'bar'

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin/sales`);
        if (!response.ok) {
          throw new Error('Failed to fetch revenue data');
        }
        const result = await response.json();
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const formattedData = result.map(item => ({
          name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
          revenue: item.totalRevenue,
          fullDate: new Date(item._id.year, item._id.month - 1)
        }))
        .sort((a, b) => a.fullDate - b.fullDate)
        .slice(-12);

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  if (loading) return (
    <div style={{ 
      backgroundColor: 'black', 
      padding: '20px', 
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
      maxWidth: '1200px',
      margin: '0 auto',
      color: 'cyan',
      textAlign: 'center'
    }}>
      Loading revenue data...
    </div>
  );

  if (error) return (
    <div style={{ 
      backgroundColor: 'black', 
      padding: '20px', 
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
      maxWidth: '1200px',
      margin: '0 auto',
      color: 'red',
      textAlign: 'center'
    }}>
      Error: {error}
    </div>
  );

  return (
    <>
      <div style={{ 
        backgroundColor: 'black', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: 'cyan', 
          textAlign: 'center', 
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Monthly Revenue Overview
        </h2>

        {/* Chart Type Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          gap: '10px'
        }}>
          <button
            onClick={() => setActiveTab('area')}
            style={{
              backgroundColor: activeTab === 'area' ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
              color: 'cyan',
              border: '1px solid cyan',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Trend View
          </button>
          <button
            onClick={() => setActiveTab('bar')}
            style={{
              backgroundColor: activeTab === 'bar' ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
              color: 'cyan',
              border: '1px solid cyan',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Monthly View
          </button>
        </div>
        
        <div style={{ height: '400px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'area' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'white' }} 
                  axisLine={{ stroke: 'white' }}
                />
                <YAxis 
                  tick={{ fill: 'white' }} 
                  axisLine={{ stroke: 'white' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    borderColor: 'cyan',
                    borderRadius: '5px',
                    color: 'white'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'white' }} 
                  axisLine={{ stroke: 'white' }}
                />
                <YAxis 
                  tick={{ fill: 'white' }} 
                  axisLine={{ stroke: 'white' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    borderColor: 'cyan',
                    borderRadius: '5px',
                    color: 'white'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="revenue" name="Revenue">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ 
        padding: '40px', 
        marginTop: "20px",
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Reach/>
      </div>
    </>
  );
};

export default RevenueChart;








//`${process.env.API}/admin/sales`



// import React, { useState, useEffect } from 'react';
// import {
//   ComposedChart,
//   Line,
//   Area,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Scatter,
//   ResponsiveContainer,
//   Cell,
// } from 'recharts';


// import Reach from "./Reach"


// // Generate initial data for the last 12 months with years
// const generateInitialData = () => {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();
  
//   return Array.from({ length: 12 }, (_, i) => {
//     const monthOffset = -11 + i;
//     const date = new Date(currentYear, currentMonth + monthOffset, 1);
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();
//     return {
//       name: `${months[monthIndex]} ${year}`,
//       month: months[monthIndex],
//       year: year,
//       revenue: Math.floor(Math.random() * 5000) + 1000,
//       expenses: Math.floor(Math.random() * 3000) + 500,
//       profit: Math.floor(Math.random() * 2000) + 500,
//     };
//   });
// };

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// const RevenueChart = () => {
//   const [data, setData] = useState(generateInitialData());
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Function to add a new month and remove the oldest one
//   const updateData = () => {
//     const months = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];
    
//     // Get the last entry in the data
//     const lastEntry = data[data.length - 1];
//     const lastMonthIndex = months.indexOf(lastEntry.month);
//     const lastYear = lastEntry.year;
    
//     // Calculate next month and year
//     let nextMonth, nextYear;
//     if (lastMonthIndex === 11) {
//       nextMonth = months[0];
//       nextYear = lastYear + 1;
//     } else {
//       nextMonth = months[lastMonthIndex + 1];
//       nextYear = lastYear;
//     }
    
//     setData(prevData => [
//       ...prevData.slice(1),
//       {
//         name: `${nextMonth} ${nextYear}`,
//         month: nextMonth,
//         year: nextYear,
//         revenue: Math.floor(Math.random() * 5000) + 1000,
//         expenses: Math.floor(Math.random() * 3000) + 500,
//         profit: Math.floor(Math.random() * 2000) + 500,
//       }
//     ]);
//   };

//   // Auto-update data when isPlaying is true
//   useEffect(() => {
//     let interval;
//     if (isPlaying) {
//       interval = setInterval(updateData, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying, data]); // Added data to dependencies

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (

// <>

//     <div style={{ 
//       backgroundColor: 'black', 
//       padding: '20px', 
//       borderRadius: '10px',
//       boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
//       maxWidth: '1200px',
//       margin: '0 auto'
//     }}>
//       <h2 style={{ 
//         color: 'cyan', 
//         textAlign: 'center', 
//         marginBottom: '20px',
//         fontFamily: 'Arial, sans-serif'
//       }}>
//         12-Month Revenue Overview
//       </h2>
      
//       <div style={{ height: '400px', width: '100%' }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <ComposedChart
//             data={data}
//             margin={{
//               top: 20,
//               right: 20,
//               bottom: 20,
//               left: 20,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//             <XAxis 
//               dataKey="name" 
//               tick={{ fill: 'white' }} 
//               axisLine={{ stroke: 'white' }}
//             />
//             <YAxis 
//               tick={{ fill: 'white' }} 
//               axisLine={{ stroke: 'white' }}
//             />
//             <Tooltip 
//               contentStyle={{ 
//                 backgroundColor: 'rgba(0, 0, 0, 0.8)', 
//                 borderColor: 'cyan',
//                 borderRadius: '5px',
//                 color: 'white'
//               }}
//             />
//             <Legend 
//               wrapperStyle={{ 
//                 paddingTop: '20px',
//                 color: 'white'
//               }}
//             />
//             <Bar dataKey="revenue" name="Revenue" fill="#8884d8">
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//             <Line 
//               type="monotone" 
//               dataKey="expenses" 
//               name="Expenses" 
//               stroke="#ff7300" 
//               strokeWidth={2}
//               dot={{ r: 4, fill: '#ff7300' }}
//               activeDot={{ r: 6, fill: '#ff0000' }}
//             />
//             <Area 
//               type="monotone" 
//               dataKey="profit" 
//               name="Profit" 
//               fill="#00C49F" 
//               stroke="#00C49F" 
//               fillOpacity={0.5}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
      
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         marginTop: '20px',
//         gap: '10px'
//       }}>
//         <button 
//           onClick={updateData}
//           style={{
//             backgroundColor: 'transparent',
//             color: 'cyan',
//             border: '1px solid cyan',
//             padding: '8px 16px',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             transition: 'all 0.3s',
//             ':hover': {
//               backgroundColor: 'rgba(0, 255, 255, 0.1)'
//             }
//           }}
//         >
//           Next Month
//         </button>
//         <button 
//           onClick={togglePlay}
//           style={{
//             backgroundColor: isPlaying ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
//             color: isPlaying ? 'red' : 'lime',
//             border: isPlaying ? '1px solid red' : '1px solid lime',
//             padding: '8px 16px',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             transition: 'all 0.3s',
//           }}
//         >
//           {isPlaying ? 'Stop Auto-Update' : 'Start Auto-Update'}
//         </button>
//       </div>
//     </div>


//     <div style={{ 
//     //  backgroundColor: 'black', 
//       padding: '40px', 
//     marginTop:"20px",
//     //  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
//       maxWidth: '1200px',
//       margin: '0 auto'
//     }}>
// <Reach/>
// </div>


// </>

//   );
// };

// export default RevenueChart;