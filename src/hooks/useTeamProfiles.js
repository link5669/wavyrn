import { useEffect, useState } from "react";
import { useTranslation } from "./useTranslation";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// One request per page load, shared by every component that shows the team
let request = null;
const fetchProfiles = () => {
  request ||= fetch(`${BACKEND_URL}/api/team`)
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
    .catch((error) => {
      request = null; // let the next mount retry
      throw error;
    });
  return request;
};

// Profiles shown on the About page, in display order, with name/title in the current
// language. `hasDetails` is false for profiles with nothing to show in the overlay.
export const useTeamProfiles = () => {
  const { language } = useTranslation();
  const [data, setData] = useState({ profiles: [], categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProfiles()
      .then((result) => active && setData(result))
      .catch((error) => console.error("Failed to load team profiles:", error))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const profiles = data.profiles
    .filter((p) => p.visible)
    .map((p) => ({
      ...p,
      displayName: (language === "jp" && p.nameJP) || p.name,
      displayTitle: (language === "jp" && p.titleJP) || p.title,
      hasDetails: Boolean(p.bio || p.media?.length),
    }));

  return { profiles, categories: data.categories, loading };
};
