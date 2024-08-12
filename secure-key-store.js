import * as Keychain from 'react-native-keychain';

// 데이터 저장
export const setItem = async (key, value) => {
    try {
        await Keychain.setInternetCredentials(
            key,
            key,
            value
        );
    }catch(error){
        console.log('keychain set error:', error);
    }
}

// 데이터 조회
export const getItem = async (key) => {
  try {
    const credentials = await Keychain.getInternetCredentials(key);
    if (credentials && credentials.password) {
      const savedPinNumber = credentials.password;
      return savedPinNumber;
    } else {
      return null;
    }
  } catch (error) {
    console.log('keychain get error:', error);
    return null;
  }
}