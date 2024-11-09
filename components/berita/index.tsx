"use client"
import TableWrapper from "@/components/table/custom-table/table";
import TableHeaderWrapper from "@/components/table/custom-table/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";
import { Berita } from '@/app/types/entities'
import { useHttp } from '@/app/hooks/useHttp'
import moment from "moment";

interface BeritaProps {
  search: string;
  onOpen: () => void;
}

export default function Berita({
  search,
  onOpen,
}: BeritaProps) {
  const tableRef = useRef<any>(null);
  const { get, isLoading } = useHttp()
  const [dataDetail, setDataDetail] = useState<Berita>({})

  const detailBerita = async (id) => {
      get('/berita/detail/'+id).then((res: any) => {
          const data: Berita[] = []

          if (res?.data) {
            if (res?.data.berita) {
              setDataDetail({
                  id: res?.data.berita.id,
                  judul: res?.data.berita.judul,
                  excerpt: res?.data.berita.excerpt,
                  content: res?.data.berita.content,
                  thumbnail: res?.data.berita.image_path,
                  dateCreated: res?.data.berita.date_created,
              })
            }
          }
      })
  }
  
  useEffect(() => {
    if(search){
      detailBerita(search); 
    }
  }, [search])
  
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
            <p className="text-xl text-center mb-5">{dataDetail.judul}</p>
            <Image
              src={
                  process.env.NEXT_PUBLIC_PICTURE_URL +
                  '/' +
                  dataDetail.thumbnail
              }
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
            <p className="mb-3 text-primary">
              {
                dataDetail?.dateCreated
                ? moment(dataDetail?.dateCreated).format("dddd, DD MMMM YYYY")
                : ""
              }
              </p>
            <div>
              { 
                dataDetail.content &&
                <div dangerouslySetInnerHTML={{__html: dataDetail.content.replace(/(<? *script)/gi, 'illegalscript')}} >
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