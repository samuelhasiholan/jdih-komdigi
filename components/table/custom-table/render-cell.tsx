import React from "react";

interface Props {
  columns: any;
  item: any;
  index: number;
  columnKey: any;
  canEdit?: boolean;
  canDelete?: boolean;
  onView?: (item: any) => void;
  onUpdate?: (item: any) => void;
  onDelete?: (item: any) => void;
  extraActions?: (item: any) => React.ReactNode;
}

const statusColorMap = {
  default: "success",
  active: "success",
  inactive: "danger",
  vacation: "warning",
};

export const RenderCell = ({
  columns,
  index,
  item,
  columnKey,
  canEdit = false,
  canDelete = false,
  onView,
  onUpdate,
  onDelete,
  extraActions,
}: Props) => {
  const cellValue = item[columnKey];
  const format = columns?.find((el: any) => el.id === columnKey)?.format;

  switch (columnKey) {
    case "no":
      return <div className="text-[13px] ml-1">{index + 1}</div>;
    default:
      return format ? format(item) : cellValue || "-";
  }
};
