import { createSlice } from '@reduxjs/toolkit';

export const rootSlice = createSlice({
  name: 'rootSlice',
  initialState: {
    phone: '' as string,
    operator: '' as string,
    minutes: 200 as number,
    internet: 5 as number,
    wifi: {
      rent: false,
      buy: false
    } as { rent: boolean, buy: boolean },
    socialsSum: 0 as number,
    total: 205 as number,
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
    }
  }
});

export default rootSlice.reducer;
export const { setPhone, setMinutes, setInternet, setBue, setRent, setSocialsSum } = rootSlice.actions;

