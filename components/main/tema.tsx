"use client"

import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'


interface Props {
    onOpen: () => void;
  }

export default function Infografis({
    onOpen,
  }: MainModalProps) {
  const tableRef = useRef<any>(null);

  return (
    <section className="main-section flex flex-col items-center py-11">
        <Button color="primary">TEMA</Button>
        <div className="font-bold my-6 text-4xl text-title">
            Telusur Tema Peraturan
        </div>
        <div className="grid grid-cols-6 gap-6">
            <Button
                className="flex flex-col tema-card items-center p-6 whitespace-normal"
                onClick={() =>
                    onOpen('tema', 'Telusur Tema', 'Pos')
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
                    onOpen('tema','Telusur Tema', 'Telekomunikasi')
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
                    onOpen('tema', 'Telusur Tema', 'Penyiaran')
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
                    onOpen('tema', 'Telusur Tema', 'Informasi & Transaksi Elektronik')
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
                    onOpen('tema', 'Telusur Tema', 'Frekuensi Radio')
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
                    onOpen('tema', 'Telusur Tema', 'Sertifikasi')
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
  )
}