import "antd/dist/reset.css"; // для antd v5+ (если v4 — 'antd/dist/antd.css')
import "./globals.css";
import Headers from "./components/Headers/Headers";
import { App } from "antd";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Headers />
        <App>{children}</App>
      </body>
    </html>
  );
}
