import { ASSETS } from "../../../assets/images/assets";
import {  stepOneStore } from "../../../store/usePostStore/usePostStore";

const InsuranceInfo = () => {

  // @ts-ignore
  const {stepOneData} = stepOneStore();

  console.log(stepOneData, 'asnfkjas')


  

  return (
    <div className="flex gap-x-[30px] mt-[10px]">
      <div className="border p-[15px] rounded-[40px] border-[#C1C1C1] flex items-center justify-center">
        <img
          className="w-[300px] h-[70px] object-contain"
          src={ASSETS.InsonLogo}
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between mt-[10px]">
          <p className="text-[20px] font-[700]">Страховая компания:</p>
          <p className="text-[20px] font-[700]">{stepOneData?.details?.insuredActivityType}</p>
        </div>
        <div className="flex items-center justify-between mt-[10px]">
          <p className="text-[20px] font-[700]">Сумма покрытия:</p>
          <p className="text-[20px] font-[700]">UZS {Number(stepOneData?.cost?.sumInsured)?.toLocaleString("ru-RU")}</p>
        </div>
        <div className="flex items-center justify-between mt-[10px]">
          <p className="text-[20px] font-[700]">Тип полиса:</p>
          <p className="text-[20px] font-[700]">Неограниченный</p>
        </div>
        <div className="flex items-center justify-between mt-[10px]">
          <p className="text-[20px] font-[700]">Период страхования:</p>
          <p className="text-[20px] font-[700]">1 год </p>
        </div>
        <div className="flex items-center justify-between mt-[10px]">
          <p className="text-[20px] font-[700]">
            Ваш номер телефона для уведомлений:
          </p>
          <p className="text-[20px] font-[700]">+{stepOneData?.applicant?.person?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceInfo;
