"use client"
import TableWrapper from "@/components/table/block/table";
import TableHeaderWrapper from "@/components/table/block/table-header";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";
import { Video } from '@/app/types/entities';
import { useHttp } from '@/app/hooks/useHttp';
import moment from "moment";

interface TVProps {
  search: string;
  onOpen: () => void;
}

export default function TV({
  search,
  onOpen,
}: TVProps) {
  const tableRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [data, setData] = useState<Video[]>([])
  const [total, setTotal] = useState<number>(1)
  const [dataDetail, setDataDetail] = useState<TV>({})
  const { get, isLoading } = useHttp()

  const getData = async () => {
      try {
          const dataTV: Video[] = []
          const res: any = await get(
              `/site/video`,
          )
          console.log(res.data)
          if (
              res &&
              res.data &&
              res.data.length > 0
          ) {
              res.data.map((item: any) => {
                  dataTV.push({
                    id: item.id,
                    judul: item.judul,
                    filePath: item.file_path,
                    linkUrl:
                        process.env.NEXT_PUBLIC_FILE_URL +
                        '/' +
                        item.file_path,
                    createdAt: moment(item.created_at).format(
                        'DD MMMM YYYY',
                    ),
                    orders: item.orders,
                    previewPath:item.preview_path ? process.env.NEXT_PUBLIC_FILE_URL + '/' + item.preview_path : null,
                  })
              })
          }
          
          setData(dataTV)
      } catch (error) {
          console.log(error)
      }
  }

  const detailTV = async (id) => {
      get('/site/video/'+id).then((res: any) => {
          const data: Video[] = []

          if (res?.data) {
            if (res?.data.infografis) {
              setDataDetail({
                  id: res?.data.infografis.id,
                  judul: res?.data.infografis.judul,
                  konten:res?.data.infografis.konten,
                  thumbnail:res?.data.infografis.file_path ? process.env.NEXT_PUBLIC_FILE_URL + '/' + res?.data.infografis.file_path : null,
                  dateCreated:res?.data.infografis.created_at,
              })
            }
          }
      })
  }

  useEffect(() => {
    if (search) {
      detailTV(search); 
    }
  }, [search])

  useEffect(() => {
      getData()
  }, [currentPage])

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