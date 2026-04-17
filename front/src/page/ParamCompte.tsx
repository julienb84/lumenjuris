import MainHeader from "../components/MainHeader/MainHeader";

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export function ParamCompte() {
  const [isConnected, setIsConnected] = useState(false);
  // const [userData, setUserData] = useState(null);

  const userData = {
    profile: {
      email: "julienbouchez@icloud.com",
      nom: "Bouchez",
      prenom: "Julien",
      role: "ADMIN",
      isVerified: true,
    },
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/user/get", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       const dataResponse = await response.json();
  //       if (dataResponse.success && dataResponse.data.profile.isVerified) {
  //         setIsConnected(true);
  //         setUserData(dataResponse.data);
  //
  //       }
  //     } catch (error) {}
  //   };
  //   fetchData();
  // }, []);

  return isConnected ? (
    <>
      <MainHeader />
      <div>Parametre de compte</div>
    </>
  ) : (
    <Navigate to="/inscription" />
  );
}
