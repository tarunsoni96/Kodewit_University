import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from 'Helpers/Constants'

let token = undefined
export const storeToken = function (token) {
    AsyncStorageHandler.deleteData(Constants.keyUserToken, () => {
        AsyncStorageHandler.store(Constants.keyUserToken, token)
    })
}

export const getToken = function () {
    if(!token){
        return new Promise(function (resolve, reject) {
            AsyncStorageHandler.get(Constants.keyUserToken, (val) => {
                if (val !== null) {
                    token = val
                    resolve(val)
                } else {
                    resolve('noToken')
                }
            })
        })
    } else {
        return new Promise(function (resolve, reject) {
            resolve(token)
        })
    }
}

export const storeUserInfo = function (obj) {
    AsyncStorageHandler.store(Constants.userInfoObj, obj)
}

export const getUserObj = function () {
        return new Promise(function (resolve, reject) {
            AsyncStorageHandler.get(Constants.userInfoObj, (val) => {
                if (val != null) {
                    resolve(val)
                } else {
                    reject(undefined)
                }
            })
        })
}

