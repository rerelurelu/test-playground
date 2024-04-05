import { CalendarIcon } from "@chakra-ui/icons";
import {
	InputGroup,
	InputRightElement,
	type StyleProps,
	type SystemStyleObject,
	forwardRef,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";

import {
	DateFormat,
	GetFormat,
	ToDate,
	ToFormatString,
} from "@/utils/JapaneseEra";
import { Input } from "../Input";

interface Props {
	format?: "short" | "full" | "jpn";
	value: dayjs.Dayjs | null;
	isDisabled?: boolean;
	isNotDirectInput?: boolean;
	isInvalid?: boolean;
	isSystemRequired?: boolean;
	w?: StyleProps["w"];
	width?: StyleProps["width"];
	onChangeDate: (date: dayjs.Dayjs | null) => void;
	onClick: () => void;
	isMonth?: boolean;
	bg?: StyleProps["bg"];
	placeholderStyle?: SystemStyleObject;
}

const DatePickerInput = forwardRef<Props, "input">((props, ref) => {
	const [inputValue, setInputValue] = useState<string>(
		props.value ? ToFormatString(props.value, props.format, props.isMonth) : "",
	);

	useEffect(() => {
		const { value, format, isMonth } = props;
		if (value === null) {
			setInputValue("");
			return;
		}
		const f = format ? format : GetFormat(inputValue, isMonth);
		setInputValue(ToFormatString(value, f, props.isMonth));
	}, [props.value]); // eslint-disable-line react-hooks/exhaustive-deps

	const iconOpacity = props.isDisabled ? 0.4 : 1.0;
	dayjs.extend(customParseFormat);

	/*
  手動入力のパースは下記の通り。該当しない場合はnullを返して空欄にする。
  年月日
  ・[R|H|S|T|M]Y.M.D
  ・[R|H|S|T|M]YY.MM.DD
  ・YYYY/M/D
  ・YYYY/MM/DD
  年月
  ・[R|H|S|T|M]Y.M
  ・[R|H|S|T|M]YY.MM
  ・YYYY/M
  ・YYYY/MM
  */
	const onBlurHandler = () => {
		// フォーカス後、DatePicker以外を押下した場合のnull防止
		if (props.isNotDirectInput) return;
		if (props.isMonth) {
			if (dayjs(inputValue, DateFormat.ShortMonth, true).isValid()) {
				props.onChangeDate(dayjs(inputValue, DateFormat.ShortMonth, true));
				return;
			}
			if (dayjs(inputValue, DateFormat.FullMonth, true).isValid()) {
				props.onChangeDate(dayjs(inputValue, DateFormat.FullMonth, true));
				return;
			}
		} else {
			if (dayjs(inputValue, DateFormat.Short, true).isValid()) {
				props.onChangeDate(dayjs(inputValue, DateFormat.Short, true));
				return;
			}
			if (dayjs(inputValue, DateFormat.Full, true).isValid()) {
				props.onChangeDate(dayjs(inputValue, DateFormat.Full, true));
				return;
			}
			if (ToDate(inputValue)) {
				props.onChangeDate(dayjs(ToDate(inputValue)));
				return;
			}
		}
		setInputValue("");
		props.onChangeDate(null);
	};
	return (
		<InputGroup>
			<Input
				isSystemRequired={props.isSystemRequired}
				isInvalid={props.isInvalid}
				isDisabled={props.isDisabled}
				isReadOnly={props.isNotDirectInput}
				value={inputValue}
				ref={ref}
				autoComplete="off"
				w={props.w}
				width={props.width}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				onBlur={onBlurHandler}
				bg={props.bg}
				placeholder={props.placeholder}
				_placeholder={props.placeholderStyle}
			/>
			<InputRightElement
				opacity={iconOpacity}
				onClick={() => {
					props.onClick();
				}}
			>
				<CalendarIcon color="input.icon.color" />
			</InputRightElement>
		</InputGroup>
	);
});

export default DatePickerInput;
