// app/profile/page.tsx
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

const { Title } = Typography;

// Мокаем текущий пароль — в реальном приложении проверка происходит на бэке
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

    // Имитация запроса к бэку
    setTimeout(() => {
      // Здесь должна быть реальная валидация на сервере
      if (values.currentPassword !== MOCK_CURRENT_PASSWORD) {
        message.error("Текущий пароль неверен");
        setLoadingPassword(false);
        return;
      }

      // Успешная смена пароля
      message.success("Пароль успешно изменён");
      setLoadingPassword(false);
      // если нужно — очистить поля (можно через form.resetFields(), но для простоты оставим)
    }, 900);
  };

  const onTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      setLoading2FA(true);

      // Симуляция генерации QR с бэка
      setTimeout(() => {
        // В реальности бэкенд вернёт link/qrImage и секрет для привязки
        setQrCode(
          "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MyApp:User?secret=ABC123&issuer=MyApp"
        );
        setLoading2FA(false);
        message.success("Показан QR-код для привязки в Google Authenticator");
      }, 900);
    } else {
      // Отключаем 2FA (в реальности — запрос на бэкенд)
      setQrCode(null);
      message.info("Двухфакторная аутентификация отключена");
    }
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Профиль
      </Title>

      <div style={{ width: "100%" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Смена пароля */}
          <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
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
          <div style={{ maxWidth: 480, margin: "0 auto", width: "100%" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <div>Двухфакторная аутентификация (Google Authenticator)</div>
                <Switch
                  checked={!!qrCode}
                  loading={loading2FA}
                  onChange={onTwoFactorToggle}
                />
              </Space>

              {qrCode && (
                <div style={{ textAlign: "center" }}>
                  <Image
                    src={qrCode}
                    alt="QR Code"
                    width={200}
                    preview={false}
                  />
                  <div style={{ marginTop: 8 }}>
                    Отсканируйте этот QR-код в Google Authenticator и введите
                    код в подтверждении.
                  </div>

                  {/* В реальном интерфейсе можно добавить поле для ввода OTP и кнопку "Подтвердить" */}
                </div>
              )}
            </Space>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default ProfilePage;
