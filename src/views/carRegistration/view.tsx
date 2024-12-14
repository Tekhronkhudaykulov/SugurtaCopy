import { useNavigate, useParams } from "react-router-dom";
import { FooterNav, KeyboardComponent, Text } from "../../components";
import "./style.scss";
import { APP_ROUTES } from "../../router";
import { useRef, useState } from "react";
import { usePostStore } from "../../store";
import { useAuthRedirect } from "../../hook/view";
import { stepOne } from "../../hook/hook";
import LoadingPage from "../../components/Loading/view";
import Notification from "../../components/Notification/view";
import { usePostError } from "../../store/usePostStore/usePostStore";
import { useTranslation } from "react-i18next";
import { ASSETS } from "../../assets/images/assets";

const RegisterCar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { t } = useTranslation();

      // @ts-ignore
  const { serviceDetail } = usePostStore();

  const { errorTitle } = usePostError();

  const { mutate, isPending, isError } = stepOne();

  const [singleObject] = Array.isArray(serviceDetail) ? serviceDetail : [];



  const [inputs, setInputs] = useState({});
  const [isActive, setIsActive] = useState(5);

  const [layoutName, setLayoutName] = useState("default");

  useAuthRedirect(`${APP_ROUTES.REGISTER_CAR}/${id}`);

  const [inputName, setInputName] = useState("");

  const keyboard = useRef(null);

  const onChangeAll = (inputs: any) => {
    // Ensure that `input1` length does not exceed 8 characters
    if (inputs.input1 && inputs.input1.length > 8) {
      inputs.input1 = inputs.input1.slice(0, 8); // Truncate to 8 characters
    }
    if (inputs.input2 && inputs.input2.length > 3) {
      inputs.input2 = inputs.input2.slice(0, 3); // Truncate to 8 characters
    }
    if (inputs.input3 && inputs.input3.length > 3) {
      inputs.input3 = inputs.input3.slice(0, 7); // Truncate to 8 characters
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
    const value = inputs[inputName] || "";

    return value;
  };

  const handleClick = () => {
    mutate({
      company_id: singleObject.service_id,
      service_id: singleObject.service_id,
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
      <div className="flex flex-col ">
        <div className="register-car-container h-max">
          <div className="bg-[#F4F4F4] py-[15px] px-[15px] rounded-[36px] ">
            <div>
              <Text
                text={t("serviceDetail.carNum")}
                className="text-[20px] font-[500] mb-[5px]"
              />
              <div
                onClick={() => setIsActive(0)}
                className={isActive === 0 ? "focus-input button-animation" : ""}
                tabIndex={0}
              >
                <input
                  name="input1"
                  className={`px-[20px] border-none  h-[60px] text-[22px] w-full font-[500]  outline-none text-[#E8E8E8]   rounded-[21px]`}
                  type="text"
                  placeholder="01A000AA"
                  value={getInputValue("input1")}
                  onFocus={(e: any) => {
                    e.target.blur();
                    setInputName("input1");
                  }}
                  onChange={onChangeInput}
                  maxLength={8}
                />
              </div>
            </div>
            <div className="mt-[15px]">
              <Text
                text={t("serviceDetail.carSeria")}
                className="text-[20px]  font-[500] mb-[5px]"
              />
              <div className="input-container">
                <div
                  onClick={() => setIsActive(1)}
                  className={
                    isActive === 1 ? "focus-input button-animation" : ""
                  }
                >
                  <input
                    name="input2"
                    className="pl-[30px] h-[60px] border-none  text-[20px] w-full font-[500] outline-none text-[#E8E8E8] border rounded-[21px]"
                    type="text"
                    placeholder="AAF"
                    value={getInputValue("input2")}
                    onFocus={(e: any) => {
                      e.target.blur();
                      setInputName("input2");
                    }}
                    onChange={onChangeInput}
                    maxLength={3}
                  />
                </div>
                <div
                  onClick={() => setIsActive(2)}
                  className={
                    isActive === 2 ? "focus-input button-animation" : ""
                  }
                >
                  <input
                    name="input3"
                    className="px-[20px] h-[60px] border-none   text-[22px] w-full font-[500] outline-none text-[#E8E8E8] border rounded-[21px]"
                    type="number"
                    placeholder={t("serviceDetail.numberTexPass")}
                    value={getInputValue("input3")}
                    onFocus={(e: any) => {
                      e.target.blur();
                      setInputName("input3");
                    }}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F4F4F4] py-[10px] flex items-center justify-center px-[15px] rounded-[36px] ">
            <div className="  rounded-[30px]">
             <img src={ASSETS.MyInsurance} alt="" />
            </div>
          </div>
        </div>
        <KeyboardComponent
          className=" w-[100%] mx-auto !mt-[10px]"
          ref={(r: any) => (keyboard.current = r)}
          handleKeyPress={handleKeyPress}
          inputName={inputName}
          onChange={onChangeAll}
        />

        <div className="mt-auto">
          <FooterNav
            prevClick={() => navigate(APP_ROUTES.SERVICES)}
            nextClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterCar;
