import conf from "../conf/conf"
import { Client, ID, Storage, Query, Databases } from "appwrite"


export class Service{
    client = new Client()
    Databases;
    bucket; 

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        this.Databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featureImage, status, userId}){
        try {
            return await this.Databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite serive :: createPost :: error",error)
        }
    }

    async updatePost(slug,{title, content, featureImage, status}){
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite serive :: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("appwrite serive :: deletePost :: error",error)
        }
    }


    async getPost(slug){
        try {
            await this.Databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("appwrite serive :: getPost :: error",error)
            return false
        }
    }

    async getposts(queries = [Query.equal("status","active")]){
        try {
            await this.Databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("appwrite serive :: getposts :: error",error)
            return false
        }
    }

    async updateFile(file){
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite serive :: updateFile :: error",error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite serive :: deleteFile :: error",error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()

export default service;