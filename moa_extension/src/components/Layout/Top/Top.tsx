import "./Top.css";

export default function Top() {

  return (
    <header className="top">
      <h1 className="top-title">MOA</h1>

      {(
        <button className="top-dashbutton">
          대시보드 
        </button>
      )}
    </header>
  );
}
