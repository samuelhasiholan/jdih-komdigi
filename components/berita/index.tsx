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
  content: string;
}

export default function Tema({
  content,
}: TemaProps) {
  const tableRef = useRef<any>(null);
  
  return (
    <div className="flex flex-col gap-4">
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
          bgClear={true}
          columns={[
            {
              show: true,
              id: "img",
              name: "IMAGE",
              format: (value: any) => (
                <div style={{ width: "230px", height: "150px", position: "relative", borderRadius: "15px", overflow: "hidden" }}>
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
                  <p className="font-light text-xs mb-1" style={{ color: "#827272" }}>{value?.author+", pada "+value?.date}</p>
                  <p className="font-light mb-1" style={{ color: "#282828" }}>{value?.body}</p>
                  <p className="font-light text-primary text-small">Selengkapnya ></p>
                </div>
              ),
            },
          ]}
          rawData={[
            {
              img: "/assets/berita_thumbnail.png",
              title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
              body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
              author: "CHIARA SABRINA AYURANI",
              date: "Jumat, 13 September 2024",
            },
            {
              img: "/assets/berita_thumbnail.png",
              title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
              body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
              author: "CHIARA SABRINA AYURANI",
              date: "Jumat, 13 September 2024",
            },
            {
              img: "/assets/berita_thumbnail.png",
              title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
              body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
              author: "CHIARA SABRINA AYURANI",
              date: "Jumat, 13 September 2024",
            },
            {
              img: "/assets/berita_thumbnail.png",
              title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
              body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
              author: "CHIARA SABRINA AYURANI",
              date: "Jumat, 13 September 2024",
            },
          ]}
        />
      </motion.div>
    </div>
  )
}