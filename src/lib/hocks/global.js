import { useDispatch } from 'react-redux';
import { directionFun } from '../../store/slices/main';
let x = 0;
const useGlobal = () => {
  const DataTransform = (dateTime) => {
    const utcDateTime = new Date(dateTime + 'Z');

    const localDateTime = utcDateTime.toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    return localDateTime;
  };

  const searchWait = (e, setInputValue, setSearchValue, setFirst) => {
    setInputValue(e.target.value);
    const oldText = e.target.value;
    x++;
    const y = x;
    setTimeout(() => {
      if (x === y) {
        setSearchValue(oldText);
        setFirst(0);
      }
    }, 1000);
  };

  return {
    DataTransform,
    searchWait,
  };
};

export default useGlobal;
