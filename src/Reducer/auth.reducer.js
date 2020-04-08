const initialState = {
    token : 'ABCD',
    isSession : false
}


const authReducer = (state = initialState, action) => {
    // console.log("AA",action.token)
    switch (action.type) {

        case "ADD_TOKEN": {
            console.log("token in reducer: ", action.token)
            return {
                token: action.token,
                isSession: true
            }
        }
        case "REMOVE_TOKEN":
            return {
                token: '',
                isSession: false
            }
    }

}

export default authReducer