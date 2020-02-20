const debounce = (func, delay) => {
  let timeOut;
  return (...args) => {
    const later = () => {
      timeOut = null;
      func.apply(this, args);
    };
    clearTimeout(timeOut);
    timeOut = setTimeout(later, delay);
  };
};

export { debounce };
