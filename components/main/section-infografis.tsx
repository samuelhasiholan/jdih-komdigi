'use client'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { useState } from 'react'

export interface SectionInfografisProps {
    openModal: (type: string, title: string) => void
}
const SectionInfografis: React.FC<SectionInfografisProps> = (props) => {
    const [infografis, setInfografis] = useState([0, 1, 2])

    return (
        <section className="main-section flex flex-col py-11">
            <div>
                <Button color="primary">INFOGRAFIS</Button>
            </div>
            <div className="font-bold my-6 text-4xl text-title">Infografis</div>
            <div className="flex mb-6">
                <span className="flex-auto text-title"></span>
                <button
                    className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
                    onClick={() => props.openModal('infografis', 'Infografis')}
                >
                    LIHAT SEMUA
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-10">
                {infografis &&
                    infografis?.map((value, index) => (
                        <Button
                            className="flex flex-col infografis-card text-small gap-0"
                            key={index}
                        >
                            <Image
                                alt="produk"
                                className="object-cover w-full"
                                src="assets/infografis_thumbnail.png"
                                radius="none"
                                removeWrapper
                            />
                            <div className="infografis-card-body">
                                <p className="font-bold">
                                    Layanan Aduan Konten
                                </p>
                            </div>
                        </Button>
                    ))}
            </div>
        </section>
    )
}

export default SectionInfografis
