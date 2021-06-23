import globalState from "../states";

export function inProgressStatus(state = globalState.inProgress, action) {
    switch (action.type) {
        case "SET_IN_PROGRESS":
            return action.status;
        default:
            return state;
    }
}