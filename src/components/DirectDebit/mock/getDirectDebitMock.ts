
import { DirectDebitResponse } from '@/types/directDebit'
import {
  MOCK_DATA_1,
  MOCK_DATA_2,
  MOCK_DATA_3,
  MOCK_DATA_4,
  MOCK_DATA_5,
  MOCK_DATA_6,
  MOCK_DATA_7,
  MOCK_DATA_8,
  MOCK_DATA_9,
} from './data'

/**
 * 口座振替情報を返す関数
 * @param {num}
 * 1: 振替依頼が未確定、入金結果ファイルが未取込、引落年月がシステム日付の前月以前\
 * 2: 振替依頼が未確定、入金結果ファイルが未取込、引落年月がシステム日付の当月以降\
 * 3: 振替依頼が確定済、入金結果ファイルが未取込、利用者請求情報の追加登録なし\
 * 4: 振替依頼が確定済、入金結果ファイルが未取込、利用者請求情報の追加登録あり\
 * 5: 振替依頼が確定済、入金結果ファイルが未取込、0円未満の利用者請求情報が存在\
 * 6: 振替依頼が確定済、入金結果ファイルが未取込、振替依頼ファイル出力時に選択しなかったデータパターンが存在\
 * 7: 振替依頼が確定済、入金結果ファイルが取込済、振替依頼ファイルに存在するが入金結果ファイルに存在しない利用者含む\
 * 8: 振替依頼が確定済、入金結果ファイルが取込済、振替依頼ファイルに存在しないが入金結果ファイルに存在する利用者含む\
 * 9: 五十音検索用
 * @returns 口座振替情報
 */
export const getDirectDebitMock = (num: number): DirectDebitResponse => {
  switch (num) {
    case 2:
      return MOCK_DATA_2
    case 3:
      return MOCK_DATA_3
    case 4:
      return MOCK_DATA_4
    case 5:
      return MOCK_DATA_5
    case 6:
      return MOCK_DATA_6
    case 7:
      return MOCK_DATA_7
    case 8:
      return MOCK_DATA_8
    case 9:
      return MOCK_DATA_9
    default:
      return MOCK_DATA_1
  }
}
