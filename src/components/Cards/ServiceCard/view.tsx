import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../../config";
import { $api, imageURl } from "../../../helpers/api";

interface Props {
  className?: string;
  onClick?: () => void;
  classNameButton: string;
  item?: any
  title?: any,
  image?: string
  imgClass?: string,
  imgDivClass?: string,
  buttonTitle? :string
}

const ServicesCard = ({
  className,
  onClick,
  title,
  classNameButton,
  image,
  imgClass,
  imgDivClass,
  buttonTitle
  
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className={`flex flex-col pt-[20px] px-[24px] h-[280px] ${className} w-full   bg-card rounded-[36px]`}
    >
     <div className={imgDivClass}>
     <img  className={`h-[99px] object-contain mb-[30px] ${imgClass}`} src={image} alt="" />
     </div>
     <p className="text-[20px]  leading-[24px] font-[600]">
     {title}
      </p>
      <button
        className={`${classNameButton} 
               transform  transition-transform duration-150 ease-in-out 
               active:scale-90 animate-grow`}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default ServicesCard;
