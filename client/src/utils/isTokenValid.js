import parseJwt from "./parseJwt";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return false;

  const now = Date.now() / 1000;
  return decoded.exp > now;
};

export default isTokenValid;
