import {
	Button as ChakraButton,
	type ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import React, { type FC } from "react";

interface Props extends ChakraButtonProps {
	isSelected?: boolean;
	label: string;
	regex: RegExp | null;
	onClickHandler: (label: string, regex: RegExp | null) => void;
}
export const FilterButton: FC<Props> = ({
	isSelected,
	label,
	regex,
	onClickHandler,
	...props
}) => {
	return (
		<ChakraButton
			{...props}
			p="9px"
			fontSize="14px"
			lineHeight="14px"
			minWidth="0px"
			h="34px"
			bg={isSelected ? "#06BCD4" : "white"}
			border="1px solid #BEBEBE"
			textColor={isSelected ? "white" : "#333"}
			fontWeight={isSelected ? "bold" : "normal"}
			_hover={{
				opacity: isSelected ? 1 : 0.5,
			}}
			_focus={{
				bg: isSelected ? "#06BCD4" : "white",
			}}
			onClick={() => {
				if (isSelected) return;
				onClickHandler(label, regex);
			}}
		>
			{label}
		</ChakraButton>
	);
};
