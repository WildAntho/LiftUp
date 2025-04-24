import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useGetExerciceTypesQuery } from "./graphql/hooks";
import { useTypeStore } from "./services/zustand/typeStore";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { data, loading, error } = useGetExerciceTypesQuery();
  const setTypes = useTypeStore((state) => state.setTypes);
  useEffect(() => {
    if (data && !loading && !error) {
      setTypes(data.getExerciceTypes);
    }
  }, [data, loading, error, setTypes]);
  return (
    <section className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <section className="h-[10%]">
        <Navigation />
      </section>
      <section className="h-[90%]">
        <Outlet />
      </section>
      <Toaster position="top-right" />
    </section>
  );
}

export default App;
