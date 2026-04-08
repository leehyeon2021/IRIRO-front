import { Outlet } from "react-router-dom";
import "../../css/AppShell.css";
import BannerImg from "../../assets/banner.png";

export default function MainLayout() {
  return (
    <div className="page-layout">
      <aside className="side-banner left-banner">
        <div className="banner-box">
          <img src={BannerImg} alt="배너" className="banner" />
        </div>
      </aside>

      <main className="app-shell">
        <Outlet />
      </main>

      <aside className="side-banner right-banner">
        <div className="banner-box">
          <img src={BannerImg} alt="배너" className="banner" />
        </div>
      </aside>
    </div>
  );
}