import { useState } from "react";
import HeaderProfile from "./HeaderProfile";

export default function Plans() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const switchView = () => {
    setIsShow(!isShow);
  };
  return (
    <section className="w-full h-full flex flex-col items-start justify-start p-10">
      <HeaderProfile
        isShow={isShow}
        onClick={switchView}
        title="Mes plans"
        tooltip="Modifier ma description"
      />
    </section>
  );
}
