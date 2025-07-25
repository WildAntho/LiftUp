import { FaFire } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import FloatingDockDesktop from "@/pages/Home/Program/components/Configuration/components/FloatingMenu";
import { useNavigate } from "react-router-dom";

type FloatingDockInvoiceProps = {
  onChange: (value: "SUBSCRIPTION" | "INVOICE" | "PROGRAM") => void;
  active: "SUBSCRIPTION" | "INVOICE" | "PROGRAM";
};

export default function FloatingDockInvoice({
  onChange,
  active,
}: FloatingDockInvoiceProps) {
  const navigate = useNavigate();

  const updateUrlParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value); // ajoute ou remplace
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const links = [
    {
      title: "Mon abonnement",
      icon: (
        <FaStar
          className={`w-full h-full ${
            active === "SUBSCRIPTION" ? "text-orange-500" : ""
          }`}
        />
      ),
      action: () => {
        onChange("SUBSCRIPTION");
        updateUrlParam("section", "subscription");
      },
    },
    {
      title: "Factures",
      icon: (
        <FaFileInvoiceDollar
          className={`w-full h-full ${
            active === "INVOICE" ? "text-orange-500" : ""
          }`}
        />
      ),
      action: () => {
        onChange("INVOICE");
        updateUrlParam("section", "membership");
      },
    },
    {
      title: "Programmes",
      icon: (
        <FaFire
          className={`w-full h-full ${
            active === "PROGRAM" ? "text-orange-500" : ""
          }`}
        />
      ),
      action: () => {
        onChange("PROGRAM");
        updateUrlParam("section", "program");
      },
    },
  ];

  return (
    <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center p-4 z-10">
      <FloatingDockDesktop
        items={links}
        className="shadow-lg border border-gray-100 "
      />
    </div>
  );
}
