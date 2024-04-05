import { Box, Flex, type FlexProps, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import type { FC, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ToJapaneseFormatString } from "@/utils/JapaneseEra";

import { DatePicker } from "@/components/elements/DatePicker";
import { FileInput } from "@/components/fileInput/fileInput";
import type { FormData } from "./schema";

export const ImportForm: FC = () => {
	const { control } = useFormContext<FormData>();
	return (
		<Box>
			<FormWrapper title="入金結果ファイル">
				<Controller
					control={control}
					name="file"
					render={({ field: { value, onChange } }) => (
						<Flex alignItems="center" gap="10px" fontSize="xs">
							<FileInput
								minW="83px"
								variant="link"
								onChange={(files) => onChange(files[0])}
								color="#333333"
								fontSize="sm"
								fontWeight="normal"
								textDecoration="underline"
								textUnderlineOffset="4px"
								accept="text/csv, .dat, .text"
							>
								ファイル選択
							</FileInput>
							{value ? (
								<Text color="#333333" wordBreak="break-all">
									{value.name}
								</Text>
							) : (
								<Text color="#737373">未選択</Text>
							)}
						</Flex>
					)}
				/>
			</FormWrapper>
			<FormWrapper title="領収日" borderTop="none">
				<Controller
					control={control}
					name="date"
					render={({ field: { value, onChange } }) => (
						<Flex flex={1}>
							<DatePicker
								w="141px"
								value={value && ToJapaneseFormatString(dayjs(value))}
								onChange={onChange}
								placeholder="例）R1.1.1"
								placeholderStyle={{ fontSize: "sm" }}
							/>
						</Flex>
					)}
				/>
			</FormWrapper>
		</Box>
	);
};

const FormWrapper: FC<{ title: ReactNode; children: ReactNode } & FlexProps> =
	({ title, children, ...props }) => {
		return (
			<Flex
				minH="58.5px"
				border="1px solid #D6D6D6"
				alignItems="stretch"
				{...props}
			>
				<Flex
					minW="132px"
					maxW="132px"
					p="10px"
					bg="#e6ebed"
					fontSize="sm"
					alignItems="center"
				>
					{title}
				</Flex>
				<Flex alignItems="center" p="10px">
					{children}
				</Flex>
			</Flex>
		);
	};
