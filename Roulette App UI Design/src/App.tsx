import { useState } from "react";
import { SettingsScreen } from "./components/SettingsScreen";
import { RouletteScreen } from "./components/RouletteScreen";
import { ProductListScreen } from "./components/ProductListScreen";
import defaultProductImage from "figma:asset/8bb7d6ce83afcde3a2422825f3e55e0c167d552f.png";
import product2Image from "figma:asset/8a4655e52a0f56987a8a79937f5b835dc367f9a2.png";
import product3Image from "figma:asset/1cee86544b4b14f4b33065a05022ae908660720b.png";
import product4Image from "figma:asset/9f3ada947f91504bb724929dcdff2201bed6c93b.png";
import product5Image from "figma:asset/940fa32a7881359294e08703a965b681449d40c5.png";
import product6Image from "figma:asset/e16b6ce18a3d70bb3aa2d0d928966d020777103f.png";
import product7Image from "figma:asset/386c438e5618af39b559716969c8911625b17e73.png";
import product8Image from "figma:asset/7f8536536e6c4263b5c493ee4c1c6f5cb5638cea.png";
import product9Image from "figma:asset/7f8e44497f7a97167c2d1b710c10d0ccd824b817.png";
import product10Image from "figma:asset/4fa9fa4abef3a9741f50338f51c54400e1975908.png";
import product11Image from "figma:asset/d71e8e79c7ba9c34130f3e8360e409bbca9e371e.png";
import product12Image from "figma:asset/056bb60361256f73577ab9632144ee006097ea9f.png";
import product13Image from "figma:asset/9a508299bc9096a12bc8e3d414837064792267d8.png";
import product14Image from "figma:asset/ef7b16af6b1700725ab0acd6083269c0cec9224a.png";
import product15Image from "figma:asset/3a4b106a7bf93117e152a0ed6a1b5aa1bd854043.png";
import product16Image from "figma:asset/4a22bd3ca192c229388b3bef948d1ee80eee7405.png";
import product17Image from "figma:asset/ea91984050c3771905fe8d8b1caf0fde3b15b837.png";
import product18Image from "figma:asset/4f54de46064168c7be0f993718df3fa8f080892b.png";
import product19Image from "figma:asset/751d3a2cd98937eaf40679609b2d64676b2a6e89.png";
import product20Image from "figma:asset/59e06a25d6982f3e850ee16dcc2f7e4b5aca8e6b.png";
import product21Image from "figma:asset/8b499bc38cf336d8004a6ff41e31b56c33ea05d7.png";
import product22Image from "figma:asset/098396ead51fc8ba9082c72fbe689e4356e807a6.png";
import product23Image from "figma:asset/76f8b1c1b2f45808915c4dfd543da8c4294a4488.png";
import product24Image from "figma:asset/65c76567927c7473bd0ca8c3ad16a37e13fa9f11.png";
import product25Image from "figma:asset/af8d39ad883cef94227bc9ea0f1b4a62cdc9ae47.png";

export interface Product {
  id: number;
  name: string;
  image: string | null;
  rarity?: "normal" | "rare" | "super-rare";
}

export interface AppState {
  title: string;
  rouletteItems: string[];
  products: Product[];
  selectedItems: string[];
  revealedProducts: number[];
  history: string[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "settings" | "roulette" | "productList"
  >("settings");
  const [appState, setAppState] = useState<AppState>({
    title: "2025年度忘年会　ビンゴ大会",
    rouletteItems: [
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
    ],
    products: Array.from({ length: 25 }, (_, i) => {
      const productNames = [
        "Nebula Capsule Air",
        "Dyson(ダイソン) ドライヤー",
        "スマートバスマット（メタモン）",
        "ロジクール MX KEYS mini KX700GRd",
        "体を動かす楽しみギフト",
        "メディキューブ AGE-Rブースタープロ ミニ ホワイト",
        "ヘッドスパチケット",
        "特選 牛肉　カタログギフト",
        "育てるタオル feel バスタオル ムーングレージュ",
        "大谷翔平 ワールドシリーズ優勝記念レプリカサインボール",
        "Moon Pillow ムーンピロー ダークグレー",
        "ジューサー ミキサー",
        "オールインワンEAA",
        "BRUNO ボリューム ノブ スピーカー",
        "クラゲ加湿器",
        "nerugoo[ネルグー ホットアイマスク",
        "タンブラー 保温 保冷 蓋付き ストロー付 350ml",
        "電気湯たんぽ",
        "SHIRO キンモクセイ ファブリックソフナー 500mL 柔軟剤",
        "キユーピー 卵を味わうマヨネーズ(瓶) 、ろく助 塩 130g",
        "フンドーキン 世界一木樽醬油 500ml",
        "シルク ナイトキャップロング",
        "キューブ オタマトーンシリーズ オタマトーンカービィVer.",
        "二重断熱ガラスポット",
        "小倉山荘 をぐら山春秋",
      ];

      // レアリティの設定（1番目: スーパーレア / 2～7番目: レア / 8番目以降: 通常）
      const rarities: ("normal" | "rare" | "super-rare")[] = [
        "super-rare",
        "rare",
        "rare",
        "rare",
        "rare",
        "rare",
        "rare",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal",
      ];

      return {
        id: i + 1,
        name: productNames[i],
        image:
          i === 1
            ? product2Image
            : i === 2
              ? product3Image
              : i === 3
                ? product4Image
                : i === 4
                  ? product5Image
                  : i === 5
                    ? product6Image
                    : i === 6
                      ? product7Image
                      : i === 7
                        ? product8Image
                        : i === 8
                          ? product9Image
                          : i === 9
                            ? product10Image
                            : i === 10
                              ? product11Image
                              : i === 11
                                ? product12Image
                                : i === 12
                                  ? product13Image
                                  : i === 13
                                    ? product14Image
                                    : i === 14
                                      ? product15Image
                                      : i === 15
                                        ? product16Image
                                        : i === 16
                                          ? product17Image
                                          : i === 17
                                            ? product18Image
                                            : i === 18
                                              ? product19Image
                                              : i === 19
                                                ? product20Image
                                                : i === 20
                                                  ? product21Image
                                                  : i === 21
                                                    ? product22Image
                                                    : i === 22
                                                      ? product23Image
                                                      : i === 23
                                                        ? product24Image
                                                        : i ===
                                                            24
                                                          ? product25Image
                                                          : defaultProductImage,
        rarity: rarities[i],
      };
    }),
    selectedItems: [],
    revealedProducts: [],
    history: [],
  });

  const goToRoulette = () => {
    setCurrentScreen("roulette");
  };

  const goToSettings = () => {
    setCurrentScreen("settings");
  };

  const goToProductList = () => {
    setCurrentScreen("productList");
  };

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentScreen === "settings" ? (
        <SettingsScreen
          appState={appState}
          updateAppState={updateAppState}
          goToRoulette={goToRoulette}
        />
      ) : currentScreen === "productList" ? (
        <ProductListScreen
          appState={appState}
          updateAppState={updateAppState}
          goToSettings={goToSettings}
          goToRoulette={goToRoulette}
        />
      ) : (
        <RouletteScreen
          appState={appState}
          updateAppState={updateAppState}
          goToSettings={goToSettings}
          goToProductList={goToProductList}
        />
      )}
    </div>
  );
}