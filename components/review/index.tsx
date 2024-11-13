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
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useAppDispatch, useAppSelector } from "@/store";
import { DashboardState } from "@/store/slice/dashboard";
import { useEffect, useRef, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { CloseIcon } from "@/components/icons";
import { useHttp } from "@/app/hooks/useHttp";
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
  const { loading, error }: DashboardState = useAppSelector(
    (state) => state.dashboard
  );
  const { post, isLoading } = useHttp();

  const [rating, setRating] = useState<number>(0);
  const [nama, setNama] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [saran, setSaran] = useState<string>("");
  const [err, setErr] = useState<any>({
    nama: "",
    email: "",
    saran: "",
    rating: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
    clear();
  }, [error]);

  const clear = () => {
    setRating(0);
    setNama("");
    setEmail("");
    setSaran("");
    setErr({ nama: "", email: "", saran: "", rating: "" });
    setIsSuccess(false);
  };

  const handleSubmit = async () => {
    if (nama === "") {
      return setErr({ ...err, nama: "Nama tidak boleh kosong" });
    }
    if (email === "") {
      return setErr({ ...err, email: "Email tidak boleh kosong" });
    }
    if (!validateEmail(email)) {
      return setErr({ ...err, email: "Email tidak valid" });
    }
    if (saran === "") {
      return setErr({ ...err, saran: "Saran tidak boleh kosong" });
    }
    if (rating === 0) {
      return setErr({ ...err, rating: "Silahkan isi rating terlebih dahulu" });
    }

    try {
      const response: any = await post("/site/save-ikm", {
        rating,
        nama,
        email,
        saran,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        return;
      }

      clear();
      onClose && onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      onClose={() => {
        clear();
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
        <ModalHeader
          className="flex flex-col items-center pt-6 pb-0"
          style={{
            backgroundColor: "#006defcc",
            borderRadius: "14px 14px 0 0",
          }}
        >
          <span className="text-3xl font-bold mb-6" style={{ color: "#fff" }}>
            Berikan Kami Ulasan
          </span>
          <Image
            src="/assets/review_avatar.png"
            alt="image"
            className=""
            removeWrapper
          />
        </ModalHeader>
        <ModalBody className="p-0">
          <ScrollShadow
            className="flex flex-col w-full px-16 py-10"
            hideScrollBar
          >
            {isSuccess && (
              <p className="font-bold text-2xl text-center text-primary">
                Terima Kasih Atas Ulasan Anda
              </p>
            )}
            {!isSuccess && (
              <>
                <div>
                  <p className="mb-2 review-form-label text-lg">
                    Masukan Nama Anda
                  </p>
                  <Input
                    autoFocus
                    placeholder=" "
                    size="lg"
                    variant="bordered"
                    value={nama}
                    onChange={(e) => {
                      setNama(e.target.value);
                      setErr({ ...err, nama: "" });
                    }}
                    isInvalid={err.nama !== ""}
                  />
                  <p className="min-h-6 p-1 text-danger text-tiny">
                    {err.nama}
                  </p>
                </div>
                <div>
                  <p className="mb-2 review-form-label text-lg">
                    Masukan Email Anda
                  </p>
                  <Input
                    placeholder=" "
                    size="lg"
                    type="email"
                    variant="bordered"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErr({ ...err, email: "" });
                    }}
                    isInvalid={err.email !== ""}
                  />
                  <p className="min-h-6 p-1 text-danger text-tiny">
                    {err.email}
                  </p>
                </div>
                <div>
                  <p className="mb-2 review-form-label text-lg">
                    Masukan Saran Anda
                  </p>
                  <Textarea
                    placeholder=" "
                    size="lg"
                    variant="bordered"
                    value={saran}
                    onChange={(e) => {
                      setSaran(e.target.value);
                      setErr({ ...err, saran: "" });
                    }}
                    isInvalid={err.saran !== ""}
                  />
                  <p className="min-h-6 p-1 text-danger text-tiny">
                    {err.saran}
                  </p>
                </div>
                <div>
                  <p className="mb-2 review-form-label text-lg">
                    Berikan Rating Anda
                  </p>
                  <div className="flex justify-center gap-6">
                    {Array.from({ length: 5 }, (_, index) => {
                      if (index + 1 <= rating) {
                        return (
                          <BsStarFill
                            key={index}
                            color="#006DEF"
                            size={34}
                            onClick={() => {
                              setRating(index + 1);
                              setErr({ ...err, rating: "" });
                            }}
                          />
                        );
                      } else {
                        return (
                          <BsStarFill
                            key={index}
                            color="#8FA0B4"
                            size={34}
                            onClick={() => {
                              setRating(index + 1);
                              setErr({ ...err, rating: "" });
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <p className="min-h-6 p-1 text-danger text-tiny">
                    {err.rating}
                  </p>
                </div>
                <div>
                  <Button
                    className="w-full cursor-pointer flex-shrink-0 font-bold bg-primary text-primary-foreground mt-3"
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                  >
                    {isLoading ? "" : "Kirim"}
                  </Button>
                </div>
              </>
            )}
          </ScrollShadow>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
