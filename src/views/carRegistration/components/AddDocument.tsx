import { useTranslation } from "react-i18next";
import { CheckingCardInput } from "../../../components/Cards";
import { useEffect, useRef, useState } from "react";
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

const AddDocument = () => {
  const { t } = useTranslation();

  // @ts-ignore
  const { serviceDetail } = usePostStore();

  const [singleObject] = Array.isArray(serviceDetail) ? serviceDetail : [];

  const keyboard = useRef(null);

  const navigate = useNavigate();

  const { errorTitle } = usePostError();

  const [isActive, setIsActive] = useState(0);

  const [layoutName, setLayoutName] = useState("default");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputName, setInputName] = useState("");

  const [inputs, setInputs] = useState({});

  const {mutate, isPending, isError} = stepTwo();

  const [checkboxValue, setCheckBoxValue] = useState("")

  const onChangeAll = (inputs: any) => {
    // Ensure that `input1` length does not exceed 8 characters
    if (inputs.input1 && inputs.input1.length > 2) {
      inputs.input1 = inputs.input1.slice(0, 2); // Truncate to 8 characters
    }
    if (inputs.input2 && inputs.input2.length > 7) {
      inputs.input2 = inputs.input2.slice(0, 7); // Truncate to 8 characters
    }

    setInputs({ ...inputs });
  };

  const handleShift = () => {
    setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
  };

  const onKeyPress = (button: any) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event: any) => {
    const { name, value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    // Ensure that keyboard input value is updated
    if (keyboard.current && inputName === name) {
      // @ts-ignore
      keyboard.current.setInputs(value);
    }
  };

  const handleKeyPress = (button: any) => {
    // Handle backspace explicitly
    if (button === "{bksp}") {
      const currentValue = getInputValue(inputName);
      const updatedValue = currentValue.slice(0, -1); // Remove last character
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: updatedValue,
      }));
      // @ts-ignore
      if (keyboard.current) keyboard.current.setInput(updatedValue);
    } else {
      onKeyPress(button);
    }
  };

  const getInputValue = (inputName: any) => {
    // @ts-ignore
    const value = inputs[inputName] || "";

    return value;
  };

  const handleClick = (index: any) => {
    setIsActive(index);
  };

  const [value, setValue] = useState("")


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

  const handleSend = () => {
    mutate({
    // @ts-ignore
      company_id: singleObject.service_id,
      service_id: singleObject.service_id,
      data: stepOneData,
      // @ts-ignore
      seria: inputs.input2,
      // @ts-ignore
      number: inputs.input3,
      // @ts-ignore
      govNumber: inputs.input1,
    });
  };

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
                    value={value}
                  />
                </div>
              </div>
              <label
                id="my"
                onClick={() =>  handleClick(1)}
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
                  onChange={() => setCheckBoxValue("true")}
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
          value={getInputValue("input1")}
          onFocus={(e: any) => {
            e.target.blur();
            setInputName("input1");
          }}
          onChange={onChangeInput}
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
          value={getInputValue("input2")}
          onFocus={(e: any) => {
            e.target.blur();
            setInputName("input2");
          }}
          onChange={onChangeInput}
          handleClick={() => {
            handleClick(3);
          }}
          isActive={isActive}
        />
      </div>
      <div className="mt-[25px]">
        <KeyboardComponent
          ref={(r: any) => (keyboard.current = r)}
          handleKeyPress={handleKeyPress}
          inputName={inputName}
          onChange={onChangeAll}
        />
      </div>
      <div>
        <FooterNav
          prevClick={() => navigate(-1)}
          nextClick={() => {
            sendValue()
          }}
        />
      </div>
    </div>
  </>
  );
};

export default AddDocument;
