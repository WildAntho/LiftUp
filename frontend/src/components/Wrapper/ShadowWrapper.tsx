import { ReactNode } from "react";

interface ShadowWrapperProps {
  children: ReactNode;
  className: string;
}

const ShadowWrapper = ({ children, className }: ShadowWrapperProps) => {
  return (
    <section
      className={`${className} border-3 border-black shadow-[12px_12px_0_#000000] transition-shadow duration-200 ease-in-out hover:shadow-[17px_17px_0_#000000]`}
    >
      {children}
    </section>
  );
};

export default ShadowWrapper;
