import {
  getIsExistOnlyResultFile,
  getIsResultFileStatusReceived,
} from '@/utils/directDebit/index'

import {
  REQUEST_FILE_STATUS,
  RESULT_FILE_STATUS,
  TRANSFER_REQUEST_RESULT_CODE,
} from '../constans'
import { getIsExistOnlyRequestFile } from './index'

describe('getIsResultFileStatusReceived', () => {
  it('registDateがnullでない場合、trueを返す', () => {
    expect(getIsResultFileStatusReceived('2024-01-01')).toBe(true)
  })

  it('registDateがnullの場合、falseを返す', () => {
    expect(getIsResultFileStatusReceived(null)).toBe(false)
  })
})

describe('getIsExistOnlyRequestFile', () => {
  describe('振替結果ステータスコードがnullの場合', () => {
    const transferRequestResultCode = null

    describe('振替依頼ファイルステータスが未確定かつ、入金結果ファイルステータスが未取込の場合', () => {
      it('入金結果ファイルが未取込の場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            transferRequestResultCode,
            REQUEST_FILE_STATUS.NOT_FINALIZED,
            RESULT_FILE_STATUS.NOT_RECEIVED,
            null,
          ),
        ).toBe(false)
      })
    })

    describe('振替依頼ファイルステータスが確定済かつ、入金結果ファイルステータスが未取込の場合', () => {
      it('入金結果ファイルが取込済の場合、trueを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            transferRequestResultCode,
            REQUEST_FILE_STATUS.FINALIZED,
            RESULT_FILE_STATUS.NOT_RECEIVED,
            '2024-01-01',
          ),
        ).toBe(true)
      })
    })
  })

  describe('振替結果ステータスコードがnullでない場合', () => {
    describe('振替依頼ファイルステータスが確定済かつ、入金結果ファイルステータスが取込済の場合', () => {
      const requestFileStatus = REQUEST_FILE_STATUS.FINALIZED
      const resultFileStatus = RESULT_FILE_STATUS.RECEIVED

      it('振替結果ステータスが振替済の場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.RECEIVED,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })

      it('振替結果ステータスが資金不足の場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.INSUFFICIENT_FUNDS,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })

      it('振替結果ステータスが取引なしの場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.NO_TRANSACTION,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })

      it('振替結果ステータスが預金者停止の場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.DEPOSITOR_STOP,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })

      it('振替結果ステータスが依頼書なしの場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.NO_REQUEST_FORM,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })

      it('振替結果ステータスが委託者停止の場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.ENTRUSTER_STOP,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })

      it('振替結果ステータスがその他の場合、falseを返す', () => {
        expect(
          getIsExistOnlyRequestFile(
            TRANSFER_REQUEST_RESULT_CODE.OTHER,
            requestFileStatus,
            resultFileStatus,
            '2024-01-01',
          ),
        ).toBe(false)
      })
    })
  })
})

describe('getIsExistOnlyResultFile', () => {
  describe('振替依頼ファイルステータスが未確定かつ、入金結果ファイルステータスが取込済の場合', () => {
    const requestFileStatus = REQUEST_FILE_STATUS.NOT_FINALIZED
    const resultFileStatus = RESULT_FILE_STATUS.RECEIVED

    it('入金結果ファイルが取込済の場合、trueを返す', () => {
      expect(
        getIsExistOnlyResultFile(
          requestFileStatus,
          resultFileStatus,
          '2024-01-01',
        ),
      ).toBe(true)
    })
  })

  describe('振替依頼ファイルステータスが確定済かつ、入金結果ファイルステータスが取込済の場合', () => {
    const requestFileStatus = REQUEST_FILE_STATUS.FINALIZED
    const resultFileStatus = RESULT_FILE_STATUS.RECEIVED

    it('入金結果ファイルが取込済の場合、falseを返す', () => {
      expect(
        getIsExistOnlyResultFile(
          requestFileStatus,
          resultFileStatus,
          '2024-01-01',
        ),
      ).toBe(false)
    })
  })
})
