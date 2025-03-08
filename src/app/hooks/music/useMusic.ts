import { useContext } from "react";
import { MusicContext } from "@/app/context/MusicContext";

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic deve ser usado dentro de um MusicProvider");
  }
  return context;
};
