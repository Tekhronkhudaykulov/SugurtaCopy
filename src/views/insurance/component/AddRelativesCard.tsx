import { ASSETS } from "../../../assets/images/assets";
import { stepOneAttributes, stepOneStore } from "../../../store/usePostStore/usePostStore";

const AddRelativesCard = ({ person, ind }: any) => {
  // @ts-ignore
  const { stepOneAttributesData } = stepOneAttributes();
  let relative = stepOneAttributesData[1];

  // @ts-ignore
  const { stepOneData, setStepOneData } = stepOneStore();  // stepOneStore'dan ma'lumot olish
  const handleRemoveRelative = () => {
    // `drivers` ro'yxatidan o'chirilgan relative
    const updatedDrivers = stepOneData?.drivers?.filter((_, index) => index !== ind);
    
    // `stepOneData` ni yangilash
    setStepOneData({ ...stepOneData, drivers: updatedDrivers });
  };
  return (
    <div className="bg-white py-[10px] px-[25px] rounded-[35px]">
      <div className="flex items-center justify-between ">
        <p className="text-[20px] font-[700]">{`Родственник-${ind + 1}`}</p>
        <div  onClick={handleRemoveRelative} className="w-[40px] h-[40px] flex items-center justify-center bg-deleteBox rounded-[10px]">
          <img src={ASSETS.Delete} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[8px] mt-[15px]">
        <div className="bg-section py-[10px] px-[20px] rounded-[14px]">
          <p className="text-[18px] font-[500] leading-[26px]">
            Степень родства к владельцу авто:
          </p>
          <select disabled className="text-[20px] font-[700] mt-[5px] !bg-section">
            {relative?.options?.map((item: any, ind: any) => (
              <option
                value={item.ID}
                selected={Number(item.ID) === Number(person?.relative)} 
              >
                {item.NAME}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddRelativesCard;
