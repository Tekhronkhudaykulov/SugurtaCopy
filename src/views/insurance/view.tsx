import { FooterNav, Text } from "../../components";
import { ASSETS } from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { useEffect, useState } from "react";
import "./pages/index.scss";
import "antd/dist/reset.css";
import { useTranslation } from "react-i18next";
import { DatePicker, Space, Modal } from "antd";
import moment from "moment";
import { stepOneAttributes, stepOneStore, usePostError, usePostStore } from "../../store/usePostStore/usePostStore";
import { stepThree, stepThreeInfinity } from "../../hook/hook";
import Notification from "../../components/Notification/view";
import LoadingPage from "../../components/Loading/view";
import InsuranceInfo from "./component/InsuranceInfo";

const { RangePicker } = DatePicker;

const Insurance = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [activeYear, setActiveYear] = useState(0);


  
  const [activePicker, setActivePicker] = useState(1);
  const [dates, setDates] = useState<
    [moment.Moment | null, moment.Moment | null]
  >([null, null]);

  const [isFocuc, setIsFocus] = useState(0);
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };



  const { t } = useTranslation();

  const handleCalendarChange = (values: any) => {
    if (values && values[0]) {
      const startDate = values[0];
      const endDate = startDate.clone().add(364, "days");
      setDates([startDate, endDate]);
    } else {
      setDates([null, null]);
    }
  };

  const { stepOneData } = stepOneStore();


  useEffect(() => {
    if (stepOneData?.details?.startDate && stepOneData?.details?.endDate) {
      setDates([
        moment(stepOneData?.details?.startDate), // Boshlanish sanasi
        moment(stepOneData?.details?.endDate),  // Tugash sanasi
      ]);
    }
  }, [stepOneData]);

  const [status, setStatus] = useState<any>(null)

  const {mutate, isPending, isError} = stepThreeInfinity();

  const { errorTitle } = usePostError();

  const { serviceDetail } = usePostStore();


  const [singleObject] = Array.isArray(serviceDetail) ? serviceDetail : [];


  const handleSend = () => {
    mutate({
      data: stepOneData,
      company_id: singleObject.service_id,
      service_id: singleObject.service_id,
      step_status: status,
      resident: 1,
      step: 3
    });
  };

  
  return (
    <>

{isError && <Notification message={errorTitle} onClose="" />}
{isPending && <LoadingPage />}
 
      <InsuranceInfo/>
      <div className="flex flex-col mt-[20px]">
        <div className="bg-[#F4F4F4] rounded-[20px] px-[25px] py-[15px]">
          <div className="flex flex-col gap-y-[15px] mt-[15px]">
            <div className="grid grid-cols-3 items-center gap-x-[25px]">
              <div className="text-[20px] font-[700]">
                {t("insurance.policeType")}:
              </div>
              <div
                onClick={() => {
                  handleClick(0);
                  setStatus(0)
                }}
                className={`flex items-center gap-x-[30px] h-[70px] px-[20px] justify-between bg-white  rounded-[15px] ${
                  activeIndex === 0 && "focus-input"
                }`}
              >
                <p className="text-[20px] font-[700]">
                  {t("insurance.Unlimited")} :{" "}
                </p>
                <img
                  className="w-[50px] h-[50px]"
                  src={ASSETS.Infinite}
                  alt=""
                />
              </div>
              <div
                onClick={() => {
                  handleClick(1);
                  navigate(APP_ROUTES.ADDRELATIVESPERSON)
                }}
                className={`flex items-center gap-x-[30px] h-[70px] px-[20px] justify-between bg-white   rounded-[15px] ${
                  activeIndex === 1 && "focus-input"
                }`}
              >
                <p className="text-[20px] font-[700]">
                  {t("insurance.PeopleTotal")}:{" "}
                </p>
                <img className="w-[50px] h-[50px]" src={ASSETS.Mens} alt="" />
              </div>
            </div>
            <div className="grid grid-cols-3  gap-x-[25px] items-center">
              <div className="text-[20px] font-[700]">
                {t("insurance.insuranceYear")}
              </div>
              <div
                onClick={() => handleClick(2)}
                className={`flex items-center gap-x-[30px] h-[70px] px-[20px] justify-between bg-white  rounded-[15px] ${
                  activeYear === 0 && "focus-input"
                }`}
              >
                <p className="text-[20px] font-[700]">{t("insurance.year")} </p>
                <p className="text-[20px] font-[700] text-[#7076FF]">
                  {stepOneData?.cost?.discountSum} сум
                </p>
              </div>
              {/* <div>
                <div
                  onClick={() => handleClick(3)}
                  className={`flex items-center gap-x-[30px] h-[70px] px-[20px] justify-between bg-white  rounded-[15px] ${
                    activeIndex === 3 && "focus-input"
                  }`}
                >
                  <p className="text-[20px] font-[700]">
                    {t("insurance.month")}:{" "}
                  </p>
                  <p className="text-[20px] font-[700] text-[#7076FF]">
                    117 600 сум
                  </p>
                </div>
              </div> */}
            </div>
            <div className="grid grid-cols-3 gap-x-[25px]">
              <p className="text-[20px] font-[700]">
                {t("insurance.insuranceDate")}:
              </p>
              <div
                onClick={() => setActivePicker(1)}
                className={`${
                  activePicker === 1 && "focus-input"
                } h-[70px]  px-[25px] rounded-[15px]  bg-white flex items-center justify-between`}
              >
                <Space direction="vertical" size={12}>
                  <RangePicker
                    disabled
                    placeholder={["Дата", "Дата"]}
                    className="custom-input !bg-[none]"
                    onCalendarChange={handleCalendarChange}
                  
                    // @ts-ignore
                    value={dates}
                  />
                </Space>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <FooterNav
            prevClick={() => navigate(-1)}
            nextClick={() => {
              handleSend()
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Insurance;
