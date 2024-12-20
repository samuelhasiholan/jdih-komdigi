import { Image } from "@nextui-org/image";

export interface SectionFooterProps {
  openModal: (type: string, title: string, search?: string) => void;
}

const SectionFooter: React.FC<SectionFooterProps> = (props) => {
  return (
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
            Gedung Utama Lantai 5 Kementerian Komunikasi dan Informatika
            <br />
            JIn. Medan Merdeka Barat No. 9, 10110 Jakarta Pusat, Indonesia
          </p>
          <p className="font-bold mt-4 mb-1">Kontak</p>
          <p className="text-small font-light">(+62) 21 3811626</p>
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
              onClick={() =>
                props.openModal(
                  "qr",
                  "QR",
                  "https://www.facebook.com/profile.php?id=100083145504178"
                )
              }
            />
            <Image
              alt="instagram"
              src="assets/icon_ig.png"
              radius="none"
              removeWrapper
              onClick={() =>
                props.openModal(
                  "qr",
                  "QR",
                  "https://www.instagram.com/jdihkemkomdigi"
                )
              }
            />
            <Image
              alt="youtube"
              src="assets/icon_yt.png"
              radius="none"
              removeWrapper
              onClick={() =>
                props.openModal(
                  "qr",
                  "QR",
                  "https://www.youtube.com/@jdihkemenkominfo3044"
                )
              }
            />
            <Image
              alt="x"
              src="assets/icon_x.png"
              radius="none"
              removeWrapper
              onClick={() =>
                props.openModal("qr", "QR", "https://x.com/jdihkemkominfo")
              }
            />
            <Image
              alt="tiktok"
              src="assets/icon_tiktok.png"
              radius="none"
              removeWrapper
              onClick={() =>
                props.openModal(
                  "qr",
                  "QR",
                  "https://www.tiktok.com/@jdihkemkominfo"
                )
              }
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-end" style={{ marginLeft: "-50px" }}>
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
                onClick={() =>
                  props.openModal(
                    "qr",
                    "QR",
                    "https://apps.apple.com/id/app/jdih-kemkominfo/id6447154641"
                  )
                }
              />
              <Image
                alt="gplay"
                src="assets/gplay.png"
                radius="none"
                removeWrapper
                onClick={() =>
                  props.openModal(
                    "qr",
                    "QR",
                    "https://play.google.com/store/apps/details?id=com.kominfo.jdih_mobile&hl=id"
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFooter;
