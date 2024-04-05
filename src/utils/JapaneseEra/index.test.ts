import dayjs from 'dayjs'

import {
  GetJapaneseEra,
  GetJapaneseEraStrict,
  IsExpired,
  IsLock,
  IsNull,
} from '@/utils/JapaneseEra/index'

describe('src/utils/JapaneseEra/index.ts: GetJapaneseEra', () => {
  test('和暦以前', () => {
    expect(GetJapaneseEra(dayjs('1867/12/31'))).toBe('1867年')
  })
  test('明治', () => {
    expect(GetJapaneseEra(dayjs('1868/01/01'))).toBe('明治元年')
    expect(GetJapaneseEra(dayjs('1912/07/31'))).toBe('明治45年')
  })
  test('大正', () => {
    expect(GetJapaneseEra(dayjs('1912/08/01'))).toBe('大正元年')
    expect(GetJapaneseEra(dayjs('1926/12/31'))).toBe('大正15年')
  })
  test('昭和', () => {
    expect(GetJapaneseEra(dayjs('1927/01/01'))).toBe('昭和2年')
    expect(GetJapaneseEra(dayjs('1989/01/31'))).toBe('昭和64年')
  })
  test('平成', () => {
    expect(GetJapaneseEra(dayjs('1989/02/01'))).toBe('平成元年')
    expect(GetJapaneseEra(dayjs('2019/04/30'))).toBe('平成31年')
  })
  test('令和', () => {
    expect(GetJapaneseEra(dayjs('2019/05/01'))).toBe('令和元年')
  })
})

describe('src/utils/JapaneseEra/index.ts: GetJapaneseEraStrict', () => {
  test('和暦以前', () => {
    expect(GetJapaneseEraStrict(dayjs('1868/01/24'))).toBe('1868年')
  })
  test('明治', () => {
    expect(GetJapaneseEraStrict(dayjs('1868/01/25'))).toBe('明治元年')
    expect(GetJapaneseEraStrict(dayjs('1912/07/29'))).toBe('明治45年')
  })
  test('大正', () => {
    expect(GetJapaneseEraStrict(dayjs('1912/07/30'))).toBe('大正元年')
    expect(GetJapaneseEraStrict(dayjs('1926/12/24'))).toBe('大正15年')
  })
  test('昭和', () => {
    expect(GetJapaneseEraStrict(dayjs('1926/12/25'))).toBe('昭和元年')
    expect(GetJapaneseEraStrict(dayjs('1989/01/07'))).toBe('昭和64年')
  })
  test('平成', () => {
    expect(GetJapaneseEraStrict(dayjs('1989/01/08'))).toBe('平成元年')
    expect(GetJapaneseEraStrict(dayjs('2019/04/30'))).toBe('平成31年')
  })
  test('令和', () => {
    expect(GetJapaneseEraStrict(dayjs('2019/05/01'))).toBe('令和元年')
  })
})

describe('src/utils/JapaneseEra/index.ts: IsNull', () => {
  test('nullはtrueを返す', () => {
    expect(IsNull(null)).toBe(true)
  })
  test('undefinedはtrueを返す', () => {
    expect(IsNull(undefined)).toBe(true)
  })
  test('9999-12-31はtrueを返す', () => {
    expect(IsNull('9999-12-31')).toBe(true)
  })
  test('9999/12/31はtrueを返す', () => {
    expect(IsNull('9999/12/31')).toBe(true)
  })
  test('2023-01-01はfalseを返す', () => {
    expect(IsNull('2023-01-01')).toBe(false)
  })
  test('2023/01/01はfalseを返す', () => {
    expect(IsNull('2023/01/01')).toBe(false)
  })
})

describe('src/utils/JapaneseEra/index.ts: IsLock', () => {
  test('開始日: 2023-03-01, 現在: 2023-04-01はfalse', () => {
    const now = dayjs('2023-04-01')
    const start = '2023-03-01'
    jest.useFakeTimers()
    jest.setSystemTime(now.toDate())
    expect(IsLock(start)).toBe(false)
  })
  test('開始日: 2023-03-01, 現在: 2023-04-10はfalse', () => {
    const now = dayjs('2023-04-10')
    const start = '2023-03-01'
    jest.useFakeTimers()
    jest.setSystemTime(now.toDate())
    expect(IsLock(start)).toBe(false)
  })
  test('開始日: 2023-03-01, 現在: 2023-04-11はtrue', () => {
    const now = dayjs('2023-04-11')
    const start = '2023-03-01'
    jest.useFakeTimers()
    jest.setSystemTime(now.toDate())
    expect(IsLock(start)).toBe(true)
  })
  test('開始日: 2023-03-01, 現在: 2023-04-30はtrue', () => {
    const now = dayjs('2023-04-30')
    const start = '2023-03-01'
    jest.useFakeTimers()
    jest.setSystemTime(now.toDate())
    expect(IsLock(start)).toBe(true)
  })
  test('開始日: 2022-12-01, 現在: 2023-01-10はfalse', () => {
    const now = dayjs('2023-01-10')
    const start = '2022-12-01'
    jest.useFakeTimers()
    jest.setSystemTime(now.toDate())
    expect(IsLock(start)).toBe(false)
  })
  test('開始日: 2022-12-01, 現在: 2023-01-11はtrue', () => {
    const now = dayjs('2023-01-11')
    const start = '2022-12-01'
    jest.useFakeTimers()
    jest.setSystemTime(now.toDate())
    expect(IsLock(start)).toBe(true)
  })
})

describe('src/utils/JapaneseEra/index.ts: IsExpired', () => {
  test('終了日: 2023-04-10, 現在: 2023-04-09はfalse', () => {
    jest.useFakeTimers()
    jest.setSystemTime(dayjs('2023-04-09').toDate())
    expect(IsExpired('2023-04-10')).toBe(false)
  })
  test('終了日: 2023-04-10, 現在: 2023-04-10はtrue', () => {
    jest.useFakeTimers()
    jest.setSystemTime(dayjs('2023-04-10').toDate())
    expect(IsExpired('2023-04-10')).toBe(true)
  })
  test('終了日: 2023-04-10, 現在: 2023-04-11はtrue', () => {
    jest.useFakeTimers()
    jest.setSystemTime(dayjs('2023-04-11').toDate())
    expect(IsExpired('2023-04-10')).toBe(true)
  })
})
