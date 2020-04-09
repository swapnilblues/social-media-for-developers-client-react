const initialState = {
    token : localStorage.getItem('token'),
    isSession : false
}


const authReducer = (state = initialState, action) => {
    // console.log("AA",action.token)
    switch (action.type) {

        case "ADD_TOKEN": {
            console.log("token in reducer: ", action.token)
            localStorage.setItem('token', action.token)
            return {
                token: localStorage.getItem('token'),
                isSession: true
            }
        }
        case "REMOVE_TOKEN":
            return {
                token: null,
                isSession: false
            }
    }

}

export default authReducer
