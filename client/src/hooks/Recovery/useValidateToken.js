import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useValidateToken = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/validate-recovery/${token}`);
        if (res.data.valid) {
          setEmail(res.data.email);
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };

    validate();
  }, [token]);

  return { status, email };
};

export default useValidateToken;
