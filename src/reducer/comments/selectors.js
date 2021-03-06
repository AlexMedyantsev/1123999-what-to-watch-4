import NameSpace from "../name-space.js";

export const getIsLoading = (state) => {
  return state[NameSpace.COMMENTS].isLoading;
};

export const getComments = (state) => {
  return state[NameSpace.COMMENTS].comments;
};

export const getCommentsIsLoaded = (state) => {
  return state[NameSpace.COMMENTS].isCommentsLoaded;
};
