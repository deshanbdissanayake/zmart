import { log_data } from "./system";

//after clicking Send OTP button
const sendOtp = async (phoneNumber) => {
  const url = 'https://v2.genzo.lk/App_auth/auth_mobile?mob=' + phoneNumber;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    // Handle the error here
    console.error('Failed to send OTP request user.js:', error);
    return {"payload": "Error", "ref": "", "stt": "error"};
  }

  //return {"payload": "Error", "ref": "", "stt": "ok"};
};


//verify phonenumber after confirming otp
const verifyNumber = async (phoneNumber, otp) => {
  const url = 'https://v2.genzo.lk/App_auth/auth_otp?mob=' + phoneNumber + '&otp=' + otp;
  
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    //console.log(responseJson)
    return responseJson;
  } catch (error) {
    // Handle the error here
    //console.error('Failed to Verify request user.js:', error);
    return {"payload": "Error", "ref": "", "stt": "error"};
  }

};

//save user details
const saveUser = async (formData) => {
  const url = 'https://v2.genzo.lk/App_auth/save_udetail?token='+log_data.log_userToken;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',  
    },
    body: formData,
  }

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    //console.log(responseJson)
    return responseJson;
  } catch (error) {
    // Handle the error here
    //console.error('Failed to Save User user.js:', error);
    return {"payload": "Error", "ref": "", "stt": "error"};
  }
};

export { sendOtp, verifyNumber, saveUser };
