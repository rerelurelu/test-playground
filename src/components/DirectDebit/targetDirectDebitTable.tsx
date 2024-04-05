import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
	HStack,
	type TabIndicatorProps,
	TableContainer,
	Tbody,
	Text,
	Thead,
	Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import type { FC } from "react";

import { GetJapaneseEra } from "@/utils/JapaneseEra/index";
import { toAccountTypeLabel } from "@/utils/accountType/index";
import { REQUEST_FILE_STATUS } from "@/utils/constans";

import type {
	DirectDebitResponse,
	TargetDirectDebit,
} from "@/types/directDebit";
import { Checkbox } from "../elements/Checkbox";
import { Tooltip } from "../elements/Tooltip";
import { LinkText, TransferRequestResultCell } from "./fragments";
import { Table, Td, Th } from "./fragments/table";

type Props = TabIndicatorProps & {
	directDebit: DirectDebitResponse;
	officeId: string;
	isRequestFileStatusFinalized: boolean;
	isResultFileStatusReceived: boolean;
	selectedDirectDebits: TargetDirectDebit[];
	handleChangeSelectedTargetDirectDebits: (
		checked: boolean,
		targetDirectDebit: TargetDirectDebit,
	) => void;
	handleChangeAllSelectedTargetDirectDebits: (checked: boolean) => void;
};

export const TargetDirectDebitTable: FC<Props> = ({
	directDebit,
	officeId,
	isRequestFileStatusFinalized,
	isResultFileStatusReceived,
	selectedDirectDebits,
	handleChangeSelectedTargetDirectDebits,
	handleChangeAllSelectedTargetDirectDebits,
	...props
}) => {
	const { targetDirectDebitList } = directDebit;
	const hasData = targetDirectDebitList.length > 0;
	const isAllChecked = getIsAllChecked(
		targetDirectDebitList,
		selectedDirectDebits,
	);
	return (
		<TableContainer overflowX="unset" overflowY="scroll" {...props}>
			<Table>
				<Thead
					h="38px"
					position="sticky"
					zIndex="docked"
					top={0}
					boxShadow="0 -1px 0 #D6D6D6"
				>
					<Tr>
						<Th px="5px" minW="60px">
							<Checkbox
								my={0}
								mr="3px"
								isChecked={isAllChecked}
								isDisabled={
									isRequestFileStatusFinalized ||
									isResultFileStatusReceived ||
									!hasData
								}
								onChange={(e) =>
									handleChangeAllSelectedTargetDirectDebits(e.target.checked)
								}
							/>
							全て
						</Th>
						<Th minW="164px">利用者</Th>
						<Th textAlign="center" minW="139px">
							サービス提供年月
						</Th>
						<Th textAlign="center" minW="116px">
							金額
						</Th>
						<Th w="296px">引落口座</Th>
						<Th textAlign="center" minW="65px">
							引落日
						</Th>
						<Th textAlign="center" minW="147px">
							振替結果
						</Th>
					</Tr>
				</Thead>
				{hasData && (
					<Tbody>
						{targetDirectDebitList.map((targetDirectDebit, idx) => {
							const {
								patientId,
								requestFileStatus,
								patientSeikyuId,
								serviceProvideYearMonth,
								totalAmount,
								isCreatedAfterDirectDebitFileFinalized,
								patientDirectDebitAccount,
								paymentDueDate,
								name,
							} = targetDirectDebit;
							return (
								<Tr key={`${patientId}-${idx}`} boxShadow="0 -1px 0 #D6D6D6">
									<Td textAlign="center">
										{!isRequestFileStatusFinalized && (
											<Checkbox
												m={0}
												my="auto"
												isChecked={selectedDirectDebits.includes(
													targetDirectDebit,
												)}
												onChange={(e) => {
													handleChangeSelectedTargetDirectDebits(
														e.target.checked,
														targetDirectDebit,
													);
												}}
											/>
										)}
										{requestFileStatus === REQUEST_FILE_STATUS.FINALIZED && (
											<CheckIcon color="#707070" />
										)}
										{/* NOTE: 振替依頼確定時に選択していなかったデータは、
                  requestFileStatus、resultFileStatusともに振替依頼確定後もnullのままなので、
                  "-"表記の際は振替依頼確定済かつ、resultFileStatusがnullの場合で判定する
                  */}
										{(requestFileStatus === REQUEST_FILE_STATUS.NOT_FINALIZED ||
											(isRequestFileStatusFinalized &&
												!targetDirectDebit.requestFileStatus)) && (
											<Text>-</Text>
										)}
									</Td>
									<Td>
										<Text w="143px" whiteSpace="normal" wordBreak="break-word">
											{patientId && patientSeikyuId ? (
												<Link
													href={{
														pathname: `${process.env.NEXT_PUBLIC_BASE_URL}/office/${officeId}/patient/${targetDirectDebit.patientId}/patient_seikyu/info`,
														query: {
															patientSeikyuId: patientSeikyuId,
														},
													}}
												>
													<LinkText>{`${name} 様`}</LinkText>
												</Link>
											) : (
												"-"
											)}
										</Text>
									</Td>
									<Td textAlign="center" lineHeight="base">
										{serviceProvideYearMonth ? (
											<>
												<Text fontSize="sm">
													{dayjs(serviceProvideYearMonth).format("M月")}
												</Text>
												<Text fontSize="xs">
													(
													{GetJapaneseEra(
														dayjs(serviceProvideYearMonth),
														false,
													)}
													)
												</Text>
											</>
										) : (
											<Text>-</Text>
										)}
									</Td>
									<Td>
										<HStack w="95px" gap="5px" spacing={0} justifyContent="end">
											<Text>{`${totalAmount.toLocaleString()} 円`}</Text>
											{isCreatedAfterDirectDebitFileFinalized && (
												<Tooltip
													label={
														<>
															<Text>
																振替依頼確定後に利用者請求情報を登録しています。
															</Text>
															<Text>
																振替依頼に含める場合は、確定解除後に振替依頼ファイルを確定してください。
															</Text>
														</>
													}
													labelWidth="406px"
												>
													<WarningIcon
														backgroundColor="#333"
														borderRadius={50}
														color="#FFD500"
														boxSize={4}
													/>
												</Tooltip>
											)}
										</HStack>
									</Td>
									<Td lineHeight="base">
										<Text w="275px">
											{patientSeikyuId ? (
												<>
													<Text
														as="span"
														whiteSpace="normal"
														wordBreak="break-word"
													>
														{
															patientDirectDebitAccount.financialInstitutionsName
														}
													</Text>
													<Text
														as="span"
														ml={3}
														whiteSpace="normal"
														wordBreak="break-word"
													>
														{patientDirectDebitAccount.branchName}
													</Text>
												</>
											) : (
												`口座名義 ${patientDirectDebitAccount.accountHolder}`
											)}
										</Text>
										{patientSeikyuId && (
											<Text mt="2px">
												<Text as="span">
													{patientDirectDebitAccount.accountType &&
														toAccountTypeLabel(
															patientDirectDebitAccount.accountType,
														)}
												</Text>
												<Text as="span" ml="5px">
													{patientDirectDebitAccount.accountNumber}
												</Text>
											</Text>
										)}
									</Td>
									<Td textAlign="center">
										{patientSeikyuId ? (
											<Text>{dayjs(paymentDueDate).format("M/D")}</Text>
										) : (
											<Text>-</Text>
										)}
									</Td>
									<Td textAlign="center" lineHeight="base">
										<TransferRequestResultCell
											targetDirectDebit={targetDirectDebit}
											registDate={directDebit.registDate}
										/>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				)}
			</Table>
			{!hasData && (
				<Text mt="15px" fontSize="sm">
					指定された検索条件に該当する利用者請求情報がありませんでした。
				</Text>
			)}
		</TableContainer>
	);
};

const getIsAllChecked = (
	targetDirectDebits: TargetDirectDebit[],
	selectedDirectDebits: TargetDirectDebit[],
) => {
	if (selectedDirectDebits.length === 0 || targetDirectDebits.length === 0)
		return false;
	return targetDirectDebits.every((targetDirectDebit) =>
		selectedDirectDebits.includes(targetDirectDebit),
	);
};
