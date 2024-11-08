import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

export default function TemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
		<ModalHeader className="flex flex-col gap-1">
		    <div className="modal-head text-3xl font-bold">
		      Telusur Tema
		    </div>
		    <div className="long-bar"></div>
		  </ModalHeader>
		<ModalBody>
			{children}
		</ModalBody>  
    </>
  );
}
