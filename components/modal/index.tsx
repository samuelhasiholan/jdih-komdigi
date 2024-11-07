"use client"
import TableWrapper from "@/components/table/table";
import TableHeaderWrapper from "@/components/table/table-header";
import { AnimatePresence, motion } from "framer-motion";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { BackIcon, CloseIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { DashboardState } from "@/store/slice/dashboard";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import emptyImg from "@/public/empty-image.png";

interface MainModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function MainModal({
  isOpen = false,
  onOpenChange,
}: MainModalProps) {
  const dispatch = useAppDispatch();
  const { isLoading, error }: DashboardState = useAppSelector(
    (state) => state.dashboard
  );
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef<any>(null);
  const tableRef = useRef<any>(null);

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: any) => {
    if (isLoading) return;
    if (formData.email === "") {
      toast.dismiss();
      toast.error("Please fill all the fields");
      return;
    }
    const recaptcha = await executeRecaptcha("activationOpenData");
    dispatch(activation(formData, recaptcha, handleFinish));
  };

  const handleFinish = (res: any) => {
    setSubmitSuccess(true);
    setSuccessMessage(res.message);
  }

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
      placement="center"
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
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="modal-head text-3xl font-bold">
                Pencarian
              </div>
              <div className="long-bar"></div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <TableHeaderWrapper
                  title=""
                  onSearch={(value) => tableRef.current?.search(value)}
                  onExtra={null}
                />

                <motion.div
                  transition={{
                    ease: "linear",
                    duration: 0.2,
                  }}
                >
                  <TableWrapper
                    ref={tableRef}
                    title="Tes Title"
                    // url=""
                    columns={[
                      {
                        width: 280,
                        show: true,
                        id: "img",
                        name: "IMAGE",
                        format: (value: any) => (
                          <div style={{ width: "100px", height: "100px", position: "relative", borderRadius: "15px", overflow: "hidden", marginLeft: "10px" }}>
                            <Image
                              src={value?.img || emptyImg.src}
                              alt="image"
                              // width={100}
                              // height={100}
                              layout="fill"
                              className="w-full self-center object-cover"
                              onError={(event) => {
                                // @ts-ignore
                                event.target.src = emptyImg.src;
                                // @ts-ignore
                                event.target.srcset = emptyImg.src;
                              }}
                            />
                          </div>
                        ),
                      },
                      {
                        show: true,
                        id: "desc",
                        name: "DESC",
                        format: (value: any) => (
                          <div style={{ paddingRight: "10px" }}>
                            <p className="font-bold mb-1 text-primary text-large">{value?.title}</p>
                            <p className="font-light mb-1" style={{ color: "#282828" }}>{value?.body}</p>
                            <p className="font-bold text-xs" style={{ color: "#827272" }}>Disanggah  pada {value?.date}</p>
                          </div>
                        ),
                      },
                    ]}
                    rawData={[
                      {
                        img: "https://disperkim.madiunkota.go.id/wp-content/uploads/2021/03/gg.png",
                        title: "Peraturan Menteri Komunikasi dan informatika Nomor 11 Tahun 2021",
                        body: "PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 11 TAHUN 2021 TENTANG PERUBAHAN ATAS PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 6 TAHUN 2021 TENTANG ..",
                        date: "Senin 27 Oct 2021",
                      },
                      {
                        img: "https://disperkim.madiunkota.go.id/wp-content/uploads/2021/03/gg.png",
                        title: "Peraturan Menteri Komunikasi dan informatika Nomor 12 Tahun 2022",
                        body: "PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 11 TAHUN 2022 TENTANG PERUBAHAN ATAS PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 6 TAHUN 2022 TENTANG ..",
                        date: "Senin 27 Oct 2022",
                      },
                      {
                        img: "https://disperkim.madiunkota.go.id/wp-content/uploads/2021/03/gg.png",
                        title: "Peraturan Menteri Komunikasi dan informatika Nomor 12 Tahun 2022",
                        body: "PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 11 TAHUN 2022 TENTANG PERUBAHAN ATAS PERATURAN MENTERI KOMUNIKASI DAN INFORMATIKA NOMOR 6 TAHUN 2022 TENTANG ..",
                        date: "Senin 27 Oct 2022",
                      },
                    ]}
                  />
                </motion.div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
