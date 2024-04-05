import { AccountType, FileFormat, PaymentMethod, RequestFileStatus, ResultFileStatus, SeikyuSakiCode, TransferRequestResultCode, YojitsuOutputStatus, YojitsuStatus } from "@/types/Schema"


// 予実画面制御ステータス
export const NOT_SUBJECT_TO_SEIKYU = '0' // 請求対象外
export const IN_PROGRESS = '1' // 作成中
export const AFTER_JISSEKI_FINALIZED = '2' // 実績確定後
export const AFTER_KOKUHOREN_SEIKYU_FINALIZED = '3' // 請求確定後
export const AFTER_SEIKYU_CLOSED = '4' // 請求締め以降
export const OTHER_THAN_LATEST_VERSION = '5' // 再作成後の最新版以外
export const NOT_YET_CREATED = '9' // 未作成

// 提供票ステータス
export const YOJITSU_STATUS = {
  NOT_SUBJECT_TO_SEIKYU: 0, // 請求対象外
  YOTEI_IN_PROGRESS: 1, // 予定作成中
  JISSEKI_IN_PROGRESS: 2, // 実績作成中
  AFTER_JISSEKI_FINALIZED: 3, // 実績確定後
  NOT_YET_CREATED: 9, // 未作成
}

// 国保連請求画面ステータス
export const NOT_YET_FINALIZED_KOKUHOREN = 0 // 国保連請求未確定
export const AFTER_KOKUHOREN_SEIKYU_FINALIZED_KOKUHOREN = 1 // 国保連請求確定(10日以前)
export const AFTER_SEIKYU_CLOSED_KOKUHOREN = 2 // 国保連請求確定(11日以降)

// 医療費控除パターン
export const NOT_SUBJECT = 0 // 控除対象外
export const TEN_PER = 1 // 1割控除
export const ONE_HUNDRED_PER = 2 // 10割控除

// 課税種別
export const TAX_EXEMPT = 0 // 非課税
export const TEN_PER_TAXABLE = 1 // 10%課税
export const EIGHT_PER_TAXABLE = 2 // 8%課税

// 入金状況
export const WAITING = 0 // 未入金
export const RECEIVED = 1 // 入金済

// 請求先
export const MAINPERSON = '1' // 本人
export const MAINPERSON_OUTSIDE = '2' // 本人以外

// 支払い方法
export const CASH = '01' // 現金払い
export const TRANSFER = '02' // 振込
export const ACCOUNT_TRANSFER = '03' // 口座振替
export const OTHERS = '04' // その他

// 預金種目
export const NORMAL_ACCOUNT = '1' // 普通預金
export const CURRENT_ACCOUNT = '2' // 当座預金
export const OTHER = '9' // その他

// 請求明細画面ステータス
export const AFTER_JISSEKI_FINALIZED_SEIKYU = 0 // 国保連請求未確定
export const AFTER_KOKUHOREN_SEIKYU_FINALIZED_SEIKYU = 1 // 国保連請求確定(10日以前)
export const AFTER_SEIKYU_CLOSED_SEIKYU = 2 // 国保連請求確定(11日以降)

// 居宅サービス計画・介護サービス計画作成者
export const CARE_SUPPORT_PROVIDER = '1.居宅介護支援事業者作成'
export const SELF_CREATED_INSURER = '2.被保険者自己作成'
export const CARE_PREVENSION_SUPPORT_OPERATOR = '3.介護予防支援事業者'

// 様式番号
export const NO1 = '様式第一'
export const NO1_2 = '様式第一の二'
export const NO2 = '様式第二'
export const NO2_3 = '様式第二の三'

// 要介護状態区分コード
export const PES = '06'
export const SR1 = '12'
export const SR2 = '13'
export const CL1 = '21'
export const CL2 = '22'
export const CL3 = '23'
export const CL4 = '24'
export const CL5 = '25'

// 等級
export const GRADE = {
  GRADE_NO_SELECTED: 0, // 未選択
  GRADE_ONE: 1, // 1級地
  GRADE_TWO: 2, // 2級地
  GRADE_THREE: 3, // 3級地
  GRADE_FOUR: 4, // 4級地
  GRADE_FIVE: 5, // 5級地
  GRADE_SIX: 6, // 6級地
  GRADE_SEVEN: 7, // 7級地
  OTHER: 99, // その他
}

export const charGroupRegexes = [
  { label: '全て', regex: null },
  { label: 'あ', regex: /^[アイウエオヴ]/ },
  { label: 'か', regex: /^[カキクケコガギグゲゴ]/ },
  { label: 'さ', regex: /^[サシスセソザジズゼゾ]/ },
  { label: 'た', regex: /^[タチツテトダヂヅデド]/ },
  { label: 'な', regex: /^[ナニヌネノ]/ },
  { label: 'は', regex: /^[ハヒフヘホバビブベボパピプペポ]/ },
  { label: 'ま', regex: /^[マミムメモ]/ },
  { label: 'や', regex: /^[ヤユヨ]/ },
  { label: 'ら', regex: /^[ラリルレロ]/ },
  { label: 'わ', regex: /^[ワヲン]/ },
]

// 利用者請求一覧でのPDF出力件数上限
export const maxPdfOutput = 200

export const yojitsuStatusList: YojitsuStatus[] = [9, 1, 2, 3, 0]
export const yojitsuOutputStatusList: YojitsuOutputStatus[] = [0, 1, 2]

export const queryParamKeys = {
  officeId: 'office_id',
  date: 'serviceProvideYearMonth', //TODO: yyyymm
  yyyymmdd: 'serviceProvideDate',
  from: 'from', //フロント側の画面遷移制御
  fromForBackend: 'source_service', //バックエンド制御
  patientSeikyuId: 'patientSeikyuId',
  searchCategory: 'searchCategory',
}

//  予実一覧でのPDF出力件数上限
export const maxYojitsuPdfOutput = 200

// TOP画面でのお知らせ一覧最大表示件数
export const DISPLAYED_NOTICE_ARTICLE_LIMIT = 11

/**
 * リハプランのドメイン
 */
export const REHAPLAN_BASE_URL = process.env.NEXT_PUBLIC_PLF_BASE_URL
/**
 * デイリーのドメイン
 */
export const DAILY_BASE_URL = process.env.NEXT_PUBLIC_DAILY_BASE_URL
/**
 * モーションAIのドメイン
 */
export const MOTIONAI_BASE_URL = process.env.NEXT_PUBLIC_MOTIONAI_BASE_URL

/**請求期日 */
export const deadline = 10

/**
 * 預金種別番号
 */
export const ACCOUNT_TYPE_CODES = {
  NORMAL: '1',
  CURRENT: '2',
  TAX_DEPOSIT: '3',
  OTHER: '9',
} as const satisfies Record<string, AccountType>

/**
 * ファイルフォーマット番号
 */
export const FILE_FORMAT_CODES = {
  CSV: 0,
  TEXT: 1,
  DAT: 2,
} as const satisfies Record<string, FileFormat>

/**
 * 利用者請求用設定フィールド名
 */
export const USER_SEIKYU_FIELD_NAMES = {
  ZIP_STR: 'officeBiller.zip',
  PREFECTURE_STR: 'officeBiller.prefecture',
  CITY_STR: 'officeBiller.city',
  ADDRESS_STR: 'officeBiller.address',
  BILLER_NAME_STR: 'officeBiller.billerName',
  DEPARTMENT_STR: 'officeBiller.department',
  TEL_STR: 'officeBiller.tel',
  REGISTRATION_NUMBER_STR: 'officeBiller.registrationNumber',
  FINANCIAL_CODE_STR: 'officeTransferAccount.financialInstitutionsCode',
  FINANCIAL_NAME_STR: 'officeTransferAccount.financialInstitutionsName',
  BRANCH_CODE_STR: 'officeTransferAccount.branchCode',
  BRANCH_NAME_STR: 'officeTransferAccount.branchName',
  ACCOUNT_TYPE_STR: 'officeTransferAccount.accountType',
  ACCOUNT_NUMBER_STR: 'officeTransferAccount.accountNumber',
  ACCOUNT_HOLDER_STR: 'officeTransferAccount.accountHolder',
  RECEIVING_AGENCY_CODE_STR: 'officeDirectDebit.receivingAgencyCode',
  RECEIVING_AGENCY_NAME_STR: 'officeDirectDebit.receivingAgencyName',
  FILE_FORMAT_STR: 'officeDirectDebit.fileFormat',
} as const satisfies Record<string, string>

/**
 * 支払方法コード
 */
export const PAYMENT_METHOD_CODES = {
  CASH: '01',
  TRANSFER: '02',
  ACCOUNT_TRANSFER: '03',
  OTHERS: '04',
} as const satisfies Record<string, PaymentMethod>

/**
 * 請求先コード
 */
export const SEIKYUSAKI_CODES = {
  SELF: '1',
  OTHERS: '2',
} as const satisfies Record<string, SeikyuSakiCode>

/**
 * 請求方法等フィールド名
 */
export const BILLING_FIELD_NAMES = {
  PAYMENT_METHOD_STR: 'billings.paymentMethod',
  PAYMENT_METHOD_OTHER_STR: 'billings.paymentMethodOthers',
  SEIKYUSAKI_CODE_STR: 'billings.seikyusakiCode',
  NAME_STR: 'billings.name',
  RELATIONSHIP_STR: 'billings.relationship',
  ZIP_STR: 'billings.zip',
  PREFECTURE_STR: 'billings.prefecture',
  CITY_STR: 'billings.city',
  ADDRESS_STR: 'billings.address',
  TEL_STR: 'billings.tel',
  IS_SPUTUM_SUCTION_STR: 'billings.isSputumSuctionImplementation',
  IS_DIAPER_STR: 'billings.isDiaperUseCertificate',
  FINANCIAL_CODE_STR: 'billings.financialCode',
  FINANCIAL_NAME_STR: 'billings.financialName',
  BRANCH_CODE_STR: 'billings.branchCode',
  BRANCH_NAME_STR: 'billings.branchName',
  ACCOUNT_TYPE_STR: 'billings.accountType',
  ACCOUNT_NUMBER_STR: 'billings.accountNumber',
  ACCOUNT_HOLDER_STR: 'billings.accountHolder',
  CUSTOMER_NUMBER_STR: 'billings.customerNumber',
} as const satisfies Record<string, string>

// 住所検索APIエンドポイント
export const SEARCH_ADDRESS_ENDPOINT = 'https://api.zipaddress.net/'

// 振替結果ステータス
export const TRANSFER_REQUEST_RESULT_CODE = {
  RECEIVED: 0,
  INSUFFICIENT_FUNDS: 1,
  NO_TRANSACTION: 2,
  DEPOSITOR_STOP: 3,
  NO_REQUEST_FORM: 4,
  ENTRUSTER_STOP: 8,
  OTHER: 9,
} as const satisfies Record<string, TransferRequestResultCode>

// 振替依頼ファイルステータス
export const REQUEST_FILE_STATUS = {
  NOT_FINALIZED: 0,
  FINALIZED: 1,
} as const satisfies Record<string, RequestFileStatus>

// 入金結果ファイルステータス
export const RESULT_FILE_STATUS = {
  NOT_RECEIVED: 0,
  RECEIVED: 1,
} as const satisfies Record<string, ResultFileStatus>

// スクロールの挙動
export const SCROLL_TO: { [key: string]: ScrollToOptions } = {
  TOP: { top: 0, behavior: 'smooth' }, // 画面トップにスクロール
}
