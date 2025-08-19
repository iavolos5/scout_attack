"use client";

import { useEffect, useState } from "react";
import { Tabs, List, Spin } from "antd";
import { App } from "antd";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";
import styles from "./ProfilePage.module.scss";
import Profile from "../components/Profile.tsx/Profile";
import ProfileInfoCard from "../components/Profile.tsx/ProfileInfoCard";
import { fetchProfileData } from "@/api/profile.api";
import { ProfileData } from "@/types/profile.dto";

const { TabPane } = Tabs;

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
          loadProfile(); // обновляем профиль
        }}
      />
    </div>
  );
}
