import { driverDetail } from "@/api/driver";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DriverDetail() {
  const params = useParams();
  const [data, setData] = useState("");
  const [error, setError] = useState();

  const spanStyle = "font-semibold text-xl space-x-2";
  const documentsDiv = "bg-gray-300 w-44 h-48 rounded p-5 ";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await driverDetail(params.id);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [params.id]);

  if (error) {
    return <div className="p-20 w-full">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-20 w-full">Loading...</div>;
  }

  const driverImage = data.driver.images[1]?.imageUrl;
  const driverImageName = data.driver.images[2]?.name;
  const driverName = data.driver.name;

  const driverPhone = data.driver.phoneNumber;
  const driverEmail = data.driver.email;
  const vehicleClass = data.vehicles?.vehicleClass;
  const vehicleModel = data.vehicles?.model;
  const vehicleYear = data.vehicles?.year;
  const aadharCard = data.driver.images[0]?.imageUrl;
  const vehiclePhoto = data.driver.images[2]?.imageUrl;
  const licenesPhoto = data.driver.images[3]?.imageUrl;

  return (
    <div className="p-20 w-full overflow-auto">
      <h1 className="font-bold text-3xl pb-6">Driver Details</h1>
      <div className="w-full flex rounded-md border-2 border-gray-400 items-center p-6 gap-12">
        <div className="driverImg w-24 h-24 bg-gray-500 rounded">
          <img
            className="w-24 h-24 bg-gray-500 rounded"
            src={driverImage}
            alt={driverImageName}
          />
        </div>
        <div className="driverDetail text-xl">
          <p>
            <span className={spanStyle}>Driver Name: </span>
            {driverName}
          </p>
          <p>
            <span className={spanStyle}>Mobile: </span>
            {driverPhone}
          </p>
          <p>
            <span className={spanStyle}> Email Id: </span>
            {driverEmail}
          </p>
        </div>
      </div>
      <h2 className="py-8 font-bold text-3xl">Vehicle Detail</h2>
      <div className="vehicleDetail text-xl w-full  rounded-md border-2 border-gray-400 items-center p-6 gap-12">
        <p>
          <span className={spanStyle}>Vehicle Type: </span>
          {vehicleClass}
        </p>
        <p>
          <span className={spanStyle}>Model: </span>
          {vehicleModel}
        </p>
        <p>
          <span className={spanStyle}> Year: </span>
          {vehicleYear}
        </p>
      </div>
      <h2 className="py-8 font-bold text-3xl">Documents</h2>
      <div className="documents w-full flex gap-2">
        <div className={documentsDiv}>
          <img
            src={aadharCard}
            className="object-cover h-full w-full"
            alt={data.driver?.images[0]?.name}
          />
        </div>
        <div className={documentsDiv}>
          <img
            src={driverImage}
            className="object-cover h-full w-full"
            alt={driverImageName}
          />
        </div>
        <div className={documentsDiv}>
          <img
            src={vehiclePhoto}
            className="object-cover h-full w-full"
            alt={data.driver?.images[3]?.name}
          />
        </div>
        <div className={documentsDiv}>
          <img
            src={licenesPhoto}
            className="object-cover h-full w-full"
            alt={data.driver?.images[5]?.name}
          />
        </div>
      </div>
    </div>
  );
}

export default DriverDetail;
