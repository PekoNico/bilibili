import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage {
  /**
   * 存数据
   */
  static async setData(key, value) {
    if(key !== '' && value !== '') {
      try {
        await AsyncStorage.setItem(key, value)
      } catch (error) {
        return Promise.reject(error)
      }
      Promise.resolve(true)
    } else {
      return Promise.reject({'msg': '键值均不能为空'})
    }
  }
  /**
   * 取数据
   */
  static async getData(key) {
    let data = null
    if(key !== '') {
      try {
        data = await AsyncStorage.getItem(key)
      } catch (error) {
        return Promise.reject(error)
      }
      return data
    } else {
      return Promise.reject({'msg': '不能输入空键值'})
    }
  }
  /**
   * 改数据
   */
  static async mergeData(key, value) {
    if(key !== '' && value !== '') {
      try {
        await AsyncStorage.mergeItem(key, value)
      } catch (error) {
        return Promise.reject(error)
      }
      Promise.resolve(true)
    } else {
      return Promise.reject({'msg': '键值均不能为空'})
    }
  }
  /**
   * 删数据
   */
  static async removeData(key) {
    if(key !== '') {
      try {
        await AsyncStorage.removeItem(key)
      } catch (error) {
        return Promise.reject(error)
      }
      Promise.resolve(true)
    } else {
      return Promise.reject({'msg': '不能输入空键值'})
    }
  }
  /**
   * 删全部数据
   */
  static async clear() {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      return Promise.reject(error)
    }
    Promise.resolve(true)
  }
}