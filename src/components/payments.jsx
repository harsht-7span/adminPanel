import React, { useEffect, useState } from "react";
import { DataTable2 } from "./DataTable/DataTable2";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPayment } from "@/api/payment";

function Payments() {
  const columns = [
    {
      header: "#",
      accessorKey: "index",
      cell: ({ row }) => row.index + 1,
    },
    { header: "Name", accessorKey: "customer.name" },
    { header: "Fare", accessorKey: "fare" },
    { header: "Payment Method", accessorKey: "paymentMethod" },
    { header: "Status", accessorKey: "status" },
    { header: "Email", accessorKey: "customer.email" },
    { header: "Phone", accessorKey: "customer.phoneNumber" },
  ];

  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [loading, setLoading] = useState(false); // Added loading state
  const totalResult = 10;
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getAllPayment();
      setData(response.data.data);
      setPageCount(response.data.data.length);
      const totalItems = response.data.data.length;
      setPageCount(Math.ceil(totalItems / itemsPerPage));
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

  useEffect(() => {
    fetchData(pageIndex + 1);
  }, []);

  return (
    <div className="w-full px-9">
      <h1 className="font-bold py-6 text-4xl">Payments</h1>
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
        handleClickRow={false}
        loading={loading}
      />
    </div>
  );
}

export default Payments;
