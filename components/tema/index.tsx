"use client"
import TableWrapper from "@/components/table/custom-table/table";
import TableHeaderWrapper from "@/components/table/custom-table/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";

interface TemaProps {
  search: string;
}

export default function Tema({
  search,
}: TemaProps) {
  const tableRef = useRef<any>(null);
  
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm">
        <span style={{ color: "#444444", letterSpacing: "0.15px" }}>Daftar Produk Untuk {" "+search}</span>
      </div>
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
          columns={[
            {
              width: 280,
              show: true,
              id: "img",
              name: "IMAGE",
              format: (value: any) => (
                <div style={{ width: "100px", height: "100px", position: "relative", borderRadius: "15px", overflow: "hidden", marginLeft: "10px" }}>
                  <Image
                    src={value?.img || emptyImg.src}
                    alt="image"
                    // width={100}
                    // height={100}
                    layout="fill"
                    className="w-full self-center object-cover"
                    onError={(event) => {
                      // @ts-ignore
                      event.target.src = emptyImg.src;
                      // @ts-ignore
                      event.target.srcset = emptyImg.src;
                    }}
                  />
                </div>
              ),
            },
            {
              show: true,
              id: "desc",
              name: "DESC",
              format: (value: any) => (
                <div style={{ paddingRight: "10px" }}>
                  <p className="font-bold mb-1 text-primary text-large">{value?.title}</p>
                  <p className="font-light mb-1" style={{ color: "#282828" }}>{value?.body}</p>
                  <p className="font-bold text-xs" style={{ color: "#827272" }}>Disanggah pada {value?.date}</p>
                </div>
              ),
            },
          ]}
          rawData={[
            {
              img: "/assets/pdf_thumbnail.png",
              title: "Peraturan Menteri Komunikasi dan informatika Nomor 11 Tahun 2021",
              body: "PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 11 TAHUN 2021 TENTANG PERUBAHAN ATAS PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 6 TAHUN 2021 TENTANG ..",
              date: "Senin 27 Oct 2021",
            },
            {
              img: "/assets/pdf_thumbnail.png",
              title: "Peraturan Menteri Komunikasi dan informatika Nomor 12 Tahun 2022",
              body: "PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 11 TAHUN 2022 TENTANG PERUBAHAN ATAS PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 6 TAHUN 2022 TENTANG ..",
              date: "Senin 27 Oct 2022",
            },
            {
              img: "/assets/pdf_thumbnail.png",
              title: "Peraturan Menteri Komunikasi dan informatika Nomor 12 Tahun 2022",
              body: "PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 11 TAHUN 2022 TENTANG PERUBAHAN ATAS PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 6 TAHUN 2022 TENTANG ..",
              date: "Senin 27 Oct 2022",
            },
          ]}
        />
      </motion.div>
    </div>
  )
}