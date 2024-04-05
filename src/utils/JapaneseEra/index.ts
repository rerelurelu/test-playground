import dayjs from 'dayjs'

/*
令和 2019/05/01 -
平成 1989/01/08 - 2019/04/30
昭和 1926/12/25 - 1989/01/07
大正 1912/07/30 - 1926/12/25
明治 1868/01/25 - 1912/07/30

1926/12/25、1912/07/30が誕生日、命日の場合、媒体によって元号が揺らぐので注意
*/

// R4.1.1
const Jpn = new RegExp(
  /^([RHSTM])([1-9]|[1-9][0-9]).([1-9]|1[0-2]).([1-9]|1[0-9]|2[0-9]|3[0-1])$/,
)

// R4.1
// const Month = new RegExp(/^(R|H|S|T|M)([1-9]|[1-9][0-9]).([1-9]|1[0-2])$/)

const FullJpn = new RegExp(
  /^(令和|平成|昭和|大正|明治)([1-9]|[1-9][0-9])年([1-9]|1[0-2])月$/,
)

enum DateFormat {
  Short = 'YYYY/M/D',
  Full = 'YYYY/MM/DD',
  ShortMonth = 'YYYY/M',
  FullMonth = 'YYYY/MM',
}

const IsValid = (str: string, isMonth = false): boolean => {
  if (isMonth) {
    return FullJpn.test(str)
  } else {
    return Jpn.test(str)
  }
}

const ToDate = (str: string | null): null | Date => {
  if (str === null) {
    return null
  }
  const res = str.match(Jpn)
  if (!res) {
    return null
  }
  const era = res[1]
  const jpnYear = parseInt(res[2]) - 1
  const month = parseInt(res[3])
  const day = parseInt(res[4])

  let baseYear = 0
  switch (era) {
    case 'R':
      baseYear = 2019
      break
    case 'H':
      baseYear = 1989
      break
    case 'S':
      baseYear = 1926
      break
    case 'T':
      baseYear = 1912
      break
    case 'M':
      baseYear = 1868
      break
  }
  const year = baseYear + jpnYear
  return dayjs(
    year + toZeroPadding(month) + toZeroPadding(day),
    'YYYYMMDD',
  ).toDate()
}

const toZeroPadding = (date: string | number): string => {
  return ('00' + date).slice(-2)
}

// 引数のDateを和暦に変換する。
// 元号のレンジ外の値の場合は補正して変換する
// 例：H31.1.1
const ToJapaneseFormatString = (
  date: dayjs.Dayjs,
  isMonth = false,
  isDate = false,
): string => {
  const d = dayjs(date)
  const num = parseInt(d.format('YYYYMMDD'))
  // BEからのレスポンスが9999-12-31(null)で返ってくる場合があるので、その場合は空文字を返す
  if (num === 99991231) return ''
  const year = d.year()
  // 開始日以上 && 終了日以下
  let era = year.toString()

  if (isMonth) {
    if (num >= 20190501) {
      era = '令和' + (year - 2019 + 1)
    } else if (num >= 19890108 && num <= 20190430) {
      era = '平成' + (year - 1989 + 1)
    } else if (num >= 19261225 && num <= 19890107) {
      era = '昭和' + (year - 1926 + 1)
    } else if (num >= 19120730 && num <= 19261224) {
      era = '大正' + (year - 1912 + 1)
    } else if (num >= 18680125 && num <= 19120729) {
      era = '明治' + (year - 1868 + 1)
    }

    if (isDate) {
      return `${era}年${d.month() + 1}月${d.date()}日`
    }

    return `${era}年${d.month() + 1}月`
  } else {
    if (num >= 20190501) {
      era = 'R' + (year - 2019 + 1)
    } else if (num >= 19890108 && num <= 20190430) {
      era = 'H' + (year - 1989 + 1)
    } else if (num >= 19261225 && num <= 19890107) {
      era = 'S' + (year - 1926 + 1)
    } else if (num >= 19120730 && num <= 19261224) {
      era = 'T' + (year - 1912 + 1)
    } else if (num >= 18680125 && num <= 19120729) {
      era = 'M' + (year - 1868 + 1)
    }

    return `${era}.${d.month() + 1}.${d.date()}`
  }
}

// 引数のDateオブジェクトを元に日付を数値化し元号を判定する
// 該当する和暦がない場合西暦を返す
// 月の途中で元号が変わった場合、古い方の元号でその月は通すので数値の範囲が一部特殊になる
// 主に請求年月やDatePickerのヘッダー等に使用する
const GetJapaneseEra = (date: dayjs.Dayjs, zeroPadding?: boolean): string => {
  const num = parseInt(date.format('YYYYMMDD'))
  const y = date.year()
  // 開始日以上 && 終了日以下
  if (num >= 20190501) {
    return '令和' + calcJapaneseEra(y, 2019, zeroPadding) + '年'
  } else if (num >= 19890201 && num <= 20190430) {
    return '平成' + calcJapaneseEra(y, 1989, zeroPadding) + '年'
  } else if (num >= 19270101 && num <= 19890131) {
    return '昭和' + calcJapaneseEra(y, 1926, zeroPadding) + '年'
  } else if (num >= 19120801 && num <= 19261231) {
    return '大正' + calcJapaneseEra(y, 1912, zeroPadding) + '年'
  } else if (num >= 18680101 && num <= 19120731) {
    return '明治' + calcJapaneseEra(y, 1868, zeroPadding) + '年'
  }

  return `${y}年`
}

// 引数のDateオブジェクトを元に日付を数値化し元号を判定する
// 該当する和暦がない場合西暦を返す
// 日付単位で厳格に判定するが、明治→大正、大正→昭和に関しては1日前までは前の元号とし、当日は新元号とする
// 引数1926/12/25（大正15年・昭和元年）=> 昭和元年
// 引数1912/07/30（明治45年・大正元年）=> 大正元年
const GetJapaneseEraStrict = (
  date: dayjs.Dayjs,
  zeroPadding?: boolean,
): string => {
  const num = parseInt(date.format('YYYYMMDD'))
  const y = date.year()
  // 開始日以上 && 終了日以下
  if (num >= 20190501) {
    return '令和' + calcJapaneseEra(y, 2019, zeroPadding) + '年'
  } else if (num >= 19890108 && num <= 20190430) {
    return '平成' + calcJapaneseEra(y, 1989, zeroPadding) + '年'
  } else if (num >= 19261225 && num <= 19890107) {
    return '昭和' + calcJapaneseEra(y, 1926, zeroPadding) + '年'
  } else if (num >= 19120730 && num <= 19261224) {
    return '大正' + calcJapaneseEra(y, 1912, zeroPadding) + '年'
  } else if (num >= 18680125 && num <= 19120729) {
    return '明治' + calcJapaneseEra(y, 1868, zeroPadding) + '年'
  }

  return `${y}年`
}

// 引数の値をベースとして何年なのか判定する
const calcJapaneseEra = (
  year: number,
  warekiBase: number,
  zeroPadding?: boolean,
): string => {
  const y = year - warekiBase
  if (y > 0) {
    return zeroPadding ? toZeroPadding((y + 1).toString()) : (y + 1).toString()
  } else {
    return '元'
  }
}

const GetFormat = (
  value: string,
  isMonth = false,
): 'short' | 'full' | 'jpn' => {
  if (isMonth) {
    if (dayjs(value, DateFormat.ShortMonth, true).isValid()) {
      return 'short'
    }
    if (dayjs(value, DateFormat.FullMonth, true).isValid()) {
      return 'full'
    }
  } else {
    if (dayjs(value, DateFormat.Short, true).isValid()) {
      return 'short'
    }
    if (dayjs(value, DateFormat.Full, true).isValid()) {
      return 'full'
    }
  }

  if (IsValid(value, isMonth)) {
    return 'jpn'
  }
  return 'jpn'
}

const ToFormatString = (
  date: dayjs.Dayjs,
  format: 'full' | 'short' | 'jpn' | undefined,
  isMonth = false,
): string => {
  if (!isMonth) {
    return ToJapaneseFormatString(date, isMonth)
  }

  switch (format) {
    case 'full':
      return date.format(DateFormat.ShortMonth)
    case 'short':
      return date.format(DateFormat.FullMonth)
    case 'jpn':
      return ToJapaneseFormatString(date, isMonth)
    default:
      return ToJapaneseFormatString(date, isMonth)
  }
}

const IsNull = (date: null | undefined | string) => {
  if (!date) {
    return true
  }
  return dayjs(date).isSame('9999-12-31', 'date')
}

// 開始日の翌月10日以降かどうかを判定する。
// 10日はfalse（変更可能）11日はtrue(変更不可)
const IsLock = (date: string) =>
  dayjs().isAfter(dayjs(date).add(1, 'month').date(10), 'date')

// 現在日時が引数の日付の前日以降かどうかを判定する。
// 前日以降なのは適用終了日などは前日まで変更可能なため
// 以降の場合はtrue,以前の場合はfalse
const IsExpired = (date: string) => {
  const target = dayjs(date).subtract(1, 'day')
  return dayjs().isAfter(target, 'date')
}

export {
  DateFormat,
  GetFormat,
  GetJapaneseEra,
  GetJapaneseEraStrict,
  IsExpired,
  IsLock,
  IsNull,
  IsValid,
  ToDate,
  ToFormatString,
  ToJapaneseFormatString,
}
