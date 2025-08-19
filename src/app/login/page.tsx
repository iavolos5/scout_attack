"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Input, Button, App, Spin } from "antd";
import styles from "./LoginPage.module.scss";
import { fetchLoginUser, verify2FA } from "@/api/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const { message } = App.useApp();

  const [require2fa, setRequire2fa] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinishLogin = async (values: { login: string; password: string }) => {
    try {
      setLoading(true);
      const res = await fetchLoginUser(values.login, values.password);

      if (res.require2fa) {
        setRequire2fa(true);
        message.info("Введите код двухфакторной аутентификации");
      } else if (res.success) {
        if (res.must_change_password) {
          message.warning("Необходимо сменить пароль");
          router.push("/profile"); // или куда у тебя смена пароля
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      message.error((error as Error).message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const onFinish2FA = async (values: { code: string }) => {
    try {
      setLoading(true);
      const res = await verify2FA(values.code);

      if (res.success) {
        if (res.must_change_password) {
          message.warning("Необходимо сменить пароль");
          router.push("/profile");
        } else {
          message.success("Успешный вход");
          router.push("/dashboard");
        }
      } else {
        message.error("Неверный код 2FA");
      }
    } catch (error) {
      message.error((error as Error).message || "Ошибка проверки 2FA");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <Spin size="large" className={styles.spin} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!require2fa ? (
        <Form
          name="login"
          onFinish={onFinishLogin}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Войти
            </Button>
          </Form.Item>

          <div className={styles.footer}>&copy; Scout Attack</div>
        </Form>
      ) : (
        <Form
          name="2fa"
          onFinish={onFinish2FA}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            label="Код из приложения"
            name="code"
            rules={[
              { required: true, message: "Введите 6-значный код" },
              { len: 6, message: "Код должен состоять из 6 цифр" },
            ]}
          >
            <Input placeholder="123456" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Подтвердить
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
