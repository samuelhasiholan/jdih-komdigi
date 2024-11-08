"use client"
import TableWrapper from "@/components/table/block/table";
import TableHeaderWrapper from "@/components/table/block/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";

export default function TV() {
  const formRef = useRef<any>(null);
  const tableRef = useRef<any>(null);

  return (
    <div className="flex flex-col gap-4">
      <TableHeaderWrapper
        title=""
        onSearch={(value) => tableRef.current?.search(value)}
        onExtra={null}
      />

      <motion.div
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
      >
        <TableWrapper
          ref={tableRef}
          title=""
          // url=""
          columns={[]}
          rawData={[
            {
              img: "assets/video_thumbnail.png",
              title: "UNDANG-UNDANG PERLINDUNGAN DATA PRIBADI - #KOMINFOPEDIA",
              views: 523,
            },
            {
              img: "assets/video_thumbnail.png",
              title: "UNDANG-UNDANG PERLINDUNGAN DATA PRIBADI - #KOMINFOPEDIA",
              views: 45,
            },
            {
              img: "assets/video_thumbnail.png",
              title: "UNDANG-UNDANG PERLINDUNGAN DATA PRIBADI - #KOMINFOPEDIA",
              views: 390,
            },
            {
              img: "assets/video_thumbnail.png",
              title: "UNDANG-UNDANG PERLINDUNGAN DATA PRIBADI - #KOMINFOPEDIA",
              views: 13,
            },
          ]}
        />
      </motion.div>
    </div>
  )
}