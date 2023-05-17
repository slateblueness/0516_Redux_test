// 리덕스 툴킷을 이용하여 리듀서 파일들을 모아서 사용하는 공간

import { configureStore } from "@reduxjs/toolkit";
import memoSlice from "./slices/memoSlice";

export default configureStore({
  reducer: {
    memo: memoSlice,
  },
});
