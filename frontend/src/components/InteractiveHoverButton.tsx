import { useState } from "react";
import { Crown, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SubscriptionButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const active = path === "/pricing";
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 100);
    console.log("Souscription initiée !");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-8"
      onClick={() => navigate("/pricing")}
    >
      <div className="relative">
        {/* Effet de lueur en arrière-plan */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse"></div>

        {/* Bouton principal */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative group overflow-hidden
            px-4 py-3 rounded-xl
            bg-gradient-to-r from-purple-400 to-purple-500
            text-white font-bold text-xs
            hover:shadow-purple-500/50
            transform transition-all duration-300 ease-out
            ${isHovered ? "scale-102 -translate-y-1" : ""}
            ${isClicked ? "scale-95" : ""}
            border border-purple-400/30
            backdrop-blur-sm
          `}
        >
          {/* Effet de brillance animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

          {/* Particules flottantes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
            <div
              className="absolute top-4 right-6 w-1 h-1 bg-pink-300/60 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-3 left-6 w-1 h-1 bg-purple-300/60 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Contenu du bouton */}
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <Crown
                className={`w-6 h-6 transition-all duration-300 ${
                  isHovered || active
                    ? "rotate-12 text-yellow-300"
                    : "text-yellow-400"
                }`}
              />
              {(isHovered || active) && (
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
              )}
            </div>
            {/* <span className="relative">Abonnement</span>
            <ArrowRight
              className={`w-5 h-5 transition-all duration-300 ${
                isHovered || active ? "translate-x-1" : ""
              }`}
            /> */}
          </div>
        </button>
      </div>
    </div>
  );
}
