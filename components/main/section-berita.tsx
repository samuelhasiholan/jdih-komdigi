import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { useState } from 'react'

export interface SectionBeritaProps {
    openModal: (type: string, title: string) => void
}

const SectionBerita: React.FC<SectionBeritaProps> = (props) => {
    const [berita, setBerita] = useState([0, 1, 2])

    return (
        <section className="secondary-section flex flex-col py-11">
            <div>
                <Button color="primary">BERITA</Button>
            </div>
            <div className="font-bold my-6 text-4xl text-title">
                Berita Terkini
            </div>
            <div className="flex mb-6">
                <span className="flex-auto text-title">
                    Berita terkini seputar JDIH Kemkomdigi
                </span>
                <button
                    className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
                    onClick={() => props.openModal('berita', 'Berita')}
                >
                    LIHAT SEMUA
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {berita &&
                    berita?.map((value, index) => (
                        <Button
                            className="flex flex-col berita-card text-small gap-0"
                            key={index}
                        >
                            <Image
                                alt="produk"
                                className="object-cover w-full"
                                src="assets/berita_thumbnail.png"
                                radius="none"
                                removeWrapper
                            />
                            <div className="berita-card-body">
                                <p style={{ color: '#BBBBBB' }}>
                                    Jumat, 13 September 2024
                                </p>
                                <p className="font-bold mt-2">
                                    Benchmarking Pengelola JDIH Kementerian
                                    Komunikasi dan Informatika dengan Pengelola
                                    JDIH Provinsi Bali
                                </p>
                                <span
                                    className="font-light mt-2"
                                    style={{ color: '#827272' }}
                                >
                                    Denpasar, 12/09/2024 – Pengelola Jaringan
                                    Dokumentasi dan Informasi Hukum Kementerian
                                    Komunikasi dan Informatika (JDIH Kemkominfo)
                                    ...
                                </span>
                            </div>
                        </Button>
                    ))}
            </div>
        </section>
    )
}

export default SectionBerita
