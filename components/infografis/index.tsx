"use client";
import TableWrapper from "@/components/table/block/table";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";
import { InfografisInterface } from "@/app/types/entities";
import { useHttp } from "@/app/hooks/useHttp";
import moment from "moment";

interface InfografisProps {
  search: string | number;
  onOpen: (value: number | string) => void;
}

export default function Infografis({ search, onOpen }: InfografisProps) {
  const tableRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<InfografisInterface[]>([]);
  const [dataDetail, setDataDetail] = useState<InfografisInterface>({});
  const { get, isLoading } = useHttp();

  const getData = async () => {
    try {
      const dataInfografis: InfografisInterface[] = [];
      const res: any = await get(`/infografis/all`);

      if (
        res &&
        res.data &&
        res.data.infografis &&
        res.data.infografis.length > 0
      ) {
        res.data.infografis.map((item: any) => {
          dataInfografis.push({
            id: item.id,
            judul: item.judul,
            konten: item.konten,
            thumbnail: item.file_path
              ? process.env.NEXT_PUBLIC_INFOGRAFIS_URL + "/" + item.file_path
              : "",
            dateCreated: item.created_at,
          });
        });
      }

      setData(dataInfografis);
    } catch (error) {
      console.log(error);
    }
  };

  const detailInfografis = (id: number | string) => {
    let i = 0;
    while (i < data.length) {
      if (data[i].id === id) {
        setDataDetail(data[i]);
        break;
      }
      i++;
    }
  };

  useEffect(() => {
    if (search) {
      detailInfografis(search);
    } else {
      setDataDetail({});
    }
  }, [search, data]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
      >
        {search !== "" ? (
          isLoading ? (
            <div className="flex flex-col px-5 pb-5">
              <Skeleton
                isLoaded={!isLoading}
                className="h-7 w-5/6 rounded-lg mb-5 self-center"
              />
              <Skeleton
                isLoaded={!isLoading}
                className="h-48 w-full rounded-lg mb-5"
              />
              <Skeleton
                isLoaded={!isLoading}
                className="h-6 w-2/6 rounded-lg mb-5"
              />
              <Skeleton
                isLoaded={!isLoading}
                className="h-6 w-5/6 rounded-lg mb-5"
              />
              <Skeleton
                isLoaded={!isLoading}
                className="h-6 w-3/6 rounded-lg mb-5"
              />
            </div>
          ) : (
            <div className="px-5 pb-5">
              <p className="text-xl text-center mb-5">{dataDetail.judul}</p>
              <Image
                src={dataDetail.thumbnail}
                alt="image"
                radius="md"
                className="w-full self-center object-cover mb-5"
                removeWrapper
              />
              <p className="mb-3 text-primary">
                {dataDetail?.penulis}
                {dataDetail?.penulis && dataDetail?.dateCreated && ", pada "}
                {dataDetail?.dateCreated
                  ? moment(dataDetail?.dateCreated).format("dddd, DD MMMM YYYY")
                  : ""}
              </p>
              <div>
                {dataDetail.konten && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetail.konten.replace(
                        /(<? *script)/gi,
                        "illegalscript"
                      ),
                    }}
                  ></div>
                )}
              </div>
            </div>
          )
        ) : (
          <TableWrapper
            ref={tableRef}
            title=""
            onClick={(id: number) => {
              setDataDetail({});
              onOpen(id);
            }}
            columns={[]}
            rawData={data}
            rawLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
}
