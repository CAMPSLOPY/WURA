import React, { useCallback, useEffect, useState } from "react";

import { TfiClose } from "react-icons/tfi";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId, isOpen, closeModal } = useInfoModal(); // Destructure isOpen and closeModal from useInfoModal
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    if (!visible && isOpen) {
      // Close modal if it's open but should be invisible
      closeModal();
    }
  }, [visible, isOpen, closeModal]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
    z-50
    duration-300
    bg-black
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    transition
    fixed
    inset-0
    bg-opacity-80
    "
    >
      <div
        className="
        relative
        w-auto
        mx-auto
        max-w-3xl
        rounded-md
        overflow-hidden
        "
      >
        <div
          className={`${isOpen ? "scale-100" : "scale-0"}
                transform
                relative
                flex-auto
                bg-zinc-900
                drop-shadow-md
                `}
        >
          <div
            className="
            
            relative
            h-96
            "
          >
            <video
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className="
        brightness-[60%]
        object-cover
        h-full
        w-full
         "
            ></video>
            <div
              className="
        cursor-pointer
        absolute
        top-3
        right-3
        w-10
        h-10
        rounded-full
        bg-opacity-70
        flex
        items-center
        justify-center
        bg-black
        
        "
              onClick={onClose}
            >
              <TfiClose className="text-white" size={20} />
            </div>
            <div
              className="
        absolute
        bottom-[10%]
        left-10
        "
            >
              <p className=" text-white text-3xl md:text-4xl h-full font-bold mb-8 lg:text-5xl">
                {data.title}
              </p>
              <div className=" flex flex-row items-center gap-4">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          <div className=" px-12 py-8">
            <p className=" text-cyan-600 font-bold text-lg">New</p>
            <p className="text-white text-lg"> {data?.duration}</p>
            <p className="text-white text-lg"> {data?.genre}</p>
            <p className="text-white text-lg"> {data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
