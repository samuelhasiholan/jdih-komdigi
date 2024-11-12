"use client";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/image";

interface QrProps {
  search?: string | number;
}

export default function QR({ search }: QrProps) {
  return (
    <div className="flex flex-col gap-4 items-center py-10">
      <p className="mb-10 text-2xl font-bold text-center">
        SCAN QR Code <br />
        Menggunakan Camera Handphone <br />
        Untuk Melanjutkan Ke Halaman
      </p>
      <motion.div
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
      >
        <Image
          alt="QR"
          width={450}
          src={`assets/${search}.png`}
          radius="none"
          removeWrapper
        />
      </motion.div>
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
  );
}
