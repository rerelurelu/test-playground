import {
  Box,
  Flex,
  forwardRef,
  StyleProps,
  SystemStyleObject,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useRef, useState } from 'react'

import { GetJapaneseEra, ToDate } from '@/utils/JapaneseEra'

import { ChevronLeftIcon } from './ChevronLeftIcon'
import { ChevronRightIcon } from './ChevronRightIcon'
import { DatePanel } from './DatePanel'
import DatePickerInput from './DatePickerInput'
import { HeaderButton } from './HeaderButton'
import { MonthPanel } from './MonthPanel'

interface Props {
  value?: string | null // format: [R|H|S|T|M]x.y.z
  onChange?: (date: dayjs.Dayjs | null) => void
  isSystemRequired?: boolean
  isDisabled?: boolean
  isNotDirectInput?: boolean
  isInvalid?: boolean
  w?: StyleProps['w']
  width?: StyleProps['width']
  format?: 'short' | 'full' | 'jpn'
  bg?: StyleProps['bg']
  placeholderStyle?: SystemStyleObject
}

export const DatePicker = forwardRef<Props, 'input'>((props, ref) => {
  dayjs.extend(customParseFormat)
  const [headerDate, setHeaderDate] = useState<dayjs.Dayjs>(dayjs())
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs | null>(
    props.value ? dayjs(ToDate(props.value)) : null,
  )
  const [open, setOpen] = useBoolean(false)
  const [monthMode, setMonthMode] = useBoolean(false)
  const outsideClickRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: outsideClickRef,
    handler: () => setOpen.off(),
  })
  useEffect(() => {
    if (props.value && ToDate(props.value)) {
      const tmp = dayjs(ToDate(props.value))
      setHeaderDate(headerDate.year(tmp.year()).month(tmp.month()))
      setSelectDate(tmp)
    } else {
      setSelectDate(null)
      setHeaderDate(dayjs())
    }
  }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box w={props.w}>
      <DatePickerInput
        ref={ref}
        isSystemRequired={props.isSystemRequired}
        isDisabled={props.isDisabled}
        isNotDirectInput={props.isNotDirectInput}
        isInvalid={props.isInvalid}
        value={selectDate}
        format={props.format}
        onBlur={props.onBlur}
        bg={props.bg}
        onClick={() => props.isDisabled || setOpen.toggle()}
        onChangeDate={(date) => {
          if (date !== null) {
            const year = date.year()
            const month = date.month()
            setHeaderDate(headerDate.year(year).month(month))
          }
          setSelectDate(date)
          if (props.onChange) {
            props.onChange(date)
          }
        }}
        placeholder={props.placeholder}
        placeholderStyle={props.placeholderStyle}
      />
      <Flex
        ref={outsideClickRef}
        flexFlow="column"
        bg="white"
        rounded="14px"
        overflow="hidden"
        zIndex="dropdown"
        visibility={open ? 'visible' : 'hidden'}
        pos="absolute"
        w="max-content"
        filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.16))"
      >
        <Flex
          w={monthMode ? '246px' : '320px'}
          justifyContent="center"
          h="44px"
          bg="#06BCD4"
          textColor="white"
          py="10px"
          px="20px"
        >
          <HeaderButton
            w="30px"
            aria-label="前の月"
            onClick={() => {
              const u = monthMode ? 'year' : 'month'
              setHeaderDate(headerDate.subtract(1, u))
            }}
            icon={<ChevronLeftIcon />}
          />
          <Flex
            flexFlow="column"
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            fontSize="16px"
            fontWeight="bold"
            onClick={() => setMonthMode.toggle()}
            userSelect="none"
            cursor="pointer"
          >
            {headerDate.format(`YYYY年`)}({GetJapaneseEra(headerDate, false)})
            {!monthMode ? headerDate.format(`M月`) : ''}
          </Flex>
          <HeaderButton
            w="30px"
            aria-label="次の月"
            onClick={() => {
              const u = monthMode ? 'year' : 'month'
              setHeaderDate(headerDate.add(1, u))
            }}
            fontSize="20px"
            icon={<ChevronRightIcon />}
          />
        </Flex>
        {monthMode ? (
          <MonthPanel
            date={headerDate}
            selectDate={selectDate}
            onClick={(month) => {
              setHeaderDate(month)
              setMonthMode.toggle()
            }}
          />
        ) : (
          <DatePanel
            date={headerDate}
            selectDate={selectDate}
            onClick={(date) => {
              setSelectDate(date)
              if (props.onChange) {
                props.onChange(date)
              }
              setOpen.off()
            }}
          />
        )}
      </Flex>
    </Box>
  )
})
