import "antd/dist/reset.css";
import "./style.scss";
import { useTranslation } from "react-i18next";

interface Props {
  prevTitle?: string;
  prevClick?: () => void;
  nextTitle?: string;
  nextClick?: () => void;
  nextLoading?: boolean;
  nextDisabled?: boolean;
  showNextButton?: boolean;
}

const FooterNav = ({
  prevTitle,
  prevClick,
  nextTitle,
  nextClick,
  nextDisabled = false,
  showNextButton = true,
}: Props) => {
  const { t } = useTranslation();


  
  return (
    <div className="flex items-center justify-center gap-3 py-4 mt-auto ">
      <button
        className={`uppercase rounded-[15px] w-[400px]  button-animation text-[24px] text-black border h-[70px] `}
        onClick={prevClick}
      >
        {prevTitle ? prevTitle : t("buttons.prev")}
      </button>
      {showNextButton ? (
        <button
          disabled={nextDisabled}
          onClick={nextClick}
          className={`!bg-btnGreen rounded-[15px] animate-grow button-animation  text-[24px] text-white   h-[70px]  uppercase w-[400px] ${
            nextDisabled && "opacity-50"
          }`}
        >
          {nextTitle ? nextTitle : t("buttons.next")}
        </button>
      ) : null}
    </div>
  );
};

export default FooterNav;
