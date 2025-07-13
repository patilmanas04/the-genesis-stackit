import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Auth-Token");

    if (!token) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return { showModal, setShowModal };
};
