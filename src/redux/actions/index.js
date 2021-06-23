export function setInProgress(status) {
    return function (dispatch) {
        dispatch({
            type: "SET_IN_PROGRESS",
            status: status
        })
    }
}

