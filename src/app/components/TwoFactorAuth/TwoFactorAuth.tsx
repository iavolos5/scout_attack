import React from "react";
import { Form, Input, Button, Switch, Space, Image } from "antd";
import styles from "./TwoFactorAuth.module.scss";

type TwoFactorAuthProps = {
  loading2FA: boolean;
  qrCode: string | null;
  onTwoFactorToggle: (checked: boolean) => void;
};

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  loading2FA,
  qrCode,
  onTwoFactorToggle,
}) => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
                Отсканируйте этот QR-код в Google Authenticator и введите код в
                подтверждении.
              </div>
            </div>
          )}
        </Space>
      </div>
    </Space>
  );
};

export default TwoFactorAuth;
