"use client"
import TableWrapper from "@/components/table/custom-table/table";
import TableHeaderWrapper from "@/components/table/custom-table/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";

interface BeritaProps {
  search: string;
  onOpen: () => void;
}

export default function Berita({
  search,
  onOpen,
}: BeritaProps) {
  const tableRef = useRef<any>(null);
  // console.log(search);
  const dummy = {
    judul: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
    img: "/assets/berita_thumbnail.png",
    content: "Jakarta, 13/06/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Pemerintah Provinsi Bali (JDIH Pemprov Bali) telah melakukan kunjungan kerja ke Tim Pengelola JDIH Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) pada tanggal 11 Juni 2024, di Kantor Biro Hukum Sekretariat Jenderal Kemkominfo, Jakarta. Tujuan kunjungan ini adalah untuk melakukan knowledge sharing terkait pengelolaan JDIH Kemkominfo.<br><br>Kunjungan diterima oleh Prananto Nindyo Adi Nugroho selaku Ketua Tim Bantuan dan Dokumentasi Hukum, Biro Hukum, dengan didampingi Tim Pengelola JDIH Kemkominfo. Pada kesempatan ini, Prananto menjelaskan bahwa pengelolaan JDIH Kemkominfo dilakukan berdasarkan Standar Operasional Procedure (SOP) JDIH Kemkominfo yang sudah ada, yaitu SOP terkait Pembuatan dan Distribusi Salinan Peraturan Menteri, SOP Pembuatan Abstrak Peraturan Menteri Kominfo dan SOP Layanan Konsultasi Hukum pada Website JDIH.<br><br>Selanjutnya, Lailah, PIC Dokumentasi Hukum menyampaikan inovasi pengelolaan JDIH Kemkominfo Tahun 2023, salah satunya adalah implementasi fitur Tanda Tangan Elektronik (TTE) pada Manajemen Admin JDIH. Sebelum adanya fitur ini, pembubuhan TTE pada salinan Peraturan Menteri dilakukan melalui Aplikasi Simaya, yang merupakan aplikasi persuratan di internal Kementerian Kominfo. Namun, semenjak tahun 2023, proses pembubuhan TTE dilakukan dalam sistem manajemen admin JDIH, menjadi satu kesatuan dengan proses upload salinan Peraturan Menteri.<br><br>Di penghujung diskusi, pengelola JDIH Kementerian Kominfo dan pengelola JDIH Pemprov Bali saling memberikan masukan dan saran terkait pengelolaan JDIH di instansi masing-masing dengan harapan keduanya dapat mengoptimalkan pengelolaan JDIH. (Lailah)<br><br>",
    date_created: "2024-06-13",
  }

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
      >
        {
          search !== ""
          ? <div className="px-5 pb-5">
            <p className="text-xl text-center mb-5">{dummy.judul}</p>
            <Image
              src={dummy?.img || emptyImg.src}
              alt="image"
              layout="fill"
              radius="md"
              className="w-full self-center object-cover mb-5"
              onError={(event) => {
                // @ts-ignore
                event.target.src = emptyImg.src;
                // @ts-ignore
                event.target.srcset = emptyImg.src;
              }}
              removeWrapper
            />
            <p className="mb-3 text-primary">{dummy.date_created}</p>
            <div>
              { 
                <div dangerouslySetInnerHTML={{__html: dummy.content.replace(/(<? *script)/gi, 'illegalscript')}} >
                </div>
              }
            </div>
          </div>
          : <TableWrapper
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
                  <div style={{ paddingRight: "10px" }} onClick={() => onOpen(value?.id)}>
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
                id: 86,
                img: "/assets/berita_thumbnail.png",
                title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
                body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
                author: "CHIARA SABRINA AYURANI",
                date: "Jumat, 13 September 2024",
              },
              {
                id: 86,
                img: "/assets/berita_thumbnail.png",
                title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
                body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
                author: "CHIARA SABRINA AYURANI",
                date: "Jumat, 13 September 2024",
              },
              {
                id: 86,
                img: "/assets/berita_thumbnail.png",
                title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
                body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
                author: "CHIARA SABRINA AYURANI",
                date: "Jumat, 13 September 2024",
              },
              {
                id: 86,
                img: "/assets/berita_thumbnail.png",
                title: "Benchmarking Pengelola JDIH Kementerian Komunikasi dan Informatika dengan Pengelola JDIH Provinsi Bali",
                body: "Denpasar, 12/09/2024 – Pengelola Jaringan Dokumentasi dan Informasi Hukum Kementerian Komunikasi dan Informatika (JDIH Kemkominfo) ...",
                author: "CHIARA SABRINA AYURANI",
                date: "Jumat, 13 September 2024",
              },
            ]}
          />
        }
      </motion.div>
    </div>
  )
}