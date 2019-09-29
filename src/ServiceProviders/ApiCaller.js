import HelperMethods from 'Helpers/Methods';

let client_id = 4;
let client_secret = 'rOpR82W1rWFsWjX4iVzgkZBi0Nw41rYRyDUnwuZ5';

export const getToken = function(username, password) {
  return new Promise(function(resolve, reject) {
    const formData = new FormData();
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    HelperMethods.makeNetworkCall('oauth/token',formData,(resp, isError) => {
        if (resp) {
          resolve(resp);
        } else {
          reject(isError);
        }
      },
      'POST',true,
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

  export const getUser = function() {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/user`,{},(resp, isError) => {
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


  export const getStudentInfo = function(id) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/studentinfo/${id}`,{},(resp, isError) => {
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



// export const referUsers = function(mobile) {
//     return new Promise(function(resolve,reject) {
//         const formData = {
//             mobile:mobile
//         }
//         HelperMethods.makeNetworkCall_post("/user/referral/request/create",formData,(resp, isError) => {
//             const { success, result,errors } = resp;

//             if (success) {
//                 resolve(result)
//             } else {
//                 reject(errors)
//             }
//           });
//     })

// };

// export const inputReferCode = function(code){
//     return new Promise(function(resolve,reject) {
//         const formData = {
//             code : code
//         }
//         HelperMethods.makeNetworkCall_post("/user/referral/code/use",formData,(resp, isError) => {
//             const { success, result,errors } = resp;
//             if (success) {
//                 resolve(result)
//             } else {
//                 reject(errors)
//             }
//           });
//     })
// }

// export const uploadPhoto = function(uri){
//     return new Promise(function(resolve,reject) {

//         const formData = {
//             upload:{uri,type:'image/jpg',name:'tst'},
//             category:'profile_image',

//         }
//         HelperMethods.uploadPhoto("/profile/gallery/upload",formData,(resp, isError) => {
//             const { success, result,errors } = resp;

//             if (success) {
//                 resolve(result)
//             } else {
//                 // alert(errors)
//                 reject(errors)
//             }
//           });
//     })
// }
