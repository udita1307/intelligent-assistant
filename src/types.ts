
export interface Source {
  // FIX: Made uri and title optional to match the Gemini API response type.
  uri?: string;
  title?: string;
}

export interface GroundingChunk {
  web?: Source;
  maps?: Source;
}

export interface GeminiResponse {
  text: string;
  sources: Source[];
}

export interface GeolocationState {
  coordinates: GeolocationCoordinates | null;
  error: GeolocationPositionError | Error | null;
  isLoading: boolean;
}