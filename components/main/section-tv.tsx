import { Button } from '@nextui-org/button'
import { PlayIcon } from '@/components/icons'
import { Image } from '@nextui-org/image'
import { useState } from 'react'

export interface SectionTvProps {
    openModal: (type: string, title: string) => void
}

const SectionTv: React.FC<SectionTvProps> = (props) => {
    const [video, setVideo] = useState([0, 1])

    return (
        <section className="main-section flex flex-col py-11">
            <div>
                <Button color="primary">TV</Button>
            </div>
            <div className="font-bold my-6 text-4xl text-title">
                JDIH Kenkomdigi TV
            </div>
            <div className="flex mb-6">
                <span className="flex-auto text-title">
                    Saksikan tayangan seputar JDIH Kemkomdigi yang berisi
                    seputar penjelasan secara interaktif tentang JDIH
                    Kemkominfo.
                </span>
                <button
                    className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
                    onClick={() => props.openModal('tv', 'JDIH Kenkomdigi TV')}
                >
                    LIHAT SEMUA
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {video &&
                    video?.map((value, index) => (
                        <Button className="video-card text-xl" key={index}>
                            <div className="video-card-date">
                                <PlayIcon />
                                <span className="ml-2">572</span>
                            </div>
                            <Image
                                className="mr-1"
                                width={200}
                                alt="pos"
                                radius="none"
                                src="assets/video_thumbnail.png"
                                removeWrapper
                            />
                            <div className="text-left text-small">
                                <p className="whitespace-normal font-bold mb-2">
                                    UNDANG-UNDANG PERLINDUNGAN DATA PRIBADI -
                                    #KOMINFOPEDIA
                                </p>
                                <p className="whitespace-normal">27 Okt 2021</p>
                            </div>
                        </Button>
                    ))}
            </div>
        </section>
    )
}

export default SectionTv
