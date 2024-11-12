"use client";
import TableWrapper from "@/components/table/custom-table/table";
import TableHeaderWrapper from "@/components/table/custom-table/table-header";
import TableWrapperDefault from "@/components/table/default/table";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { Image } from "@nextui-org/image";
import { Tabs, Tab } from "@nextui-org/tabs";
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
            judulSeragam: res?.data.produk.katalogrel.judul_seragam,
            tajukEntriUtama: res?.data.produk.katalogrel.tajuk_entri_utama,
            nomor: res?.data.produk.nomor,
            categoryName: res?.data.produk.kategori.category_name,
            singkatan: res?.data.produk.kategori.singkatan,
            tempatPenetapan: res?.data.produk.tempat_penetapan,
            tanggalPenetapanPengundangan: res?.data.produk.tanggal_penetapan + "/" + res?.data.produk.tanggal_pengundangan,
            sumber: res?.data.produk.sumber,
            jejakan: res?.data.produk.katalogrel.jejakan,
            status: res?.data.produk.status_peraturan.status,
            bahasa: res?.data.produk.bahasa === "0"
              ? "Indonesia"
              : res?.data.produk.bahasa === "1"
                ? "Inggris"
                : res?.data.produk.bahasa,
            lokasi: res?.data.produk.lokasi,
            produkPasal: res?.data.produkPasal,
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
        {
          search !== "" 
          ? !isLoading && (
            <div className="px-5 pb-5">
              <p className="text-xl text-center mb-10">{dataDetail.title}</p>
              {
                dataDetail.produkPasal &&
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <Tabs 
                    items={dataDetail.produkPasal} 
                    disableAnimation
                    classNames={{
                      tabList: "custom-tab-tablist flex-wrap",
                      tab: "custom-tab-button",
                      panel: "custom-tab-panel p-4 rounded-medium"
                    }}
                  >
                    {(item) => (
                      <Tab key={item.id} title={item.label}>
                        <p className="font-bold mb-2">{item.label}</p>
                        {item.konten && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.konten.replace(
                                /(<? *script)/gi,
                                "illegalscript",
                              ),
                            }}
                          ></div>
                        )}
                      </Tab>
                    )}
                  </Tabs>
                </div>
              }
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
              <div className="grid grid-cols-2 gap-4">
                <TableWrapperDefault
                  columns={[
                    {
                      show: true,
                      id: "meta",
                      name: "Meta",
                    },
                    {
                      show: true,
                      id: "keterangan",
                      name: "Keterangan",
                      format: (value: any) => {
                        if (value.meta === "Lampiran") {
                          return (
                            <button
                                className="font-bold bg-primary text-white p-2 rounded-medium"
                            >
                                Unduh Produk Hukum
                            </button>
                          ); 
                        } else {
                          return (value.keterangan); 
                        }
                      },
                    },
                  ]}
                  rawData={[
                    {
                      meta: "Tipe Dokumen",
                      keterangan: dataDetail.judulSeragam,
                    },
                    {
                      meta: "Judul",
                      keterangan: dataDetail.title,
                    },
                    {
                      meta: "T.E.U. Badan/Pengarang",
                      keterangan: dataDetail.tajukEntriUtama,
                    },
                    {
                      meta: "Nomor Peraturan",
                      keterangan: dataDetail.nomor,
                    },
                    {
                      meta: "Jenis / Bentuk Peraturan",
                      keterangan: dataDetail.categoryName,
                    },
                    {
                      meta: "Singkatan Jenis/Bentuk Peraturan",
                      keterangan: dataDetail.singkatan,
                    },
                    {
                      meta: "Tempat Penetapan",
                      keterangan: dataDetail.tempatPenetapan,
                    },
                    {
                      meta: "Tanggal-Bulan-Tahun Penetapan/Pengundangan",
                      keterangan: dataDetail.tanggalPenetapanPengundangan,
                    },
                    {
                      meta: "Sumber",
                      keterangan: dataDetail.sumber,
                    },
                    {
                      meta: "Subjek",
                      keterangan: dataDetail.jejakan,
                    },
                    {
                      meta: "Status Peraturan",
                      keterangan: dataDetail.status,
                    },
                    {
                      meta: "Bahasa",
                      keterangan: dataDetail.bahasa,
                    },
                    {
                      meta: "Lokasi",
                      keterangan: dataDetail.lokasi,
                    },
                    {
                      meta: "Bidang Hukum",
                      keterangan: dataDetail.bidangHukum,
                    },
                    {
                      meta: "Lampiran",
                      keterangan: dataDetail.filePath,
                    },
                  ]}
                />
                <embed src={process.env.NEXT_PUBLIC_FILE_URL + "/" + dataDetail.filePath} width="100%" height="600" type="application/pdf"></embed>
              </div>
            </div>
          ) 
          : (
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
          )
        }
      </motion.div>
    </div>
  );
}
