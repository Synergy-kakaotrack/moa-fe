import "./Top.css";
import logo from "/MOA_FE/moa_extension/src/assets/logo.png";

export default function Top() {

  return (
    <header className="top">
      <img
        src={logo}
        alt="MOA logo"
        className="tip-logo"
      />

      {(
        <button className="top-dashbutton">
          대시보드 
        </button>
      )}
    </header>
  );
}
