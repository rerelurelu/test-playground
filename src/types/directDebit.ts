import type { ServerMessage } from "./ErrorMessage";
import type {
	AccountType,
	FileFormat,
	RequestFileStatus,
	ResultFileStatus,
	TransferRequestResultCode,
} from "./Schema";

export type RegexWithLabel = {
	label: string;
	regex: RegExp | null;
};

export type DirectDebitResponse = {
	paymentProcessedDate: string | null;
	receiptDate: string | null;
	requestTotalTimes: number | null;
	requestTotalAmount: number | null;
	resultTotalTimes: number | null;
	resultTotalAmount: number | null;
	registDate: string | null;
	fileFormat: FileFormat | null;
	createdAt: string | null;
	createdBy: string | null;
	includingZeroYenOrLessServiceProvideYearMonth: string | null;
	targetDirectDebitList: TargetDirectDebit[];
	alertList: ServerMessage[];
};

export type TargetDirectDebit = {
	requestFileStatus: RequestFileStatus | null;
	resultFileStatus: ResultFileStatus | null;
	patientSeikyuId: number | null;
	patientId: number | null;
	name: string | null;
	nameKana: string | null;
	serviceProvideYearMonth: string | null;
	totalAmount: number;
	patientDirectDebitAccount: PatientDirectDebitAccount;
	paymentDueDate: string;
	transferRequestResultCode: TransferRequestResultCode | null;
	isCreatedAfterDirectDebitFileFinalized: boolean;
};

export type PatientDirectDebitAccount = {
	patientDirectDebitAccountId: number | null;
	financialInstitutionsCode: string | null;
	financialInstitutionsName: string | null;
	branchCode: string | null;
	branchName: string | null;
	accountType: AccountType | null;
	accountNumber: string | null;
	accountHolder: string | null;
	clientNumber: string | null;
};

export type DownloadDirectDebitFileResponse = {
	fileByte: string;
	fileName: string;
};
