"use client";

import { useState } from "react";
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

import { ITable } from ".";
import { InputSearch } from "./atoms";

export default function Table<T, TValue>({
  data,
  columns,
  placeholder = "Buscar",
}: ITable<T, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const fuzzyFilter: FilterFn<T> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta(itemRank);
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="bg-gray-100 w-full p-2">
        <InputSearch
          value={globalFilter?.trim() ?? ""}
          onChange={(value: string) => setGlobalFilter(value?.trim())}
          placeholder={placeholder}
        />
      </div>
      <table className="w-full table-fixed">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-2 h-10 w-14" key={header.id}>
                  {header.isPlaceholder ? null : (
                    <span className="text-black">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="w-full tex-center">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="w-full " key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="p-2 w-full" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
