"use client";

import { FC, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

import { Heading, Modal, CategoryInput, CountrySelect } from "../paths";
import { useRentModal } from "@/app/hooks";
import { categories } from "@/app/appConfig";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface RentModalProps {}

export const RentModal: FC<RentModalProps> = ({}) => {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const clearSelection = () => {
    setCustomValue("category", "");

    setStep(STEPS.CATEGORY);
  };

  const prmayButtonDisabled = () => {
    if (step === STEPS.CATEGORY) {
      return category === "";
    }

    if (step === STEPS.LOCATION) {
      return location === null;
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY && category !== "") {
      return "Clear Selection";
    }

    if (step !== STEPS.CATEGORY) {
      return "Back";
    }
  }, [step, category]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        onClose={rentModal.onClose}
        onSubmit={onNext}
        body={bodyContent}
        actionLabel={actionLabel}
        secondaryAction={
          step === STEPS.CATEGORY && category ? clearSelection : onBack
        }
        secondaryActionLabel={secondaryActionLabel}
        disabled={prmayButtonDisabled()}
        secondaryButtonDisabled={step < 0}
      />
    </>
  );
};
