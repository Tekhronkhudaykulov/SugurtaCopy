import { useMutation,  } from "@tanstack/react-query";
import { requests } from "../helpers/requests"; // Adjust the path to your request functions
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../router";
import { setToken } from "../helpers/api";
import { socketValueStore, usePostStore } from "../store";
import { StepOne } from "../types/steps";
import {  insuranceValueStore, setCash, stepOneAttributes, stepOneStore, usePostError } from "../store/usePostStore/usePostStore";

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setErrorTitle } = usePostError();

  return useMutation({
    mutationFn: async (inputs: { login: string; password: string }) => {
      const { data } = await requests.postLoginClient({
        login: inputs.login,
        password: inputs.password,
      });
      let token = data?.accessToken;
      setToken(token);
      return data;
    },
    onSuccess: () => {
      navigate(APP_ROUTES.HOME);
    },
    onError: (error: any) => {
      console.log(error, "error auth");
      
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }else if (error?.message){
        setErrorTitle(error.message)
      }
    },
  });
};

type PostCompanyParams = {
  company_id: number; // or whatever type it should be
};

const usePostCompany = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const { setServices } = usePostStore();
  const { setErrorTitle } = usePostError();

  return useMutation<PostCompanyParams>({
    mutationFn: async () => {
      const { data } = await requests.postCompany();
      setServices(data.result);
      return data;
    },
    onSuccess: () => {
    navigate(APP_ROUTES.SERVICES)
    },

    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const usePostServicesDetail = () => {
  const navigate = useNavigate();
  const { setErrorTitle } = usePostError();

  // @ts-ignore

  const { setServiceDetail } = usePostStore();

  return useMutation({
    mutationFn: async (company_id: any) => {
      const { data } = await requests.postCompanyDetail(company_id);
      setServiceDetail(data.result);
      return data;
    },
    onSuccess: (data: any, variables: any) => {
      console.log(data);
      navigate(`${APP_ROUTES.REGISTER_CAR}/${variables.company_id}`);
    },
    onError: (error: any) => {
        console.log(error, "erre")
    },
  });
};

const stepOne = () => {
  const { setErrorTitle } = usePostError();
  // @ts-ignore

  const { setStepOneData } = stepOneStore();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: StepOne) => {
      const { data } = await requests.postStepOne(payload);
      setStepOneData(data.result.data);
      return data;
    },
    onSuccess: () => {
      navigate(APP_ROUTES.DATA_CHECKING_CAR);
    },
    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const stepTwo = () => {
  const { setErrorTitle } = usePostError();
  // @ts-ignore

  const { setStepOneData } = stepOneStore();
  // @ts-ignore
  const {setStepOneAttributesData} = stepOneAttributes();
 
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: StepOne) => {
      const { data } = await requests.postStepTwo(payload);
      setStepOneData(data.result.data);
      setStepOneAttributesData(data.result.attributes)
      return data;
    },
    onSuccess: () => {
      navigate(APP_ROUTES.INSURANCE)
    },
    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const stepThree = () => {
  const { setErrorTitle } = usePostError();
  // @ts-ignore

  const { setStepOneData } = stepOneStore();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: StepOne) => {
      const { data } = await requests.postStepThree(payload);
      setStepOneData(data.result.data);
      return data;
    },
    onSuccess: (res) => {
      navigate(APP_ROUTES.ADDRELATIVES)
    },
    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const stepThreeInfinity = () => {
  const { setErrorTitle } = usePostError();
  // @ts-ignore

  const { setStepOneData } = stepOneStore();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: StepOne) => {
      const { data } = await requests.postStepThree(payload);
      setStepOneData(data.result.data);
      return data;
    },
    onSuccess: () => {
      navigate(APP_ROUTES.CASH)
    },
    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const createInsuranceQuery = () => {
  const { setErrorTitle } = usePostError();


  // @ts-ignore
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: StepOne) => {
      const { data } = await requests.createInsurance(payload);
     console.log(data, 'asfmklasn')
      return data;
    },
    onSuccess: () => {
      navigate(`${APP_ROUTES.PAYMENTTYPE}/${APP_ROUTES.CASH}`)
    },
    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const saveEveryCash = () => {
  const { setErrorTitle } = usePostError();

  const {setEveryCash} = setCash()
 

  // @ts-ignore

  return useMutation({
    mutationFn: async (payload: any
    ) => {
      const { data } = await requests.saveEveryCashFetch(payload);
      setEveryCash(data)
      console.log(data, "cash")
      return data;
    },
    onSuccess: () => {
      // navigate(APP_ROUTES.INSURANCE)
    },
    onError: (error: any) => {
      if (error?.response) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

const payByCash = () => {
  const { setErrorTitle } = usePostError();


  // @ts-ignore
  const {clearValues} = socketValueStore();


  const navigate = useNavigate()

  // @ts-ignore

  return useMutation({
    mutationFn: async () => {
      const { data } = await requests.payByCashFetch();
      return data;
    },
    onSuccess: () => {
      clearValues()
      navigate(APP_ROUTES.SUCCESS)
    },
    onError: (error: any) => {
      if (error) {
        setErrorTitle(error.response.data.message);
      }
    },
  });
};

export {
  useLoginMutation,
  usePostCompany,
  usePostServicesDetail,
  stepOne,
  stepTwo,
  stepThree,
  stepThreeInfinity,
  createInsuranceQuery,
  saveEveryCash,
  payByCash
};
