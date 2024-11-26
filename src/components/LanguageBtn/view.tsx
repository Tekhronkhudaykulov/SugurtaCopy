interface LanguageBtnType {
  title: string;
  img: string;
  isHas?: boolean;
  onClick?: () => void;
}

const LanguageBtn = ({ title, img, isHas, onClick }: LanguageBtnType) => {
  return (
    <div onClick={onClick}>
      <div
        className={`bg-[#F7F7F7] h-[50px] flex items-center  ${
          isHas ? "border-b-[5px]" : "border-b-0"
        }  justify-center gap-x-[20px] w-[130px] border-[#5960FE]  rounded-[15px]`}
      >
        <p className="text-[20px] font-[700]">{title}</p>
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default LanguageBtn;
