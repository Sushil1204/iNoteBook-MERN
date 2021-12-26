/* eslint-disable no-unused-vars */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userSignUpReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/notesReducers';

const reducre = combineReducers({
    //this will contain our reducers
    userLogin: userLoginReducer,
    userSignUp: userSignUpReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate: userUpdateReducer
})
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")):null

const initialState = {
    userLogin : { userInfo: userInfoFromStorage },
    
}

const middleware = [thunk];

const store = createStore(
    reducre,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;