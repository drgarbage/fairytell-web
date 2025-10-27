import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/hooks/useUser";
import { MessageProvider } from "@/hooks/useMessage";
import { ThemeProvider } from "flowbite-react";
import { ThemeInit } from "../../.flowbite-react/init";
import fetchDefaultBroker from "@/client-services/preference/defaultBroker";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "GirlHub",
  description: "連結專業模特兒，創造美好瞬間",
};

export default async function RootLayout({ children }) {
  const defaultBroker = await fetchDefaultBroker();

  return (
    <ThemeProvider>
      <html>
        <head>
          <ThemeInit />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index,follow" />
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content="按摩,指油壓,理容,舒壓,全身放鬆,店家訊息,價錢,聯絡電話,個人工作室,回頭客,SPA,保養,放鬆,甜心寶貝,包養網,乾爹,包養,正妹,約會,約會平台,線上交友,交友平台,個工,魚訊,茶訊,約妹,平臺,全臺灣,真實,台北按摩推薦,台北SPA工作室,桃園男士理容舒壓,高雄個人按摩工作室,新北全身SPA推薦,台灣男士理容服務,個人工作室價格表,台中SPA舒壓評價,高雄指油壓個人工作室,台中舒壓按摩價格,台北24小時按摩,新竹男士舒壓按摩,按摩舒壓評價真實,全身指壓舒壓店,台灣包養網推薦,甜心寶貝交友平台,找乾爹包養網站,正妹包養價格,台北甜心交友,高雄包養平台評價,包養合約怎麼談,台北約妹平台,高雄魚訊最新情報,台中茶訊評價分享,全台約妹論壇,新北真實魚訊平台,台南茶訊妹名單,約妹安全教學,台北按摩舒壓,台中包養網,高雄約妹推薦,桃園魚訊平台,新竹甜心寶貝交友,台南指油壓舒壓,屏東個工真實,台北按摩舒壓價格,高雄包養行情,台中約妹真實評價,桃園魚訊安全可靠,新竹按摩舒壓便宜,台南茶訊好評推薦,全台包養網比較" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:type" content="Article" />
          <meta property="og:locale" content="zh_TW" />
          <meta property="og:site_name" content={metadata.title} />
          <meta property="og:image" content="https://girlhub.web.app/apple-touch-icon.png"/>
          <meta property="og:url" content="https://girlhub.web.app" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="keywords" content="網紅,按摩,個工,SEX365,論壇,SJC,行者嚴選,JKF,捷克,Wuso,屋受,個人工作室,個工,按摩,舒壓,油壓,指壓,SPA,約炮,外約,全台外約,外送,全台外送,外送茶,全台外送茶,茶莊,仟色,索格論壇,索格,Go141,休閒小棧,休閒,小女人,PPP休閒網,脫衣裸聊,Swag裸聊,5278論壇,台灣正妹,台灣正妹報,一世發論壇,Sogo論壇,Sogo,比思論壇,比思,成人論壇,成人,一夜情,老司機最愛,老司機,成人交友,交友,約炮網站,98娛樂,甜心圈,甜心花園,甜心包養網,包養網,甜心網,包養" />
          <meta name="description" content="AJA GirlHub — 亞洲精彩受歡迎的兩性約會論壇" />
          <meta name="generator" content="AJA GirlHub" />
          <meta name="author" content="AJA GirlHub" />
          <meta name="copyright" content="2025 AJA GirlHub" />
          <meta name="MSSmartTagsPreventParsing" content="True" />
          <meta httpEquiv="MSThemeCompatible" content="Yes" />
          <meta property="article:author" content="https://girlhub.web.app" />
          <meta property="article:publisher" content="https://girlhub.web.app" />
          <link rel="canonical" href="https://girlhub.web.app" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: metadata.title,
                description: metadata.description,
                url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
                keywords: [
                  "按摩","指油壓","理容","舒壓","全身放鬆","店家訊息","價錢","聯絡電話","個人工作室",
                  "回頭客","SPA","保養","放鬆","甜心寶貝","包養網","乾爹","包養","正妹","約會",
                  "約會平台","線上交友","交友平台","個工","魚訊","茶訊","約妹","平臺","全臺灣","真實",
                  "台北按摩推薦","台北SPA工作室","桃園男士理容舒壓","高雄個人按摩工作室","新北全身SPA推薦",
                  "台灣男士理容服務","個人工作室價格表","台中SPA舒壓評價","高雄指油壓個人工作室",
                  "台中舒壓按摩價格","台北24小時按摩","新竹男士舒壓按摩","按摩舒壓評價真實","全身指壓舒壓店",
                  "台灣包養網推薦","甜心寶貝交友平台","找乾爹包養網站","正妹包養價格","台北甜心交友",
                  "高雄包養平台評價","包養合約怎麼談","台北約妹平台","高雄魚訊最新情報","台中茶訊評價分享",
                  "全台約妹論壇","新北真實魚訊平台","台南茶訊妹名單","約妹安全教學","台北按摩舒壓","台中包養網",
                  "高雄約妹推薦","桃園魚訊平台","新竹甜心寶貝交友","台南指油壓舒壓","屏東個工真實",
                  "台北按摩舒壓價格","高雄包養行情","台中約妹真實評價","桃園魚訊安全可靠","新竹按摩舒壓便宜",
                  "台南茶訊好評推薦","全台包養網比較"
                ],
                address: undefined
              })
            }}
          />
        </head>
        <body className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 ${geistSans.variable} ${geistMono.variable}`}>
            <MessageProvider>
              <UserProvider defaultBroker={defaultBroker}>
                <Navbar />
                {children}
              </UserProvider>
            </MessageProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
