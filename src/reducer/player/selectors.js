import NameSpace from './../name-space.js';

export const getVideoPlayerState = (state) => state[NameSpace.PLAYER].isVideoPlayerOpened;

export const getIsVideoPlayingState = (state) => state[NameSpace.PLAYER].isVideoPlaying;
