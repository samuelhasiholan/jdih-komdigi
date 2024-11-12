import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { InfografisInterface } from "@/app/types/entities";
import { Image } from "@nextui-org/image";
import { useHttp } from "@/app/hooks/useHttp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";

export interface SectionInfografisProps {
  openModal: (type: string, title: string, search?: number | string) => void;
}

const SectionInfografis: React.FC<SectionInfografisProps> = (props) => {
  const { get, isLoading } = useHttp();
  const [dataTop5, setDataTop5] = useState<InfografisInterface[]>([]);
  const responsive = {
    any: {
      breakpoint: { max: 4000, min: 0 },
      items: 3,
    },
  };

  const top5 = async () => {
    get("/infografis/top5").then((res: any) => {
      const data: InfografisInterface[] = [];

      if (res?.data && res?.data.length > 0) {
        res?.data.map((item: any) => {
          data.push({
            id: item.id,
            judul: item.judul,
            konten: item.konten,
            thumbnail: item.file_path,
            dateCreated: item.created_at,
          });
        });
      }

      setDataTop5(data);
    });
  };

  useEffect(() => {
    top5();
  }, []);

  return (
    <section className="carousel-section flex flex-col py-11">
      <div className="secondary-carousel-section">
        <div className="font-bold mb-6 text-4xl text-title">Infografis</div>
        <div className="flex mb-6">
          <span className="flex-auto text-title"></span>
          <button
            className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
            onClick={() => props.openModal("infografis", "Infografis")}
          >
            LIHAT SEMUA
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex">
          <Skeleton
            isLoaded={!isLoading}
            className="h-24 w-1/3 rounded-lg mx-2"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="h-24 w-1/3 rounded-lg mx-2"
          />
          <Skeleton
            isLoaded={!isLoading}
            className="h-24 w-1/3 rounded-lg mx-2"
          />
        </div>
      ) : (
        dataTop5 && (
          <div className="px-10">
            <Carousel
              responsive={responsive}
              arrows={false}
              infinite
              autoPlay
              autoPlaySpeed={8000}
              itemClass="px-2 pb-3"
            >
              {dataTop5?.map((value, index) => (
                <Button
                  className="flex flex-col infografis-card text-small gap-0"
                  key={index}
                  onClick={() =>
                    props.openModal("infografis", "Infografis", value.id)
                  }
                >
                  <Image
                    alt="infografis"
                    className="object-cover w-full"
                    src={
                      process.env.NEXT_PUBLIC_INFOGRAFIS_URL +
                      "/" +
                      value.thumbnail
                    }
                    radius="none"
                    removeWrapper
                  />
                  <div className="infografis-card-body">
                    <p className="font-bold">{value.judul}</p>
                  </div>
                </Button>
              ))}
            </Carousel>
          </div>
        )
      )}
    </section>
  );
};

export default SectionInfografis;
