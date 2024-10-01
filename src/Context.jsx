import React, { createContext, useState } from "react";

export const RouteTypeContext = createContext();

export const RouteTypeProvider = ({ children }) => {
  const [routeType, setRouteType] = useState("user"); // Default route type

  return (
    <RouteTypeContext.Provider value={{ routeType, setRouteType }}>
      {children}
    </RouteTypeContext.Provider>
  );
};
