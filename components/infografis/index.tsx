"use client"
import TableWrapper from "@/components/table/block/table";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";
import { Infografis } from '@/app/types/entities';
import { useHttp } from '@/app/hooks/useHttp';
import moment from "moment";

interface InfografisProps {
  search: string;
  onOpen: () => void;
}

export default function Infografis({
  search,
  onOpen,
}: InfografisProps) {
  const tableRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [data, setData] = useState<Infografis[]>([])
  const [total, setTotal] = useState<number>(1)
  const [dataDetail, setDataDetail] = useState<Infografis>({})
  const { get, isLoading } = useHttp()

  const getData = async () => {
      try {
          const dataInfografis: Infografis[] = []
          const res: any = await get(
              `/infografis/all`,
          )
          console.log(res.data)
          if (
              res &&
              res.data &&
              res.data.infografis &&
              res.data.infografis.length > 0
          ) {
              res.data.infografis.map((item: any) => {
                  dataInfografis.push({
                      id:item.id,
                      judul:item.judul,
                      konten:item.konten,
                      thumbnail:item.file_path ? process.env.NEXT_PUBLIC_INFOGRAFIS_URL + '/' + item.file_path : null,
                      dateCreated:item.created_at,
                  })
              })
          }
          
          setData(dataInfografis)
      } catch (error) {
          console.log(error)
      }
  }

  const detailInfografis = async (id) => {
      get('/infografis/detail/'+id).then((res: any) => {
          const data: Infografis[] = []

          if (res?.data) {
            if (res?.data.infografis) {
              setDataDetail({
                  id: res?.data.infografis.id,
                  judul: res?.data.infografis.judul,
                  konten:res?.data.infografis.konten,
                  thumbnail:res?.data.infografis.file_path ? process.env.NEXT_PUBLIC_INFOGRAFIS_URL + '/' + res?.data.infografis.file_path : null,
                  dateCreated:res?.data.infografis.created_at,
              })
            }
          }
      })
  }

  useEffect(() => {
    if (search) {
      detailInfografis(search); 
    }
  }, [search])

  useEffect(() => {
      getData()
  }, [currentPage])

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
                dataDetail?.penulis
              }
              {
                dataDetail?.penulis && dataDetail?.dateCreated &&
                ", pada "
              }
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
            onPageChanged={(page: number) => {
                setCurrentPage(page)
            }}
            bgClear={true}
            columns={[]}
            rawData={data}
            rawLoading={isLoading}
          />
        }
      </motion.div>
    </div>
  )
}