import "./PanelTop.css";
import { icon } from "../../img";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function PanelTop() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("encodedToken");
      }

  return (
    <div className="panel-top">
      <img src={icon} alt="icon" width="50" height="50" />
      <SearchBar />
      <div className="phone-icons">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/external-regular-kawalan-studio/96/external-new-post-social-media-regular-kawalan-studio-2.png"
          alt="external-new-post-social-media-regular-kawalan-studio-2"
          onClick={()=>navigate("/new-post")}
        />
        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/90/exit.png" alt="exit" onClick={logoutHandler}/>
      </div>
    </div>
  );
}
