// src/pages/UnsupportedScreen.tsx
export default function UnsupportedScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="text-6xl mb-4">📵</div>
        <h1 className="text-3xl font-extrabold text-red-600 mb-2">
          Accès mobile indisponible
        </h1>
        <p className="text-gray-700 text-base mb-1">
          Cette application n’est actuellement accessible que sur ordinateur.
        </p>
        <p className="text-gray-500 text-sm italic">
          L'application mobile arrivera très bientôt 🚀
        </p>
      </div>
    </div>
  );
}
