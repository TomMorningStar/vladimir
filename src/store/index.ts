import { configureStore } from '@reduxjs/toolkit'
import rootSlice from './rootSlice'

const store = configureStore({
  reducer: {
    rootSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
