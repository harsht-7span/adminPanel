import { driver, verifiedDriver } from "@/api/driver";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DataTable() {
  const [data, setData] = useState([]);
  const col = ["#", "Image", "Driver Name", "Email", "Status"];
  const navigate = useNavigate();

  const handleVerify = async (userId, isVerified, event) => {
    event.stopPropagation();
    const payload = {
      isVerified: isVerified ? "true" : "false",
    };

    try {
      await verifiedDriver(userId, payload);

      setData((prevData) =>
        prevData.map((user) =>
          user._id === userId ? { ...user, isVerified: isVerified } : user
        )
      );
    } catch (error) {
      console.error("Error verifying driver:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await driver();
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-9">
      <h1 className="font-bold py-6 text-4xl">Drivers</h1>
      <div className="border rounded-md overflow-auto h-[80%] w-full">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="h-16">
              {col.map((column, index) => (
                <th className="text-start pl-5" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={user._id}
                onClick={() => navigate(`/drivers/${user._id}`)}
                className="font-normal text-base pl-5 cursor-pointer"
              >
                <td>{index + 1}</td>
                <td className="py-5">
                  <img
                    src={user?.images[0]?.imageUrl}
                    alt={user?.images[0]?.name}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-5">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className={`verify-button text-center w-16 font-semibold rounded ${
                      user.isVerified
                        ? "bg-green-200 text-green-500"
                        : "bg-red-200 text-red-500"
                    }`}
                    onClick={(event) =>
                      handleVerify(user._id, !user.isVerified, event)
                    }
                  >
                    {user.isVerified ? "Accept" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
