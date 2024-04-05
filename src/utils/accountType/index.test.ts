import { toAccountTypeLabel } from './index'

describe('toAccountTypeLabel', () => {
  it('AccountTypeが1の場合、普通預金を返す', () => {
    expect(toAccountTypeLabel('1')).toBe('普通預金')
  })

  it('AccountTypeが2の場合、当座預金を返す', () => {
    expect(toAccountTypeLabel('2')).toBe('当座預金')
  })

  it('AccountTypeが3の場合、納税準備金を返す', () => {
    expect(toAccountTypeLabel('3')).toBe('納税準備金')
  })

  it('AccountTypeが9の場合、その他を返す', () => {
    expect(toAccountTypeLabel('9')).toBe('その他')
  })
})
