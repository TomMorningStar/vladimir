import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FetchingDataPayload {
  phone: string;
  operator: string;
  minutes: number;
  internet: number;
  sms: number;
  rent: boolean;
  buy: boolean;
}

export const rootSlice = createSlice({
  name: 'rootSlice',
  initialState: {
    phone: '' as string,
    operator: '' as string,
    minutes: 200 as number,
    internet: 5 as number,
    sms: 0 as number,
    wifi: {
      rent: false,
      buy: false
    } as { rent: boolean, buy: boolean },
    socialsSum: 0 as number,
    total: 205 as number,
    loading: true as boolean,
  },
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload as string;
    },
    setMinutes: (state, action) => {
      state.minutes = action.payload as number;
    },
    setInternet: (state, action) => {
      state.internet = action.payload as number;
    },
    setRent: (state, action) => {
      state.wifi.rent = action.payload as boolean;
    },
    setBue: (state, action) => {
      state.wifi.buy = action.payload as boolean;
    },
    setSocialsSum: (state, action) => {
      state.socialsSum = action.payload as number;
    },
    setSms: (state, action) => {
      state.sms = action.payload as number;
    },

    fetchingData: (state, action: PayloadAction<FetchingDataPayload>) => {
      const payload = action.payload;
      state.phone = payload.phone;
      state.operator = payload.operator;
      state.minutes = payload.minutes;
      state.internet = payload.internet;
      state.sms = payload.sms;
      state.wifi.rent = payload.rent;
      state.wifi.buy = payload.buy;
      state.loading = false;
    }

  }
});

export default rootSlice.reducer;
export const { setPhone, fetchingData, setMinutes, setSms, setInternet, setBue, setRent, setSocialsSum } = rootSlice.actions;

