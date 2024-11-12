import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Skeleton } from '@nextui-org/skeleton'
import { BeritaInterface as Berita } from '@/app/types/entities'
import { Image } from '@nextui-org/image'
import { useHttp } from '@/app/hooks/useHttp'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import moment from 'moment'

export interface SectionBeritaProps {
    openModal: (type: string, title: string, search?: number | string) => void
}

const SectionBerita: React.FC<SectionBeritaProps> = (props) => {
    const { get, isLoading } = useHttp()
    const [dataTop5, setDataTop5] = useState<Berita[]>([])
    const responsive = {
        any: {
            breakpoint: { max: 4000, min: 0 },
            items: 3,
        },
    }

    const top5 = async () => {
        get('/berita/top5').then((res: any) => {
            const data: Berita[] = []

            if (res?.data && res?.data.length > 0) {
                res?.data.map((item: any) => {
                    data.push({
                        id: item.id,
                        judul: item.judul,
                        excerpt: item.excerpt,
                        content: item.content,
                        thumbnail: item.image_path,
                        dateCreated: item.date_created,
                        penulis: item.penulis,
                    })
                })
            }

            setDataTop5(data)
        })
    }

    useEffect(() => {
        top5()
    }, [])

    return (
        <section className="carousel-section secondary-section flex flex-col py-11">
            <div className="secondary-carousel-section">
                <div className="font-bold mb-6 text-4xl text-title">
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
                            autoPlay
                            autoPlaySpeed={8000}
                            itemClass="px-2"
                            rewind={true}
                            rewindWithAnimation={true}
                        >
                            {dataTop5?.map((value, index) => (
                                <Button
                                    className="flex flex-col berita-card text-small gap-0"
                                    key={index}
                                    onClick={() =>
                                        props.openModal(
                                            'berita',
                                            'Berita',
                                            value.id,
                                        )
                                    }
                                >
                                    <Image
                                        alt="berita"
                                        height={180}
                                        className="object-cover rounded-medium w-full"
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_PICTURE_URL +
                                            '/' +
                                            value.thumbnail
                                        }
                                        removeWrapper
                                    />
                                    <div className="berita-card-body">
                                        <p style={{ color: '#BBBBBB' }}>
                                            {value.dateCreated
                                                ? moment(
                                                      value.dateCreated,
                                                  ).format('dddd, DD MMMM YYYY')
                                                : ''}
                                        </p>
                                        <p className="font-bold mt-2">
                                            {value.judul}
                                        </p>
                                        <span
                                            className="font-light mt-2"
                                            style={{ color: '#827272' }}
                                        >
                                            {value.excerpt &&
                                            value.excerpt.length > 200
                                                ? value.excerpt
                                                      .substr(
                                                          0,
                                                          value.excerpt
                                                              .slice(0, 200)
                                                              .lastIndexOf(' '),
                                                      )
                                                      .concat('…')
                                                : value.excerpt}
                                        </span>
                                    </div>
                                </Button>
                            ))}
                        </Carousel>
                    </div>
                )
            )}
        </section>
    )
}

export default SectionBerita
