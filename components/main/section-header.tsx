import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { SearchIcon } from "../icons";
import { Input } from "@nextui-org/input";
import { useEffect, useRef, useState } from "react";
import Keyboard, { KeyboardReactInterface } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export interface SectionHeaderProps {
  openModal: (
    action: string,
    title: string,
    search?: string,
    keyword?: string
  ) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  const [search, setSearch] = useState<string>("");
  const [layoutName, setLayoutName] = useState<string>("default");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selection, setSelection] = useState<number | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);

  const onKeyPress = (button: any) => {
    if (button === "{shift}") {
      setLayoutName(layoutName === "shift" ? "default" : "shift");
    } else if (button === "{lock}") {
      setLayoutName(layoutName === "caps" ? "default" : "caps");
    }
  };

  const onClear = () => {
    setSearch("");
    setSelection(null);
    keyboardRef.current?.setInput("");
  };

  const onChange = (input: any) => {
    setSearch(input);
    setSelection(keyboardRef.current?.getCaretPosition());
  };

  const onChangeInput = (event: any) => {
    const input = event.target.value;
    setSearch(input);
    keyboardRef.current?.setInput(input);
  };

  const searchInput = (
    <form
      className="flex items-center w-full rounded-xl overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        props.openModal("search", "Pencarian", "", search);
      }}
    >
      <Input
        ref={inputRef}
        onFocus={() => setShowKeyboard(true)}
        onBlur={() => setShowKeyboard(false)}
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 input-search-main",
        }}
        radius="none"
        isClearable
        onClear={onClear}
        name="search"
        placeholder="Masukan kata pencarian.."
        value={search}
        onChange={onChangeInput}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Button
          disableRipple
          isIconOnly
          size="sm"
          variant="flat"
          radius="none"
          className="active:scale-75 h-full"
          style={{ backgroundColor: "#F9AB00", width: "52px" }}
          type="submit"
        >
          <SearchIcon fill="white" size={16} />
        </Button>
      </div>
    </form>
  );

  useEffect(() => {
    if (!selection) return;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(selection, selection);
  }, [selection]);

  return (
    <section className="m-header">
      <Image className="bg-cloud" radius="none" src="cloud.png" removeWrapper />
      <Image
        className="woman-cs z-1"
        radius="none"
        src="user-woman.png"
        removeWrapper
      />
      <div className="flex justify-between" style={{ padding: "30px" }}>
        <Image
          alt="JDIH"
          height={40}
          radius="none"
          src="jdih.png"
          removeWrapper
        />
        <Image
          className="test"
          alt="komdigi"
          height={80}
          radius="none"
          src="kemkomdigi.png"
          removeWrapper
        />
      </div>
      <div className="flex flex-col items-center justify-center search-wrapper">
        <div className="inline-block max-w-5xl text-center justify-center text-heading">
          <div
            className={title()}
            style={{
              marginTop: "150px",
              lineHeight: "3.2rem",
            }}
          >
            {" "}
            Jaringan Dokumentasi dan Informasi Hukum <br />
            Kementerian Komunikasi dan Digital
          </div>
          <div className={subtitle()} style={{ marginTop: "50px" }}>
            <span className="text-xl">
              Pencarian Dokumen dan Informasi Hukum di <br />
              Lingkungan Kementerian Komunikasi dan Digital
            </span>
            <div className="m-auto mt-4" style={{ maxWidth: "480px" }}>
              {searchInput}
              <div className={showKeyboard ? "" : "hidden"}>
                <Keyboard
                  keyboardRef={(r) => (keyboardRef.current = r)}
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
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  preventMouseDownDefault={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
