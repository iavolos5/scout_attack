"use client";

import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { loginUser } from "@/api/auth";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const onFinish = async (values: { login: string; password: string }) => {
    try {
      const { success } = await loginUser(values.login, values.password);
      if (success === true) {
        router.push("/dashboard");
      }
    } catch (error) {
      message.error((error as Error).message || "Ошибка входа");
    }
  };

  return (
    <div className={styles.container}>
      <Form
        name="login"
        onFinish={onFinish}
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
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>

        <div className={styles.footer}>&copy; Scout Attack</div>
      </Form>
    </div>
  );
}
