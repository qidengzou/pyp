import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "门店智慧助手",
  description: "为您提供便捷的门店打卡与优惠服务",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
