"use client";

import { AddIcon, SearchIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/select";

interface TableHeaderWrapperProps {
  initSearch: string;
  onSearch?: (value: string) => void;
  onExtra?: any;
  onExtraTwo?: any;
  onExtraTitle?: string;
  onExtraTwoTitle?: string;
  formRef?: any;
}

export default function TableHeaderWrapper({
  initSearch,
  onSearch,
  onExtra,
  onExtraTwo,
  onExtraTitle,
  onExtraTwoTitle,
}: TableHeaderWrapperProps) {
  const [search, setSearch] = useState<string>(initSearch || "");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <form
        className="flex items-center w-full rounded-xl overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch && onSearch(search);
        }}
      >
        <div className="grid grid-cols-5 items-center w-full">
          {onSearch && (
            <div className="col-span-2">
              <Input
                className="w-full"
                radius="none"
                size="md"
                placeholder="Masukan Kata Pencarian"
                isClearable
                onClear={() => {
                  setSearch("");
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                }}
              />
            </div>
          )}
          {onExtra && (
            <div className="col-span-2">
              <SelectInput
                key={`select-1`}
                placeholder={onExtraTitle}
                labelPlacement="outside"
                items={onExtra}
                itemLabel="label"
                itemValue="value"
                selectInputIndex={1}
              />
            </div>
          )}
          {onExtraTwo && (
            <div>
              <SelectInput
                key={`select-2`}
                placeholder={onExtraTwoTitle}
                labelPlacement="outside"
                items={onExtraTwo}
                itemLabel="label"
                itemValue="value"
                selectInputIndex={2}
              />
            </div>
          )}
        </div>
        <div style={{ alignSelf: "stretch" }}>
          {onSearch && (
            <Button
              disableRipple
              isIconOnly
              size="sm"
              variant="flat"
              radius="none"
              className="active:scale-75 h-full w-10"
              style={{ backgroundColor: "#F9AB00" }}
              type="submit"
            >
              <SearchIcon fill="white" size={16} />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
