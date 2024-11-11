"use client";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { CloseIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { DashboardState } from "@/store/slice/dashboard";
import { useEffect, useRef, useState } from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import toast from "react-hot-toast";

interface ReviewProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export default function Review({
  isOpen = false,
  onOpenChange,
  onClose,
}: ReviewProps) {
  const { isLoading, error }: DashboardState = useAppSelector(
    (state) => state.dashboard,
  );

  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      onClose={() => {
        setRating(0);
        onClose();
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
        <ModalHeader
          className="flex flex-col items-center"
          style={{
            backgroundColor: "#006defcc",
            borderRadius: "14px 14px 0 0",
            paddingBottom: 0,
          }}
        >
          <span className="text-3xl font-bold" style={{ color: "#fff" }}>
            Berikan Kami Ulasan
          </span>
          <Image
            src="/assets/review_avatar.png"
            alt="image"
            className=""
            removeWrapper
          />
        </ModalHeader>
        <ModalBody style={{ padding: "56px 88px" }}>
          <div className="mb-3">
            <p className="mb-2 text-lg" style={{ color: "#949494" }}>
              Masukan Nama Anda
            </p>
            <Input autoFocus placeholder=" " size="lg" variant="bordered" />
          </div>
          <div className="mb-3">
            <p className="mb-2 text-lg" style={{ color: "#949494" }}>
              Masukan Email Anda
            </p>
            <Input placeholder=" " size="lg" type="email" variant="bordered" />
          </div>
          <div className="mb-3">
            <p className="mb-2 text-lg" style={{ color: "#949494" }}>
              Masukan Saran Anda
            </p>
            <Textarea placeholder=" " size="lg" variant="bordered" />
          </div>
          <div className="mb-3">
            <p className="mb-2 text-lg" style={{ color: "#949494" }}>
              Berikan Rating Anda
            </p>
            <div className="flex justify-center gap-6">
              {Array.from({ length: 5 }, (_, index) => {
                if (index + 1 <= rating) {
                  return (
                    <BsStarFill
                      size={34}
                      onClick={() => setRating(index + 1)}
                      key={index}
                    />
                  );
                } else {
                  return (
                    <BsStar
                      size={34}
                      onClick={() => setRating(index + 1)}
                      key={index}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div>
            <Button
              className="w-full cursor-pointer flex-shrink-0 font-bold bg-primary text-primary-foreground"
              size="lg"
              type="submit"
            >
              Kirim
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
