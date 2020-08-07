import {reducer as reducerData} from "./data/data.js";
import {reducer as reducerUser} from "./user/user.js";
import {reducer as reducerCondition} from "./condition/condition.js";
import {reducer as reducerPlayer} from "./player/player.js";
import {reducer as reducerComments} from "./comments/comments.js";
import NameSpace from "./name-space.js";
import {combineReducers} from "redux";

export default combineReducers({
  [NameSpace.DATA]: reducerData,
  [NameSpace.USER]: reducerUser,
  [NameSpace.CONDITION]: reducerCondition,
  [NameSpace.PLAYER]: reducerPlayer,
  [NameSpace.COMMENTS]: reducerComments,
});


