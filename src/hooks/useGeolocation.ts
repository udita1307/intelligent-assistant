import { useState, useCallback, useEffect } from 'react';
import type { GeolocationState } from '../types';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getGeolocation = useCallback(() => {
    setGeolocation((prev) => ({ ...prev, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setGeolocation({
        isLoading: false,
        coordinates: null,
        error: new Error('Geolocation is not supported by your browser.'),
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          isLoading: false,
          coordinates: position.coords,
          error: null,
        });
      },
      (error) => {
        setGeolocation({
          isLoading: false,
          coordinates: null,
          error: error,
        });
      },
       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    getGeolocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return { geolocation, getGeolocation };
};
