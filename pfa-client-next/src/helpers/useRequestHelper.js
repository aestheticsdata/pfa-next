"use client";

import axios from "axios";
import _ from "lodash";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@auth/store/authStore";


const useRequestHelper = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const getRequestURL = (url) => {
    // En développement local, utiliser directement le backend
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return `http://localhost:5000${url}`;
    }
    
    // En production, utiliser le préfixe /api
    return `/api${url}`;
  };

  const privateRequest = (url, options, config) => {
    // Ne pas faire de requête si le token n'est pas disponible
    // On ne vérifie plus isMounted car cela empêcherait les requêtes de se faire
    if (!token) {
      return Promise.reject(new Error("Token not available"));
    }

    const tokenBearer = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const axiosInstance = axios.create({
      headers: tokenBearer.headers,
      ...config,
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err.response?.status === 401) { 
          router.push("/logout");
        }
        return Promise.reject(err);
      }
    );

    const requestURL = getRequestURL(url);
    return axiosInstance(requestURL, _.merge(options, tokenBearer));
  };

  const request = (url, options) => {
    const requestURL = getRequestURL(url);
    return axios(requestURL, options);
  };

  return {
    request,
    privateRequest,
  };
};

export default useRequestHelper;
