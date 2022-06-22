import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'https://backend-store-mobile.vercel.app/api/'
: baseURL = 'https://backend-store-mobile.vercel.app/api/'
}

export default baseURL;
