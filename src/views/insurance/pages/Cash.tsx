import {useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { CashDevice } from "../../../hook/view";
import { socketValueStore } from "../../../store";
import { setCash, stepOneStore, usePostError } from "../../../store/usePostStore/usePostStore";
import { payByCash, saveEveryCash } from "../../../hook/hook";
import Notification from "../../../components/Notification/view";
import LoadingPage from "../../../components/Loading/view";


const Cash = () => {
  const { getTotal, values } = socketValueStore();

  const navigate = useNavigate();

  CashDevice()
  
  const getTotalNum = Number(getTotal())
 
  const { errorTitle } = usePostError();

  const {isError} = saveEveryCash();

  const {mutate: byCashMutate, isPending:byCashPending, isError:byCashError} = payByCash();

  const total = getTotal();

  const {everyCash} = setCash();

  // @ts-ignore

  const {stepOneData} = stepOneStore()
  // @ts-ignore


  let refound = Number(everyCash?.amountInsurance) - Number(getTotalNum) || 0;

  

  
  return (
    <>
    {byCashPending && <LoadingPage/>}
      {isError && <Notification message={errorTitle} onClose="" />}
      {byCashError && <Notification message={errorTitle} onClose="" />}
      <div className="flex justify-between gap-4  mt-[10px]">
        <div className="min-w-[620px]">
          <div className="flex items-center mb-[15px] px-[15px] py-[20px] border-[12px] border-purple rounded-[36px]">
            <Text
              text="Указанная сумма оплаты:"
              className="text-[22px] font-[500]"
            />
            <Text
              text={`${Number(stepOneData?.cost?.insurancePremium)?.toLocaleString("ru-RU")} сум`}
              className="ml-auto text-right text-[22px] font-[700]"
            />
          </div>
          <div className="flex flex-col gap-4 px-[15px] py-[20px] border-[12px] border-purple rounded-[36px]">
            <div className="flex items-center">
              <Text text="Введено:" className="text-[22px] font-[500]" />
              <Text
                text={`${getTotalNum.toLocaleString("ru-RU")} сум`}
                className="ml-auto text-right text-[22px] font-[700]"
              />
            </div>
            {refound > 0 && (
              <div className="flex items-center">
              <Text text="К зачислению:" className="text-[22px] font-[500]" />
              <Text
                text={`${refound?.toLocaleString("ru-RU")} сум`}
                className="ml-auto text-right text-[22px] font-[700]"
              />
            </div>
            )}
            {refound < 0 && (
              <div className="flex items-center">
              <Text text="Лишняя сумма:" className="text-[22px] font-[500]" />
              <Text
                text={ `${Math.abs(refound)?.toLocaleString("ru-RU")} сум`}
                className="ml-auto text-right text-[22px] font-[700]"
              />
              </div>
            )}
           
            {/* <Text
              text="Будет использованная для пополнения мобильной связи"
              className="text-[20px] font-[500]"
            /> */}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-4 bg-purple rounded-[36px] p-5">
            <div className="flex items-center">
              <Text
                text="Минимум:"
                className="text-[22px] font-[700] text-white"
              />
              <Text
                text="5000 сум"
                className="ml-auto text-right text-[22px] font-[700] text-white"
              />
            </div>
            <div className="flex items-center">
              <Text
                text="Максимум:"
                className="text-[22px] font-[700] text-white"
              />
              <Text
                text="3 000 000 сум"
                className="ml-auto text-right text-[22px] font-[700] text-white"
              />
            </div>
          </div>
          <img src={ASSETS.Money} className="mx-auto mt-[20px]" alt="" />
        </div>
      </div>
      {/* <PrintReceipt/> */}
      <div>
        <FooterNav nextClick={() => {
          byCashMutate()
        }} nextTitle="Оплатить" prevClick={() => navigate(-1)} />
      </div>
    </>
  );
};

export default Cash;
