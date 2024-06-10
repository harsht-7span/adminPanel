import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  // getPaginationRowModel,
} from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function DataTable2({
  columns,
  data,
  pageIndex,
  onPaginationChange,
  pageCount,
  totalResult,
  handleClickRow,
  columnVisibility,
  setColumnVisibility,
  loading = false,
}) {
  const [pagination, setPagination] = useState({
    pageIndex: pageIndex - 1,
    pageSize: 9,
  });

  const table = useReactTable({
    data,
    totalResult: totalResult,
    columns,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: pageCount,
    manualPagination: true,
    state: {
      pagination,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    onPaginationChange({ pageIndex: pagination.pageIndex });
  }, [pagination.pageIndex]);

  return (
    <div className="flex flex-col  h-[calc(100dvh-150px)] justify-between overflow-auto">
      <div className="relative h-full overflow-auto flex flex-col">
        <Table>
          <TableHeader className="sticky top-0 bg-white shadow">
            {table.getHeaderGroups().map((headerGroup, headerGroupInd) => (
              <Fragment key={headerGroupInd}>
                <TableRow>
                  {headerGroup.headers.map((header, headerInd) => {
                    return (
                      <Fragment key={headerInd}>
                        <TableHead>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      </Fragment>
                    );
                  })}
                </TableRow>
              </Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {(table.getRowModel().rows.length
              ? table.getRowModel().rows
              : loading
              ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              : []
            ).map((row, rowInd) => {
              if (!row || loading) {
                return (
                  <Fragment key={rowInd}>
                    <TableRow className="h-14">
                      {columns.map((col, colInd) => {
                        return (
                          <TableCell key={colInd}>
                            <span className="block w-full h-5 rounded-full bg-grey-100 animate-pulse"></span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </Fragment>
                );
              }
              return (
                <Fragment key={rowInd}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() =>
                      handleClickRow && handleClickRow(row.original)
                    }
                    className={cn("hover:bg-grey-100", {
                      "cursor-pointer": !!handleClickRow,
                    })}
                  >
                    {row.getVisibleCells().map((cell, cellInd) => (
                      <Fragment key={cellInd}>
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
        {!loading && !table.getRowModel().rows.length && (
          <>
            <div
              className="
sticky left-0 flex flex-col items-center justify-center flex-1 gap-3 text-2xl"
            >
              <div className="p-5 rounded-full bg-grey-100">
                <div className="p-5 rounded-full bg-grey-300">
                  <div className="p-8 rounded-full bg-grey-400">
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
                  </div>
                </div>
              </div>
              <div className="text-2xl text-center font-medium text-grey-500">
                No Data Found!
              </div>
            </div>
          </>
        )}
      </div>

      {/* {!loading && data.length > 0 ? (
        <DataTablePagination table={table} />
      ) : (
        <></>
      )} */}
    </div>
  );
}
