import dayjs from "dayjs";
import { type InferType, mixed, object, string } from "yup";

export const schema = object({
	file: mixed<File>().required("入金結果ファイルを取り込んでください。"), //note: submit後にfileのtypeについてのエラーが出るためfile typeのvalidationは行わない
	date: string().required("領収日を選択してください。"),
});

export type FormData = InferType<typeof schema>;

export const paymentProcessedDateSchema = object({
	paymentProcessedYearMonth: string(),
	paymentProcessedDate: string()
		.nullable()
		.test(
			"invalidDate",
			"引落日は引落年月内の日付を選択してください。",
			(v, content) => {
				if (!v) return true;
				return dayjs(v).isSame(
					content.parent.paymentProcessedYearMonth,
					"month",
				);
			},
		),
});

export type PaymentProcessedDateFormData = InferType<
	typeof paymentProcessedDateSchema
>;
