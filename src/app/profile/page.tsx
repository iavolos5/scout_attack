"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Typography,
  Space,
  message,
  Image,
} from "antd";
import styles from "./ProfilePage.module.scss";

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
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Профиль
      </Title>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Смена пароля */}
        <div className={styles.formWrapper}>
          <Form layout="vertical" onFinish={onPasswordChange}>
            <Form.Item
              label="Текущий пароль"
              name="currentPassword"
              rules={[{ required: true, message: "Введите текущий пароль" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Новый пароль"
              name="newPassword"
              rules={[{ required: true, message: "Введите новый пароль" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Подтверждение пароля"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Подтвердите пароль" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingPassword}
                block
              >
                Сменить пароль
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Двухфакторная аутентификация */}
        <div className={styles.twoFactorWrapper}>
          <Space
            direction="vertical"
            size="middle"
            className={styles.twoFactorSpace}
          >
            <div className={styles.twoFactorSwitchRow}>
              <div>Двухфакторная аутентификация (Google Authenticator)</div>
              <Switch
                checked={!!qrCode}
                loading={loading2FA}
                onChange={onTwoFactorToggle}
              />
            </div>

            {qrCode && (
              <div className={styles.qrContainer}>
                <Image src={qrCode} alt="QR Code" width={200} preview={false} />
                <div className={styles.qrText}>
                  Отсканируйте этот QR-код в Google Authenticator и введите код
                  в подтверждении.
                </div>
              </div>
            )}
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default ProfilePage;
