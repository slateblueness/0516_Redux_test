import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMemo,
  deleteMemo,
  likeMemoRedux,
  likeMemoToolkit,
} from "../slices/memoSlice";

export default function MemoComp() {
  // memoSlice.js의 initialState에 있는 배열이 memolist에 들어가게 됨
  const memolist = useSelector((state) => state.memo);
  const [input, setInput] = useState();

  const dispatch = useDispatch();

  return (
    <div>
      <h1>MEMO LIST</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch(addMemo(input));
        }}
      >
        +
      </button>

      {memolist.map((memo, index) => (
        <div key={memo.id}>
          <h3>{memo.text}</h3>
          <span>{memo.date}</span>

          {/* likeMemoRedux 사용하여 하트 변경 */}
          <button
            onClick={() => {
              dispatch(likeMemoRedux(memo.id));
            }}
          >
            {memo.isLike ? "♥" : "♡"}
          </button>

          {/* likeMemoToolkit 사용하여 하트 변경 */}
          <button
            onClick={() => {
              dispatch(likeMemoToolkit({ index: index, memo: memo }));
            }}
          >
            {memo.isLike ? "♥" : "♡"}
          </button>
          <button
            onClick={() => {
              dispatch(deleteMemo(index));
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
