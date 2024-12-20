'use client'
import TableWrapper from '@/components/table/block/table'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { VideoInterface } from '@/app/types/entities'
import { useHttp } from '@/app/hooks/useHttp'
import VideoPlayer from '../video-player'
import moment from 'moment'

interface TVProps {
    search: string | number
    onOpen: (value: number | string) => void
}

export default function TV({ search, onOpen }: TVProps) {
    const tableRef = useRef<any>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [data, setData] = useState<VideoInterface[]>([])
    const [dataDetail, setDataDetail] = useState<VideoInterface | any>({})
    const { get, isLoading } = useHttp()

    const getData = async () => {
        try {
            const dataTV: VideoInterface[] = []
            const res: any = await get(`/site/video?limit=10000`)

            if (res && res.data && res.data.length > 0) {
                res.data.map((item: any) => {
                    dataTV.push({
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
                        previewPath: item.preview_path
                            ? process.env.NEXT_PUBLIC_FILE_URL +
                              '/' +
                              item.preview_path
                            : '',
                    })
                })
            }

            setData(dataTV)
        } catch (error) {
            console.log(error)
        }
    }

    const detailTV = (id: number | string) => {
        let i = 0
        while (i < data.length) {
            if (data[i].id === id) {
                setDataDetail(data[i])
                break
            }
            i++
        }
    }

    useEffect(() => {
        if (search) {
            detailTV(search)
        } else {
            setDataDetail({})
        }
    }, [search, data])

    useEffect(() => {
        getData()
    }, [currentPage])

    return (
        <div className="flex flex-col gap-4">
            <motion.div
                transition={{
                    ease: 'linear',
                    duration: 0.2,
                }}
            >
                {search !== '' ? (
                    dataDetail.linkUrl && (
                        <VideoPlayer linkUrl={dataDetail?.linkUrl} />
                    )
                ) : (
                    <TableWrapper
                        ref={tableRef}
                        title=""
                        onClick={(id: number) => {
                            setDataDetail({})
                            onOpen(id)
                        }}
                        columns={[]}
                        rawData={data}
                        rawLoading={isLoading}
                    />
                )}
            </motion.div>
        </div>
    )
}
