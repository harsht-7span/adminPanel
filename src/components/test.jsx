import React from "react";
import { DataTable2 } from "./DataTable/DataTable2";

function test() {
  return (
    <div>
      <DataTable2
        onPaginationChange={({ pageIndex }) => {
          setPages(pageIndex + 1);
          navigate(
            location.pathname +
              "?" +
              setSearchQueryParams({ page: pageIndex + 1 })
          );
        }}
        totalResult={totalResult}
        pageIndex={pages}
        pageCount={pageCount}
        columns={columns}
        data={usersList}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        loading={store.loading}
        handleClickRow={false}
      />
    </div>
  );
}

export default test;
