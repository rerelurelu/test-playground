// オブジェクトの指定したキーの値が空かどうかを判定する関数
export const objectValuesNotEmpty = <T>(
  obj: T,
  keys: Array<keyof T>,
): boolean => {
  return keys.every((key) => !!obj[key])
}

// 特定のキーバリューを持つオブジェクトがリスト内に存在するかどうかを判定する関数
export const isItemInListByKey = <T>(value: T, list: T[], key: keyof T) =>
  list.some((item) => item[key] === value[key])

// 特定のキーバリューを持つ全てのオブジェクトがリスト内に存在するかどうかを判定する関数
export const isAllItemInListByKey = <T>(values: T[], list: T[], key: keyof T) =>
  values.every((value) => isItemInListByKey<T>(value, list, key))
