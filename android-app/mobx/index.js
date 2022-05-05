import { observable, action, makeObservable } from "mobx";

class Store {
  constructor() {
    makeObservable(this)
  }
  @observable
  userData = {
    name: '',
    sex: '',
    uid: '',
    avaUrl: ''
  }
  @action
  changeUserData(userData) {
    this.userData = { ...this.userData, ...userData }
  }
  @action
  clearUserData() {
    this.userData = {
      name: '',
      sex: '',
      uid: '',
      avaUrl: ''
    }
  }

  @observable
  searchHistory = []
  @action
  changeSearchHistory(arr) {
    this.searchHistory = arr
  }
}

export default new Store()