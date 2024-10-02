import { useEffect, useRef } from "react";


export const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target )) {
        // Use a small timeout to allow other actions to complete before closing
        setTimeout(() => callback(), 50);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback]);

  return ref;
}