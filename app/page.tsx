'use client'
import { Link } from '@nextui-org/link'
import { Snippet } from '@nextui-org/snippet'
import { Code } from '@nextui-org/code'
import { button as buttonStyles } from '@nextui-org/theme'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { siteConfig } from '@/config/site'
import { title, subtitle } from '@/components/primitives'
import { PlayIcon, SearchIcon } from '@/components/icons'
import { Image } from '@nextui-org/image'
import { useEffect, useState } from 'react'
import MainModal from '@/components/modal'
import { useHttp } from './hooks/useHttp'

export default function Home() {
    const [produk, setProduk] = useState([0, 1, 2, 3])
    const [video, setVideo] = useState([0, 1])
    const [berita, setBerita] = useState([0, 1, 2])
    const [infografis, setInfografis] = useState([0, 1, 2])
    const [showMainModal, setShowMainModal] = useState(false)
    const [modalAction, setModalAction] = useState('')
    const [modalContent, setModalContent] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const { get: getTop5Produk, isLoading: isLoadingTop5Produk } = useHttp()

    const onCloseMainModal = () => {
        setModalAction('')
        setModalContent('')
        setModalTitle('')
    }

    const openModal = (action: string, title: string, content: string = '') => {
        setModalAction(action)
        setModalContent(content)
        setModalTitle(title)
        setShowMainModal(true)
    }

    const top5Produk = async () => {
        getTop5Produk('/produk-hukum/top5').then((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        top5Produk()
    }, [])

    const searchInput = (
        <form
            className="flex items-center gap-4 w-full"
            onSubmit={(e) => {
                e.preventDefault()
                openModal('search', 'Pencarian')
            }}
        >
            <Input
                aria-label="Search"
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm',
                }}
                labelPlacement="outside"
                placeholder="Masukan kata pencarian.."
                endContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="search"
            />
        </form>
    )

    return (
        <>
            <div>
                <section
                    className="m-header"
                    style={{
                        background: "url('/main.png'), #CFE0FF",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center bottom',
                        marginTop: '-50px',
                        padding: '35px 50px 288px',
                    }}
                >
                    <div className="flex justify-between">
                        <Image
                            alt="JDIH"
                            height={33}
                            radius="none"
                            src="jdih.png"
                            removeWrapper
                        />
                        <Image
                            className="test"
                            alt="komdigi"
                            height={33}
                            radius="none"
                            src="komdigi.png"
                            removeWrapper
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="inline-block max-w-5xl text-center justify-center text-heading">
                            <div
                                className={title()}
                                style={{
                                    marginTop: '150px',
                                    lineHeight: '3.2rem',
                                }}
                            >
                                {' '}
                                Jaringan Dokumentasi dan Informasi Hukum <br />
                                Kementerian Komunikasi dan Digital.
                            </div>
                            <div
                                className={subtitle()}
                                style={{ marginTop: '50px' }}
                            >
                                <span className="text-xl">
                                    Pencarian Dokumen dan Informasi Hukum di{' '}
                                    <br />
                                    Lingkungan Kementerian Komunikasi dan
                                    Digital
                                </span>
                                <div
                                    className="m-auto mt-4"
                                    style={{ maxWidth: '441px' }}
                                >
                                    {searchInput}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="main-section flex flex-col items-center py-11">
                    <Button color="primary">TEMA</Button>
                    <div className="font-bold my-6 text-4xl text-title">
                        Telusur Tema Peraturan
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                        <Button
                            className="flex flex-col tema-card items-center p-6 whitespace-normal"
                            onClick={() =>
                                openModal('tema', 'Telusur Tema', 'Pos')
                            }
                        >
                            <Image
                                className="mb-4"
                                height={78}
                                alt="pos"
                                radius="none"
                                src="assets/pos.png"
                                removeWrapper
                            />
                            <span>POS</span>
                            <br />
                            <span
                                className="text-description"
                                style={{ letterSpacing: '0.3px' }}
                            >
                                6 peraturan
                            </span>
                        </Button>
                        <Button
                            className="flex flex-col tema-card items-center p-6 whitespace-normal"
                            onClick={() =>
                                openModal(
                                    'tema',
                                    'Telusur Tema',
                                    'Telekomunikasi',
                                )
                            }
                        >
                            <Image
                                className="mb-4"
                                height={78}
                                alt="pos"
                                radius="none"
                                src="assets/tele.png"
                                removeWrapper
                            />
                            <span>Telekomunikasi</span>
                            <br />
                            <span
                                className="text-description"
                                style={{ letterSpacing: '0.3px' }}
                            >
                                45 peraturan
                            </span>
                        </Button>
                        <Button
                            className="flex flex-col tema-card items-center p-6 whitespace-normal"
                            onClick={() =>
                                openModal('tema', 'Telusur Tema', 'Penyiaran')
                            }
                        >
                            <Image
                                className="mb-4"
                                height={78}
                                alt="pos"
                                radius="none"
                                src="assets/penyiaran.png"
                                removeWrapper
                            />
                            <span>Penyiaran</span>
                            <br />
                            <span
                                className="text-description"
                                style={{ letterSpacing: '0.3px' }}
                            >
                                11 peraturan
                            </span>
                        </Button>
                        <Button
                            className="flex flex-col tema-card items-center p-6 whitespace-normal"
                            onClick={() =>
                                openModal(
                                    'tema',
                                    'Telusur Tema',
                                    'Informasi & Transaksi Elektronik',
                                )
                            }
                        >
                            <Image
                                className="mb-4"
                                height={78}
                                alt="pos"
                                radius="none"
                                src="assets/informasi.png"
                                removeWrapper
                            />
                            <span>Informasi & Transaksi Elektronik</span>
                            <br />
                            <span
                                className="text-description"
                                style={{ letterSpacing: '0.3px' }}
                            >
                                8 peraturan
                            </span>
                        </Button>
                        <Button
                            className="flex flex-col tema-card items-center p-6 whitespace-normal"
                            onClick={() =>
                                openModal(
                                    'tema',
                                    'Telusur Tema',
                                    'Frekuensi Radio',
                                )
                            }
                        >
                            <Image
                                className="mb-4"
                                height={78}
                                alt="pos"
                                radius="none"
                                src="assets/frekuensi.png"
                                removeWrapper
                            />
                            <span>Frekuensi Radio</span>
                            <br />
                            <span
                                className="text-description"
                                style={{ letterSpacing: '0.3px' }}
                            >
                                17 peraturan
                            </span>
                        </Button>
                        <Button
                            className="flex flex-col tema-card items-center p-6 whitespace-normal"
                            onClick={() =>
                                openModal('tema', 'Telusur Tema', 'Sertifikasi')
                            }
                        >
                            <Image
                                className="mb-4"
                                height={78}
                                alt="pos"
                                radius="none"
                                src="assets/sertifikasi.png"
                                removeWrapper
                            />
                            <span>Sertifikasi</span>
                            <br />
                            <span
                                className="text-description"
                                style={{ letterSpacing: '0.3px' }}
                            >
                                11 peraturan
                            </span>
                        </Button>
                    </div>
                </section>

                <section className="secondary-section flex flex-col py-11">
                    <div className="font-bold mb-6 text-4xl text-title">
                        Produk Hukum
                    </div>
                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <Button color="primary">Terbaru</Button>
                        <Button color="default">Terpopuler</Button>
                    </div>
                    <div className="flex justify-between text-center w-full gap-3">
                        {produk &&
                            produk?.map((value, index) => (
                                <Button
                                    className="flex flex-col produk-card w-[273px] text-small gap-0"
                                    key={index}
                                >
                                    <div className="produk-card-date">
                                        02 Sep 2024
                                    </div>
                                    <Image
                                        alt="produk"
                                        className="object-cover w-full"
                                        src="assets/pdf_thumbnail.png"
                                        radius="none"
                                        removeWrapper
                                    />
                                    <div className="produk-card-body">
                                        <p className="font-bold">
                                            Surat Edaran Menteri Komunikasi dan
                                            Informatika Nomor 6 Tahun 2024
                                        </p>
                                        <span className="font-light mt-2">
                                            Himbauan Mengaktifkan dan
                                            Menggunakan Alamat Protokol internet
                                            Versi 6 (IPv6) pada Penyelenggara
                                            Telekomunikasi
                                        </span>
                                    </div>
                                </Button>
                            ))}
                    </div>
                </section>

                <section className="main-section flex flex-col py-11">
                    <div>
                        <Button color="primary">FITUR</Button>
                    </div>
                    <div className="font-bold my-6 text-4xl text-title">
                        Jelajahi Fitur JDIH
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Button className="fitur-card text-xl">
                            <Image
                                className="mr-1"
                                height={60}
                                alt="pos"
                                radius="none"
                                src="assets/fitur-1.png"
                                removeWrapper
                            />
                            <span>Monografi Hukum</span>
                        </Button>
                        <Button className="fitur-card text-xl">
                            <Image
                                className="mr-1"
                                height={60}
                                alt="pos"
                                radius="none"
                                src="assets/fitur-2.png"
                                removeWrapper
                            />
                            <span>Perkara Hukum</span>
                        </Button>
                        <Button className="fitur-card text-xl">
                            <Image
                                className="mr-1"
                                height={60}
                                alt="pos"
                                radius="none"
                                src="assets/fitur-3.png"
                                removeWrapper
                            />
                            <span>Grafik Statistik</span>
                        </Button>
                        <Button className="fitur-card text-xl">
                            <Image
                                className="mr-1"
                                height={60}
                                alt="pos"
                                radius="none"
                                src="assets/fitur-4.png"
                                removeWrapper
                            />
                            <span>Artikel Hukum</span>
                        </Button>
                        <Button className="fitur-card text-xl">
                            <Image
                                className="mr-1"
                                height={60}
                                alt="pos"
                                radius="none"
                                src="assets/fitur-5.png"
                                removeWrapper
                            />
                            <span>Konstitusional</span>
                        </Button>
                        <Button className="fitur-card text-xl">
                            <Image
                                className="mr-1"
                                height={60}
                                alt="pos"
                                radius="none"
                                src="assets/fitur-6.png"
                                removeWrapper
                            />
                            <span>Matriks Produk</span>
                        </Button>
                    </div>
                </section>

                <section className="main-section flex flex-col py-11">
                    <div>
                        <Button color="primary">TV</Button>
                    </div>
                    <div className="font-bold my-6 text-4xl text-title">
                        JDIH Kenkomdigi TV
                    </div>
                    <div className="flex mb-6">
                        <span className="flex-auto text-title">
                            Saksikan tayangan seputar JDIH Kemkomdigi yang
                            berisi seputar penjelasan secara interaktif tentang
                            JDIH Kemkominfo.
                        </span>
                        <span
                            className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
                            onClick={() =>
                                openModal('tv', 'JDIH Kenkomdigi TV')
                            }
                        >
                            LIHAT SEMUA
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {video &&
                            video?.map((value, index) => (
                                <Button
                                    className="video-card text-xl"
                                    key={index}
                                >
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
                                            UNDANG-UNDANG PERLINDUNGAN DATA
                                            PRIBADI - #KOMINFOPEDIA
                                        </p>
                                        <p className="whitespace-normal">
                                            27 Okt 2021
                                        </p>
                                    </div>
                                </Button>
                            ))}
                    </div>
                </section>

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
                        <span
                            className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
                            onClick={() => openModal('berita', 'Berita')}
                        >
                            LIHAT SEMUA
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {berita &&
                            berita?.map((value, index) => (
                                <Button
                                    className="flex flex-col berita-card text-small gap-0"
                                    key={index}
                                >
                                    <Image
                                        alt="produk"
                                        className="object-cover w-full"
                                        src="assets/berita_thumbnail.png"
                                        radius="none"
                                        removeWrapper
                                    />
                                    <div className="berita-card-body">
                                        <p style={{ color: '#BBBBBB' }}>
                                            Jumat, 13 September 2024
                                        </p>
                                        <p className="font-bold mt-2">
                                            Benchmarking Pengelola JDIH
                                            Kementerian Komunikasi dan
                                            Informatika dengan Pengelola JDIH
                                            Provinsi Bali
                                        </p>
                                        <span
                                            className="font-light mt-2"
                                            style={{ color: '#827272' }}
                                        >
                                            Denpasar, 12/09/2024 – Pengelola
                                            Jaringan Dokumentasi dan Informasi
                                            Hukum Kementerian Komunikasi dan
                                            Informatika (JDIH Kemkominfo) ...
                                        </span>
                                    </div>
                                </Button>
                            ))}
                    </div>
                </section>

                <section className="main-section flex flex-col py-11">
                    <div>
                        <Button color="primary">INFOGRAFIS</Button>
                    </div>
                    <div className="font-bold my-6 text-4xl text-title">
                        Infografis
                    </div>
                    <div className="flex mb-6">
                        <span className="flex-auto text-title"></span>
                        <span
                            className="cursor-pointer flex-shrink-0 font-bold ml-5 text-primary"
                            onClick={() =>
                                openModal('infografis', 'Infografis')
                            }
                        >
                            LIHAT SEMUA
                        </span>
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

                <section className="footer-section flex flex-col">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="py-6">
                            <Image
                                alt="jdih"
                                src="jdih_kemkomdigi.png"
                                radius="none"
                                removeWrapper
                            />
                            <p className="font-bold mt-4 mb-1">Alamat</p>
                            <p className="text-small font-light">
                                Gedung Utama Lantai 5 Kementerian Komunikasi dan
                                Informatika <br />
                                JIn. Medan Merdeka Barat No. 9, 10110 Jakarta
                                Pusat, Indonesia
                            </p>
                            <p className="font-bold mt-4 mb-1">Kontak</p>
                            <p className="text-small font-light">
                                (+62) 21 3811626
                            </p>
                            <p className="text-small font-light">
                                jdihkemkominfo@mail.kominfo.go.id
                            </p>
                            <p className="font-bold mt-4 mb-1">Media Sosial</p>
                            <div className="flex gap-2">
                                <Image
                                    alt="facebook"
                                    src="assets/icon_fb.png"
                                    radius="none"
                                    removeWrapper
                                />
                                <Image
                                    alt="instagram"
                                    src="assets/icon_ig.png"
                                    radius="none"
                                    removeWrapper
                                />
                                <Image
                                    alt="youtube"
                                    src="assets/icon_yt.png"
                                    radius="none"
                                    removeWrapper
                                />
                                <Image
                                    alt="x"
                                    src="assets/icon_x.png"
                                    radius="none"
                                    removeWrapper
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div
                                className="flex items-end"
                                style={{ marginLeft: '-50px' }}
                            >
                                <Image
                                    alt="phone"
                                    src="assets/phone.png"
                                    radius="none"
                                    removeWrapper
                                />
                            </div>
                            <div className="flex flex-col justify-center ml-5 py-6 font-bold text-3xl">
                                <p>Gunakan Apps JDIH</p>
                                <p>Unduh Sekarang</p>
                                <div className="flex gap-2 mt-4">
                                    <Image
                                        alt="appstore"
                                        src="assets/appstore.png"
                                        radius="none"
                                        removeWrapper
                                    />
                                    <Image
                                        alt="gplay"
                                        src="assets/gplay.png"
                                        radius="none"
                                        removeWrapper
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <MainModal
                action={modalAction}
                content={modalContent}
                title={modalTitle}
                isOpen={showMainModal}
                onOpenChange={(open) => setShowMainModal(open)}
                onClose={() => onCloseMainModal()}
            />
        </>
    )
}
