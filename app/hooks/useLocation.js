import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default useLocation = () => {
  const [location, setLocation] = useState();
  const getLocation = async () => {
    try {
      const { grantedBack } =
        await Location.requestBackgroundPermissionsAsync();
      const { grantedFore } =
        await Location.requestForegroundPermissionsAsync();
      if (!grantedFore || !grantedBack) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return location;
};
