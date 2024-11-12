export type ColumnType = {
    show?: boolean;
    id?: string;
    name?: React.ReactNode;
    sortable?: boolean;
    width?: number;
    align?: "center" | "start" | "end" | undefined;
    format?: (value: any) => React.ReactNode;
};