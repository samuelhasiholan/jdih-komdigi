"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";
import { Image } from "@nextui-org/image";
import {Chip} from "@nextui-org/chip";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { useState } from "react";

export default function Home() {
  const [produk, setProduk] = useState([0,1,2,3]);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Masukan kata pencarian.."
      endContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div>
      <section className="m-header" style={{ background: "url('/main.png'), #CFE0FF", backgroundRepeat: "no-repeat", backgroundPosition: "center bottom", marginTop: "-50px", padding: "35px 50px 288px" }}>
        <div className="flex justify-between">
          <Image alt="JDIH" height={33} radius="none" src="jdih.png" removeWrapper/>
          <Image className="test" alt="komdigi" height={33} radius="none" src="komdigi.png" removeWrapper/>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="inline-block max-w-5xl text-center justify-center text-heading">
            <div className={title()} style={{ marginTop: "150px", lineHeight: "3.2rem"}}> Jaringan Dokumentasi dan Informasi Hukum <br/>Kementerian Komunikasi dan Digital.</div>
            <div className={subtitle()} style={{ marginTop: "50px"}}>
              <span className="text-xl">Pencarian Dokumen dan Informasi Hukum di <br/>Lingkungan Kementerian Komunikasi dan Digital</span>
              <div className="m-auto mt-4" style={{ maxWidth: "441px" }}>
                {searchInput}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-section flex flex-col items-center py-11">
        <Button color="primary">
          TEMA
        </Button>
        <div className="font-bold my-6 text-4xl text-title">
          Telusur Tema Peraturan
        </div>
        <div className="flex justify-between text-center w-full" style={{ gap: "35px" }}>
          <Button className="flex flex-col items-center p-6 whitespace-normal" style={{ backgroundColor: "#E6EEFC", borderRadius: "10px", lineHeight: "14px", width: "140px", height: "unset" }}>
            <Image className="mb-4" height={78} alt="pos" radius="none" src="assets/pos.png" removeWrapper/>
            <span>POS</span>
            <br/>
            <span className="text-description" style={{ letterSpacing: "0.3px" }}>6 peraturan</span>
          </Button>
          <Button className="flex flex-col items-center p-6 whitespace-normal" style={{ backgroundColor: "#E6EEFC", borderRadius: "10px", lineHeight: "14px", width: "140px", height: "unset" }}>
            <Image className="mb-4" height={78} alt="pos" radius="none" src="assets/tele.png" removeWrapper/>
            <span>Telekomunikasi</span>
            <br/>
            <span className="text-description" style={{ letterSpacing: "0.3px" }}>45 peraturan</span>
          </Button>
          <Button className="flex flex-col items-center p-6 whitespace-normal" style={{ backgroundColor: "#E6EEFC", borderRadius: "10px", lineHeight: "14px", width: "140px", height: "unset" }}>
            <Image className="mb-4" height={78} alt="pos" radius="none" src="assets/penyiaran.png" removeWrapper/>
            <span>Penyiaran</span>
            <br/>
            <span className="text-description" style={{ letterSpacing: "0.3px" }}>11 peraturan</span>
          </Button>
          <Button className="flex flex-col items-center p-6 whitespace-normal" style={{ backgroundColor: "#E6EEFC", borderRadius: "10px", lineHeight: "14px", width: "140px", height: "unset" }}>
            <Image className="mb-4" height={78} alt="pos" radius="none" src="assets/informasi.png" removeWrapper/>
            <span>Informasi & Transaksi Elektronik</span>
            <br/>
            <span className="text-description" style={{ letterSpacing: "0.3px" }}>8 peraturan</span>
          </Button>
          <Button className="flex flex-col items-center p-6 whitespace-normal" style={{ backgroundColor: "#E6EEFC", borderRadius: "10px", lineHeight: "14px", width: "140px", height: "unset" }}>
            <Image className="mb-4" height={78} alt="pos" radius="none" src="assets/frekuensi.png" removeWrapper/>
            <span>Frekuensi Radio</span>
            <br/>
            <span className="text-description" style={{ letterSpacing: "0.3px" }}>17 peraturan</span>
          </Button>
          <Button className="flex flex-col items-center p-6 whitespace-normal" style={{ backgroundColor: "#E6EEFC", borderRadius: "10px", lineHeight: "14px", width: "140px", height: "unset" }}>
            <Image className="mb-4" height={78} alt="pos" radius="none" src="assets/sertifikasi.png" removeWrapper/>
            <span>Sertifikasi</span>
            <br/>
            <span className="text-description" style={{ letterSpacing: "0.3px" }}>11 peraturan</span>
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
          {
            produk && produk?.map((value, index) => (
              <Button className="flex flex-col produk-card w-[273px] text-small gap-0" key={index}>
                <div className="produk-card-date">02 Sep 2024</div>
                <Image
                  alt="produk"
                  className="object-cover w-full"
                  src="assets/pdf_thumbnail.png"
                  radius="none"
                  removeWrapper
                />
                <div className="produk-card-body">
                  <p className="font-bold">Surat Edaran Menteri Komunikasi dan Informatika Nomor 6 Tahun 2024</p>
                  <span className="font-light mt-2">Himbauan Mengaktifkan dan Menggunakan Alamat Protokol internet Versi 6 (IPv6) pada Penyelenggara Telekomunikasi</span>
                </div>
              </Button>
            ))
          }
        </div>
      </section>
      <section className="main-section flex flex-col py-11">
        <div>
          <Button color="primary">
            FITUR
          </Button>
        </div>
        <div className="font-bold my-6 text-4xl text-title">
          Jelajahi Fitur JDIH 
        </div>
      </section>
      <section className="main-section flex flex-col py-11">
        <div>
          <Button color="primary">
            TV
          </Button>
        </div>
        <div className="font-bold my-6 text-4xl text-title">
          JDIH Kenkomdigi TV
        </div>
      </section>
      <section className="secondary-section flex flex-col py-11">
        <div>
          <Button color="primary">
            Berita
          </Button>
        </div>
        <div className="font-bold my-6 text-4xl text-title">
          Berita Terkini
        </div>
      </section>
      <section className="main-section flex flex-col py-11">
        <div>
          <Button color="primary">
            Infografis
          </Button>
        </div>
        <div className="font-bold my-6 text-4xl text-title">
          Infografis
        </div>
      </section>
    </div>
  );
}
