import {
	Box,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { extend } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { isEqual } from "lodash";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, get, useForm } from "react-hook-form";
extend(isSameOrAfter);

import {
	FinalizedInfo,
	Info,
	RevertModal,
	TargetDirectDebitTable,
} from "@/components/DirectDebit";
import { ErrorMessageWithLink } from "@/components/DirectDebit/errorMessageWithLink";
import {
	ConfirmModal,
	ImportModal,
	LinkText,
} from "@/components/DirectDebit/fragments";
import {
	type PaymentProcessedDateFormData,
	paymentProcessedDateSchema,
} from "@/components/DirectDebit/fragments/schema";
import { FilterButton } from "@/components/FilterButton";
import { MainLayout } from "@/components/MainLayout";
import { Alert } from "@/components/elements/Alert";
import { Button } from "@/components/elements/Button";
import { Checkbox } from "@/components/elements/Checkbox";
import { DatePicker, MonthPicker } from "@/components/elements/DatePicker";
import { Heading } from "@/components/elements/Heading";
import { StatusMessage } from "@/components/elements/StatusMessage";
import { TextButton } from "@/components/elements/TextButton";
import { useDirectDebit } from "@/hooks/useDirectDebit";
import { useToast } from "@/hooks/useToast";
import type { ServerMessage } from "@/types/ErrorMessage";
import type { RegexWithLabel, TargetDirectDebit } from "@/types/directDebit";
import { ToJapaneseFormatString } from "@/utils/JapaneseEra";
import { SCROLL_TO, charGroupRegexes, queryParamKeys } from "@/utils/constans";
import { getIsResultFileStatusReceived } from "@/utils/directDebit/index";

export default function DirectDebit() {
	const { get: getSearchParams } = useSearchParams();
	const officeId = getSearchParams(queryParamKeys.officeId) ?? "1234";
	const [regexWithLabel, setRegexWithLabel] = useState<RegexWithLabel>(
		charGroupRegexes[0],
	);
	const { directDebit, allTargetDirectDebits } = useDirectDebit(regexWithLabel);
	const {
		isOpen: isOpenImport,
		onClose: onCloseImport,
		onOpen: onOpenImport,
	} = useDisclosure();
	const {
		isOpen: isOpenRevert,
		onOpen: onOpenRevert,
		onClose: onCloseRevert,
	} = useDisclosure();
	const {
		isOpen: isOpenConfirm,
		onOpen: onOpenConfirm,
		onClose: onCloseConfirm,
	} = useDisclosure();
	const [fileTypeError, setFileTypeError] = useState<ServerMessage[]>(); //note: submit後に入金ファイルのtypeエラーを格納する
	const messages = concatErrorMessages([fileTypeError, directDebit.alertList]); //todo: error messageをここに追加
	const {
		control,
		watch,
		trigger,
		formState: { errors, isValid },
	} = useForm<PaymentProcessedDateFormData>({
		resolver: yupResolver(paymentProcessedDateSchema),
		mode: "onChange",
		defaultValues: {
			paymentProcessedYearMonth: dayjs().format("YYYY-MM"),
			paymentProcessedDate: null,
		},
	});
	const toast = useToast();

	const handleImport = () => {
		window.scrollTo(SCROLL_TO.TOP);
		if (!isSameFileType()) {
			setFileTypeError(toFileTypeErrors());
			onCloseImport();
			return;
		}
		setFileTypeError(undefined);
		setRegexWithLabel(charGroupRegexes[0]);
		onCloseImport();
		toast("入金結果ファイルを取り込みました。");
	};

	const handleConfirm = () => {
		// TODO: API繋ぎ込み時にロジック追加
		window.scrollTo(SCROLL_TO.TOP);
		setSelectedDirectDebits([]);
		setRegexWithLabel(charGroupRegexes[0]);
		onCloseConfirm();
		toast("振替依頼を確定しました。");
	};

	const handleRevert = () => {
		// TODO: API繋ぎ込み時にロジック追加
		window.scrollTo(SCROLL_TO.TOP);
		setRegexWithLabel(charGroupRegexes[0]);
		onCloseRevert();
		toast("振替依頼を確定解除しました。");
	};

	const [selectedDirectDebits, setSelectedDirectDebits] = useState<
		TargetDirectDebit[]
	>([]);

	// 振替依頼ファイルが確定済かどうかのフラグ
	const isRequestFileStatusFinalized = directDebit.createdAt !== null;
	// 入金結果ファイルが取込済かどうかのフラグ
	const isResultFileStatusReceived = getIsResultFileStatusReceived(
		directDebit.registDate,
	);
	// 口座振替情報部に出力、取込ボタンを表示させるかどうかのフラグ
	const hasButton =
		(isRequestFileStatusFinalized && !isResultFileStatusReceived) ?? false;
	// 振替依頼可能な引落年月を選択しているかどうかのフラグ
	const isOperableDate = dayjs(
		watch("paymentProcessedYearMonth"),
	).isSameOrAfter(dayjs().format("YYYY-MM"));
	// 振替依頼確定ボタンを押下可能かどうかのフラグ
	const canFinalize =
		!!watch("paymentProcessedDate") &&
		isValid &&
		selectedDirectDebits.length > 0 &&
		!isRequestFileStatusFinalized;
	// ステータスメッセージを表示するかどうかのフラグ
	const showStatusMessage =
		!isOperableDate ||
		isRequestFileStatusFinalized ||
		isResultFileStatusReceived;
	// 請求情報一覧が0件時の表示制御に使うフラグ
	const isExistTargetDirectDebit = allTargetDirectDebits.length > 0;
	const total = allTargetDirectDebits.length;

	const handleChangeSelectedTargetDirectDebits = (
		checked: boolean,
		targetDirectDebit: TargetDirectDebit,
	) => {
		if (checked) {
			setSelectedDirectDebits([...selectedDirectDebits, targetDirectDebit]);
			return;
		}
		setSelectedDirectDebits(
			selectedDirectDebits.filter((ele) => !isEqual(ele, targetDirectDebit)),
		);
	};

	const handleChangeAllSelectedTargetDirectDebits = (checked: boolean) => {
		if (checked) {
			const filteredDirectDebits = directDebit.targetDirectDebitList.filter(
				(targetDirectDebit: TargetDirectDebit) =>
					!selectedDirectDebits.includes(targetDirectDebit),
			);
			setSelectedDirectDebits([
				...selectedDirectDebits,
				...filteredDirectDebits,
			]);
			return;
		}
		const filteredDirectDebits = selectedDirectDebits.filter(
			(selectedDirectDebit) =>
				directDebit.targetDirectDebitList.every(
					(targetDirectDebit: TargetDirectDebit) =>
						!isEqual(selectedDirectDebit, targetDirectDebit),
				),
		);
		setSelectedDirectDebits(filteredDirectDebits);
	};

	const handleChangeRegex = (value: RegexWithLabel) => {
		setRegexWithLabel(value);
	};

	return (
		<MainLayout officeId={officeId} currentPage="口座振替管理">
			<Box mt={5} pl={5}>
				<Flex gap={5} flexDir="column">
					<HStack gap="5px">
						<Text fontSize="sm" whiteSpace="nowrap">
							引落年月
						</Text>
						<FormControl
							w="188px"
							isInvalid={get(errors, "paymentProcessedYearMonth")}
						>
							<Controller
								name="paymentProcessedYearMonth"
								control={control}
								render={({ field: { onChange } }) => (
									<MonthPicker
										value={watch("paymentProcessedYearMonth")}
										isNotDirectInput={true}
										onChange={(date) => {
											if (!date) return;
											setSelectedDirectDebits([]);
											onChange(date.format("YYYY-MM"));
											trigger("paymentProcessedDate");
										}}
									/>
								)}
							/>
						</FormControl>
					</HStack>
					{(messages ||
						directDebit.includingZeroYenOrLessServiceProvideYearMonth) && (
						<Alert
							message={messages}
							component={
								directDebit.includingZeroYenOrLessServiceProvideYearMonth && (
									<ErrorMessageWithLink
										officeId={officeId}
										includingZeroYenOrLessServiceProvideYearMonth={
											directDebit.includingZeroYenOrLessServiceProvideYearMonth
										}
									/>
								)
							}
							fontSize="sm"
							mr={5}
						/>
					)}
					{showStatusMessage && (
						<Box mr={5}>
							<StatusMessage>
								<Text>
									{!isOperableDate &&
										"引落年月が過去の振替依頼は確定できません。最新の引落年月で振替依頼を確定してください。"}
									{isRequestFileStatusFinalized &&
										!isResultFileStatusReceived &&
										"振替依頼が確定しています。"}
									{isResultFileStatusReceived && directDebit.receiptDate && (
										<>
											入金結果ファイルの取込が完了しています。一覧は入金結果ファイルの内容になるため、最新の入金状況は
											<Link
												href={{
													pathname: `${process.env.NEXT_PUBLIC_BASE_URL}/office/${officeId}/patient_seikyu/created`,
												}}
											>
												<LinkText>利用者請求一覧</LinkText>
											</Link>
											よりご確認ください。
										</>
									)}
								</Text>
							</StatusMessage>
						</Box>
					)}
					{isOperableDate && (
						<>
							<Heading text="口座振替" />
							{isRequestFileStatusFinalized && (
								<Box>
									<Info
										directDebit={directDebit}
										hasButtons={hasButton}
										onOpenImport={onOpenImport}
									/>
									<Text fontSize="xs" color="#737373" mt="10px">
										※引落口座が同一のものはまとめて1件としてカウント
									</Text>
									<Flex w="fit-content" mt={5} alignItems="center" gap="10px">
										<FinalizedInfo directDebit={directDebit} />
										{!isResultFileStatusReceived && (
											<TextButton
												label="確定解除"
												onClick={onOpenRevert}
												color="#333333"
												textUnderlineOffset="4px"
											/>
										)}
									</Flex>
								</Box>
							)}
							{!isRequestFileStatusFinalized && (
								<Text fontSize="sm">確定された口座振替依頼はありません。</Text>
							)}
						</>
					)}
				</Flex>
				{isOperableDate && (
					<>
						<Divider mt={10} borderColor="border" />
						<Flex flexDir="column" mt={10}>
							<HStack
								justifyContent="space-between"
								alignItems="start"
								w="987px"
							>
								<VStack gap="2px" minH="71px">
									<HStack w="full">
										<Heading text="請求情報一覧" />
										{isExistTargetDirectDebit &&
											!isRequestFileStatusFinalized && (
												<Text fontSize="sm" ml="20px">
													振替対象
													<Text
														as="span"
														fontWeight="bold"
														fontSize="large"
														ml="5px"
														w="fit-content"
														minW="30px"
														textAlign="right"
														display="inline-block"
													>
														{selectedDirectDebits.length}
													</Text>
													{`件／${total}件中`}
												</Text>
											)}
									</HStack>
									{isExistTargetDirectDebit && (
										<Flex alignItems="end" flexGrow={1}>
											{charGroupRegexes.map((d, i) => (
												<FilterButton
													label={d.label}
													regex={d.regex}
													isSelected={isEqual(d, regexWithLabel)}
													onClickHandler={() => handleChangeRegex(d)}
													key={`${d}-aaa`}
													_notLast={{ mr: "10px" }}
													h="34px"
												/>
											))}
										</Flex>
									)}
								</VStack>
								{isExistTargetDirectDebit && !isResultFileStatusReceived && (
									<HStack ml="auto" alignItems="start" gap={5}>
										{!isRequestFileStatusFinalized && (
											<FormControl
												w="141px"
												isInvalid={get(errors, "paymentProcessedDate")}
											>
												<FormLabel m={0} mb="12px">
													引落日
												</FormLabel>
												<Controller
													name="paymentProcessedDate"
													control={control}
													render={({ field: { value, onChange } }) => {
														return (
															<DatePicker
																placeholder="R3.6.27"
																value={
																	value
																		? ToJapaneseFormatString(dayjs(value))
																		: null
																}
																onChange={(date) => {
																	onChange(
																		date ? date.format("YYYY-MM-DD") : null,
																	);
																}}
															/>
														);
													}}
												/>
												<FormErrorMessage>
													{errors.paymentProcessedDate?.message}
												</FormErrorMessage>
											</FormControl>
										)}
										<Flex
											flexDir="column"
											justifyContent="start"
											alignItems="start"
											gap="10px"
										>
											<Checkbox
												label="チェックした明細の"
												size="sm"
												isChecked={true}
												cursor="default"
												m={0}
											/>
											<Button
												variant="primary"
												label="振替依頼の確定"
												w="132px"
												isDisabled={!canFinalize}
												onClick={onOpenConfirm}
											/>
										</Flex>
									</HStack>
								)}
							</HStack>
							{isExistTargetDirectDebit ? (
								<TargetDirectDebitTable
									directDebit={directDebit}
									officeId={officeId}
									isRequestFileStatusFinalized={isRequestFileStatusFinalized}
									isResultFileStatusReceived={isResultFileStatusReceived}
									selectedDirectDebits={selectedDirectDebits}
									handleChangeSelectedTargetDirectDebits={
										handleChangeSelectedTargetDirectDebits
									}
									handleChangeAllSelectedTargetDirectDebits={
										handleChangeAllSelectedTargetDirectDebits
									}
									w="fit-content"
									maxH="700px"
									mt="22px"
									mb={10}
								/>
							) : (
								<Text mt={5} fontSize="sm">
									振替対象の利用者請求情報がありません。
								</Text>
							)}
						</Flex>
					</>
				)}
				<ImportModal
					isOpen={isOpenImport}
					onClose={onCloseImport}
					onSubmit={handleImport}
				/>
				<RevertModal
					isOpen={isOpenRevert}
					onClose={onCloseRevert}
					onConfirm={handleRevert}
				/>
				<ConfirmModal
					isOpen={isOpenConfirm}
					onClose={onCloseConfirm}
					onConfirm={handleConfirm}
				/>
			</Box>
		</MainLayout>
	);
}

//note: api繋ぎこみ時に以下のチェックがあれば削除。必要ならテストも追加
const isValidFileType = (file: File) =>
	file.type === "text/csv" ||
	file.type === "text/plain" ||
	file.name.endsWith(".dat");

//todo: 入金結果ファイルと振替依頼ファイルの形式が同じか比較する
const isSameFileType = () => true;

//todo: XXXのハンドリング
const toFileTypeErrors = () => {
	return [
		{ message: "入金結果ファイルのファイル形式が正しくありません。" },
		{
			//todo: XXXに振替依頼ファイル出力時のファイル形式を表示
			message: "ファイル形式がXXXの入金結果ファイルを取り込んでください。",
		},
	];
};

/**
 * 複数のServerMessage[]を一つにまとめる関数
 * @param messages アラート一覧に表示したいメッセージの配列の配列
 * @returns 一つにまとめられたServerMessage[]
 */
const concatErrorMessages = (
	messages: (ServerMessage[] | undefined)[],
): ServerMessage[] | undefined => {
	const filteredMessages = messages.filter(
		(message): message is Exclude<typeof message, undefined> =>
			message !== undefined,
	);
	const concatenatedMessage = filteredMessages.flat();
	if (concatenatedMessage.length === 0) return undefined;
	return concatenatedMessage;
};
