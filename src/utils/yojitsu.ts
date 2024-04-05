import {
  CareLevel,
  NinteiStatus,
  PatientSeikyuStatus,
  YojitsuOutputStatus,
  YojitsuStatus,
} from '@/types/Schema'

export const toYojitsuStatusLabel = (value: YojitsuStatus) => {
  switch (value) {
    case 0:
      return '請求対象外'
    case 1:
      return '予定作成中'
    case 2:
      return '実績作成中'
    case 3:
      return '実績確定'
    case 9:
      return '未作成'
  }
}

export const toYojitsuOutputStatusLabel = (value: YojitsuOutputStatus) => {
  switch (value) {
    case 0:
      return '未出力'
    case 1:
      return '出力済'
    case 2:
      return '出力エラー'
  }
}

export const toPatientSeikyuStatusLabel = (value: PatientSeikyuStatus) => {
  switch (value) {
    case 0:
      return '未作成'
    case 1:
      return '作成済'
  }
}

// 【要介護状態区分コード】 06:事業対象者 12:要支援１ 13:要支援２ 21:要介護１ 22:要介護２ 23:要介護３ 24:要介護４ 25:要介護５
export const toCareLevelLabel = (value?: CareLevel) => {
  switch (value) {
    case '06':
      return '事業対象者'
    case '12':
      return '要支援１'
    case '13':
      return '要支援２'
    case '21':
      return '要介護１'
    case '22':
      return '要介護２'
    case '23':
      return '要介護３'
    case '24':
      return '要介護４'
    case '25':
      return '要介護５'
    default:
      return '未登録'
  }
}

export const toNinteiStatusLabel = (value: NinteiStatus) => {
  switch (value) {
    case '0':
      return '申請中'
    case '1':
      return '認定済'
  }
}
