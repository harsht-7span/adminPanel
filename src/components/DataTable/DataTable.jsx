import React, { useEffect, useState } from "react";
import { DataTable2 } from "./DataTable2";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteDriver, driver, verifiedDriver } from "@/api/driver";

function DataTable() {
  const columns = [
    {
      Header: "#",
      accessorKey: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="object-cover w-10 h-10 rounded-full"
        />
      ),
    },
    { Header: "Driver Name", accessorKey: "name" },
    { Header: "Email", accessorKey: "email" },
    {
      Header: "Status",
      accessorKey: "isVerified",
      cell: ({ row }) => (
        <button
          className={`verify-button text-center w-16 font-semibold rounded ${
            row.original.isVerified
              ? "bg-green-200 text-green-500"
              : "bg-red-200 text-red-500"
          }`}
          onClick={(event) =>
            handleVerify(row.original._id, !row.original.isVerified, event)
          }
        >
          {row.original.isVerified ? "Accept" : "Reject"}
        </button>
      ),
    },
    {
      Header: "Delete",
      accessorKey: "delete",
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original._id)}
          className="bg-red-200 px-2 rounded text-red-500 hover:text-white hover:bg-red-500  "
        >
          Delete
        </button>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [loading, setLoading] = useState(false);
  const totalResult = 10;
  const location = useLocation();
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
      setLoading(true);
      const response = await driver();
      const drivers = response.data.data.map((driver, index) => ({
        ...driver,
        index,
        image: driver?.images[0]?.imageUrl,
      }));
      setData(drivers);
      setPageCount(Math.ceil(drivers.length / totalResult));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const setSearchQueryParams = (params) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(params).forEach((key) => {
      searchParams.set(key, params[key]);
    });
    return searchParams.toString();
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDriver(id);
      setData((prevData) => [...prevData.filter((ride) => ride._id !== id)]);
    } catch (error) {
      console.error("Error deleting ride:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-9">
      <h1 className="font-bold py-6 text-4xl">Drivers</h1>
      <DataTable2
        onPaginationChange={({ pageIndex }) => {
          setPageIndex(pageIndex);
          // navigate(
          //   location.pathname +
          //     "?" +
          //     setSearchQueryParams({ page: pageIndex + 1 })
          // );
        }}
        totalResult={totalResult}
        pageIndex={pageIndex}
        pageCount={pageCount}
        columns={columns}
        data={data}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        handleClickRow={(row) => navigate(`/drivers/${row._id}`)}
        loading={loading}
      />
      {data.length === 0 && !loading && (
        <div className="flex justify-center items-center h-[80%]">
          <div className="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="w-14 h-14 text-grey-100"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M20 12V5.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 16.252 2H4.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H11M8 10h8M8 6h4m-4 8h3m9.5 6.5L22 22" />
                <path d="M15 18a3 3 0 1 0 6 0a3 3 0 0 0-6 0m1-16v3.4a.6.6 0 0 0 .6.6H20" />
              </g>
            </svg>
            <div className="text-2xl text-center font-medium text-grey-500">
              No Data Found!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
