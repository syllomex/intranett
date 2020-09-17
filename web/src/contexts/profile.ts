import { createContext, useContext, useState } from "react";
import { IProfile } from "../interfaces/Profile";
import { api } from "../services/api";

interface IUseProfile {
  profile?: IProfile;
  setProfile: React.Dispatch<any>;
}

const ProfileContext = createContext<Partial<IUseProfile>>({});

async function fetchProfile(access_token: string): Promise<IProfile> {
  const response = await api.get("/profile", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const profile: IProfile = response.data;

  return profile;
}

function ProfileProvider(): IUseProfile {
  const [profile, setProfile] = useState<any>(null);

  if (profile?.email) return { profile, setProfile };

  let access_token = profile?.access_token;
  if (!access_token) {
    access_token = localStorage.getItem("access_token");
  }
  if (!access_token) return { profile, setProfile };

  const execFetchProfile = async () => {
    try {
      const fetchedProfile = await fetchProfile(access_token);
      setProfile({ ...fetchedProfile, access_token });

      return { profile, setProfile };
    } catch (error) {
      console.error(error.message);
      localStorage.removeItem("access_token");

      return { profile, setProfile };
    }
  };
  execFetchProfile();

  if (profile === null) setProfile(undefined);

  return { profile, setProfile };
}

function useProfile(): IUseProfile {
  const { profile, setProfile } = useContext(ProfileContext);

  if (!setProfile)
    throw new Error("[profile context] setProfile is not defined");

  return { profile, setProfile };
}

export { ProfileContext, ProfileProvider, useProfile };
