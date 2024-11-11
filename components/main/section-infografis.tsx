import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Infografis } from '@/app/types/entities';
import { Image } from '@nextui-org/image';
import { useHttp } from '@/app/hooks/useHttp';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from 'moment';

export interface SectionInfografisProps {
    openModal: (type: string, title: string) => void
}

const SectionInfografis: React.FC<SectionInfografisProps> = (props) => {
    const { get, isLoading } = useHttp();
    const [dataTop5, setDataTop5] = useState<Infografis[]>([]);
    const responsive = {
      any: {
        breakpoint: { max: 4000, min: 0 },
        items: 3,
      }
    };

    const top5 = async () => {
        get('/infografis/top5').then((res: any) => {
            const data: Infografis[] = []

            if (res?.data && res?.data.length > 0) {
                res?.data.map((item: any) => {
                    data.push({
                        id: item.id,
                        judul: item.judul,
                        konten: item.konten,
                        thumbnail: item.file_path,
                        dateCreated: item.created_at,
                    })
                })
            }

            setDataTop5(data)
        })
    };

    useEffect(() => {
        top5()
    }, []);

    return (
        <section className="main-section flex flex-col py-11">
            <div>
                <Button color="primary" disableRipple disableAnimation>INFOGRAFIS</Button>
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
            {
                dataTop5 &&
                <Carousel 
                    responsive={responsive}
                    arrows={false}
                    infinite autoPlay autoPlaySpeed={8000}
                    itemClass="px-2 pb-3"
                >
                    {dataTop5?.map((value, index) => (
                        <Button
                            className="flex flex-col infografis-card text-small gap-0"
                            key={index}
                        >
                            <Image
                                alt="infografis"
                                className="object-cover w-full"
                                src={
                                    process.env.NEXT_PUBLIC_INFOGRAFIS_URL +
                                    '/' +
                                    value.thumbnail
                                }
                                radius="none"
                                removeWrapper
                            />
                            <div className="infografis-card-body">
                                <p className="font-bold">
                                    {value.judul}
                                </p>
                            </div>
                        </Button>
                    ))}
                </Carousel>
            }
        </section>
    )
}

export default SectionInfografis
