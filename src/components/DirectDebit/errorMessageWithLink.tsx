import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";

import { useWebStorage } from "@/hooks/useWebStorage";
import { GetJapaneseEra } from "@/utils/JapaneseEra";
import { PAYMENT_METHOD_CODES, WAITING } from "@/utils/constans";
import type { FC } from "react";
import { LinkText } from "./fragments";

type Props = {
	officeId: string;
	includingZeroYenOrLessServiceProvideYearMonth: string;
};

export const ErrorMessageWithLink: FC<Props> = ({
	officeId,
	includingZeroYenOrLessServiceProvideYearMonth,
}) => {
	const { setItem } = useWebStorage("patientSeikyuCreatedSearch", {
		type: "session",
	});
	const year = GetJapaneseEra(
		dayjs(includingZeroYenOrLessServiceProvideYearMonth),
	);
	const day = dayjs(includingZeroYenOrLessServiceProvideYearMonth).format("M");
	const pathname = `${process.env.NEXT_PUBLIC_BASE_URL}/office/${officeId}/patient_seikyu/created`;

	const onClick = () => {
		// 画面遷移時、検索条件に「支払方法: 口座振替、入金状況: 未入金」をセットする
		setItem({
			paymentMethod: [PAYMENT_METHOD_CODES.ACCOUNT_TRANSFER],
			depositStatus: [WAITING],
			paymentDueDateIsBeforeToday: false,
			notOutputPatientInvoice: false,
			notOutputPatientReceipt: false,
			isUpdatedYojitsu: false,
		});
	};

	return (
		<Text>
			<Link
				href={{
					pathname: pathname,
					query: {
						serviceProvideYearMonth:
							includingZeroYenOrLessServiceProvideYearMonth,
					},
				}}
				onClick={onClick}
			>
				<LinkText>{`サービス提供年月${year}${day}月`}</LinkText>
			</Link>
			に請求金額が0円未満の利用者請求情報があります。確認してください。
		</Text>
	);
};
