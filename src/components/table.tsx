import {
	Table as ChakraTable,
	Td as ChakraTd,
	Th as ChakraTh,
	type TableCellProps,
	type TableProps,
} from "@chakra-ui/react";
import type { FC } from "react";

export const Table: FC<TableProps> = ({ children, ...props }) => {
	return (
		<ChakraTable fontSize="sm" {...props}>
			{children}
		</ChakraTable>
	);
};

export const Th: FC<TableCellProps> = ({ children, ...props }) => {
	return (
		<ChakraTh
			bg="table.header"
			py="5px"
			px="10px"
			fontSize="sm"
			fontWeight="normal"
			color="black"
			border="none"
			_notLast={{
				borderRight: "1px solid",
				borderColor: "orange",
			}}
			{...props}
		>
			{children}
		</ChakraTh>
	);
};

export const Td: FC<TableCellProps> = ({ children, ...props }) => {
	return (
		<ChakraTd
			bg="white"
			py="10px"
			px="10px"
			w="fit-content"
			textAlign="left"
			lineHeight={1}
			border="none"
			_notLast={{
				borderRight: "1px solid",
				borderColor: "orange",
			}}
			{...props}
		>
			{children}
		</ChakraTd>
	);
};
