import { Dayjs, extend, OpUnitType } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { deadline } from './constans'

extend(isBetween)

/* 対象の日付が適用期間の範囲に収まっているかどうかを判定する */
export const isDateWithinRange = (
  targetDate: Dayjs,
  startDate: string,
  endDate: string | null,
  unit: OpUnitType = 'day',
) => {
  if (!endDate) {
    return targetDate.isAfter(startDate, unit)
  } else {
    return targetDate.isBetween(startDate, endDate, unit, '[]')
  }
}

/**システム日付が期日(deadline)以降か返す
 * @return {boolean} 期日以降の場合true
 */
export const isDeadline = (target: Dayjs) => {
  return target.date() > deadline
}

/**
 * システム日付が1日〜10日の場合は前々月、11日以降は前月を出力
 * @param {Dayjs} target 日付
 * @return {Dayjs} 初期表示日付
 */
export const toInitialDate = (target: Dayjs) =>
  isDeadline(target) ? target.subtract(1, 'month') : target.subtract(2, 'month')
