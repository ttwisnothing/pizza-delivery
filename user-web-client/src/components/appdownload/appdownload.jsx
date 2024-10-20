import React from "react";
import "./appdownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      {/* ข้อความแนะนำให้ดาวน์โหลดแอป Tomato */}
      <p>
        For Better Experience Download <br /> Tomato App{" "}
      </p>
      <div className="app-download-platforms">
        {/* แสดงโลโก้ของ Play Store และ App Store พร้อมลิงก์ */}
        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.play_store} alt="Download on Play Store" />
        </a>
        <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.app_store} alt="Download on App Store" />
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
