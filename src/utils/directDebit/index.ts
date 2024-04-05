
import { RequestFileStatus, ResultFileStatus, TransferRequestResultCode } from '@/types/Schema'
import { REQUEST_FILE_STATUS, RESULT_FILE_STATUS } from '@/utils/constans'

/**
 * 入金結果ファイルが取込済かどうかのフラグを返す
 * @param registDate - 取込日
 * @returns boolean
 */
export const getIsResultFileStatusReceived = (registDate: string | null) =>
  registDate !== null

/**
 * 振替依頼ファイルにのみ存在するデータかどうかのフラグを返す
 * @param transferRequestResultCode - 振替結果ステータス
 * @param requestFileStatus - 振替依頼ファイルステータス
 * @param resultFileStatus - 入金結果ファイルステータス
 * @param registDate - 取込日
 * @returns boolean
 */
export const getIsExistOnlyRequestFile = (
  transferRequestResultCode: TransferRequestResultCode | null,
  requestFileStatus: RequestFileStatus | null,
  resultFileStatus: ResultFileStatus | null,
  registDate: string | null,
) => {
  const isResultFileStatusReceived = getIsResultFileStatusReceived(registDate)

  if (
    transferRequestResultCode === null &&
    requestFileStatus === REQUEST_FILE_STATUS.FINALIZED &&
    resultFileStatus === RESULT_FILE_STATUS.NOT_RECEIVED &&
    isResultFileStatusReceived
  ) {
    return true
  }
  return false
}

/**
 * 入金結果ファイルにのみ存在するデータかどうかのフラグを返す
 * @param requestFileStatus - 振替依頼ファイルステータス
 * @param resultFileStatus - 入金結果ファイルステータス
 * @param registDate - 取込日
 * @returns boolean
 */
export const getIsExistOnlyResultFile = (
  requestFileStatus: RequestFileStatus | null,
  resultFileStatus: ResultFileStatus | null,
  registDate: string | null,
) => {
  const isResultFileStatusReceived = getIsResultFileStatusReceived(registDate)

  if (
    requestFileStatus === REQUEST_FILE_STATUS.NOT_FINALIZED &&
    resultFileStatus === RESULT_FILE_STATUS.RECEIVED &&
    isResultFileStatusReceived
  ) {
    return true
  }
  return false
}
