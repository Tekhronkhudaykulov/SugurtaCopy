import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../../config";

interface Props {
  className?: string;
  onClick?: () => void;
  classNameButton: string;
  item?: any
  title?: any,
  image?: string
}

const ServicesCard = ({
  className,
  onClick,
  title,
  classNameButton,
  image
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className={`flex flex-col pt-[20px] px-[24px] h-[280px] ${className} w-full   bg-card rounded-[36px]`}
    >
      <img  className="rounded-[20px]" src={`http://128.199.65.33/uploads/logo/${image}`} alt="" />
      <p className="text-[20px] !mt-[20px] leading-[24px] font-[600]">
        {title}
      </p>
      <button
        className={`${classNameButton} 
               transform  transition-transform duration-150 ease-in-out 
               active:scale-90`}
      >
        {t("home.cardButton")}
      </button>
    </div>
  );
};

export default ServicesCard;
