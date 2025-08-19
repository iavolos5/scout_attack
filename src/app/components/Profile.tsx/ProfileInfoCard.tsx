import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

interface ProfileInfoCardProps {
  login: string;
  email: string;
  company_name: string;
  must_change_password: boolean;
  twoFAEnabled: boolean;
  onSetup2FA?: () => void;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  login,
  email,
  company_name,
  must_change_password,
  twoFAEnabled,
  onSetup2FA,
}) => {
  return (
    <Card
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        },
      }}
    >
      <Title level={3}>Профиль</Title>
      {must_change_password && (
        <Text type="danger">Необходимо сменить пароль</Text>
      )}
      <Text>
        <b>Login:</b> {login}
      </Text>

      <Text>
        <b>Email:</b> {email}
      </Text>

      <Text>
        <b>Компания:</b> {company_name}
      </Text>

      {!twoFAEnabled && onSetup2FA && (
        <Button type="primary" onClick={onSetup2FA}>
          Установить двухфакторную аутентификацию
        </Button>
      )}
    </Card>
  );
};

export default ProfileInfoCard;
