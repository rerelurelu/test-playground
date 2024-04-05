// 【要介護状態区分コード】 06:事業対象者 12:要支援１ 13:要支援２ 21:要介護１ 22:要介護２ 23:要介護３ 24:要介護４ 25:要介護５
export type CareLevel = "06" | "12" | "13" | "21" | "22" | "23" | "24" | "25";

// 【支払い方法】 01:現金払い 02:振込 03:口座振替 04:その他
export type PaymentMethod = "01" | "02" | "03" | "04";

// 【請求先】 1:本人 2:本人以外
export type SeikyuSakiCode = "1" | "2";

// 【認定情報】 0:申請中 1:認定済
export type NinteiStatus = "0" | "1";

// 【制度】 01:社会福祉法人等による軽減 02:その他
export type InstitutionCode = "01" | "02";

// 【性別】 1:男性 2:女性
export type Gender = "1" | "2";

// 【利用状況】 0:利用中 1:一時休止 2:利用中止
export type UsingStatus = "0" | "1" | "2";

// 【預金種目】 1:普通預金 2:当座預金 3:納税準備金 9:その他
export type AccountType = "1" | "2" | "3" | "9";

// 【予実画面制御ステータス】 0:請求対象外 1:作成中 2:実績確定後 3:請求確定後 4:請求締め以降 5:再作成後の最新版以外 9:未作成
export type DisplayYojitsuStatus = 0 | 1 | 2 | 3 | 4 | 5 | 9;

// 【提供票作成ステータス】 0:請求対象外 1:予定作成中 2:実績作成中 3:実績確定後 9:未作成
export type YojitsuStatus = 0 | 1 | 2 | 3 | 9;

// 【算定単位】 01:回 02:日 03:月
export type SanteiUnit = "01" | "02" | "03";

// 【サービス区分】 1:基本サービス 2:加算 3:減算
export type ServiceCategory = "1" | "2" | "3";

// 【パターン】 1:パターン1 2:パターン2 3:パターン3 4:パターン4 5:パターン5
export type Pattern = "1" | "2" | "3" | "4" | "5";

// 【事業所規模】 1:通常規模型 2:大規模型(Ⅰ) 3:大規模型(Ⅱ) 4:地域密着型 5:療養型
export type ScaleType = "1" | "2" | "3" | "4" | "5";

// 【様式番号】 NO1:様式第一 NO1_2:様式第一の二 NO2:様式第二 NO2_3:様式第二の三
export type InvoiceNo = "NO1" | "NO1_2" | "NO2" | "NO2_3";

// 【請求明細画面ステータス】 0:国保連請求未確定 1:国保連請求確定(10日以前) 2:国保連請求確定(11日以降)
export type DisplaySeikyuMeisaiStatus = 0 | 1 | 2;

// 【施設利用中止理由】 1:非該当 3:医療機関入院 4:死亡 5:その他 6:介護老人福祉施設入所 7:介護老人保健施設入所 8:介護療養型医療施設入院 9:介護医療院入所
export type StopUsingReason = 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 【国保連請求画面ステータス】 0:国保連請求未確定 1:国保連請求確定(10日以前) 2:国保連請求確定(11日以降)
export type DisplayKokuhorenSeikyuStatus = 0 | 1 | 2;

// 【国保連請求画面 請求確定ステータス】0:国保連請求未確定 1:国保連請求確定
export type KokuhorenSeikyuStatus = 0 | 1;

// 【媒体区分】 1:伝送 4:CD-R
export type MediumType = 1 | 4;

// 【入金状況】 0:未入金 1:入金済
export type DepositStatus = 0 | 1;

// 【利用者請求ステータス】 0:未作成 1:作成済
export type PatientSeikyuStatus = 0 | 1;

// 【請求書出力ステータス】 0:未出力 1:出力済
export type PatientInvoiceOutputStatus = 0 | 1;

// 【領収書出力ステータス】 0:未出力 1:出力済
export type PatientReceiptOutputStatus = 0 | 1;

// 【利用者請求一覧】(未作成)検索区分 0:初期表示 1:再検索
export type UncreatedListSearchCategory = 0 | 1;

// 【課税種別】 0:非課税 1:10%課税 2:8%課税
export type TaxType = 0 | 1 | 2;

// 【医療費控除パターン】 0:控除対象外 1:1割控除 2:10割控除
export type MedicalExpenseDeductiblePattern = 0 | 1 | 2;

// 【提供票出力ステータス】 0:未出力 1:出力済 2:出力エラー
export type YojitsuOutputStatus = 0 | 1 | 2;

// 【利用者請求PDF出力種別】 0:請求書 1:領収書 2:領収書（控）
export type PatientInvoicePDFType = 0 | 1 | 2;

//【マスク処理】 0:なし 1:あり
export type Masking = "0" | "1";

// TODO schema定義書に合わせる
//【ファイルフォーマット】 0:csv 1:text 2:dat
export type FileFormat = 0 | 1 | 2;

// TODO schema定義書に合わせる
//【コード区分】 0: JIS（0）
export type CharacterCode = 0;

//【振替結果ステータス】 0：振替済 1：資金不足 2：取引なし 3：預金者停止 4：依頼書なし 8：委託者停止 9：その他
export type TransferRequestResultCode = 0 | 1 | 2 | 3 | 4 | 8 | 9;

//【振替依頼ファイルステータス】 0：未確定 1：確定済
export type RequestFileStatus = 0 | 1;

//【入金結果ファイルステータス】 0：未取込 1：取込済
export type ResultFileStatus = 0 | 1;
