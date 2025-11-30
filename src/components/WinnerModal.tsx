import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Star, Zap } from "lucide-react";
import { Product } from "../App";
import { useEffect, useState } from "react";

interface WinnerModalProps {
  product: Product;
  onClose: () => void;
}

export function WinnerModal({
  product,
  onClose,
}: WinnerModalProps) {
  const [showContent, setShowContent] = useState(false);
  const [superRarePhase, setSuperRarePhase] = useState<
    "bad" | "transition" | "good"
  >("bad");

  const rarity = product.rarity || "normal";

  useEffect(() => {
    if (rarity === "super-rare") {
      // スーパーレア：最初は「残念」2秒 → 遷移 → 「超豪華」
      const badTimer = setTimeout(() => {
        setSuperRarePhase("transition");
      }, 2000);

      const transitionTimer = setTimeout(() => {
        setSuperRarePhase("good");
        setShowContent(true);
      }, 2300);

      return () => {
        clearTimeout(badTimer);
        clearTimeout(transitionTimer);
      };
    } else {
      // 普通・レア：通常通り
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [rarity]);

  // スーパーレアの「残念」フェーズ
  if (rarity === "super-rare" && superRarePhase === "bad") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <h1 className="text-gray-400 text-[48px]">😢</h1>
            <p className="text-gray-400 text-[32px] mt-4">
              残念...
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // スーパーレアの遷移フェーズ
  if (
    rarity === "super-rare" &&
    superRarePhase === "transition"
  ) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <motion.div
          animate={{
            scale: [1, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4"
        >
          <div className="text-center">
            <h1 className="text-gray-400 text-[48px]">😢</h1>
          </div>
        </motion.div>
      </div>
    );
  }

  // 背景色とエフェクト数の設定
  const bgGradient =
    rarity === "super-rare"
      ? "from-yellow-300 via-pink-400 via-purple-500 via-blue-400 to-green-400"
      : rarity === "rare"
        ? "from-yellow-300 via-orange-400 to-yellow-500"
        : "from-yellow-400 via-pink-400 to-purple-500";

  const confettiCount =
    rarity === "super-rare" ? 100 : rarity === "rare" ? 70 : 50;
  const sparkleCount =
    rarity === "super-rare" ? 8 : rarity === "rare" ? 5 : 3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <motion.div
        initial={{
          scale: 0,
          rotate: rarity === "super-rare" ? 720 : -180,
        }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: rarity === "super-rare" ? 1.2 : 0.8,
          type: "spring",
          bounce: rarity === "super-rare" ? 0.6 : 0.4,
        }}
        className={`bg-gradient-to-br ${bgGradient} rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden`}
      >
        {/* コンフェッティエフェクト */}
        {[...Array(confettiCount)].map((_, i) => {
          const colors =
            rarity === "super-rare"
              ? [
                  "#FFD700",
                  "#FF69B4",
                  "#00CED1",
                  "#FF6347",
                  "#9370DB",
                  "#00FF00",
                  "#FF00FF",
                  "#FFFF00",
                ]
              : rarity === "rare"
                ? [
                    "#FFD700",
                    "#FFA500",
                    "#FF8C00",
                    "#FFB347",
                    "#FFCC00",
                  ]
                : [
                    "#FFD700",
                    "#FF69B4",
                    "#00CED1",
                    "#FF6347",
                    "#9370DB",
                  ];

          const startX = Math.random() * 100;
          const endX = startX + (Math.random() - 0.5) * 30;

          return (
            <motion.div
              key={`confetti-${i}`}
              initial={{
                left: `${startX}%`,
                top: "-5%",
                opacity: 1,
              }}
              animate={{
                top: "105%",
                left: `${endX}%`,
                rotate: Math.random() * 720 - 360,
              }}
              transition={{
                duration: Math.random() * 2 + 3,
                delay:
                  Math.random() *
                  (rarity === "super-rare" ? 3 : 2),
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width:
                  rarity === "super-rare"
                    ? "12px"
                    : rarity === "rare"
                      ? "10px"
                      : "8px",
                height:
                  rarity === "super-rare"
                    ? "12px"
                    : rarity === "rare"
                      ? "10px"
                      : "8px",
                backgroundColor:
                  colors[
                    Math.floor(Math.random() * colors.length)
                  ],
              }}
            />
          );
        })}

        {/* キラキラエフェクト */}
        {[...Array(sparkleCount)].map((_, i) => {
          const positions = [
            { top: "10%", left: "10%" },
            { top: "20%", right: "15%" },
            { bottom: "15%", left: "20%" },
            { bottom: "20%", right: "10%" },
            { top: "50%", left: "5%" },
            { top: "40%", right: "8%" },
            { top: "70%", left: "12%" },
            { bottom: "40%", right: "18%" },
          ];
          const pos = positions[i] || {
            top: "50%",
            left: "50%",
          };

          return (
            <motion.div
              key={i}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute text-yellow-200 opacity-60"
              style={pos}
            >
              {rarity === "super-rare" ? (
                <Star
                  className="w-10 h-10"
                  fill="currentColor"
                />
              ) : rarity === "rare" ? (
                <Sparkles className="w-10 h-10" />
              ) : (
                <Sparkles className="w-8 h-8" />
              )}
            </motion.div>
          );
        })}

        {/* スーパーレア専用：電撃エフェクト */}
        {rarity === "super-rare" && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`zap-${i}`}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="absolute text-white"
                style={{
                  top: `${20 + i * 20}%`,
                  left: i % 2 === 0 ? "5%" : "auto",
                  right: i % 2 === 1 ? "5%" : "auto",
                }}
              >
                <Zap className="w-8 h-8" fill="currentColor" />
              </motion.div>
            ))}
          </>
        )}

        <div className="text-center">
          {!showContent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                animate={{
                  scale:
                    rarity === "super-rare"
                      ? [1, 1.5, 1]
                      : rarity === "rare"
                        ? [1, 1.3, 1]
                        : [1, 1.2, 1],
                }}
                transition={{
                  duration: rarity === "super-rare" ? 0.5 : 0.8,
                  repeat: Infinity,
                }}
                className="text-white mb-4"
              >
                {rarity === "super-rare" && "✨🎊🎉 "}
                {rarity === "rare" && "🎉 "}
                {rarity === "normal" && "🎉 "}
                おめでとうございます！
                {rarity === "normal" && " 🎉"}
                {rarity === "rare" && " 🎉"}
                {rarity === "super-rare" && " 🎉🎊✨"}
              </motion.h1>
              {rarity === "super-rare" && (
                <motion.p
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                  className="text-white text-[28px] font-bold"
                >
                  🌟 スーパー大当たり！！ 🌟
                </motion.p>
              )}
              {rarity === "rare" && (
                <motion.p
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                  className="text-white text-[24px] font-bold"
                >
                  ⭐ レア当選！ ⭐
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-white text-[24px] font-bold">
                  {rarity === "super-rare" && "✨🎊🎉 "}
                  {rarity === "rare" && "🎉 "}
                  {rarity === "normal" && "🎉 "}
                  おめでとうございます！
                  {rarity === "normal" && " 🎉"}
                  {rarity === "rare" && " 🎉"}
                  {rarity === "super-rare" && " 🎉🎊✨"}
                </h1>
                {rarity === "super-rare" && (
                  <p className="text-white text-[20px] font-bold mt-2">
                    🌟 スーパー大当たり！！ 🌟
                  </p>
                )}
                {rarity === "rare" && (
                  <p className="text-white text-[18px] font-bold mt-2">
                    ⭐ レア当選！ ⭐
                  </p>
                )}
              </div>

              <motion.div
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  rarity === "super-rare"
                    ? "ring-4 ring-yellow-300"
                    : rarity === "rare"
                      ? "ring-2 ring-yellow-400"
                      : ""
                }`}
                animate={
                  rarity === "super-rare"
                    ? { scale: [1, 1.05, 1] }
                    : {}
                }
                transition={
                  rarity === "super-rare"
                    ? { duration: 1, repeat: Infinity }
                    : {}
                }
              >
                <div className="text-gray-900 mb-4 text-[20px] font-bold">
                  当選商品
                </div>

                {product.image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-h-64 object-contain rounded-lg"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-gray-900 text-center font-bold text-[32px]">
                    {product.name || "（商品名未設定）"}
                  </h2>
                </motion.div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className={`px-8 py-3 bg-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg ${
                  rarity === "super-rare"
                    ? "text-purple-600 ring-2 ring-yellow-300"
                    : rarity === "rare"
                      ? "text-orange-600"
                      : "text-purple-600"
                }`}
              >
                閉じる
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}