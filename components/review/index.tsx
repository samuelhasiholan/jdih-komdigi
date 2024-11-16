"use client";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useAppSelector } from "@/store";
import { DashboardState } from "@/store/slice/dashboard";
import { useEffect, useRef, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { CloseIcon } from "@/components/icons";
import { useHttp } from "@/app/hooks/useHttp";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
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
  const [layoutName, setLayoutName] = useState<string>("default");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selection, setSelection] = useState<number | null>();
  const namaRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const saranRef = useRef<HTMLTextAreaElement>(null);
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);

  const [inputs, setInputs] = useState<any>({
    nama: "",
    email: "",
    saran: "",
    rating: 0,
  });
  const [inputName, setInputName] = useState<any>();
  const [err, setErr] = useState<any>({
    nama: "",
    email: "",
    saran: "",
    rating: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onKeyPress = (button: any) => {
    if (button === "{shift}") {
      setLayoutName(layoutName === "shift" ? "default" : "shift");
    } else if (button === "{lock}") {
      setLayoutName(layoutName === "caps" ? "default" : "caps");
    }
  };

  const onChangeAll = (value: any) => {
    setInputs({ ...inputs, ...value });
    setErr({ ...err, [inputName]: "" });
    setSelection(keyboardRef.current?.getCaretPosition());
  };

  const onChangeInput = (event: any) => {
    const input = event.target.value;
    setInputs({
      ...inputs,
      [inputName]: input,
    });
    setErr({ ...err, [inputName]: "" });
    keyboardRef.current?.setInput(input);
  };

  const getInputValue = (inputName: string) => {
    return inputs[inputName] || "";
  };

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
    setInputs({ nama: "", email: "", saran: "", rating: 0 });
    setErr({ nama: "", email: "", saran: "", rating: "" });
    setIsSuccess(false);
  };

  const handleSubmit = async () => {
    if (inputs["nama"] === "") {
      return setErr({ ...err, nama: "Nama tidak boleh kosong" });
    }
    if (inputs["email"] === "") {
      return setErr({ ...err, email: "Email tidak boleh kosong" });
    }
    if (!validateEmail(inputs["email"])) {
      return setErr({ ...err, email: "Email tidak valid" });
    }
    if (inputs["saran"] === "") {
      return setErr({ ...err, saran: "Saran tidak boleh kosong" });
    }
    if (inputs["rating"] === 0) {
      return setErr({ ...err, rating: "Silahkan isi rating terlebih dahulu" });
    }

    try {
      const response: any = await post("/site/save-ikm", {
        nama: inputs["nama"],
        email: inputs["email"],
        saran: inputs["saran"],
        rating: inputs["rating"],
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

  useEffect(() => {
    if (!selection) return;
    if (inputName === "nama") {
      namaRef.current?.focus();
      namaRef.current?.setSelectionRange(selection, selection);
    } else if (inputName === "email") {
      emailRef.current?.focus();
      emailRef.current?.setSelectionRange(selection, selection);
    } else if (inputName === "saran") {
      saranRef.current?.focus();
      saranRef.current?.setSelectionRange(selection, selection);
    }
  }, [selection]);

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
        <ModalBody className="p-0 relative">
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
                    ref={namaRef}
                    placeholder=" "
                    size="lg"
                    variant="bordered"
                    value={getInputValue("nama")}
                    onFocus={() => {
                      setInputName("nama");
                      setShowKeyboard(true);
                    }}
                    onBlur={() => setShowKeyboard(false)}
                    onChange={onChangeInput}
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
                    ref={emailRef}
                    placeholder=" "
                    size="lg"
                    variant="bordered"
                    value={getInputValue("email")}
                    onFocus={() => {
                      setInputName("email");
                      setShowKeyboard(true);
                    }}
                    onBlur={() => setShowKeyboard(false)}
                    onChange={onChangeInput}
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
                    ref={saranRef}
                    placeholder=" "
                    size="lg"
                    variant="bordered"
                    value={getInputValue("saran")}
                    onFocus={() => {
                      setInputName("saran");
                      setShowKeyboard(true);
                    }}
                    onBlur={() => setShowKeyboard(false)}
                    onChange={onChangeInput}
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
                      if (index + 1 <= inputs["rating"]) {
                        return (
                          <BsStarFill
                            key={index}
                            color="#006DEF"
                            size={34}
                            onClick={() => {
                              setInputs({ ...inputs, rating: index + 1 });
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
                              setInputs({ ...inputs, rating: index + 1 });
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
          <div
            className={`${showKeyboard ? "" : "hidden"} w-full absolute z-10`}
            style={{ bottom: "0" }}
          >
            <Keyboard
              keyboardRef={(r) => (keyboardRef.current = r)}
              inputName={inputName}
              layoutName={layoutName}
              layout={{
                default: [
                  "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                  "{tab} q w e r t y u i o p [ ] \\",
                  "{lock} a s d f g h j k l ; ' {enter}",
                  "{shift} z x c v b n m , . / {shift}",
                  "{space}",
                ],
                shift: [
                  "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                  "{tab} Q W E R T Y U I O P { } |",
                  '{lock} A S D F G H J K L : " {enter}',
                  "{shift} Z X C V B N M < > ? {shift}",
                  "{space}",
                ],
                caps: [
                  "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                  "{tab} Q W E R T Y U I O P [ ] \\",
                  "{lock} A S D F G H J K L ; ' {enter}",
                  "{shift} Z X C V B N M , . / {shift}",
                  "{space}",
                ],
              }}
              display={{
                "{tab}": "tab ⇥",
                "{bksp}": "backspace ⌫",
                "{enter}": "enter ↵",
                "{lock}": "caps ⇪",
                "{shift}": "shift ⇧",
                "{space}": " ",
              }}
              onChangeAll={onChangeAll}
              onKeyPress={onKeyPress}
              preventMouseDownDefault={true}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
