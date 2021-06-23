import {combineReducers} from "redux";
import {inProgressStatus} from "./genericReducers";

const appReducer = combineReducers({
	inProgress: inProgressStatus
});
const rootReducer = (state, action) => {
	return appReducer(state, action);
}

export default rootReducer;