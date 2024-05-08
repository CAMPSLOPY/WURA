import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import { TiInfo } from "react-icons/ti";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className=" relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
        autoPlay
        muted
        loop
        className="
      h-[56.25vw]
      w-full
      object-cover
      brightness-[60%]
      
      "
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="text-white 
font-black
 text-1xl
 w-[50%]
 h-full
  font-mono 
  text-emerald-50
   md:text-5xl
   lg:text-6xl
   drop-shadow-lg"
        >
          {data?.title}
        </p>
        <p
          className="
text-emerald-50
text-[8px]
md:text-lg
mt-3
md:mt-8
w-[90%]
md:w-[80%]
lg:w-[50%]
drop-shadow-xl
"
        >
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 cursor-pointer gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
    bg-white
    text-emerald-50
    bg-opacity-30
    rounded-md
    py-1 md:py-2
    px-2 md:px-4
    w-auto
    text-xs lg:text-lg
    font-semibold
    flex
    flex-row
    items-center
    hover:bg-opacity-20
    transition
    "
          >
            <TiInfo className="mr-1 text-black" />
            More Movie Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
