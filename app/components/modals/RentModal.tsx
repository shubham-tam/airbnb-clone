import { FC } from "react";

import { Modal } from "../paths";
import { useRentModal } from "@/app/hooks";

interface RentModalProps {}

export const RentModal: FC<RentModalProps> = ({}) => {
  const rentModal = useRentModal();
  return (
    <>
      <Modal
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        onClose={rentModal.onClose}
        onSubmit={() => {}}
        body={<div>Hello </div>}
        actionLabel="Continue"
      />
    </>
  );
};
