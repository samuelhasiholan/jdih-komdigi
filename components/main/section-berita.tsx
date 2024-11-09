import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Berita } from '@/app/types/entities'
import { Image } from '@nextui-org/image'
import { useHttp } from '@/app/hooks/useHttp'

export interface SectionBeritaProps {
    openModal: (type: string, title: string, search: string) => void
}

const SectionBerita: React.FC<SectionBeritaProps> = (props) => {
    const { get, isLoading } = useHttp()
    const [dataTop5, setDataTop5] = useState<Berita[]>([])

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
                {dataTop5 &&
                    dataTop5?.map((value, index) => (
                        <Button
                            className="flex flex-col berita-card text-small gap-0"
                            key={index}
                            onClick={() => props.openModal('berita', 'Berita', value.id)}
                        >
                            <Image
                                alt="berita"
                                height={150}
                                className="object-cover rounded-medium w-full"
                                src={
                                    process.env.NEXT_PUBLIC_PICTURE_URL +
                                    '/' +
                                    value.thumbnail
                                }
                                removeWrapper
                            />
                            <div className="berita-card-body">
                                <p style={{ color: '#BBBBBB' }}>
                                    {value.dateCreated}
                                </p>
                                <p className="font-bold mt-2">
                                {value.judul}
                                </p>
                                <span
                                    className="font-light mt-2"
                                    style={{ color: '#827272' }}
                                >
                                    {value.excerpt}
                                </span>
                            </div>
                        </Button>
                    ))}
            </div>
        </section>
    )
}

export default SectionBerita