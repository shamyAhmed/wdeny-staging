import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

import MainLayout from "@/components/layout/MainLayout";
import { Providers } from "@/providers/providers";
import { routing } from "@/i18n/routing";

import "@/styles/antd-reset.scss";
import "@/styles/globals.scss";
import "@/styles/sections.scss";
import "@/styles/modals.scss";
import "react-phone-input-2/lib/style.css";
import "swiper/css";
import "swiper/css/navigation";

import { Tajawal } from "next/font/google";
import LocalFont from "next/font/local";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
  variable: "--font-tajawal",
});

const Norsal = LocalFont({
  src: "../../../public/fonts/norsal.woff2"
});

// ✅ Generate metadata dynamically per locale
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  return {
    title: {
      default: "Welcome",
      template: "%s | Al TAI",
    },
    description: isArabic
      ? " المتجر الرسمي لنادي الطائي، نوفر منتجات أصلية بجودة عالية لجميع مشجعي النادي حول المملكة."
      : "Saudi's first corporate venture studio for AI startups. Sanad helps large companies ride the wave of startups to transformational growth and longevity.",
    icons: {
      icon: "/images/fav-icon.png",
    },
    alternates: {
      languages: {
        en: "https://sanad.studio/en",
        ar: "https://sanad.studio/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${Norsal.className} font-sans`}>
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
