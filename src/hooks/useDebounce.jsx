import { useEffect, useState } from "react";

function useDebounce(arg, delay) {
  const [debounced, setDebounced] = useState(arg);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(arg);
    }, delay);

    return () => clearTimeout(timeoutId);
    
  }, [delay, arg]);

  return debounced;
}

export default useDebounce;
