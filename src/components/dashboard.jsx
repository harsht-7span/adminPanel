// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import useSWR from "swr";
// import { bookingList, driver, user } from "@/api/driver";
// import { getAllPayment } from "@/api/payment";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const DashBoard = () => {
//   const fetcher = (apiFunc) =>
//     apiFunc().then((res) => (res.data.success ? res.data.data : []));

//   const { data: userData = [], error: userError } = useSWR("user", () =>
//     fetcher(user)
//   );
//   const { data: bookingData = [], error: bookingError } = useSWR(
//     "bookingList",
//     () => fetcher(bookingList)
//   );
//   const { data: driverData = [], error: driverError } = useSWR("driver", () =>
//     fetcher(driver)
//   );

//   const { data: paymentData = [], error: paymentError } = useSWR(
//     "getAllPayment",
//     () => fetcher(getAllPayment)
//   );

//   const prepareChartData = (users, bookings, drivers) => {
//     const userCount = users.length;
//     const bookingCount = bookings.length;
//     const driverCount = drivers.length;

//     return {
//       labels: ["Users", "Bookings", "Drivers"],
//       datasets: [
//         {
//           label: "Counts",
//           data: [userCount, bookingCount, driverCount],
//           backgroundColor: ["#3b82f6", "#ec4899", "#14b8a6"],
//           hoverOffset: 20,
//         },
//       ],
//     };
//   };

//   const chartData = prepareChartData(userData, bookingData, driverData);

//   return (
//     <div className="px-10 py-7 w-full overflow-auto">
//       <h2 className="font-bold pb-10 text-5xl col-span-2">DashBoard</h2>
//       <div className="flex items-start justify-around gap-10">
//         <div className="chart">
//           <Doughnut data={chartData} />
//         </div>
//         <div className="font-semibold flex justify-center gap-10 rounded-xl p-5">
//           <div className="flex flex-col bg-gray-200 rounded-xl p-5  w-fit">
//             <p className="text-xl">No. of Users:</p>
//             <p className="text-7xl">{userData.length}</p>
//           </div>
//           <div className="flex flex-col bg-gray-200 rounded-xl p-5 w-fit">
//             <p className="text-xl">No. of Drivers:</p>
//             <p className="text-7xl">{driverData.length}</p>
//           </div>
//           <div className="flex flex-col bg-gray-200 rounded-xl p-5 w-fit">
//             <p className="text-xl">No. of Bookings:</p>
//             <p className="text-7xl">{bookingData.length}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import useSWR from "swr";
import { bookingList, driver, user } from "@/api/driver";
import { getAllPayment } from "@/api/payment";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const DashBoard = () => {
  const fetcher = (apiFunc) =>
    apiFunc().then((res) => (res.data.success ? res.data.data : []));

  const { data: userData = [], error: userError } = useSWR("user", () =>
    fetcher(user)
  );
  const { data: bookingData = [], error: bookingError } = useSWR(
    "bookingList",
    () => fetcher(bookingList)
  );
  const { data: driverData = [], error: driverError } = useSWR("driver", () =>
    fetcher(driver)
  );

  const { data: paymentData = [], error: paymentError } = useSWR(
    "getAllPayment",
    () => fetcher(getAllPayment)
  );

  const prepareChartData = (users, bookings, drivers) => {
    const userCount = users.length;
    const bookingCount = bookings.length;
    const driverCount = drivers.length;

    return {
      labels: ["Users", "Bookings", "Drivers"],
      datasets: [
        {
          label: "Counts",
          data: [userCount, bookingCount, driverCount],
          backgroundColor: ["#3b82f6", "#ec4899", "#14b8a6"],
          hoverOffset: 20,
        },
      ],
    };
  };

  const preparePaymentChartData = (payments) => {
    const recentPayments = payments.slice(-50); // Get the last 50 payments
    const labels = recentPayments.map((payment) =>
      new Date(payment.createdAt).toLocaleDateString()
    );
    const data = recentPayments.map((payment) => payment.fare / 100);

    return {
      labels: labels,
      datasets: [
        {
          label: "Fare Price",
          data: data,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          fill: true,
          tension: 0.1,
        },
      ],
    };
  };

  const chartData = prepareChartData(userData, bookingData, driverData);
  const paymentChartData = preparePaymentChartData(paymentData);

  const paymentChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Fare Price (₹)",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="px-10 py-7 w-full overflow-auto">
      <h2 className="font-bold pb-10 text-5xl col-span-2">DashBoard</h2>
      <div className="flex justify-between gap-10">
        <div className="chart">
          <p className="font-medium pb-5 text-3xl">Basic Data</p>
          <Doughnut data={chartData} />
        </div>
        <div className="w-full">
          <p className="font-medium pb-5 text-3xl">Payments Data</p>
          <Line data={paymentChartData} options={paymentChartOptions} />
        </div>
      </div>
      <div className="w-full font-semibold grid grid-cols-3 justify-center gap-10 rounded-xl p-5">
        <div className="flex flex-col w-full bg-gray-200 rounded-xl p-5 ">
          <p className="text-xl">No. of Users:</p>
          <p className="text-7xl">{userData.length}</p>
        </div>
        <div className="flex flex-col bg-gray-200 rounded-xl p-5 w-full">
          <p className="text-xl">No. of Drivers:</p>
          <p className="text-7xl">{driverData.length}</p>
        </div>
        <div className="flex flex-col bg-gray-200 rounded-xl p-5 w-full">
          <p className="text-xl">No. of Bookings:</p>
          <p className="text-7xl">{bookingData.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
