"use client";

import React, { useState } from "react";
import { Typography, message } from "antd";
import styles from "./ProfilePage.module.scss";
import Profile from "../components/Profile.tsx/Profile";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";

const { Title } = Typography;

const MOCK_CURRENT_PASSWORD = "current_password_123";

const ProfilePage: React.FC = () => {
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const onPasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
  }) => {
    setLoadingPassword(true);
    setTimeout(() => {
      if (values.currentPassword !== MOCK_CURRENT_PASSWORD) {
        message.error("Текущий пароль неверен");
        setLoadingPassword(false);
        return;
      }
      message.success("Пароль успешно изменён");
      setLoadingPassword(false);
    }, 900);
  };

  const onTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      setQrCode(
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MyApp:User?secret=ABC123&issuer=MyApp"
      );
      message.success("Показан QR-код для привязки в Google Authenticator");
    } else {
      setQrCode(null);
      message.info("Двухфакторная аутентификация отключена");
    }
  };

  return (
    <div className={styles.profile}>
      <Title level={2} className={styles.title}>
        Профиль
      </Title>
      <Profile
        loadingPassword={loadingPassword}
        loading2FA={loading2FA}
        qrCode={qrCode}
        onPasswordChange={onPasswordChange}
        onTwoFactorToggle={onTwoFactorToggle}
      />
      <TwoFactorAuth
        loading2FA={loading2FA}
        qrCode={qrCode}
        onTwoFactorToggle={onTwoFactorToggle}
      />
    </div>
  );
};

export default ProfilePage;
