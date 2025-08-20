"use client";

import { useEffect, useState } from "react";
import { Tabs, List, Spin, App } from "antd";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";
import styles from "./ProfilePage.module.scss";
import ProfileInfoCard from "../components/Profile.tsx/ProfileInfoCard";
import { fetchProfileData } from "@/api/profile.api";
import { ProfileData } from "@/types/profile.dto";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [twoFAOpen, setTwoFAOpen] = useState(false);

  const { message } = App.useApp();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await fetchProfileData();
      setProfile(data);
    } catch (err) {
      console.error(err);
      message.error("Не удалось загрузить профиль");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoadingPassword(true);
    try {
      // await changePassword(values.currentPassword, values.newPassword);
      message.success("Пароль успешно изменён");
    } catch (err) {
      message.error("Ошибка смены пароля");
    } finally {
      setLoadingPassword(false);
    }
  };

  if (loading) {
    return <Spin size="large" className={styles.spin} />;
  }

  if (!profile) {
    return <div>Не удалось загрузить профиль</div>;
  }

  // Создаём items для Tabs (новый синтаксис)
  const tabItems = [
    {
      key: "ips",
      label: "IP-адреса",
      children: (
        <List
          dataSource={profile.provided_ip}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "hosts",
      label: "Хосты",
      children: (
        <List
          dataSource={profile.provided_host}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "emails",
      label: "Email",
      children: (
        <List
          dataSource={profile.provided_email}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
  ];

  return (
    <div className={styles.profile}>
      <section>
        <ProfileInfoCard
          login={profile.login}
          email={profile.email}
          company_name={profile.company_name}
          must_change_password={profile.must_change_password}
          twoFAEnabled={profile["2fa_enabled"]}
          onSetup2FA={() => setTwoFAOpen(true)}
          onPasswordChange={onPasswordChange}
          loadingPassword={loadingPassword}
        />
        <Tabs
          defaultActiveKey="info"
          className={styles.tabs}
          items={tabItems}
        />
      </section>

      <TwoFactorAuth
        open={twoFAOpen}
        onClose={() => setTwoFAOpen(false)}
        onSuccess={() => {
          message.success("2FA включена");
          loadProfile(); // обновляем профиль
        }}
      />
    </div>
  );
}
