import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { CashDevice } from "../../../hook/view";
import { socketValueStore } from "../../../store";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, SocketUrl } from "../../../config";
import PrintReceipt from "../../../components/CheckPrint/view";
import { stepOneStore, usePostError } from "../../../store/usePostStore/usePostStore";
import { io, Socket } from "socket.io-client";
import { tokenName } from "../../../helpers/api";
import { saveEveryCash } from "../../../hook/hook";
import Notification from "../../../components/Notification/view";





const Cash = () => {
  const { getTotal, values } = socketValueStore();

  const { errorTitle } = usePostError();

  const {mutate, isPending, isError} = saveEveryCash();



  

  // let token = localStorage.getItem(tokenName);

  // const socket = io(SocketUrl, {
  //   query: {
  //     token: token, // Bearer tokenni shu yerda yuboring
  //   },
  // });

  // let requestCount = 0;  // So'rovlar sanog'i


  // console.log(requestCount, 'request count');
  

  // useEffect(() => {
  //   if (socket) {
  //     socket.connect();
  //     console.log("socket connected");

  //     socket.on("pay", () => {
  //       console.log("connected to pay event");
  //     });

  //     // Intervalni o'rnatamiz
  //     const interval = setInterval(() => {
  //       requestCount += 1;

  //       if (requestCount >= 5) {
  //         console.log("Request count exceeded 5, reconnecting socket");
  //         socket.disconnect();  // Socketni uzish
  //         socket.connect();  // Yangi socket ulanishini amalga oshirish
  //         requestCount = 0;  // So'rovlarni qayta sanash
  //       }
  //     }, 1000);  // Har 1 soniyada tekshirib turish

  //     return () => {
  //       clearInterval(interval); // Componentni tozalashda intervalni to'xtatish
  //     };
  //   }
  // }, []);


  const total = getTotal();


  console.log(total, "total");



  CashDevice();

  console.log(values, "values");




  

  const navigate = useNavigate();

  useEffect(() => {
    // Do'konning total qiymatini kuzatish
    const unsubscribe = socketValueStore.subscribe(
      (state) => state.getTotal,
      // @ts-ignore
      (total) => {
        if (total) {
          // total qiymati o'zgarganda post request yuborish
          sendPostRequest(total);
        }
      }
    );

    return () => {
      unsubscribe(); // Komponent unmount bo'lganda unsubscribe qilish
    };
  }, []);

  const sendPostRequest = async (total: any) => {
    try {
      const response = await axios.post(`${API_URL}/save-every-cash`, {
        total,
      });
      console.log("Post request muvaffaqiyatli yuborildi:", response.data);
    } catch (error) {
      console.error("Post requestda xato:", error);
    }
  };


  const {stepOneData} = stepOneStore()

  console.log(stepOneData, 'asnfkjas')

  return (
    <>
      {isError && <Notification message={errorTitle} onClose="" />}
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
                text={`${getTotal()} сум`}
                className="ml-auto text-right text-[22px] font-[700]"
              />
            </div>
            <div className="flex items-center">
              <Text text="К зачислению:" className="text-[22px] font-[500]" />
              <Text
                text="0 сум"
                className="ml-auto text-right text-[22px] font-[700]"
              />
            </div>

            <div className="flex items-center">
              <Text text="Лишняя сумма:" className="text-[22px] font-[500]" />
              <Text
                text="0 сум"
                className="ml-auto text-right text-[22px] font-[700]"
              />
            </div>
            <Text
              text="Будет использованная для пополнения мобильной связи"
              className="text-[20px] font-[500]"
            />
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
      <PrintReceipt/>
      <div>
        <FooterNav nextTitle="Оплатить" prevClick={() => navigate(-1)} />
      </div>
    </>
  );
};

export default Cash;
