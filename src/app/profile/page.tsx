"use client";

import { useEffect, useState } from "react";
import { Tabs, List, Spin } from "antd";
import { App } from "antd";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";
import styles from "./ProfilePage.module.scss";
import Profile from "../components/Profile.tsx/Profile";
import ProfileInfoCard from "../components/Profile.tsx/ProfileInfoCard";

const { TabPane } = Tabs;

interface Profile {
  login: string;
  email: string;
  company_name: string;
  must_change_password: boolean;
  "2fa_enabled": boolean;
  provided_ip: string[];
  provided_host: string[];
  provided_email: string[];
}

interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

const MOCK_CURRENT_PASSWORD = "current_password_123";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loading2FA, setLoading2FA] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [twoFAOpen, setTwoFAOpen] = useState(false);

  const { message } = App.useApp();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("https://83.220.170.171/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onPasswordChange = async (values: PasswordChange) => {
    setLoadingPassword(true);
    setTimeout(() => {
      if (values.currentPassword !== MOCK_CURRENT_PASSWORD) {
        message.error("Текущий пароль неверен");
      } else {
        message.success("Пароль успешно изменён");
      }
      setLoadingPassword(false);
    }, 900);
  };

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <Spin size="large" className={styles.spin} />
      </div>
    );
  }

  if (!profile) return <div>Не удалось загрузить профиль</div>;

  return (
    <div className={styles.profile}>
      <section>
        <Tabs defaultActiveKey="info" className={styles.tabs}>
          <TabPane tab="Основное" key="info">
            <ProfileInfoCard
              login={profile.login}
              email={profile.email}
              company_name={profile.company_name}
              must_change_password={profile.must_change_password}
              twoFAEnabled={profile["2fa_enabled"]}
              onSetup2FA={() => setTwoFAOpen(true)}
            />
          </TabPane>

          <TabPane tab="IP-адреса" key="ips">
            <List
              dataSource={profile.provided_ip}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </TabPane>

          <TabPane tab="Хосты" key="hosts">
            <List
              dataSource={profile.provided_host}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </TabPane>

          <TabPane tab="Email" key="emails">
            <List
              dataSource={profile.provided_email}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </TabPane>

          <TabPane tab="Смена пароля" key="password">
            <Profile
              loadingPassword={loadingPassword}
              onPasswordChange={onPasswordChange}
            />
          </TabPane>
        </Tabs>
      </section>

      <TwoFactorAuth
        open={twoFAOpen}
        onClose={() => setTwoFAOpen(false)}
        onSuccess={() => {
          message.success("2FA включена");
          fetchProfile(); // обновляем профиль
        }}
      />
    </div>
  );
}
