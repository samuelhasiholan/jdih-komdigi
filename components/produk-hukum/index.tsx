'use client'
import TableWrapper from '@/components/table/custom-table/table'
import TableHeaderWrapper from '@/components/table/custom-table/table-header'
import TableWrapperDefault from '@/components/table/default/table'
import { AnimatePresence, motion } from 'framer-motion'
import { jenisPeraturanList, tahunList } from '@/constants'
import { Image } from '@nextui-org/image'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Skeleton } from '@nextui-org/skeleton'
import { Tabs, Tab } from '@nextui-org/tabs'
import emptyImg from '@/public/empty-image.png'
import { useEffect, useRef, useState } from 'react'
import { ProdukHukumInterface } from '@/app/types/entities'
import { useHttp } from '@/app/hooks/useHttp'
import PdfViewer from '../pdfviewer'
import QRCode from "react-qr-code";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { CloseIcon } from '@/components/icons'
import moment from 'moment'

moment.locale("id");

interface ProdukHukumProps {
    search: string | number
    onOpen: (value: number | string) => void
}

export default function ProdukHukum({ search, onOpen }: ProdukHukumProps) {
    const tableRef = useRef<any>(null)
    const [showMiniModal, setShowMiniModal] = useState(false);
    const [currentSearch, setCurrentSearch] = useState<string | number>(search)
    const [currentKategori, setCurrentKategori] = useState<string | number>('')
    const [currentTahun, setCurrentTahun] = useState<string | number>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [data, setData] = useState<ProdukHukumInterface[]>([])
    const [total, setTotal] = useState<number>(1)
    const [dataDetail, setDataDetail] = useState<ProdukHukumInterface>({})
    const { get, isLoading } = useHttp()


    const getData = async () => {
        try {
            const dataProduk: ProdukHukumInterface[] = []
            const res: any = await get(
                `/produk-hukum/advance-search?tentang=${currentSearch}&kategori=${currentKategori}&tahun=${currentTahun}&page=${currentPage}`,
            )

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
            setTotal(res?.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const detailProdukHukum = async (id: number | string) => {
        get('/produk-hukum/detail/' + id).then((res: any) => {
            const data: ProdukHukumInterface[] = []

            if (res?.data) {
                if (res?.data.produk) {
                    setDataDetail({
                        id: res?.data.produk.id,
                        productName: res?.data.produk.product_name,
                        descr: res?.data.produk.descr,
                        filePath: res?.data.produk.file_path,
                        thumbnail: res?.data.produk.thumbnail,
                        bidangHukum: res?.data.produk.bidang_hukum,
                        title: res?.data.produk.title,
                        content: res?.data.produk.content,
                        uploadDate: res?.data.produk.upload_date,
                        judulSeragam:
                            res?.data.produk.katalogrel?.judul_seragam,
                        tajukEntriUtama:
                            res?.data.produk.katalogrel?.tajuk_entri_utama,
                        nomor: res?.data.produk.nomor,
                        categoryName: res?.data.produk.kategori?.category_name,
                        singkatan: res?.data.produk.kategori?.singkatan,
                        tempatPenetapan: res?.data.produk.tempat_penetapan,
                        tanggalPenetapanPengundangan:
                            res?.data.produk.tanggal_penetapan +
                            '/' +
                            res?.data.produk.tanggal_pengundangan,
                        sumber: res?.data.produk.sumber,
                        jejakan: res?.data.produk.katalogrel?.jejakan,
                        status: res?.data.produk.status_peraturan?.status,
                        bahasa:
                            res?.data.produk.bahasa === '0'
                                ? 'Indonesia'
                                : res?.data.produk.bahasa === '1'
                                  ? 'Inggris'
                                  : res?.data.produk.bahasa,
                        lokasi: res?.data.produk.lokasi,
                        produkPasal: res?.data.produkPasal,
                    })
                }
            }
        })
    }

    useEffect(() => {
        if (search) {
            detailProdukHukum(search)
        }
    }, [search])

    useEffect(() => {
        getData()
    }, [currentPage])

    return (
        <>
            <div className="flex flex-col gap-4">
                <motion.div
                    transition={{
                        ease: 'linear',
                        duration: 0.2,
                    }}
                >
                    {search !== '' ? (
                        isLoading ? (
                            <div className="flex flex-col px-5 pb-5">
                                <Skeleton
                                    isLoaded={!isLoading}
                                    className="h-6 w-4/6 rounded-lg mb-5"
                                />
                                <Skeleton
                                    isLoaded={!isLoading}
                                    className="h-6 w-5/6 rounded-lg mb-5"
                                />
                                <Skeleton
                                    isLoaded={!isLoading}
                                    className="h-6 w-3/6 rounded-lg"
                                />
                            </div>
                        ) : (
                            <div className="px-5 pb-5">
                                <p className="text-xl text-center mb-10">
                                    {dataDetail.title}
                                </p>
                                {dataDetail.produkPasal && dataDetail.produkPasal.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 mb-10">
                                        <Tabs
                                            items={dataDetail.produkPasal}
                                            disableAnimation
                                            classNames={{
                                                tabList:
                                                    'custom-tab-tablist flex-wrap',
                                                tab: 'custom-tab-button',
                                                panel: 'custom-tab-panel p-4 rounded-medium',
                                            }}
                                        >
                                            {(item) => (
                                                <Tab
                                                    key={item.id}
                                                    title={item.label}
                                                >
                                                    <p className="font-bold mb-2">
                                                        {item.label}
                                                    </p>
                                                    {item.konten && (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.konten.replace(
                                                                    /(<? *script)/gi,
                                                                    'illegalscript',
                                                                ),
                                                            }}
                                                        ></div>
                                                    )}
                                                </Tab>
                                            )}
                                        </Tabs>
                                    </div>
                                )}
                                {dataDetail.content && (
                                    <div className="border-1 rounded-medium mb-10 border-gray-500">
                                        <ScrollShadow className="w-full h-[400px] p-4">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: dataDetail.content.replace(
                                                        /(<? *script)/gi,
                                                        'illegalscript',
                                                    ),
                                                }}
                                            ></div>
                                        </ScrollShadow>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <TableWrapperDefault
                                        columns={[
                                            {
                                                show: true,
                                                id: 'meta',
                                                name: 'Meta',
                                            },
                                            {
                                                show: true,
                                                id: 'keterangan',
                                                name: 'Keterangan',
                                                format: (value: any) => {
                                                    if (value.meta === 'Lampiran') {
                                                        return (
                                                            <button className="font-bold bg-primary text-white p-2 rounded-medium" onClick={()=>setShowMiniModal(true)}>
                                                                Unduh Produk Hukum
                                                            </button>
                                                        )
                                                    } else {
                                                        return value.keterangan
                                                    }
                                                },
                                            },
                                        ]}
                                        rawData={[
                                            {
                                                meta: 'Tipe Dokumen',
                                                keterangan: dataDetail.judulSeragam,
                                            },
                                            {
                                                meta: 'Judul',
                                                keterangan: dataDetail.title,
                                            },
                                            {
                                                meta: 'T.E.U. Badan/Pengarang',
                                                keterangan:
                                                    dataDetail.tajukEntriUtama,
                                            },
                                            {
                                                meta: 'Nomor Peraturan',
                                                keterangan: dataDetail.nomor,
                                            },
                                            {
                                                meta: 'Jenis / Bentuk Peraturan',
                                                keterangan: dataDetail.categoryName,
                                            },
                                            {
                                                meta: 'Singkatan Jenis/Bentuk Peraturan',
                                                keterangan: dataDetail.singkatan,
                                            },
                                            {
                                                meta: 'Tempat Penetapan',
                                                keterangan:
                                                    dataDetail.tempatPenetapan,
                                            },
                                            {
                                                meta: 'Tanggal-Bulan-Tahun Penetapan/Pengundangan',
                                                keterangan:
                                                    dataDetail.tanggalPenetapanPengundangan,
                                            },
                                            {
                                                meta: 'Sumber',
                                                keterangan: dataDetail.sumber,
                                            },
                                            {
                                                meta: 'Subjek',
                                                keterangan: dataDetail.jejakan,
                                            },
                                            {
                                                meta: 'Status Peraturan',
                                                keterangan: dataDetail.status,
                                            },
                                            {
                                                meta: 'Bahasa',
                                                keterangan: dataDetail.bahasa,
                                            },
                                            {
                                                meta: 'Lokasi',
                                                keterangan: dataDetail.lokasi,
                                            },
                                            {
                                                meta: 'Bidang Hukum',
                                                keterangan: dataDetail.bidangHukum,
                                            },
                                            {
                                                meta: 'Lampiran',
                                                keterangan: dataDetail.filePath,
                                            },
                                        ]}
                                    />
                                    <PdfViewer
                                        pdfUrl={
                                            process.env
                                                .NEXT_PUBLIC_ACCOUNT_BASE_URL +
                                            '/webview/produk_hukum/pdf/' +
                                            dataDetail.filePath
                                        }
                                    />
                                </div>
                            </div>
                        )
                    ) : (
                        <>
                            <TableHeaderWrapper
                                initSearch={search}
                                onExtra="/kategori/list"
                                onExtraTitle="Pilih Jenis Peraturan"
                                onExtraTwo={tahunList}
                                onExtraTwoTitle="Semua Tahun"
                                onSearch={(value) => {
                                    setCurrentSearch(value)
                                }}
                                onExtraChange={(value) => {
                                    setCurrentKategori(value)
                                }}
                                onExtraTwoChange={(value) => {
                                    setCurrentTahun(value)
                                }}
                                onSubmit={() => {
                                    setCurrentPage(1)
                                    getData()
                                }}
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
                                    onSelectedRow={(id: number | string) =>
                                        onOpen(id)
                                    }
                                    onPageChanged={(page: number) => {
                                        setCurrentPage(page)
                                    }}
                                    // url=""
                                    columns={[
                                        {
                                            width: 280,
                                            show: true,
                                            id: 'thumbnail',
                                            name: 'IMAGE',
                                            format: (
                                                value: ProdukHukumInterface,
                                            ) => (
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
                                                        src={
                                                            value?.thumbnail ||
                                                            emptyImg.src
                                                        }
                                                        alt="image"
                                                        className="w-full self-center object-cover"
                                                    />
                                                </div>
                                            ),
                                        },
                                        {
                                            show: true,
                                            id: 'productName',
                                            name: 'DESC',
                                            format: (
                                                value: ProdukHukumInterface,
                                            ) => (
                                                <div
                                                    style={{ paddingRight: '10px' }}
                                                >
                                                    {value?.productName && (
                                                        <p
                                                            className="font-bold mb-1 text-primary text-large"
                                                            dangerouslySetInnerHTML={{
                                                                __html: value?.productName,
                                                            }}
                                                        />
                                                    )}
                                                    {value?.descr && (
                                                        <p
                                                            className="font-light mb-1"
                                                            style={{
                                                                color: '#282828',
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: value?.descr,
                                                            }}
                                                        />
                                                    )}
                                                    <p
                                                        className="font-bold text-xs"
                                                        style={{ color: '#827272' }}
                                                    >
                                                        Disanggah pada{' '}
                                                        {value?.uploadDate}
                                                    </p>
                                                </div>
                                            ),
                                        },
                                    ]}
                                    rawData={data}
                                    rawPage={currentPage}
                                    rawTotal={total}
                                    rawLoading={isLoading}
                                />
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </div>
            <Modal 
                size="xl"
                isOpen={showMiniModal} 
                onOpenChange={(open) => setShowMiniModal(open)}
                closeButton={
                    <div>
                        <CloseIcon />
                    </div>
                }
            >
                <ModalContent>
                    {(onClose) => (
                        <ModalBody>
                            <div className="flex flex-col gap-4 items-center py-10">
                                <p className="mb-10 text-2xl font-bold text-center">
                                    SCAN QR Code <br />
                                    Menggunakan Camera Handphone <br />
                                    Untuk Melanjutkan Ke Halaman
                                </p>
                                {
                                    dataDetail.filePath &&
                                    <motion.div
                                        transition={{
                                            ease: "linear",
                                            duration: 0.2,
                                        }}
                                    >
                                        <QRCode
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL + '/webview/produk_hukum/pdf/' + dataDetail.filePath}
                                            viewBox={`0 0 256 256`}
                                        />
                                    </motion.div>
                                }
                                <div
                                    className="flex items-center mt-10"
                                    style={{
                                    border: "1px solid #80ACEF",
                                    borderRadius: "25px",
                                    padding: "4px 14px",
                                    }}
                                >
                                    <Image
                                        alt="cam"
                                        src="assets/icon_camera.png"
                                        radius="none"
                                        removeWrapper
                                    />
                                    <p className="mx-2">Scan QR Code</p>
                                </div>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
