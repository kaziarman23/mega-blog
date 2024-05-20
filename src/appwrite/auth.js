import conf from "../conf/conf";
import { Account, Client, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccout({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                const loginResult = await this.login({ email, password });
                return loginResult;
            }
            else {
                return userAccount;
            }
        } 
        catch (error) {
            console.log("Appwrite server :: login :: error")
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite server :: login :: error")
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const getCurrentUserResult = await this.account.get()
            return getCurrentUserResult
        } catch (error) {
            console.log("Appwrite server :: getCurrentUser :: error",error)
            // throw error;
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite server :: logOut :: error",error)
            throw error;
        }
    }


}

const authService = new AuthService();

export default authService;
