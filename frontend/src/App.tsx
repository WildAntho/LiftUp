import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/sonner";

function App() {
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
