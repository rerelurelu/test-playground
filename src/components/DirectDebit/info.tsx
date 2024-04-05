import {
	Flex,
	type FlexProps,
	TableContainer,
	type TableContainerProps,
	Tbody,
	Text,
	Thead,
	Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import type { FC } from "react";

import type { DirectDebitResponse } from "@/types/directDebit";
import { Button } from "../elements/Button";
import { Table, Td, Th } from "./fragments";

type Props = TableContainerProps & {
	directDebit: DirectDebitResponse;
	hasButtons: boolean;
	onOpenImport: () => void;
};

export const Info: FC<Props> = ({
	directDebit,
	hasButtons,
	onOpenImport,
	...props
}) => {
	const {
		paymentProcessedDate,
		receiptDate,
		requestTotalTimes,
		requestTotalAmount,
		resultTotalTimes,
		resultTotalAmount,
		registDate,
	} = directDebit;
	const onExportClick = () => {
		// TODO: API繋ぎ込時にロジック追加
		console.log("export");
	};

	return (
		<TableContainer w="fit-content" {...props}>
			<Table>
				<Thead h="24px">
					<Tr>
						<Th>振替依頼</Th>
						<Th>入金結果</Th>
						<Th textAlign="center">引落日</Th>
						<Th textAlign="center">領収日</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr h="56px">
						<Td>
							<Flex alignItems="center" justifyContent="start">
								<CountText text={requestTotalTimes?.toString() ?? ""} />
								<AmountText
									text={requestTotalAmount?.toLocaleString() ?? ""}
									ml="5px"
								/>
								{hasButtons && (
									<Button
										variant="primary"
										label="出力"
										onClick={onExportClick}
										ml={5}
										minW="100px"
										h="36px"
									/>
								)}
							</Flex>
						</Td>
						<Td>
							<Flex alignItems="center" justifyContent="start">
								<CountText text={resultTotalTimes?.toString() ?? ""} />
								<AmountText
									text={resultTotalAmount?.toLocaleString() ?? ""}
									ml="5px"
								/>
								{hasButtons ? (
									<Button
										variant="primary"
										label="取込"
										onClick={onOpenImport}
										ml={5}
										minW="100px"
										h="36px"
									/>
								) : (
									<Text width="128px" textAlign="center">
										（取込日：
										{registDate ? dayjs(registDate).format("M/D") : ""}）
									</Text>
								)}
							</Flex>
						</Td>
						<Td textAlign="center">
							{paymentProcessedDate
								? dayjs(paymentProcessedDate).format("M/D")
								: ""}
						</Td>
						<Td textAlign="center">
							{receiptDate ? dayjs(receiptDate).format("M/D") : ""}
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};

type CountTextProps = FlexProps & {
	text: string;
};

const CountText: FC<CountTextProps> = ({ text, ...props }) => {
	return (
		<CellTextWrapper {...props}>
			<Text w="30px" textAlign="right" fontWeight="bold">
				{text}
			</Text>
			<Text w="14px" textAlign="right">
				件
			</Text>
		</CellTextWrapper>
	);
};

type AmountTextProps = FlexProps & {
	text: string;
};

const AmountText: FC<AmountTextProps> = ({ text, ...props }) => {
	return (
		<CellTextWrapper {...props}>
			<Text w="78px" textAlign="right" fontWeight="bold">
				{text}
			</Text>
			<Text w="14px" textAlign="right">
				円
			</Text>
		</CellTextWrapper>
	);
};

const CellTextWrapper: FC<FlexProps> = ({ children, ...props }) => {
	return (
		<Flex
			w="fit-content"
			alignItems="center"
			justifyContent="end"
			gap="3px"
			{...props}
		>
			{children}
		</Flex>
	);
};
