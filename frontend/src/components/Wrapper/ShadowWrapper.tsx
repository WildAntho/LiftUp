import { ReactNode } from "react";

interface ShadowWrapperProps {
  children: ReactNode;
  className: string;
  style?: React.CSSProperties;
}

const ShadowWrapper = ({ children, className, style }: ShadowWrapperProps) => {
  return (
    <section
      className={`${className} border-3 border-black shadow-[10px_10px_0_#000000] transition-shadow duration-250 ease-in-out hover:shadow-[14px_14px_0_#000000]`}
      style={style}
    >
      {children}
    </section>
  );
};

export default ShadowWrapper;
