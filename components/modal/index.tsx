"use client"
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { BackIcon, CloseIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { DashboardState } from "@/store/slice/dashboard";
import { useEffect, useRef, useState } from "react";
import Berita from "@/components/berita";
import Infografis from "@/components/infografis";
import Search from "@/components/search";
import Tema from "@/components/tema";
import TV from "@/components/tv";
import QR from "@/components/qr";
import toast from "react-hot-toast";

interface MainModalProps {
  action: string;
  search?: string;
  title: string;
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export default function MainModal({
  action,
  search,
  title,
  isOpen = false,
  onOpenChange,
  onClose,
}: MainModalProps) {
  const { isLoading, error }: DashboardState = useAppSelector(
    (state) => state.dashboard
  );

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
      onClose={onClose}
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
        {
          action !== "qr" &&
          <ModalHeader className="flex flex-col gap-1">
            <div className="modal-head text-3xl font-bold">
              {title}
            </div>
            <div className="long-bar"></div>
          </ModalHeader>
        }
        <ModalBody>
          {
            action === "berita" &&
            <Berita search={search} />
          }
          {
            action === "infografis" &&
            <Infografis />
          }
          {
            action === "search" &&
            <Search search={search} />
          }
          {
            action === "tema" &&
            <Tema search={search} />
          }
          {
            action === "tv" &&
            <TV />
          }
          {
            action === "qr" &&
            <QR />
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
