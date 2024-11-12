"use client";
import TableWrapper from "@/components/table/custom-table/table";
import TableHeaderWrapper from "@/components/table/custom-table/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import emptyImg from "@/public/empty-image.png";
import { useEffect, useRef, useState } from "react";
import { ProdukHukumInterface } from "@/app/types/entities";
import { useHttp } from "@/app/hooks/useHttp";
import moment from "moment";

interface ProdukHukumProps {
  search: string | number;
  onOpen: (value: number | string) => void;
}

export default function ProdukHukum({ search, onOpen }: ProdukHukumProps) {
  const tableRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<ProdukHukumInterface[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [dataDetail, setDataDetail] = useState<ProdukHukumInterface>({});
  const { get, isLoading } = useHttp();

  const getData = async () => {
    try {
      const dataProduk: ProdukHukumInterface[] = [];
      const res: any = await get(
        `/produk-hukum/pencarian?tahun=&kategori=&tentang=&page=${currentPage}`,
      );
      console.log(res.data);
      if (
        res &&
        res.data &&
        res.data.produk &&
        res.data.produk.data &&
        res.data.produk.data.length > 0
      ) {
        res.data.produk.data.map((item: any) => {
          dataProduk.push({
            id: item.id,
            productName: item.product_name,
            descr: item.descr,
            filePath: item.file_path,
            bidangHukum: item.bidang_hukum,
            thumbnail:
              process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL + "/" + item.thumbnail,
            content: item.content,
            uploadDate: moment(item.upload_date).format("DD MMMM YYYY"),
          });
        });
      }

      setData(dataProduk);
      setTotal(res.data.produk.total);
    } catch (error) {
      console.log(error);
    }
  };

  const detailProdukHukum = async (id: number | string) => {
    get("/produk-hukum/detail/" + id).then((res: any) => {
      const data: ProdukHukumInterface[] = [];

      if (res?.data) {
        if (res?.data.produk) {
          setDataDetail({
            id: res?.data.produk.id,
            productName: res?.data.produk.product_name,
            descr: res?.data.produk.descr,
            filePath: res?.data.produk.file_path,
            thumbnail: res?.data.produk.thumbnail,
            bidangHukum: res?.data.produk.bidang_hukum,
            title: res?.data.produk.title,
            content: res?.data.produk.content,
            uploadDate: res?.data.produk.upload_date,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (search) {
      detailProdukHukum(search);
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
          <div className="px-5 pb-5">
            <p className="text-xl text-center mb-5">{dataDetail.title}</p>
            <Image
              src={
                process.env.NEXT_PUBLIC_PICTURE_URL + "/" + dataDetail.thumbnail
              }
              alt="image"
              radius="md"
              className="w-full self-center object-cover mb-5"
              removeWrapper
            />
            <p className="mb-3 text-primary">
              {dataDetail?.uploadDate
                ? moment(dataDetail?.uploadDate).format("dddd, DD MMMM YYYY")
                : ""}
            </p>
            <div>
              {dataDetail.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetail.content.replace(
                      /(<? *script)/gi,
                      "illegalscript",
                    ),
                  }}
                ></div>
              )}
            </div>
          </div>
        ) : (
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
                  <div
                    style={{
                      width: "230px",
                      height: "150px",
                      position: "relative",
                      borderRadius: "15px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={value?.img || emptyImg.src}
                      alt="image"
                      className="w-full self-center object-cover"
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
                    onClick={() => onOpen(value?.id)}
                  >
                    <p className="font-bold mb-1 text-primary text-large">
                      {value?.productName}
                    </p>
                    <p
                      className="font-light text-xs mb-1"
                      style={{ color: "#827272" }}
                    >
                      {"Diunggah pada " + value?.uploadDate}
                    </p>
                    <p className="font-light mb-1" style={{ color: "#282828" }}>
                      {value?.descr}
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
