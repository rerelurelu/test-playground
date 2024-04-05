import { Grid, GridItem } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'

import { Day } from './Day'

const DayOfWeek = ['月', '火', '水', '木', '金', '土', '日']

// dayjsでは.day()で曜日を指定するため曜日をday
// 日にちをdateで表現する
interface DatePanelProps {
  date: dayjs.Dayjs
  selectDate: dayjs.Dayjs | null
  onClick: (date: dayjs.Dayjs) => void
}
export const DatePanel: FC<DatePanelProps> = ({
  date,
  selectDate,
  onClick,
}: DatePanelProps) => {
  const startDay = date.date(1).day()
  const days: number[] = []
  for (let i = 0; i < date.daysInMonth(); i++) {
    days.push(i + 1)
  }

  const isSelected = (num: number): boolean => {
    const format = 'YYYYMMDD'
    // 日付が選択されていなかったら現在の日付を選択状態にする
    const targetDate = selectDate ? selectDate : new Date()
    const s = dayjs(targetDate).format(format)
    const d = dayjs(date).date(num).format(format)
    return s === d
  }

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      w="320px"
      p="20px"
      textColor="#BDBDBD"
    >
      {DayOfWeek.map((item, idx) => {
        return (
          <GridItem
            key={idx}
            textAlign="center"
            fontSize="14px"
            fontWeight="bold"
            userSelect="none"
            pb="10px"
          >
            {item}
          </GridItem>
        )
      })}
      {days.map((item, idx) => {
        if (idx === 0) {
          return (
            <Day
              key={item}
              day={item}
              selected={isSelected(item)}
              gridColumnStart={startDay === 0 ? 7 : startDay}
              onClick={() => onClick(date.date(item))}
            />
          )
        }
        return (
          <Day
            key={item}
            day={item}
            selected={isSelected(item)}
            onClick={() => onClick(date.date(item))}
          />
        )
      })}
    </Grid>
  )
}
