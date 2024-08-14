import { ColumnDef } from "@tanstack/react-table"

export interface ITable<T, TValue> {
    data: Array<T>
    columns: ColumnDef<T, TValue>[]
    placeholder?: string
}