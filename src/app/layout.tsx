import "antd/dist/reset.css"; // для antd v5+ (если v4 — 'antd/dist/antd.css')
import "./globals.css";
import Headers from "./components/Headers/Headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Headers />
        {children}
      </body>
    </html>
  );
}
