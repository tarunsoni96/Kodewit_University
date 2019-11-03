import HelperMethods from 'Helpers/Methods';
import {AsyncStorage,Platform,ToastAndroid} from 'react-native'
import 'Helpers/global'
import {storeToken,storeUserInfo} from 'DataManagers/UserDataManager'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
let client_id = 1;
let client_secret = '76AAuoQVpLujL1CYCRGFGhKaPuW0FzySxBXxWmam';

export const login = function(username, password) {
  return new Promise(function(resolve, reject) {
    const formData = new FormData();
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    HelperMethods.makeNetworkCall('oauth/token',formData,(resp, isError) => {
        if (resp) {
          const {access_token} = resp
            if(access_token){
              storeToken(access_token).then(()=>{
                getUser(resolve)
              })
            }

        } else {
          reject(isError);
        }
      },
      'POST',true,
    );
  });
};


export const getUser = function(promise) {
  return new Promise(function(resolve, reject) {
    HelperMethods.makeNetworkCall(`api/user`,{},(resp, isError) => {
        if (!isError) {
          const {id,email} = resp
          getStudentInfo(id,promise,email)
        } else {
          reject(true);
        }
      },
      'GET'
    );
  });
};



export const getStudentInfo = function(id,promise,email) {
  return new Promise(function(resolve, reject) {
    HelperMethods.makeNetworkCall(`api/studentinfo/${id}`,{},(resp, isError) => {
        if (!isError) {
          storeUserInfo(resp).then(()=>{
            AsyncStorage.getItem("fcmToken").then(val=>{
              registerDevice(id,email,val)
              promise(resp);
           })

          })
        } else {
          reject(true);
        }
      },
      'GET'
    );
  });
};



export const forgotPassSendMail = function(email) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/forgotPassword/${email}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET',true
      );
    });
  };


  export const resetPass = function(email,pass) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/resetpassword/${email}/${pass}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };

  

  export const getEvents = function(refresh) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        getSavedData('events',refresh).then(resp => {
          resolve(resp[0]);
        }).catch(err => {
          HelperMethods.makeNetworkCall(`api/academics/schoolevent`,{},(resp, isError) => {
            if (!isError) {
              saveData('events',resp)
              resolve(resp);
            } else {
              reject(true);
            }
          },
          'GET');
        })
      }, 0);
    });
  };

  export const getCurriculam = function(classId,session,refresh,date = 0) {
    return new Promise(function(resolve, reject) {

      setTimeout(() => {
              getSavedData('curriculam',refresh).then(resp => {
                resolve(resp[0]);
              }).catch(err => {
                HelperMethods.makeNetworkCall(`api/academics/curriculam/${date}/${classId}/${session}`,{},(resp, isError) => {
                  if (!isError) {
                    saveData('curriculam',resp)
                    resolve(resp);
                  } else {
                    reject(true);
                  }
                },
                'GET'
              );
              })
            }, 0);

      
    });
  };

  export const getChildPhotos = function(classId,sectionId,session,date = 0) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/photograph/${date}/${classId}/${sectionId}/${session}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getFeedsFromPhotos = function(classId,sectionId,session,date = 0) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/photograph/${date}/${classId}/${sectionId}/${session}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getLeaves = function(refresh) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
              getSavedData('leaves',refresh).then(resp => {
                resolve(resp[0]);
              }).catch(err => {

                HelperMethods.makeNetworkCall(`api/getLeaveRequests`,{},(resp, isError) => {
                  if (!isError) {
                    saveData('leaves',resp)

                    resolve(resp);
                  } else {
                    reject(true);
                  }
                },
                'GET'
              );
              })
            }, 0);
     
    });
  };


  export const getHolidays = function() {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/holidaylist`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getMessages = function(userId) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/message/${userId}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getHomework = function(classId,sectionId,session) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/homework/${classId}/${sectionId}/${session}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getCircular = function(classId,sectionId,session,refresh,date = 0) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
              getSavedData('circular',refresh).then(resp => {
                resolve(resp[0]);
              }).catch(err => {
                
                HelperMethods.makeNetworkCall(`api/academics/circular/${date}/${classId}/${sectionId}/${session}`,{},(resp, isError) => {
                  if (!isError) {
                      saveData('circular',resp)
                    resolve(resp);
                  } else {
                    reject(true);
                  }
                },
                'GET'
              );

              })
            }, 0);
      
    });
  };



  export const registerDevice = function(id,email,token) {
    return new Promise(function(resolve, reject) {
      const formData = new FormData();
      formData.append('user_id',id)
      formData.append('fcm_token',token)
      formData.append('email_address',email)
      formData.append('device_type',Platform.OS)
      
      HelperMethods.makeNetworkCall('api/registerDevice',formData,(resp, isError) => {
          if (resp) {
            // HelperMethods.snackbar('Device registered.')
            resolve(true)
          } else {
            reject(isError);
          }
        },
        'POST',
      );
    });
  };

  export const applyLeave = function(reason,startDate,endDate) {
    return new Promise(function(resolve, reject) {
      const formData = new FormData();
      formData.append('reason',reason)
      formData.append('start_date',startDate)
      formData.append('end_date',endDate)
      
      HelperMethods.makeNetworkCall('api/leaveRequest',formData,(resp, isError) => {
          if (resp) {
            resolve(true)
          } else {
            reject(isError);
          }
        },
        'POST',
      );
    });
  };


  export const deleteLeaveReq = function(id) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall('api/removeLeaveRequest/'+id,{},(resp, isError) => {
          if (resp) {
            resolve(true)
          } else {
            reject(isError);
          }
        },
        'PUT',
      );
    });
  };

  const saveData = function(key,data) {
      AsyncStorageHandler.delete(key,()=>{
        AsyncStorageHandler.push(key,data)
      })
  }


  const getSavedData = function(key,refresh){
    return new Promise((resolve,reject)=> {
      reject('no')
      return
      AsyncStorageHandler.get(key,resp => {
        if(resp != null && !refresh){
          resolve(resp)
        } else {
          ToastAndroid.show("Updating Data", 0);
          reject('no saved data')
        }
      })
    })
  }


