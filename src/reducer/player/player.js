const initialState = {
  isVideoPlayerOpened: false,
};

export const ActionType = {
  CHANGE_VIDEO_PLAYER_STATE: `CHANGE_VIDEO_PLAYER_STATE`,
};

export const ActionCreator = {
  changeVideoPlayerState: () => ({
    type: ActionType.CHANGE_VIDEO_PLAYER_STATE,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_VIDEO_PLAYER_STATE:
      return Object.assign({}, state, {
        isVideoPlayerOpened: !state.isVideoPlayerOpened,
      });
  }

  return state;
};

