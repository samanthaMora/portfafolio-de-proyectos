import { Navigate } from "react-router-dom";

/**
 * Landing: redirige instantáneamente a /login.
 */
export default function Landing() {
  return <Navigate to="/login" replace />;
}