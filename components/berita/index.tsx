"use client";
import TableWrapper from "@/components/table/custom-table/table";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";
import { BeritaInterface } from "@/app/types/entities";
import { useHttp } from "@/app/hooks/useHttp";
import moment from "moment";

interface BeritaProps {
  search: string | number;
  onOpen: (value: number | string) => void;
}

export default function Berita({ search, onOpen }: BeritaProps) {
  const tableRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<BeritaInterface[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [dataDetail, setDataDetail] = useState<BeritaInterface>({});
  const { get, isLoading } = useHttp();

  const getData = async () => {
    try {
      const dataBerita: BeritaInterface[] = [];
      const res: any = await get(`/berita/all?page=${currentPage}`);

      if (
        res &&
        res.data &&
        res.data.list &&
        res.data.list.data &&
        res.data.list.data.length > 0
      ) {
        res.data.list.data.map((item: any) => {
          dataBerita.push({
            id: item.id,
            judul: item.judul,
            excerpt: item.excerpt,
            content: item.content,
            thumbnail: item.image_path,
            penulis: item.penulis,
            dateCreated: item.date_created,
          });
        });
      }

      setData(dataBerita);
      setTotal(res.data.list.total);
    } catch (error) {
      console.log(error);
    }
  };

  const detailBerita = async (id: number | string) => {
    get("/berita/detail/" + id).then((res: any) => {
      const data: BeritaInterface[] = [];

      if (res?.data) {
        if (res?.data.berita) {
          setDataDetail({
            id: res?.data.berita.id,
            judul: res?.data.berita.judul,
            excerpt: res?.data.berita.excerpt,
            content: res?.data.berita.content,
            thumbnail: res?.data.berita.image_path,
            penulis: res?.data.berita.penulis,
            dateCreated: res?.data.berita.date_created,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (search) {
      detailBerita(search);
    }
  }, [search]);

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
                src={
                  process.env.NEXT_PUBLIC_PICTURE_URL +
                  "/" +
                  dataDetail.thumbnail
                }
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
                {dataDetail.content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetail.content.replace(
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
            onPageChanged={(page: number) => {
              setCurrentPage(page);
            }}
            bgClear={true}
            columns={[
              {
                show: true,
                id: "img",
                name: "IMAGE",
                format: (value: any) => (
                  <div
                    style={{
                      width: "280px",
                      height: "180px",
                      position: "relative",
                      borderRadius: "15px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      removeWrapper
                      alt="image"
                      height={180}
                      className="object-cover rounded-medium w-full"
                      src={
                        value?.thumbnail
                          ? process.env.NEXT_PUBLIC_PICTURE_URL +
                            "/" +
                            value.thumbnail
                          : emptyImg.src
                      }
                    />
                  </div>
                ),
              },
              {
                show: true,
                id: "desc",
                name: "DESC",
                format: (value: any) => (
                  <div
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      setDataDetail({});
                      onOpen(value?.id);
                    }}
                  >
                    <p className="font-bold mb-1 text-primary text-large">
                      {value?.judul}
                    </p>
                    <p
                      className="font-light text-xs mb-1"
                      style={{ color: "#827272" }}
                    >
                      {value?.penulis + ", pada " + value?.dateCreated}
                    </p>
                    <p className="font-light mb-1" style={{ color: "#282828" }}>
                      {value.excerpt.length > 200
                        ? value.excerpt
                            .substr(
                              0,
                              value.excerpt.slice(0, 200).lastIndexOf(" ")
                            )
                            .concat("…")
                        : value.excerpt}
                    </p>
                    <p className="font-light text-primary text-small">
                      Selengkapnya &gt;
                    </p>
                  </div>
                ),
              },
            ]}
            rawData={data}
            rawPage={currentPage}
            rawTotal={total}
            rawLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
}
