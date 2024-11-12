import { Button } from '@nextui-org/button'
import { PlayIcon } from '@/components/icons'
import { Image } from '@nextui-org/image'
import { useEffect, useState } from 'react'
import { useHttp } from '@/app/hooks/useHttp'
import { VideoInterface } from '@/app/types/entities'
import moment from 'moment'

export interface SectionTvProps {
    openModal: (type: string, title: string, search?: number | string) => void
    openModalVideoPlayer: (title: string, video: VideoInterface) => void
}

const SectionTv: React.FC<SectionTvProps> = (props) => {
    const [video, setVideo] = useState([0, 1])
    const { get, isLoading } = useHttp()
    const [data, setData] = useState<VideoInterface[]>([])

    const getData = async () => {
        try {
            const videos: VideoInterface[] = []
            const res: any = await get('/site/video?limit=2')

            if (res && res.data) {
                res.data.map((item: any) => {
                    videos.push({
                        id: item.id,
                        judul: item.judul,
                        filePath: item.file_path,
                        linkUrl:
                            process.env.NEXT_PUBLIC_FILE_URL +
                            '/' +
                            item.file_path,
                        createdAt: moment(item.created_at).format(
                            'DD MMMM YYYY',
                        ),
                        orders: item.orders,
                        previewPath: item.preview_path,
                    })
                })
            }

            setData(videos)
        } catch (error) {}
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className="main-section flex flex-col py-11">
            <div>
                <Button color="primary" disableRipple disableAnimation>
                    TV
                </Button>
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
                {data &&
                    data?.map((value, index) => (
                        <Button
                            className="video-card text-xl"
                            key={index}
                            onClick={() =>
                                props.openModalVideoPlayer(
                                    'JDIH Kenkomdigi TV',
                                    value,
                                )
                            }
                        >
                            <div className="video-card-date">
                                <PlayIcon />
                            </div>
                            <Image
                                className="mr-1"
                                width={200}
                                alt="pos"
                                radius="none"
                                src={
                                    process.env.NEXT_PUBLIC_FILE_URL +
                                    '/' +
                                    value.previewPath
                                }
                                removeWrapper
                            />
                            <div className="text-left text-small">
                                <p className="whitespace-normal font-bold mb-2">
                                    {value?.judul}
                                </p>
                                <p className="whitespace-normal">
                                    {value?.createdAt}
                                </p>
                            </div>
                        </Button>
                    ))}
            </div>
        </section>
    )
}

export default SectionTv
