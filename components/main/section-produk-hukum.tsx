import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { ProdukHukumInterface } from "@/app/types/entities";
import { Image } from "@nextui-org/image";
import { useHttp } from "@/app/hooks/useHttp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import emptyImg from "@/public/empty-image.png";
import moment from "moment";

export interface SectionProdukHukumProps {
    openModal: (type: string, title: string, search?: number | string) => void
}

const SectionProdukHukum: React.FC<SectionProdukHukumProps> = (props) => {
  const { get, isLoading } = useHttp();
  const [dataTop5Produk, setDataTop5Produk] = useState<ProdukHukumInterface[]>([]);
  const [dataPopularProduk, setDataPopularProduk] = useState<ProdukHukumInterface[]>([]);
  const [top5View, setTop5View] = useState<boolean>(true);
  const responsive = {
    any: {
      breakpoint: { max: 4000, min: 0 },
      items: 4,
    },
  };

  const top5Produk = async () => {
    get("/produk-hukum/top5").then((res: any) => {
      const data: ProdukHukumInterface[] = [];

      if (res?.data && res?.data.length > 0) {
        res?.data.map((item: any) => {
          data.push({
            id: item.id,
            productName: item.product_name,
            descr: item.descr,
            filePath: item.file_path,
            bidangHukum: item.bidang_hukum,
            thumbnail: item.thumbnail,
            uploadDate: item.upload_date,
          });
        });
      }

      setDataTop5Produk(data);
    });
  };

  const popularProduk = async () => {
    get("/produk-hukum/terpopuler").then((res: any) => {
      const data: ProdukHukumInterface[] = [];

      if (res?.data && res?.data.length > 0) {
        res?.data.map((item: any) => {
          data.push({
            id: item.id,
            productName: item.product_name,
            descr: item.descr,
            filePath: item.file_path,
            bidangHukum: item.bidang_hukum,
            thumbnail: item.thumbnail,
            uploadDate: item.upload_date,
          });
        });
      }

      setDataPopularProduk(data);
    });
  };

  useEffect(() => {
    top5Produk();
    popularProduk();
  }, []);

  return (
    <section className="secondary-section flex flex-col py-11">
      <div className="font-bold mb-6 text-4xl text-title">Produk Hukum</div>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <Button
          color={top5View ? "primary" : "default"}
          onClick={() => setTop5View(true)}
        >
          Terbaru
        </Button>
        <Button
          color={top5View ? "default" : "primary"}
          onClick={() => setTop5View(false)}
        >
          Terpopuler
        </Button>
      </div>
      <div className={top5View ? "" : "hidden"}>
        {dataTop5Produk && (
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite
            autoPlay
            autoPlaySpeed={8000}
            itemClass="px-2"
          >
            {dataTop5Produk?.map((value, index) => (
              <Button
                className="flex flex-col produk-card text-small w-full gap-0"
                key={index}
                onClick={() =>
                  props.openModal("produk", "Detail Produk Hukum", value.id)
                }
              >
                {value?.uploadDate ? (
                  <div className="produk-card-date">
                    {moment(value?.uploadDate).format("DD MMM YYYY")}
                  </div>
                ) : (
                  ""
                )}
                <Image
                  alt="produk"
                  className="object-cover w-full produk-card-image"
                  src={
                    value.thumbnail
                      ? process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL +
                        "/" +
                        value.thumbnail
                      : emptyImg.src
                  }
                  radius="none"
                  removeWrapper
                />
                <div className="produk-card-body">
                  <p className="font-bold produk-card-title">
                    {value.productName}
                  </p>
                  <span className="font-light mt-2 produk-card-descr">
                    {value.descr}
                  </span>
                </div>
              </Button>
            ))}
          </Carousel>
        )}
      </div>
      <div className={top5View ? "hidden" : ""}>
        {dataPopularProduk && (
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite
            autoPlay
            autoPlaySpeed={8000}
            itemClass="px-2"
          >
            {dataPopularProduk?.map((value, index) => (
              <Button
                className="flex flex-col produk-card text-small w-full gap-0"
                key={index}
                onClick={() =>
                  props.openModal("produk", "Detail Produk Hukum", value.id)
                }
              >
                {value?.uploadDate ? (
                  <div className="produk-card-date">
                    {moment(value?.uploadDate).format("DD MMM YYYY")}
                  </div>
                ) : (
                  ""
                )}
                <Image
                  alt="produk"
                  className="object-cover w-full produk-card-image"
                  src={
                    value.thumbnail
                      ? process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL +
                        "/" +
                        value.thumbnail
                      : emptyImg.src
                  }
                  radius="none"
                  removeWrapper
                />
                <div className="produk-card-body">
                  <p className="font-bold produk-card-title">
                    {value.productName}
                  </p>
                  <span className="font-light mt-2 produk-card-descr">
                    {value.descr}
                  </span>
                </div>
              </Button>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default SectionProdukHukum;
