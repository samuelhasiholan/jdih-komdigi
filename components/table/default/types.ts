import { ColumnType } from "@/types/table";
import { SelectionMode } from "@react-types/shared";
import React from "react";

export interface TableWrapperProps {
  url?: string;
  title?: string;
  module?: string;
  search?: string;
  persistFilters?: Array<FilterType>;
  persistSearch?: string;
  columns?: ColumnType[];
  infiniteScroll?: boolean;
  selectionMode?: SelectionMode;
  onView?: (item: any) => void;
  onUpdate?: (item: any) => void;
  onDelete?: (item: any) => void;
  extraActions?: (item: any) => React.ReactNode;
  rawData?: Array<any>;
  defaultSortDescriptor?: {
    column: string;
    direction: "ascending" | "descending";
  };
}

export type DataTableOperator =
  | "eq"
  | "ne"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "notLike"
  | "iLike"
  | "notILike"
  | "in"
  | "notIn"
  | "between"
  | "notBetween"
  | "isNull"
  | "isNotNull";

export type FilterType = {
  key: string;
  operator: DataTableOperator;
  multiple?: boolean;
  value: any;
};
