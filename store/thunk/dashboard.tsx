import { Http } from "@/utils/http";
import { AppDispatch } from "..";
import { AxiosError } from "axios";
import { dashboardActions } from "../slice/dashboard";

export const getSummary = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(dashboardActions.setLoading(true));
    dispatch(dashboardActions.setError(null));
    dispatch(dashboardActions.setData({}));

    try {
      const {
        data: { data, status },
      } = await new Http().get(`/identity-verification/summary`);

      if (status === 200) {
        dispatch(dashboardActions.setData(data));
      }

      dispatch(dashboardActions.setLoading(false));
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        dispatch(dashboardActions.setError(err.response?.data?.ErrorMessage));
        dispatch(dashboardActions.setLoading(false));
      }
    }
  };
};
