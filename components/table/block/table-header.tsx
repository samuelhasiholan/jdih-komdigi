"use client";

import { SearchIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TableHeaderWrapperProps {
  onSearch?: (value: string) => void;
  onExtra?: any;
  formRef?: any;
}

export default function TableHeaderWrapper({
  onSearch,
  onExtra,
}: TableHeaderWrapperProps) {
  const [search, setSearch] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {onSearch && (
        <form
          className="flex items-center rounded-xl overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch && onSearch(search);
          }}
        >
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
          <div style={{ alignSelf: "stretch" }}>
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
          </div>
        </form>
      )}
    </div>
  );
}
