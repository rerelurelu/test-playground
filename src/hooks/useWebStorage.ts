import { useCallback } from "react";

import type {
	DepositStatus,
	PaymentMethod,
	YojitsuOutputStatus,
	YojitsuStatus,
} from "@/types/Schema";

export type PatientSeikyuUncreatedSearchParams = {
	patientSeikyuUncreatedSearch: {
		paymentMethodList: string[];
		includeNoPaymentMethodPatients: boolean;
	};
};

export type PatientSeikyuCreatedSearch = {
	paymentMethod: PaymentMethod[];
	depositStatus: DepositStatus[];
	paymentDueDateIsBeforeToday: boolean;
	notOutputPatientInvoice: boolean;
	notOutputPatientReceipt: boolean;
	isUpdatedYojitsu: boolean;
};

export type YojitsuWorkProgressListSearch = {
	yojitsuStatusList: YojitsuStatus[];
	yojitsuOutputStatusList: YojitsuOutputStatus[];
	isOnlykouhiExpired: boolean;
	careManagerOfficeName?: string;
};

type UseWebStorage<T> = {
	getItem: () => T | undefined;
	setItem: (newValue: T) => void;
	removeItem: () => void;
};

export type WEB_STORAGE_KEYS = {
	// お知らせ既読記事ID保存用（localStorageで使用）
	readNoticeArticleIds: string[];
	// 予実一覧の検索サービス提供年月保持用（sessionStorageで使用）
	yojitsuServiceProvideYearMonth: string;
	// 予実一覧の検索条件保持用（sessionStorageで使用）
	yojitsuWorkProgressListSearch: YojitsuWorkProgressListSearch;
	// 利用者請求一覧(未作成)の検索条件保持用（sessionStorageで使用）
	patientSeikyuUncreatedSearchParams: PatientSeikyuUncreatedSearchParams;
	// 利用者請求一覧(作成済)の検索条件保持用（sessionStorageで使用）
	patientSeikyuCreatedSearch: PatientSeikyuCreatedSearch;
	// 利用者請求一覧の検索請求年月保持用（sessionStorageで使用）
	patientSeikyuServiceProvideYearMonth: string;
	// 国保連請求管理の請求年月保持用（sessionStorageで使用）
	kokuhorenSeikyuYearMonth: string;
};

export const useWebStorage = <T extends keyof WEB_STORAGE_KEYS>(
	key: T,
	options?: {
		type?: "local" | "session"; // デフォルトでは 'local' が設定される
	},
): UseWebStorage<WEB_STORAGE_KEYS[T]> => {
	const { type = "local" } = options ?? {};
	const storage = type === "local" ? localStorage : sessionStorage;

	const getItem = useCallback(() => {
		const storedValue = storage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : undefined;
	}, [storage, key]);

	const setItem = useCallback(
		(newValue: WEB_STORAGE_KEYS[T]) => {
			storage.setItem(key, JSON.stringify(newValue));
		},
		[storage, key],
	);

	const removeItem = useCallback(() => {
		storage.removeItem(key);
	}, [storage, key]);

	return { getItem, setItem, removeItem };
};
