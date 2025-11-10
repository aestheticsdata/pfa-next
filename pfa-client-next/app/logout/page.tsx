"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useAuthStore } from "@auth/store/authStore";
import { useUserStore } from "@auth/store/userStore";

export default function Logout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  useEffect(() => {
    // Nettoyer le cache React Query
    queryClient.clear();
    
    // Nettoyer les stores
    authStore.setToken(null);
    userStore.setUser(null);
    
    // Utiliser replace pour éviter d'ajouter une entrée dans l'historique
    // et forcer la navigation
    router.replace("/login");
    
    // Fallback au cas où router.replace ne fonctionnerait pas
    const timeout = setTimeout(() => {
      window.location.href = "/login";
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []); // Tableau de dépendances vide pour s'exécuter une seule fois

  return (
    <div className="flex items-center justify-center min-h-screen bg-grey1">
      <div>Déconnexion en cours...</div>
    </div>
  );
}

