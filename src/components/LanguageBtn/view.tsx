interface LanguageBtnType {
  title: string;
  img: string;
  isHas?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const disabledBlock = (
  <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center bg-orange50 ">
    <div className="text-[14px] text-white font-[700] text-center py-6 bg-orange">
      В разработке
    </div>
  </div>
);

const LanguageBtn = ({ title, img, isHas, onClick }: LanguageBtnType) => {
  return (
    <div onClick={onClick}>
      <div
        className={`bg-[#F7F7F7] h-[50px] flex items-center relative ${
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
