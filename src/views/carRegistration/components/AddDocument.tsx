import { useTranslation } from "react-i18next";
import { CheckingCardInput } from "../../../components/Cards";
import React, { useEffect, useRef, useState } from "react";
import { FooterNav, KeyboardComponent, Text } from "../../../components";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../router";
import { otherStore, usePostStore } from "../../../store";
import { stepTwo } from "../../../hook/hook";
import Notification from "../../../components/Notification/view";
import LoadingPage from "../../../components/Loading/view";
import { stepOneStore, usePostError } from "../../../store/usePostStore/usePostStore";
import { Modal } from "antd";
import { AddPhoneNumber } from "../..";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { FaBackspace } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

const AddDocument = () => {
  const { t } = useTranslation();

  // @ts-ignore
  const { serviceDetail } = usePostStore();

  const [singleObject] = Array.isArray(serviceDetail) ? serviceDetail : [];

  const navigate = useNavigate();

  const { errorTitle } = usePostError();

  const [isActive, setIsActive] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);



  const {mutate, isPending, isError} = stepTwo();


  const handleClick = (index: any) => {

    setIsActive(index);
  };

  const [value, setValue] = useState("")

  let formate = `${value?.slice(0, 2)} ${value?.slice(2, 5)} ${value?.slice(5, 7)} ${value?.slice(7)}`;



  const { stepOneData } = stepOneStore();

  const sendValue = () => {
    navigate(APP_ROUTES.INSURANCE)
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");

  const [isChecked, setIsChecked] = useState("false");


  const handleCheckboxChange = () => {
    setIsChecked(isChecked === 'false' ? 'true' : 'false'); // String holatni teskari // Checkbox qiymatini teskari qilish
  };

  const handleChangeInput1 = (newInput: string) => {
    setInputValue1(newInput);
  };

  // Input 2 uchun handleChange
  const handleChangeInput2 = (newInput: string) => {
    setInputValue2(newInput);
  };


  const handleKeyPressInputFirst = (button: string) => {
    if (button === "{bksp}") {
      setInputValue1(inputValue1.slice(0, -1)); // Input 1 uchun backspace
    }
  };

  const handleKeyPressInputSecond = (button: string) => {
    if (button === "{bksp}") {
      setInputValue2(inputValue2.slice(0, -1)); // Input 2 uchun backspace
    }
  };


  const handleSend = () => {
    mutate({
      applicantIsOwner: isChecked,
      phoneNumber: `998${value}`,
      seria: inputValue1,
      number: inputValue2,
      driverNumberRestriction: isChecked,
      data: stepOneData,
      company_id: singleObject.service_id,
      service_id: singleObject.service_id,
    });
  };

  const backspaceIcon = renderToStaticMarkup(<FaBackspace size={50} color="#FF5252" />);

  return (
    <>
         {isError && <Notification message={errorTitle} onClose="" />}
         {isPending && <LoadingPage />}
         <Modal
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <AddPhoneNumber onClick={handleCancel} setTitle={setValue}/>
      </Modal>
         <div className="bg-content py-[10px] px-[24px] pt-[50px]">
         <div className="bg-white px-[25px] flex items-center gap-y-[10px]  py-[25px] rounded-[36px]">
            <div>
              <Text
                text={t("phone")}
                className="text-[20px] font-[500] mb-[15px]"
              />
              <div>
                <div
                  onClick={() => {
                    handleClick(0);
                    showModal();
                  }}
                  className={`${
                   isActive === 0 ? "focus-input" : ""
                  } flex items-center  gap-[20px] p-[10px] bg-[#F7F7F7] rounded-[22px] `}
                >
                  <div className="text-[25px] font-[500] border-r-[5px] border-[#E8E8E8] pr-[20px]">
                    +998
                  </div>
                  <input
                    className={`border-transparent bg-[#F7F7F7] !outline-none  text-[25px]  `}
                    type="text"
                    value={formate}
                  />
                </div>
              </div>
              <label
                id="my"
                onClick={() =>  {
                  handleClick(1)
                }}
                className={`${
                  isActive === 1 ? "focus-input" : ""
                } flex items-center justify-between   gap-[20px] mt-[20px] py-[25px] px-[20px] bg-[#F7F7F7] rounded-[22px]`}
              >
                <label className="text-[25px] font-[500]">
                  {t("insurance.howI")}
                </label>

                <input
                  id="my"
                  type="checkbox"
                  checked={isChecked === 'true'}
                  onChange={handleCheckboxChange}
                  className="ml-2 h-6 w-6 rounded border-gray-300 focus:ring-blue-500"
                />
              </label>
            </div>
            <div className="f w-[40%] mx-auto">
              <p className=" text-center text-[20px] text-[red] ">
                {t("insurance.titleSms")}
              </p>
            </div>
          </div>
      <div className="grid grid-cols-3 gap-x-[15px] mt-[20px]">
        <CheckingCardInput
          label={t("passport.passportSeria")}
          className={`bg-white rounded-[14px] button-animation px-[20px] py-[10px] ${
            isActive === 2 ? "focus-input" : ""
          }`}
          value={inputValue1}
          onChange={(e) => handleChangeInput1(e.target.value)}
          handleClick={() => {
            handleClick(2);
          }}
          isActive={isActive}
        />
        <CheckingCardInput
          label={t("passport.passportNumber")}
          className={`bg-white rounded-[14px] button-animation px-[20px] py-[10px] ${
            isActive === 3 ? "focus-input" : ""
          }`}
          value={inputValue2}
          onChange={(e) => handleChangeInput2(e.target.value)}
          handleClick={() => {
            handleClick(3);
          }}
          isActive={isActive}
        />
      </div>
      <div className="mt-[25px]">
        {/* <KeyboardComponent
          ref={(r: any) => (keyboard.current = r)}
          handleKeyPress={handleKeyPress}
          inputName={inputName}
          onChange={onChangeAll}
        /> */}
        {isActive === 2 && (
            <Keyboard
            value={inputValue1}  // Virtual klaviatura input qiymatini o'qiydi
            onChange={handleChangeInput1} 
            onKeyPress={handleKeyPressInputFirst}   // Klaviaturada bosilgan tugmalarni inputga uzatadi
            layout={{
              default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M {bksp}",
              ],
              shift: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "{shift} Z X C V B N M {bksp}",
                "{bksp}"
              ]
            }}
            display={{
              "{shift}": "Shift",
              "{bksp}": backspaceIcon
            }}
            buttonTheme={[
              {
                class: "custom-keyboard-btn", // Tailwind CSS sinfi
                buttons: "1 2 3 4 5 6 7 8 9 0 {bksp}" // Stil beriladigan tugmalar
              }
            ]}
          />
        )}

        {isActive === 3 && (
           <Keyboard
           value={inputValue2}
           onChange={handleChangeInput2}
           onKeyPress={handleKeyPressInputSecond}  

           layout={{
             default: [
               "1 2 3 4 5 6 7 8 9 0",
               "Q W E R T Y U I O P",
               "A S D F G H J K L",
               "Z X C V B N M {bksp}",
             ],
             
             
           }}
           display={{
            "{shift}": "Shift",
            "{bksp}": backspaceIcon
          }}
          buttonTheme={[
            {
              class: "custom-keyboard-btn", // Tailwind CSS sinfi
              buttons: "1 2 3 4 5 6 7 8 9 0 {bksp}" // Stil beriladigan tugmalar
            }
          ]}
         />
        )}  
    
      </div>
      <div>
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

export default AddDocument;
