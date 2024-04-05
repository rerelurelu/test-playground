import { Text, type TextProps } from "@chakra-ui/react";
import type { FC } from "react";

import { WarningTwoIcon } from "@/components/elements/Icons/WarningTwoIcon";
import type { TargetDirectDebit } from "@/types/directDebit";
import { TRANSFER_REQUEST_RESULT_CODE } from "@/utils/constans";
import { getIsExistOnlyRequestFile } from "@/utils/directDebit";
import { getIsExistOnlyResultFile } from "@/utils/directDebit/index";

type Props = TextProps & {
	targetDirectDebit: TargetDirectDebit;
	registDate: string | null;
};

export const TransferRequestResultCell: FC<Props> = ({
	targetDirectDebit,
	registDate,
	...props
}) => {
	const { requestFileStatus, resultFileStatus, transferRequestResultCode } =
		targetDirectDebit;
	const isExistOnlyRequestFile = getIsExistOnlyRequestFile(
		transferRequestResultCode,
		requestFileStatus,
		resultFileStatus,
		registDate,
	);
	const isExistOnlyResultFile = getIsExistOnlyResultFile(
		requestFileStatus,
		resultFileStatus,
		registDate,
	);

	const style: TextProps = {
		w: "126px",
		whiteSpace: "normal",
		wordBreak: "break-word",
		...props,
	};

	if (transferRequestResultCode === TRANSFER_REQUEST_RESULT_CODE.RECEIVED) {
		return <Text {...style}>振替済み</Text>;
	}
	if (transferRequestResultCode === null) {
		if (isExistOnlyRequestFile) {
			return (
				<Text {...style}>
					入金結果ファイルに明細がありません
					<WarningTwoIcon verticalAlign="text-bottom" />
				</Text>
			);
		}
		return <Text {...style} />;
	}
	if (isExistOnlyResultFile) {
		return (
			<Text {...style}>
				振替依頼ファイルに明細がありません
				<WarningTwoIcon verticalAlign="text-bottom" />
			</Text>
		);
	}
	return <Text {...style}>振替失敗</Text>;
};
