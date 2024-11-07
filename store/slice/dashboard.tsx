import { Slice, createSlice } from "@reduxjs/toolkit";

export interface DashboardState {
  data: Record<any, any>;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: {
    totalUser: 0,
    totalVerifiedUser: 0,
    totalMenunggu: 0,
    totalDitolak: 0,
  },
  loading: true,
  error: null,
};

const dashboardSlice: Slice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setData: (state: DashboardState, action) => {
      state.data = action.payload;
    },
    setLoading: (state: DashboardState, action) => {
      state.loading = action.payload;
    },
    setError: (state: DashboardState, action) => {
      state.error = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
