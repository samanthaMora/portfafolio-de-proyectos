import { useEffect, useState } from "react";
import isTokenValid from "../../utils/isTokenValid.js";
import renewToken from "../../utils/renewToken.js";

const useAuthReady = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prepareAuth = async () => {
      if (isTokenValid()) {
        setReady(true);
      } else {
        const newToken = await renewToken();
        setReady(!!newToken);
      }
    };

    prepareAuth();
  }, []);

  return ready;
};

export default useAuthReady;
