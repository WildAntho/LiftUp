export default function IllustrationNotif() {
  return (
    <div className="w-full h-[300px] p-8 font-sans relative">
      {/* Image en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <img
          src="/notification.webp"
          alt="Illustration"
          className="w-full h-full object-cover rounded-lg opacity-50"
        />
        {/* Gradient overlay pour réduire l'opacité de gauche à droite */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent rounded-lg"></div>
      </div>

      {/* Contenu textuel superposé */}
      <div className="relative z-10 max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bienvenue sur ton espace Notification
        </h1>
        <h2 className="text-2xl text-primary font-bold mb-4">
          Gère toutes tes préférences d'alerte !
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          Active ou désactive chaque type de notification en fonction de tes
          préférences
        </p>
      </div>
    </div>
  );
}
