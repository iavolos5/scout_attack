import React, { type Dispatch, type SetStateAction } from "react";
import { Card, Typography, Button, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface ProfileInfoCardProps {
  login: string;
  email: string;
  company_name: string;
  must_change_password: boolean;
  twoFAEnabled: boolean;
  onSetup2FA?: () => void;
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  login,
  email,
  company_name,
  must_change_password,
  twoFAEnabled,
  onSetup2FA,
  setShowPasswordModal,
}) => {
  return (
    <Card
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "500px",
        },
      }}
    >
      <Title level={3}>Профиль</Title>
      {must_change_password && (
        <Text type="danger">
          <CheckCircleOutlined style={{ color: "red", marginRight: 8 }} />
          Необходимо сменить пароль
        </Text>
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

      <Space direction="vertical" style={{ width: "70%" }}>
        {twoFAEnabled ? (
          <Text type="success">
            <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
            Установлена двухфакторная аутентификация
          </Text>
        ) : (
          onSetup2FA && (
            <Button type="primary" onClick={onSetup2FA} block>
              Установить двухфакторную аутентификацию
            </Button>
          )
        )}

        <Button type="default" onClick={() => setShowPasswordModal(true)} block>
          Сменить пароль
        </Button>
      </Space>
    </Card>
  );
};

export default ProfileInfoCard;
