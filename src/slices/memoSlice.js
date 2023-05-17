// 제공받은 슬라이스를 통해서 이름, 초기값, 리듀서를 작성하는 공간

// 슬라이스 가져오기
import { createSlice } from "@reduxjs/toolkit";

export const memoSlice = createSlice({
  name: "memo",
  initialState: [
    {
      id: 1,
      text: "첫 번째 메모입니다",
      date: "2023-05-16",
      isLike: false,
    },
    {
      id: 2,
      text: "두 번째 메모입니다",
      date: "2023-05-17",
      isLike: true,
    },
  ],
  reducers: {
    addMemo: (state, action) => {
      // 컴포넌트에서 값을 들고올 때는 action을 통해 들고옴
      // action의 payload로 들고올 값을 지정: text값
      // 나머지 id, date, isLike값은 reducer에서 값을 고정
      const newMemo = {
        text: action.payload,
        id: id,
        date: "2023-05-18",
        isLike: false,
      };
      id++;

      // 리덕스 툴킷의 특징: 값에 직접 접근하여 수정해도 값을 업데이트할 수 있음

      // push()는 원본 배열에 값을 바로 추가
      // concat()은 원본 배열은 그대로, return에 값을 추가
      state.push(newMemo);
    },

    deleteMemo: (state, action) => {
      // action.payload로 받아오는 값: 배열의 인덱스 값
      state.splice(action.payload, 1);
    },

    likeMemoRedux: (state, action) => {
      // action.payload로 받아오는 값: memo의 id값
      // 값을 수정할 때, map을 이용하여 수정
      const newMemoList = state.map((memo) =>
        memo.id === action.payload ? { ...memo, isLike: !memo.isLike } : memo
      );

      // 수정 후 새로운 배열을 반환할 때 state에 직접 접근해서 값을 수정하는 것 X
      // return해서 전체 값을 전달하는 방식으로 작성
      return newMemoList;
    },

    likeMemoToolkit: (state, action) => {
      // toolkit에서 state에 직접 접근해서 값을 수정할 수 있음
      // splice를 이용하여 값을 수정하는 방식으로 작성
      // splice가 필요로 하는 인수
      // splice(변경할 인덱스 위치, 삭제할 개수, 수정할 값) 형태로 작성 -> 요소값을 대체
      // 필요한 값: 인덱스 값(payload.index), 수정할 값(payload.memo)

      // 수정할 값을 가지고 와서 isLike값을 변경하여 넣기
      const modifyMemo = {
        ...action.payload.memo,
        isLike: !action.payload.memo.isLike,
      };
      state.splice(action.payload.index, 1, modifyMemo);
    },
  },
});

// 코드 안에서 변수로 사용할 값
let id = 3;

export const { addMemo, deleteMemo, likeMemoRedux, likeMemoToolkit } =
  memoSlice.actions;
export default memoSlice.reducer;
