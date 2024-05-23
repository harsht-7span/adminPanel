import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { bookingList, driver, user } from "@/api/driver";
import useSWR from "swr";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
  // const [userData, setUserData] = useState([]);
  // const [bookingData, setBookingData] = useState([]);
  // const [driverData, setDriverData] = useState([]);

  const fetcher = (apiFunc) =>
    apiFunc().then((res) => (res.data.success ? res.data.data : []));

  const { data: userData = [], error: userError } = useSWR("user", () =>
    fetcher(user)
  );
  // Use SWR to fetch the booking data
  const { data: bookingData = [], error: bookingError } = useSWR(
    "bookingList",
    () => fetcher(bookingList)
  );
  // Use SWR to fetch the driver data
  const { data: driverData = [], error: driverError } = useSWR("driver", () =>
    fetcher(driver)
  );

  // useEffect(() => {
  //   // Fetch the user data from the API
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await user();

  //       if (response.data.success) {
  //         setUserData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching the user data:", error);
  //     }
  //   };

  //   // Fetch the booking data from the API
  //   const fetchBookingData = async () => {
  //     try {
  //       const response = await bookingList();
  //       if (response.data.success) {
  //         setBookingData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching the booking data:", error);
  //     }
  //   };

  //   //Fetch the driver data from the API
  //   const fetchDriverData = async () => {
  //     try {
  //       const response = await driver();
  //       if (response.data.success) {
  //         setDriverData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching the booking data:", error);
  //     }
  //   };

  //   fetchUserData();
  //   fetchBookingData();
  //   fetchDriverData();
  // }, []);

  // Prepare data for the pie chart

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

  const chartData = prepareChartData(userData, bookingData, driverData);

  return (
    <>
      <div className="px-10 py-7 w-full overflow-auto">
        <h2 className="font-bold pb-10 text-5xl col-span-2"> DashBoard</h2>
        <div className="flex items-center justify-around gap-10">
          <div className="chart">
            <Doughnut data={chartData} />
          </div>
          <div className="text-4xl font-semibold space-y-6 bg-gray-200 rounded-xl p-5 h-fit">
            <p>
              No of User: <span>{userData.length}</span>
            </p>
            <p>
              No of Driver: <span>{driverData.length}</span>
            </p>

            <p>
              No of Booking: <span>{bookingData.length}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
