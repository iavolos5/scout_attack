"use client";

import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { loginUser } from "@/services/auth";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  // const onFinish = async (values: { login: string; password: string }) => {
  //   try {
  //     // await loginUser(values.login, values.password);
  //     message.success("Успешный вход");
  //     router.push("/dashboard"); // без перезагрузки страницы
  //   } catch (error) {
  //     message.error((error as Error).message || "Ошибка входа");
  //   }
  // };
  const onFinish = async (values: { login: string; password: string }) => {
    try {
      // Заглушка: ставим куку session_id
      document.cookie = `session_id=dummy-session-id; path=/; max-age=${
        7 * 24 * 60 * 60
      }`;

      message.success("Успешный вход");
      router.push("/dashboard");
    } catch (error) {
      message.error((error as Error).message || "Ошибка входа");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        style={{ width: 300 }}
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
        <div style={{ textAlign: "center", marginTop: 16, color: "#888" }}>
          &copy; Scout Attack
        </div>
      </Form>
    </div>
  );
}
