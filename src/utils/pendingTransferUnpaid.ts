import { PatientSeikyuCreated } from '@/common/types/PatientSeikyuCreated'

import { REQUEST_FILE_STATUS, RESULT_FILE_STATUS, WAITING } from './constans'

// 未入金(振替依頼中)判定処理
export const isPendingTransferUnpaid = (data: PatientSeikyuCreated) => {
  return (
    data.depositStatus === WAITING &&
    data.requestFileStatus === REQUEST_FILE_STATUS.FINALIZED &&
    data.resultFileStatus === RESULT_FILE_STATUS.NOT_RECEIVED
  )
}
