import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

import MainLayout from "@/components/layout/MainLayout";
import { Providers } from "@/providers/providers";
import { routing } from "@/i18n/routing";

import "@/styles/globals.scss";
import "@/styles/sections.scss";
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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === "ar";

  return {
    title: {
      default: "Wdeny Travel",
      template: "%s | Wdeny Travel",
    },
    description: isArabic
      ? "وديني هي منصة متكاملة لحجز رحلات الطيران، وشركات النقل الخاصة، وحافلات النقل العام بسهولة وأمان، مع تجربة استخدام سلسة لجميع المستخدمين."
      : "Wdeny is a comprehensive platform for booking flights, private transportation companies, and public buses, offering a seamless and secure travel experience.",
    icons: {
      icon: "/images/fav-icon.png",
    },
    alternates: {
      languages: {
        en: "https://wdeny.com/en",
        ar: "https://wdeny.com/ar",
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
