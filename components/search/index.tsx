'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Spinner } from '@nextui-org/spinner'
import { Input } from '@nextui-org/input'
import { useEffect, useRef, useState } from 'react'
import emptyImg from '@/public/empty-image.png'
import Image from 'next/image'
import TableWrapper from '@/components/table/custom-table/table'
import TableHeaderWrapper from '@/components/table/custom-table/table-header'
import { jenisPeraturanList, tahunList } from '@/constants'
import { useHttp } from '@/app/hooks/useHttp'
import { ProdukHukum } from '@/app/types/entities'
import moment from 'moment'
moment.locale('id')
interface SearchProps {
    search?: string
}

export default function Search({ search = '' }: SearchProps) {
    const formRef = useRef<any>(null)
    const tableRef = useRef<any>(null)
    const [data, setData] = useState<ProdukHukum[]>([])
    const [total, setTotal] = useState<number>(1)
    const { get, isLoading } = useHttp()

    const getData = async (keyword: string) => {
        try {
            const dataProduk: ProdukHukum[] = []
            const res: any = await get(
                `/produk-hukum/advance-search?tentang=${keyword}`,
            )
            console.log(res.data)
            if (
                res &&
                res.data &&
                res.data.produk &&
                res.data.produk.length > 0
            ) {
                res.data.produk.map((item: any) => {
                    dataProduk.push({
                        id: item.id,
                        productName: item.product_name,
                        descr: item.descr,
                        filePath: item.file_path,
                        bidangHukum: item.bidang_hukum,
                        thumbnail:
                            process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL +
                            '/' +
                            item.thumbnail,
                        content: item.content,
                        uploadDate: moment(item.upload_date).format(
                            'DD MMMM YYYY',
                        ),
                    })
                })
            }

            setData(dataProduk)
            setTotal(res.data.total)
            // tableRef.current?.setData(dataProduk)
            console.log(dataProduk)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (search) {
            getData(search)
            // tableRef.current?.search(search)
        }
    }, [search])

    return (
        <div className="flex flex-col gap-4">
            <TableHeaderWrapper
                initSearch={search}
                onSearch={(value) => {
                    getData(value)
                }}
                onExtra={jenisPeraturanList}
                onExtraTitle="Pilih Jenis Peraturan"
                onExtraTwo={tahunList}
                onExtraTwoTitle="Semua Tahun"
            />
            <motion.div
                transition={{
                    ease: 'linear',
                    duration: 0.2,
                }}
            >
                <TableWrapper
                    url=""
                    module=""
                    ref={tableRef}
                    title=""
                    // url=""
                    columns={[
                        {
                            width: 280,
                            show: true,
                            id: 'thumbnail',
                            name: 'IMAGE',
                            format: (value: ProdukHukum) => (
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        position: 'relative',
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        marginLeft: '10px',
                                    }}
                                >
                                    <Image
                                        src={value?.thumbnail || emptyImg.src}
                                        alt="image"
                                        // width={100}
                                        // height={100}
                                        layout="fill"
                                        sizes="100vw"
                                        className="w-full self-center object-cover"
                                        onError={(event) => {
                                            // @ts-ignore
                                            event.target.src = emptyImg.src
                                            // @ts-ignore
                                            event.target.srcset = emptyImg.src
                                        }}
                                    />
                                </div>
                            ),
                        },
                        {
                            show: true,
                            id: 'productName',
                            name: 'DESC',
                            format: (value: ProdukHukum) => (
                                <div style={{ paddingRight: '10px' }}>
                                    <p
                                        className="font-bold mb-1 text-primary text-large"
                                        dangerouslySetInnerHTML={{
                                            __html: value?.productName,
                                        }}
                                    />
                                    <p
                                        className="font-light mb-1"
                                        style={{ color: '#282828' }}
                                        dangerouslySetInnerHTML={{
                                            __html: value?.descr,
                                        }}
                                    />

                                    <p
                                        className="font-bold text-xs"
                                        style={{ color: '#827272' }}
                                    >
                                        Disanggah pada {value?.uploadDate}
                                    </p>
                                </div>
                            ),
                        },
                    ]}
                    rawData={data}
                    rawTotal={total}
                />
            </motion.div>
        </div>
    )
}
