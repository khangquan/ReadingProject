import axios from "axios";

export const getAPI = ({ uri, success, fail }) => (
    async (dispatch, getState) => {
        axios.get(uri)
            .then(response => {
                dispatch(success(response.data))
            })
            .catch(error => {
                fail(error)
            })
    }
)