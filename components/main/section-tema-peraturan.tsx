import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface SectionTemaPeraturanProps {
  openModal: (
    action: string,
    title: string,
    search?: string,
    keyword?: string
  ) => void;
}

const SectionTemaPeraturan: React.FC<SectionTemaPeraturanProps> = (props) => {
  const responsive = {
    any: {
      breakpoint: { max: 4000, min: 0 },
      items: 6,
    },
  };

  return (
    <section className="carousel-section flex flex-col py-11">
      <div className="self-center font-bold mb-6 text-4xl text-title">
        Telusuri Tema Peraturan
      </div>
      <div className="px-10">
        <Carousel
          responsive={responsive}
          arrows={false}
          autoPlay
          autoPlaySpeed={8000}
          rewind={true}
          rewindWithAnimation={true}
          centerMode={false}
          itemClass="px-2"
        >
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() => props.openModal("tema", "Telusur Tema", "", "pos")}
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/pos.png"
              removeWrapper
            />
            <span>POS</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "telekomunikasi")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/tele.png"
              removeWrapper
            />
            <span>Telekomunikasi</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "penyiaran")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/penyiaran.png"
              removeWrapper
            />
            <span>Penyiaran</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "sistem")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/informasi.png"
              removeWrapper
            />
            <span>Informasi & Transaksi Elektronik</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "frekuensi")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/frekuensi.png"
              removeWrapper
            />
            <span>Frekuensi Radio</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "sertifikasi")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/sertifikasi.png"
              removeWrapper
            />
            <span>Sertifikasi</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "perizinan")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/perizinan.png"
              removeWrapper
            />
            <span>Perizinan</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "ikp|prahukum")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/infokom.png"
              removeWrapper
            />
            <span>Komunikasi Publik</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
          <Button
            className="flex flex-col tema-card items-center whitespace-normal w-full"
            onClick={() =>
              props.openModal("tema", "Telusur Tema", "", "organisasi")
            }
          >
            <Image
              className="mb-4"
              height={78}
              alt="pos"
              radius="none"
              src="assets/organisasi.png"
              removeWrapper
            />
            <span>Kepegawaian & Organisasi</span>
            <span
              className="text-description"
              style={{ letterSpacing: "0.3px" }}
            ></span>
          </Button>
        </Carousel>
      </div>
    </section>
  );
};

export default SectionTemaPeraturan;
