import React, { useEffect, useState } from "react";
import { getData } from "../functions/publicApi";
import { popupError, popupSuccess } from "../functions/toasts";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const Assignment1 = () => {
  const columnHelper = createColumnHelper();
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = () => {
    getData(currentPage, pageSize) //?page=1&limit=10
      .then((res) => {
        console.log(res.data);
        const totalPages = Math.ceil(res.data.totalCount / pageSize);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        } else {
          setData(res.data.data);
          setDataCount(res.data.totalCount);
        }
      })
      .catch((err) => popupError(err));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const columns = [
    columnHelper.accessor("team_name", {
      header: "Team Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("full_name", {
      header: "Full Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("number", {
      header: "Number",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("city", {
      header: "City",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("url", {
      header: "URL",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];
  

  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);
  return (
    <div>
      <p className="text-center">Assignment - 1 : Data Join</p>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={dataCount}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

const Pagination = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const firstTask = (currentPage - 1) * pageSize + 1;
  const lastTask = Math.min(currentPage * pageSize, totalCount);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handlePageSizeChange = (size) => {
    onPageSizeChange(size);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let page = 1; page <= totalPages; page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`p-1 ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </button>
        );
      }
    } else {
      const leftBoundary = Math.min(
        Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2)),
        totalPages - maxVisibleButtons + 1
      );
      const rightBoundary = leftBoundary + maxVisibleButtons - 1;

      if (leftBoundary > 1) {
        buttons.push(
          <button key={1} onClick={() => handlePageChange(1)} className="p-1">
            1
          </button>
        );
        if (leftBoundary > 2) {
          buttons.push(
            <span key="ellipsis-left" className="p-1">
              ...
            </span>
          );
        }
      }

      for (let page = leftBoundary; page <= rightBoundary; page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`p-1 ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </button>
        );
      }

      if (rightBoundary < totalPages) {
        if (rightBoundary < totalPages - 1) {
          buttons.push(
            <span key="ellipsis-right" className="p-1">
              ...
            </span>
          );
        }
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="p-1"
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };
  return (
    <div>
      <span>Page: </span>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? "cursor-not-allowed" : ""}`}
      >
        &lt;
      </button>
      {getPageButtons()}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
      >
        &gt;
      </button>

      {/* Add more buttons or elements as needed */}
      <span>Page Size: </span>
      <select
        value={pageSize}
        onChange={(e) => handlePageSizeChange(e.target.value)}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <span>
        Showing {firstTask} to {lastTask} out of {totalCount} tasks
      </span>
    </div>
  );
};
