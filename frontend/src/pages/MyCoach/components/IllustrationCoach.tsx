export default function IllustrationCoach() {
  return (
    <div className="p-8 h-[300px] font-sans relative flex items-center justify-center shadow-sm">
      {/* Image en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bannercoach.webp"
          alt="Illustration"
          className="w-full h-full object-cover rounded-lg opacity-60"
        />
      </div>
      <div className="absolute right-64 z-1">
        <img src="/coachillus.png" alt="Illustration" className="w-44" />
      </div>

      {/* Contenu textuel superposé */}
      <div className="relative z-10 w-[70%]">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenue sur le marketplace
        </h1>
        <h2 className="text-2xl text-tertiary font-bold mb-4">
          Découvre tous les coachs et leurs prestations.
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Choisis celui qui t’accompagnera au mieux dans ta progression !
        </p>
      </div>
    </div>
  );
}
