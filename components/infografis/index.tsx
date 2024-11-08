"use client"
import TableWrapper from "@/components/table/block/table";
import TableHeaderWrapper from "@/components/table/block/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";

export default function Infografis() {
  const tableRef = useRef<any>(null);

  return (
    <div className="flex flex-col gap-4">
      <TableHeaderWrapper
        title=""
        onSearch={null}
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
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
            {
              img: "assets/infografis_thumbnail.png",
              title: "Layanan Aduan Konten",
            },
          ]}
        />
      </motion.div>
    </div>
  )
}