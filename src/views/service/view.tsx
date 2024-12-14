import { ASSETS } from "../../assets/images/assets";
import LanguageBtn from "../../components/LanguageBtn/view";
import { useTranslation } from "react-i18next";

import "./style.scss";
import ServicesCard from "../../components/Cards/ServiceCard/view";
import { APP_ROUTES } from "../../router";
import { useAuthRedirect } from "../../hook/view";
import { usePostStore } from "../../store";
import LoadingPage from "../../components/Loading/view";
import { usePostServicesDetail } from "../../hook/hook";
import { servicesQuery } from "../../common/queries";

const Services = () => {
  const { t, i18n } = useTranslation();

  useAuthRedirect(APP_ROUTES.SERVICES);

  const value = usePostStore((state: any) => state.services);

  const { mutate: servicePost, isPending } = usePostServicesDetail();

  const {data} = servicesQuery()

  const handleClick = (id: any) => {
    servicePost({ company_id: id });
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang); // Tilni localStorage'ga yozish
  };
  return (
    <>
      {isPending && <LoadingPage />}
      <div>
        <div className="bg-gradient-service absolute w-[100%] z-[-9999]  left-0"></div>

        <div className="service-header-container  mx-[auto] pt-[10px]">
          <div className="flex items-center justify-center">
            <img
              className="w-[380px] h-[230px] object-cover z-[9999]"
              src={ASSETS.MainPageLogo}
              alt=""
            />
          </div>
          <div className="w-full">
            <div>
              <p className="text-[42px]">
                {t("home.bannerTitle")}
                <span className="text-[42px] mx-[5px] text-[#3B41C6]">
                  {t("home.bannerTitleSpan")}
                </span>{" "}
                {t("home.bannerTitleLast")}
              </p>
            </div>

            <div className="flex gap-x-[5px] mt-[30px]">
              <div className="border-[#E7E7E7] flex items-center justify-center bg-white border-[2px] w-[130px] h-[55px] rounded-[10px] p-[5px]">
                <img
                  src={ASSETS.Sum}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="border-[#E7E7E7] flex items-center justify-center bg-white border-[2px]  w-[130px] h-[55px] rounded-[10px] p-[5px]">
                <img
                  src={ASSETS.Uzcard}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="border-[#E7E7E7] flex items-center justify-center bg-white border-[2px]  w-[130px] h-[55px] rounded-[10px] p-[5px]">
                <img
                  src={ASSETS.Humo}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-[10px]">
          <div className="flex items-center justify-between">
            <p className="text-[35px] font-[700]">{t("home.selectCompany")}:</p>
            <div className="flex gap-x-[14px] my-[15px]">
              <LanguageBtn
                title="O’Z"
                img={ASSETS.UzFlag}
                isHas={i18n.language === "uz"}
                onClick={() => changeLanguage("uz")}
              />
              <LanguageBtn
                title="РУ"
                img={ASSETS.RuFlag}
                isHas={i18n.language === "ru"}
                onClick={() => changeLanguage("ru")}
              />
            
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-[20px]">
              <ServicesCard
                classNameButton={` w-full mt-auto h-[80px] bg-[#D2AE6D] text-[24px] rounded-[15px] font-[600] text-white`}
                className={`w-[620px] max-w-[620px]  card-gradient-my-incurance pb-[20px]`}
                image={ASSETS.MyInsurance}
                imgClass="max-w-[240px] w-[240px] object-cover"
                imgDivClass="flex items-center justify-center"
                onClick={() => handleClick(3)}
                title=" Работает на рынке Узбекистана с 2009 года, предоставляя надежные и качественные страховые услуги для физических и юридических лиц"
                buttonTitle="ОФОРМИТЬ"
              />
              <ServicesCard
                classNameButton={` w-full mt-auto h-[80px] bg-[#CACACA] text-[24px] rounded-[15px] font-[600] text-white`}
                className={`flex-1  card-gradient-inson pb-[20px]`}
                image={ASSETS.InsonLogo}
                title="Разработанно совместно с Канадской IT компанией - CROSURE"
                buttonTitle="Скоро"

              />
              <ServicesCard
                classNameButton={` w-full mt-auto h-[80px] bg-[#CACACA] text-[24px] rounded-[15px] font-[600] text-white`}
                className={`flex-1 card-gradient-kapital  pb-[20px]`}
                title="Быстрый расчет стоимости полиса. Простое оформление"
                image={ASSETS.KapitalLogo}
                buttonTitle="Скоро"

              />
        </div>
      </div>
    </>
  );
};

export default Services;
