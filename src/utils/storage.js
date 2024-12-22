const prefix = import.meta.env.VITE_STORAGE_PREFIX

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(prefix + key, JSON.stringify(value))
  } catch (error) {
    console.error('存储错误:', error)
  }
}

export const getStorageItem = (key) => {
  try {
    const item = localStorage.getItem(prefix + key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('读取存储错误:', error)
    return null
  }
}

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('删除存储错误:', error)
  }
} 