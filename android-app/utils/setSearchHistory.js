import Storage from "./storageUtil";

export function addSearchHistory(store, word) {
  let arr = []
  Storage.getData('searchHistory').then(res => {
    arr = JSON.parse(res)
    let index = arr.indexOf(word)
    if (index !== -1) {
      // 已经存在这条搜索历史
      arr.splice(index, 1)
    }
    arr.unshift(word)
    // mobx
    store.changeSearchHistory(arr)
    // storage
    Storage.setData('searchHistory', JSON.stringify(arr))
  })
}

export function deleteSingle(store, word) {
  let arr = []
  Storage.getData('searchHistory').then(res => {
    arr = JSON.parse(res)
    let index = arr.indexOf(word)
    if (index !== -1) {
      // 已经存在这条搜索历史
      arr.splice(index, 1)
    }
    // mobx
    store.changeSearchHistory(arr)
    // storage
    Storage.setData('searchHistory', JSON.stringify(arr))
  })
}

export function clearHistory(store) {
  // mobx
  store.changeSearchHistory([])
  // storage
  Storage.setData('searchHistory', JSON.stringify([]))
}