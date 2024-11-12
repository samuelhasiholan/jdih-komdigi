"use client";
import { useState } from "react";
import MainModal from "@/components/modal";
import Review from "@/components/review";
import SectionProdukHukum from "@/components/main/section-produk-hukum";
import SectionTemaPeraturan from "@/components/main/section-tema-peraturan";
import SectionFitur from "@/components/main/section-fitur";
import SectionTv from "@/components/main/section-tv";
import SectionBerita from "@/components/main/section-berita";
import SectionInfografis from "@/components/main/section-infografis";
import SectionFooter from "@/components/main/section-footer";
import SectionHeader from "@/components/main/section-header";
import { Image } from "@nextui-org/image";
import { VideoInterface } from "./types/entities";
import { CloseIcon2 } from "@/components/icons";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [showMainModal, setShowMainModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewWindow, setShowReviewWindow] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalSearch, setModalSearch] = useState<string | number>("");
  const [modalKeyword, setModalKeyword] = useState<string | number>("");
  const [modalTitle, setModalTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [modalVideo, setModalVideo] = useState<VideoInterface | null>(null);
  let timeout: NodeJS.Timeout;

  const onCloseModal = () => {
    setModalAction("");
    setLinkUrl("");
    setModalSearch("");
    setModalKeyword("");
    setModalTitle("");
    setModalVideo(null);
    setShowReviewWindow(false);
    clearTimeout(timeout);
  };

  const openModal = (
    action: string,
    title: string,
    search: string | number = ""
  ) => {
    setModalAction(action);
    setLinkUrl("");
    setModalSearch(search);
    setModalTitle(title);
    setShowMainModal(true);
    setModalVideo(null);
    autoCloseModal();
  };

  const openModalSearch = (
    action: string,
    title: string,
    search: string = "",
    keyword: string = ""
  ) => {
    setModalAction(action);
    setLinkUrl("");
    setModalSearch(search);
    setModalKeyword(keyword);
    setModalTitle(title);
    setShowMainModal(true);
    setModalVideo(null);
    autoCloseModal();
  };

  const openModalVideoPlayer = (
    title: string,
    video: VideoInterface | null = null
  ) => {
    setModalAction("video");
    setLinkUrl("");
    setModalSearch("");
    setModalTitle(title);
    setShowMainModal(true);
    setModalVideo(video);
    autoCloseModal();
  };

  const openModalIframe = (title: string, linkUrl: string) => {
    setModalAction("iframe");
    setModalSearch("");
    setLinkUrl(linkUrl);
    setModalTitle(title);
    setShowMainModal(true);
    setModalVideo(null);
    autoCloseModal();
  };

  // auto close modal when idle
  const autoCloseModal = () => {
    clearTimeout(timeout);
    timeout = setTimeout(
      () => {
        setShowMainModal(false);
        // animate scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      1000 * 60 * 15
    );
  };

  // detect if no activity
  // window.addEventListener('mousemove', () => {
  //     autoCloseModal()
  // })
  // window.addEventListener('keydown', () => {
  //     autoCloseModal()
  // })
  // window.addEventListener('touchstart', () => {
  //     autoCloseModal()
  // })

  return (
    <>
      <div>
        <SectionHeader openModal={openModalSearch} />
        <SectionTemaPeraturan openModal={openModalSearch} />
        <SectionProdukHukum openModal={openModal} />
        <SectionFitur openModal={openModalIframe} />
        <SectionTv
          openModalVideoPlayer={openModalVideoPlayer}
          openModal={openModal}
        />
        <SectionBerita openModal={openModal} />
        <SectionInfografis openModal={openModal} />
        <SectionFooter openModal={openModal} />
      </div>
      <div
        className={`${showReviewWindow ? "review-shown" : "review-hidden"} review-container select-none`}
      >
        <div className="review-card">
          <div className="review-card-text text-lg font-bold">
            Hello Sobat JDIH, bagaimana pengalaman
            <br />
            Anda menggunakan layanan kami?
          </div>
          <button
            className="review-card-action text-xl font-bold align-center"
            onClick={() => setShowReviewModal(true)}
          >
            Rating Sekarang
          </button>
        </div>
        <button
          className="review-card-close"
          onClick={() => setShowReviewWindow(false)}
        >
          <CloseIcon2 />
        </button>
      </div>
      <Image
        removeWrapper
        alt="review"
        className={`${showReviewWindow ? "animate-scaleInOut" : ""} review-button `}
        src="/assets/review_button.png"
        onClick={() => setShowReviewWindow(true)}
      />
      <MainModal
        action={modalAction}
        search={modalSearch}
        keyword={modalKeyword}
        linkUrl={linkUrl}
        title={modalTitle}
        video={modalVideo}
        isOpen={showMainModal}
        onOpenChange={(open) => setShowMainModal(open)}
        onClose={() => onCloseModal()}
      />
      <Review
        isOpen={showReviewModal}
        onOpenChange={(open) => setShowReviewModal(open)}
        onClose={() => onCloseModal()}
      />
    </>
  );
}
