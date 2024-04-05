import { AccountType } from '@/types/Schema'
import { ACCOUNT_TYPE_CODES } from '@/utils/constans'

export const toAccountTypeLabel = (accountType: AccountType) => {
  switch (accountType) {
    case ACCOUNT_TYPE_CODES.NORMAL:
      return '普通預金'
    case ACCOUNT_TYPE_CODES.CURRENT:
      return '当座預金'
    case ACCOUNT_TYPE_CODES.TAX_DEPOSIT:
      return '納税準備金'
    case ACCOUNT_TYPE_CODES.OTHER:
      return 'その他'
  }
}
