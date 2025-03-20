import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "VuiTruyen - Đọc Truyện Tranh Online",
  description: "Web đọc truyện tranh manhwa, manhua, manga, ngôn tình, tiên hiệp, kiếm hiệp online hay và mới nhất cập nhật liên tục",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-new-gr-c-s-check-loaded="14.1226.0" data-gr-ext-installed="" cz-shortcut-listen="true">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 mt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
