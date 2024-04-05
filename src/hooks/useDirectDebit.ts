import { getDirectDebitMock } from "@/components/DirectDebit/mock/getDirectDebitMock";
import type { RegexWithLabel, TargetDirectDebit } from "@/types/directDebit";
import { sortBy } from "lodash";
import { useMemo } from "react";

export const useDirectDebit = (regexWithLabel: RegexWithLabel) => {
	// TODO: API繋ぎ込み時に削除
	const data = getDirectDebitMock(2);

	const filteredList = useMemo(() => {
		const { targetDirectDebitList } = data;
		const { regex } = regexWithLabel;
		if (!regex) return targetDirectDebitList ?? [];
		// 五十音で絞り込み
		const filteredData = (targetDirectDebitList ?? []).filter(
			(targetDirectDebit: TargetDirectDebit) => {
				if (!targetDirectDebit.nameKana) return false;
				return targetDirectDebit.nameKana.match(regex);
			},
		);
		/**
		 * 利用者のかな文字(昇順) → サービス提供年月(昇順)でソートして返す
		 * 同値の場合は順番を維持する（BEレスポンスの第3ソートキーでソートされた並び順に合わせる）
		 */
		return sortBy(filteredData, ["nameKana", "serviceProvideYearMonth"]);
	}, [data, regexWithLabel]);

	return {
		directDebit: {
			...data,
			targetDirectDebitList: filteredList,
		},
		allTargetDirectDebits: data.targetDirectDebitList,
	};
};
