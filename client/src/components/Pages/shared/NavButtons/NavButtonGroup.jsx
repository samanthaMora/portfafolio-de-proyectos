import { useLocation } from "react-router-dom";
import BottonHome from "./BottonHome";
import BottonPerfil from "./BottonPerfil";
import LogoutButton from "./LogoutButton";

const NavButtonGroup = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const buttons = [
    { path: "/home", component: <BottonHome /> },
    { path: "/home/perfil", component: <BottonPerfil /> },
    { path: "logout", component: <LogoutButton /> },
  ];

  return (
    <div className="btn-group mt-3" role="group">
      {buttons.map((btn, index) => {
        if (btn.path !== currentPath || btn.path === "logout") {
          return (
            <div key={index} className="btn-group" role="group">
              {btn.component}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default NavButtonGroup;
