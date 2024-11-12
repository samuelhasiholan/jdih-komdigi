"use client";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { BackIcon, CloseIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { DashboardState } from "@/store/slice/dashboard";
import { useEffect, useRef, useState } from "react";
import Berita from "@/components/berita";
import Infografis from "@/components/infografis";
import ProdukHukum from "@/components/produk-hukum";
import Search from "@/components/search";
import Tema from "@/components/tema";
import TV from "@/components/tv";
import QR from "@/components/qr";
import toast from "react-hot-toast";
import VideoPlayer from "../video-player";
import { VideoInterface } from "@/app/types/entities";
import Webview from "../webview";

interface MainModalProps {
  action: string;
  search?: string | number;
  keyword?: string | number;
  title: string;
  isOpen: boolean;
  video?: VideoInterface | null;
  linkUrl?: string;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export default function MainModal({
  action,
  search,
  keyword,
  title,
  isOpen = false,
  video = null,
  linkUrl = "",
  onOpenChange,
  onClose,
}: MainModalProps) {
  const { loading, error }: DashboardState = useAppSelector(
    (state) => state.dashboard
  );

  const [detail, setDetail] = useState<string | number>(search || "");

  useEffect(() => {
    if (search) {
      setDetail(search);
    }
  }, [search]);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <Modal
      size="4xl"
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      onClose={() => {
        setDetail("");
        onClose && onClose();
      }}
      placement="center"
      scrollBehavior="inside"
      classNames={{
        closeButton: "absolute top-3 right-3",
        backdrop: "bg-black bg-opacity-50",
      }}
      closeButton={
        <div>
          <CloseIcon />
        </div>
      }
    >
      <ModalContent>
        {action !== "qr" && (
          <ModalHeader className="flex flex-col gap-1">
            <div className="modal-head flex">
              {detail && (
                <div className="mr-3" onClick={() => setDetail("")}>
                  <BackIcon />
                </div>
              )}
              <span className="text-3xl font-bold">{title}</span>
            </div>
            <div className="long-bar"></div>
          </ModalHeader>
        )}
        <ModalBody>
          {action === "berita" && (
            <Berita
              search={detail}
              onOpen={(value: string | number) => setDetail(value)}
            />
          )}
          {action === "produk" && (
            <ProdukHukum
              search={detail}
              onOpen={(value: string | number) => setDetail(value)}
            />
          )}
          {action === "tv" && (
            <TV
              search={detail}
              onOpen={(value: string | number) => setDetail(value)}
            />
          )}
          {action === "infografis" && (
            <Infografis
              search={detail}
              onOpen={(value: string | number) => setDetail(value)}
            />
          )}
          {action === "search" && (
            <Search
              search={detail}
              keyword={keyword}
              onOpen={(value: string | number) => setDetail(value)}
            />
          )}
          {action === "tema" && (
            <Tema
              search={detail}
              keyword={keyword}
              onOpen={(value: string | number) => setDetail(value)}
            />
          )}
          {action === "qr" && <QR search={search} />}
          {action === "video" && <VideoPlayer linkUrl={video?.linkUrl} />}
          {action === "iframe" && <Webview linkUrl={linkUrl} title={title} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
