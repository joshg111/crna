import { AsyncStorage } from 'react-native';




async function setCache(key, v){
    try{
        var res = await AsyncStorage.setItem(key, v);
        console.log("setItem successful");
        return res;
    }
    catch(e){
        console.log('caught error', e);
        // Handle exceptions
    }
}

async function getCache(key){
    try{
        var res = await AsyncStorage.getItem(key);
        console.log("get = " + res)
        return res;
    }
    catch(e){
        console.log('caught error', e);
        // Handle exceptions
    }
}

async function removeCache(key){
    try{
        var res = await AsyncStorage.removeItem(key);
        return res;
    }
    catch(e){
        console.log('caught error', e);
        // Handle exceptions
    }
}

export {setCache, getCache, removeCache};
