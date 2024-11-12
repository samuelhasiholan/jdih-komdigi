"use client";

import { SearchIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TableHeaderWrapperProps {
  module: string;
  icon?: any;
  title?: string;
  addButtonRedirect?: string;
  addButtonTitle?: string;
  onAdd?: () => void;
  onSearch?: (value: string) => void;
  onExtra?: any;
  formRef?: any;
}

export default function TableHeaderWrapper({
  module,
  icon,
  title,
  addButtonRedirect,
  addButtonTitle,
  onAdd,
  onSearch,
  onExtra,
}: TableHeaderWrapperProps) {
  const [search, setSearch] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { type: "spring", delay: 0.05 },
          }}
          exit={{ opacity: 0, translateX: 30 }}
          transition={{
            ease: "linear",
            duration: 0.2,
          }}
        >
          <div className="!scale-110">{icon}</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateX: -30 }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: { type: "spring" },
          }}
          exit={{ opacity: 0, translateX: 30 }}
          transition={{
            ease: "linear",
            duration: 0.2,
          }}
          className="text-2xl mb-0 font-bold"
        >
          {title}
        </motion.div>
      </div>

      {onSearch && (
        <div className="flex flex-wrap items-center gap-4 justify-between w-full sm:w-min">
          <div className="flex flex-wrap items-center justify-between p-0 w-full sm:flex-nowrap">
            <form
              className="flex items-center gap-4 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onSearch && onSearch(search);
              }}
            >
              <Input
                className={`w-full ${
                  isSearchFocused ? "sm:w-[250px]" : "sm:w-[135px]"
                } transition-all duration-300`}
                size="md"
                placeholder="Search"
                isClearable
                onClear={() => {
                  setSearch("");
                  onSearch && onSearch("");
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                  if (onSearch && !value) {
                    onSearch("");
                  }
                }}
                startContent={
                  <Button
                    disableRipple
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-transparent active:scale-75 pointer-events-none"
                    onPress={() => (onSearch ? onSearch(search) : undefined)}
                  >
                    <SearchIcon fill="text-primary-100" size={16} />
                  </Button>
                }
              />

              {onExtra}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
