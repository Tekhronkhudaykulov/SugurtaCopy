import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav } from "../../../components";
import AddRelativesCard from "../component/AddRelativesCard";
import InsuranceInfo from "../component/InsuranceInfo";
import { APP_ROUTES } from "../../../router";
import { stepOneStore, usePostError, usePostStore } from "../../../store/usePostStore/usePostStore";
import { createInsuranceQuery } from "../../../hook/hook";
import Notification from "../../../components/Notification/view";
import LoadingPage from "../../../components/Loading/view";

const AddRelatives = () => {
  const navigate = useNavigate();

  const { serviceDetail } = usePostStore();
  
  const { stepOneData } = stepOneStore();

  const { errorTitle } = usePostError();


  const {mutate, isPending, isError, isSuccess} = createInsuranceQuery();

  const [singleObject] = Array.isArray(serviceDetail) ? serviceDetail : [];

  const handleSend = () => {
    mutate({
      data: stepOneData,
      company_id: singleObject.service_id,
      service_id: singleObject.service_id,
    });
  };

  return (
   <>
   {isSuccess && <Notification message='"Sugurta shakllandi !' onClose="" />}
    {isError && <Notification message={errorTitle} onClose="" />}
    {isPending && <LoadingPage />}
    <div className="flex flex-col ">
      <InsuranceInfo data={stepOneData}/>
      <div className="mt-[10px] bg-[#F6F6F6] p-[15px] rounded-[35px]">
        <div className="flex items-center justify-between">
          <p className="text-[22px] font-[700]">Данные родственников:</p>
          <div className="flex items-center gap-x-[15px]">
            <div className="w-[80px] h-[50px] bg-[#7076FF] rounded-[15px] flex items-center justify-center">
              <img src={ASSETS.Back} alt="" />
            </div>
            <div
              onClick={() => navigate(APP_ROUTES.ADDRELATIVESPERSON)}
              className="bg-[#4D53E0] px-[30px] rounded-[15px] h-[50px] flex items-center justify-center text-white text-[22px] font-[700]"
            >
              Добавить родственника
            </div>
            <div className="w-[80px] rotate-180 h-[50px] bg-[#7076FF] rounded-[15px] flex items-center justify-center">
              <img src={ASSETS.Back} alt="" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[15px] mt-[10px]">
          {stepOneData?.drivers?.map((item: any, ind: any) => (
            <AddRelativesCard person={item} ind={ind}/>
          ))}
        </div>
      </div>
      <div className="mt-[-10px]">
        <FooterNav prevClick={() => navigate(-1)} nextClick={() => {
handleSend()
        }}/>
      </div>
    </div>
    </>
  );
};

export default AddRelatives;
