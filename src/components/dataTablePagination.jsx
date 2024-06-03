import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LeftArrow, RightArrow } from "@/icons/arrow";
import { Fragment } from "react";

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-center md:px-4 px-2 py-2 border-t border-grey-100">
      <nav
        aria-label="Page navigation"
        className="flex items-center justify-end gap-3 mt-auto"
      >
        <div
          className={cn(
            "inline-flex items-center gap-1 divide-primary-300/60 dark:divide-primary-700/60"
          )}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => parseInt(table.previousPage())}
            disabled={!table.getCanPreviousPage()}
            className="border-none"
          >
            <LeftArrow />
          </Button>
          <div className="max-w-[116px] overflow-hidden flex">
            <div
              className="flex w-full gap-1 transition-all duration-200"
              style={{
                transform: `translateX(-${
                  table.getState().pagination.pageIndex + 1 >= 3
                    ? 40 *
                      (table.getState().pagination.pageIndex +
                        1 -
                        (table.getState().pagination.pageIndex + 1 ==
                        table.getPageCount()
                          ? 3
                          : 2))
                    : 0
                }px)`,
              }}
            >
              {[...Array((parseInt(table.getPageCount()) || 0) + 1).keys()]
                .filter((_) => !!_)
                .map((page) => {
                  return (
                    <Fragment key={page}>
                      <Button
                        size="icon"
                        className={cn(
                          "rounded-md h-9 w-9 border border-primary-200 bg-transparent text-primary-500 hover:text-white flex-shrink-0",
                          {
                            "bg-primary-500 text-primary-100 hover:bg-primary-500":
                              table.getState().pagination.pageIndex + 1 == page,
                          }
                        )}
                        onClick={() => parseInt(table.setPageIndex(page - 1))}
                      >
                        {page}
                      </Button>
                    </Fragment>
                  );
                })}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => parseInt(table.nextPage())}
            disabled={!table.getCanNextPage()}
            className="border-none"
          >
            <RightArrow />
          </Button>
        </div>
      </nav>
    </div>
  );
}
