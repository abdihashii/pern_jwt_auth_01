// Libraries
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../slices/counter/counterSlice';

const IncrementButtons = () => {
  // Redux
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="main-buttons">
        <button
          className="btn btn-outline-success"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="mx-3 align-self-center">{count}</span>
        <button
          className="btn btn-outline-danger"
          aria-label="Increment value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <button
        className="btn btn-outline-primary d-block w-100 my-3"
        aria-label="Reset value"
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
    </>
  );
};

export default IncrementButtons;
