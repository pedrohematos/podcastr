import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleSuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayingState: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    if (isShuffling) {
      setIsShuffling(false);
    }
    setIsLooping(!isLooping);
  };

  const toggleSuffle = () => {
    if (isLooping) {
      setIsLooping(false);
    }

    setIsShuffling(!isShuffling);
  };

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  };

  const clearPlayingState = () => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  };

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  const playNext = () => {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        play,
        playList,
        playNext,
        playPrevious,
        togglePlay,
        toggleLoop,
        toggleSuffle,
        setPlayingState,
        clearPlayingState,
        hasNext,
        hasPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
