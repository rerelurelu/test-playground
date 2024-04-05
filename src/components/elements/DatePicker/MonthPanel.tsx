import { Grid } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'

import { Month } from './Month'

// dayjsでは.day()で曜日を指定するため曜日をday
// 日にちをdateで表現する
interface DatePanelProps {
  date: dayjs.Dayjs
  selectDate: dayjs.Dayjs | null
  onClick: (date: dayjs.Dayjs) => void
}

export const MonthPanel: FC<DatePanelProps> = ({
  date,
  selectDate,
  onClick,
}: DatePanelProps) => {
  const months: number[] = []
  for (let i = 0; i < 12; i++) {
    months.push(i)
  }

  const isSelected = (num: number): boolean => {
    const format = 'YYYYMM'
    // 日付が選択されていなかったら現在の日付を選択状態にする
    const targetDate = selectDate ? selectDate : new Date()
    const s = dayjs(targetDate).format(format)
    const d = dayjs(date).month(num).format(format)
    return s === d
  }

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      w="246px"
      p="20px"
      placeItems="center"
    >
      {months.map((item) => {
        return (
          <Month
            key={item}
            month={item}
            selected={isSelected(item)}
            onClick={() => onClick(date.month(item))}
          />
        )
      })}
    </Grid>
  )
}
