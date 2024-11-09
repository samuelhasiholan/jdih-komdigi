import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { ProdukHukum } from '@/app/types/entities'
import { Image } from '@nextui-org/image'
import { useHttp } from '@/app/hooks/useHttp'

const SectionProdukHukum: React.FC = () => {
    const { get, isLoading } = useHttp()
    const [dataTop5Produk, setDataTop5Produk] = useState<ProdukHukum[]>([])

    const top5Produk = async () => {
        get('/produk-hukum/top5').then((res: any) => {
            const data: ProdukHukum[] = []

            if (res.data && res.data.length > 0) {
                res.data.map((item: any) => {
                    data.push({
                        id: item.id,
                        productName: item.product_name,
                        descr: item.descr,
                        filePath: item.file_path,
                        bidangHukum: item.bidang_hukum,
                        thumbnail: item.thumbnail,
                    })
                })
            }

            setDataTop5Produk(data)
        })
    }

    useEffect(() => {
        top5Produk()
    }, [])

    return (
        <section className="secondary-section flex flex-col py-11">
            <div className="font-bold mb-6 text-4xl text-title">
                Produk Hukum
            </div>
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <Button color="primary">Terbaru</Button>
                <Button color="default">Terpopuler</Button>
            </div>
            <div className="flex justify-between text-center w-full gap-3">
                {dataTop5Produk &&
                    dataTop5Produk?.map((value, index) => (
                        <Button
                            className="flex flex-col produk-card w-[180px] text-small gap-0"
                            key={index}
                        >
                            <div className="produk-card-date">02 Sep 2024</div>
                            <Image
                                alt="produk"
                                className="object-cover w-full produk-card-image"
                                src={
                                    process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL +
                                    '/' +
                                    value.thumbnail
                                }
                                radius="none"
                                removeWrapper
                            />
                            <div className="produk-card-body">
                                <p className="font-bold produk-card-title">
                                    {value.productName}
                                </p>
                                <span className="font-light mt-2 produk-card-descr">
                                    {value.descr}
                                </span>
                            </div>
                        </Button>
                    ))}
            </div>
        </section>
    )
}

export default SectionProdukHukum
