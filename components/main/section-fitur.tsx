import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

export interface SectionFiturProps {
  openModal: (type: string, title: string, search: string) => void;
}

const SectionFitur: React.FC<SectionFiturProps> = (props) => {
  return (
    <section className="main-section flex flex-col py-11">
      <div>
        <Button color="primary" disableRipple disableAnimation>
          FITUR
        </Button>
      </div>
      <div className="font-bold my-6 text-4xl text-title">
        Jelajahi Fitur JDIH
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Button className="fitur-card text-xl">
          <Image
            className="mr-1"
            height={60}
            alt="pos"
            radius="none"
            src="assets/fitur-1.png"
            removeWrapper
          />
          <span>Monografi Hukum</span>
        </Button>
        <Button className="fitur-card text-xl">
          <Image
            className="mr-1"
            height={60}
            alt="pos"
            radius="none"
            src="assets/fitur-2.png"
            removeWrapper
          />
          <span>Perkara Hukum</span>
        </Button>
        <Button className="fitur-card text-xl">
          <Image
            className="mr-1"
            height={60}
            alt="pos"
            radius="none"
            src="assets/fitur-3.png"
            removeWrapper
          />
          <span>Grafik Statistik</span>
        </Button>
        <Button className="fitur-card text-xl">
          <Image
            className="mr-1"
            height={60}
            alt="pos"
            radius="none"
            src="assets/fitur-4.png"
            removeWrapper
          />
          <span>Artikel Hukum</span>
        </Button>
        <Button className="fitur-card text-xl">
          <Image
            className="mr-1"
            height={60}
            alt="pos"
            radius="none"
            src="assets/fitur-5.png"
            removeWrapper
          />
          <span>Konstitusional</span>
        </Button>
        <Button className="fitur-card text-xl">
          <Image
            className="mr-1"
            height={60}
            alt="pos"
            radius="none"
            src="assets/fitur-6.png"
            removeWrapper
          />
          <span>Matriks Produk</span>
        </Button>
      </div>
    </section>
  );
};

export default SectionFitur;
