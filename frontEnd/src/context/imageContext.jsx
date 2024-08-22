import { createContext, useContext, useState } from "react";

export const imageContext = createContext();

export const useImageContext = () => {
  return useContext(imageContext);
};

export const ImageContextProvider = ({ children }) => {
  const [userImages, setUserImages] = useState([]);

  return (
    <imageContext.Provider value={{ userImages,setUserImages }}>
      {children}
    </imageContext.Provider>
  );
};