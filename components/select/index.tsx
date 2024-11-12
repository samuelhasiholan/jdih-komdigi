import { useAppDispatch } from "@/store";
import { Http } from "@/utils/http";
import {
  Select,
  SelectSection,
  SelectItem,
  SelectProps,
} from "@nextui-org/select";
import React, { useEffect, useState } from "react";

interface Props extends SelectProps {
  selectInputIndex?: number;
  items?: Array<any>;
  itemLabel?: string;
  itemValue?: string;
  value?: any;
  renderItem?: (item: any) => React.ReactNode;
  selectItemProps?: any;
}

export default function SelectInput({
  selectInputIndex = 0,
  items,
  value,
  itemLabel,
  itemValue,
  renderItem,
  selectItemProps,
  ...props
}: Props) {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof items === "string") {
      setIsLoading(true);
      setTimeout(() => {
        new Http()
          .request({
            url: items,
            method: "get",
          })
          .then(({ data }) => {
            setData(data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, selectInputIndex * 200);
    } else {
      setData(items);
      setIsLoading(false);
    }
  }, []);

  return (
    <Select
      key={`${selectInputIndex}-${data}`}
      items={data}
      value={value}
      isLoading={isLoading}
      radius="none"
      classNames={{
        value: "!text-foreground",
      }}
      {...props}
    >
      {data?.map((selectItem: any) => (
        <SelectItem
          {...selectItemProps}
          key={selectItem[itemValue]?.toString()}
          textValue={selectItem[itemLabel]?.toString()}
        >
          {renderItem ? renderItem(selectItem) : selectItem[itemLabel]}
        </SelectItem>
      ))}
    </Select>
  );
}
