import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { SearchIcon } from "../icons";
import { Input } from "@nextui-org/input";
import { useState } from "react";

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

  const searchInput = (
    <form
      className="flex items-center w-full rounded-xl overflow-hidden"
      onSubmit={(e) => {
        e.preventDefault();
        props.openModal("search", "Pencarian", "", search);
      }}
    >
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 input-search-main",
        }}
        radius="none"
        isClearable
        onClear={() => {
          setSearch("");
        }}
        placeholder="Masukan kata pencarian.."
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
        }}
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

  return (
    <section className="m-header">
      <Image className="bg-cloud" radius="none" src="cloud.png" removeWrapper />
      <Image
        className="woman-cs"
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
          height={40}
          radius="none"
          src="komdigi.png"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
