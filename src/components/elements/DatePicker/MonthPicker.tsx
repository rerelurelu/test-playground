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

import { GetJapaneseEra } from '@/utils/JapaneseEra'

import { ChevronLeftIcon } from './ChevronLeftIcon'
import { ChevronRightIcon } from './ChevronRightIcon'
import DatePickerInput from './DatePickerInput'
import { HeaderButton } from './HeaderButton'
import { MonthPanel } from './MonthPanel'

interface Props {
  value?: string | null // format: YYYY-MM
  name?: string
  onChange?: (date: dayjs.Dayjs | null) => void
  isDisabled?: boolean
  isNotDirectInput?: boolean // 手入力不可とする場合に設定
  w?: StyleProps['w']
  width?: StyleProps['width']
  format?: 'short' | 'full' | 'jpn'
  placeholderStyle?: SystemStyleObject
}

export const MonthPicker = forwardRef<Props, 'input'>((props, ref) => {
  dayjs.extend(customParseFormat)
  const [headerDate, setHeaderDate] = useState(dayjs())
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs | null>(
    props.value ? dayjs(props.value) : dayjs(),
  )
  const [open, setOpen] = useBoolean(false)
  const outsideClickRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: outsideClickRef,
    handler: () => setOpen.off(),
  })

  useEffect(() => {
    if (props.value && dayjs(props.value, 'YYYY-MM').isValid()) {
      const date = dayjs(props.value, 'YYYY-MM')
      setHeaderDate(date)
      setSelectDate(date)
    } else {
      setSelectDate(dayjs())
      setHeaderDate(dayjs())
    }
  }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box ref={outsideClickRef}>
      <DatePickerInput
        ref={ref}
        isDisabled={props.isDisabled}
        isNotDirectInput={props.isNotDirectInput}
        value={selectDate}
        format={props.format}
        onBlur={props.onBlur}
        onClick={() => props.isDisabled || setOpen.toggle()}
        w={props.w}
        width={props.width}
        isMonth={true}
        onChangeDate={(date) => {
          if (date !== null) {
            const year = date.year()
            setHeaderDate(headerDate.year(year))
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
        <Flex w="246px" h="44px" bg="#06BCD4" textColor="white" px="20px">
          <HeaderButton
            w="30px"
            aria-label="前の年"
            onClick={() => setHeaderDate(headerDate.subtract(1, 'year'))}
            fontSize="20px"
            icon={<ChevronLeftIcon />}
          />
          <Flex
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            fontSize="16px"
            fontWeight="bold"
          >
            {GetJapaneseEra(headerDate, false)}({headerDate.format(`YYYY`)})
          </Flex>
          <HeaderButton
            w="30px"
            aria-label="次の年"
            onClick={() => setHeaderDate(headerDate.add(1, 'year'))}
            fontSize="20px"
            icon={<ChevronRightIcon />}
          />
        </Flex>
        <MonthPanel
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
      </Flex>
    </Box>
  )
})
