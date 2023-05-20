/* 
* This file contains user context logic to keep the user logged in across pages. I have written
* context logic like this many times before and thereofore, since I know it works and is hard to
* test, there is no TDD taking place here 
*/
import getConfig from "next/config";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import { fetchWrapper } from "../helpers/fetchWrapper";

//configure base url for easy API access
const {publicRuntimeConfig} = getConfig();
const baseAPIurl = `api/user`
//set up default vals for authContext
const defaultValues = {
    user: null,
    currentUser: () => undefined,
    login: () => null,
    logout: () => null,
    join: () => null,
}
//allow imports to use the context
const userAuthContext = createContext(defaultValues);
export function useAuth(){
    return useContext(userAuthContext);
}
//create provider to warp app
export function UserAuthProvider({children}){
    //set up router and useState
    const router = useRouter();
    const [user, setUser] = useState(null);
    //retreive the stored user and set the user state if not null
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            let storedUserData = JSON.parse(storedUser);
            if(storedUserData != undefined){
                setUser(storedUserData);
            }
        }
    }, []);
    //store the user whenever the user variable changes
    useEffect(() => {
        //check that the user is not equal to the default user value
        if(user != defaultValues.user){
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);
    //for future reference: the login page will be the landing page for our app
    //create login to leverage the login API and store the user as logged in
    const login = async (username, password) => {
        //use login api
        const JSONdata = {
            "username": username,
            "password": password
        }
        const authedUser = await fetchWrapper.post(`${baseAPIurl}/login`, JSONdata)
        //check that returned user is not null
        if(authedUser){
            setUser(authedUser);
        }

        return authedUser;
    };
    //create logout to push user back to login page when they logout
    const logout = () => {
        //set user state and stored user to null
        setUser(null);
        localStorage.setItem("user", JSON.stringify(null));
        //push back to login
        router.push("/");
    };
    //create signUp logic to push user to login page once signed up
    //called join to avoid name clash with signUp API
    const join = async (username, password) => {
        //createJSON data string to pass to API
        const userData = {
            "username": username,
            "password": password,
            "homeLocation": {"long": null, "lat": null},
            "favouriteActivities": [],
            "maxTravelRadius": null
        };
        //pass data string to API
        const response = await fetchWrapper.post(`${baseAPIurl}/signUp`, userData);
        //verify that a response has been returned then push to login
        if(response){
            router.push("/");
            return true;
        }
        //return false if no response
        return false;
    };
    //create currentUser to return the user state to caller
    const currentUser = () => {
        //verify a user is present
        if(user){
            return user
        }
    };
    //store user and functions for access outside this file
    const userAndFunctions = {
        user,
        currentUser,
        login,
        logout,
        join
    }
    //return provider tag or element
    return(
        <>
            <userAuthContext.Provider value = {userAndFunctions}>{children}</userAuthContext.Provider>
        </>
    )
}
