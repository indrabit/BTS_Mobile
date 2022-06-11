
import React,{createContext} from 'react';
export const AuthContext= createContext();

//CONFIG const keys
export const TOKEN_KEY='userToken';
export const USER_KEY='userKey';
export const keys=[TOKEN_KEY,USER_KEY];