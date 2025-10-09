import { createContext, useContext, type MouseEvent, useState } from "react";

interface AboutSectionContextType {
  isAboutSectionOpen: boolean;
  openAboutSection: () => void;
  closeAboutSection: () => void;
  handleOverlayClickAboutSection: (e: MouseEvent<HTMLDivElement>) => void;
}

const AboutSectionContext = createContext<AboutSectionContextType | undefined>(
  undefined
);

export const AboutSectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAboutSectionOpen, setIsAboutSectionOpen] = useState(false);
  const openAboutSection = () => setIsAboutSectionOpen(true);
  const closeAboutSection = () => setIsAboutSectionOpen(false);
  const handleOverlayClickAboutSection = (
    e: MouseEvent<HTMLDivElement>
  ): void => {
    if (e.target === e.currentTarget) {
      closeAboutSection();
    }
  };

  return (
    <AboutSectionContext.Provider
      value={{
        isAboutSectionOpen,
        openAboutSection,
        closeAboutSection,
        handleOverlayClickAboutSection,
      }}
    >
      {children}
    </AboutSectionContext.Provider>
  );
};

export const useAboutSection = () => {
  const context = useContext(AboutSectionContext);
  if (!context) {
    throw new Error(
      "useAboutSection should be used inside MapPositionProvider"
    );
  }
  return context;
};
