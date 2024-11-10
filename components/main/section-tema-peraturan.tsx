import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface SectionTemaPeraturanProps {
    openModal: (type: string, title: string, tema: string) => void
}

const SectionTemaPeraturan: React.FC<SectionTemaPeraturanProps> = (props) => {
    const responsive = {
      any: {
        breakpoint: { max: 4000, min: 0 },
        items: 6,
      }
    };

    return (
        <section className="main-section flex flex-col py-11">
            <Button color="primary" className="self-center" disableRipple disableAnimation>TEMA</Button>
            <div className="self-center font-bold my-6 text-4xl text-title">
                Telusur Tema Peraturan
            </div>
            <Carousel 
                responsive={responsive}
                arrows={false}
                infinite autoPlay autoPlaySpeed={8000}
                centerMode={true}
                itemClass="px-2"
            >
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal('tema', 'Telusur Tema', 'Pos')
                    }
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        6 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal(
                            'tema',
                            'Telusur Tema',
                            'Telekomunikasi',
                        )
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        45 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal('tema', 'Telusur Tema', 'Penyiaran')
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        11 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal(
                            'tema',
                            'Telusur Tema',
                            'Informasi & Transaksi Elektronik',
                        )
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        8 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal(
                            'tema',
                            'Telusur Tema',
                            'Frekuensi Radio',
                        )
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        17 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal('tema', 'Telusur Tema', 'Sertifikasi')
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        11 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal(
                            'tema',
                            'Telusur Tema',
                            'Frekuensi Radio',
                        )
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        13 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal(
                            'tema',
                            'Telusur Tema',
                            'Frekuensi Radio',
                        )
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        1 peraturan
                    </span>
                </Button>
                <Button
                    className="flex flex-col tema-card items-center whitespace-normal w-full"
                    onClick={() =>
                        props.openModal(
                            'tema',
                            'Telusur Tema',
                            'Frekuensi Radio',
                        )
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
                        style={{ letterSpacing: '0.3px' }}
                    >
                        31 peraturan
                    </span>
                </Button>
            </Carousel>
        </section>
    )
}

export default SectionTemaPeraturan
