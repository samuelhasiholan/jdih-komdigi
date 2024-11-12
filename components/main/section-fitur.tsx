import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

interface SectionFiturProps {
  openModal: (title: string, iframeUrl: string) => void;
}

const SectionFitur: React.FC<SectionFiturProps> = (props) => {
  const data = [
    {
      src: "assets/fitur-1.png",
      title: "Monografi Hukum",
      url: process.env.NEXT_PUBLIC_ACCOUNT_IFRAME_URL + "/webview/monografi",
    },
    {
      src: "assets/fitur-2.png",
      title: "Perkara Hukum",
      url:
        process.env.NEXT_PUBLIC_ACCOUNT_IFRAME_URL + "/webview/perkara/beranda",
    },
    {
      src: "assets/fitur-3.png",
      title: "Grafik Statistik",
      url:
        process.env.NEXT_PUBLIC_ACCOUNT_IFRAME_URL +
        "/webview/produk_hukum/grafik",
    },
    {
      src: "assets/fitur-4.png",
      title: "Artikel Hukum",
      url:
        process.env.NEXT_PUBLIC_ACCOUNT_IFRAME_URL + "/webview/artikel_hukum",
    },
    {
      src: "assets/fitur-5.png",
      title: "Konstitusional Review",
      url:
        process.env.NEXT_PUBLIC_ACCOUNT_IFRAME_URL +
        "/webview/judicial/beranda",
    },
    {
      src: "assets/fitur-6.png",
      title: "Matriks Produk",
      url:
        process.env.NEXT_PUBLIC_ACCOUNT_IFRAME_URL +
        "/webview/produk_hukum/statistik",
    },
  ];

  return (
    <section className="main-section flex flex-col py-11">
      {/* <div>
                <Button color="primary" disableRipple disableAnimation>FITUR</Button>
            </div> */}
      <div className="font-bold mb-6 text-4xl text-title">
        Jelajahi Fitur JDIH
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <Button
            key={index}
            className="fitur-card text-xl"
            onClick={() => props.openModal(item.title, item.url)}
          >
            <Image
              className="mr-1"
              height={60}
              alt="pos"
              radius="none"
              src={item.src}
              removeWrapper
            />
            <span>{item.title}</span>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default SectionFitur;
