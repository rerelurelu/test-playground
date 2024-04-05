import Encoding from 'encoding-japanese'

export const decodeBase64 = (data: string) => {
  const tmp = Encoding.base64Decode(data)
  return new Uint8Array(tmp)
}
export const downloadFile = (
  data: string | Uint8Array,
  type: string,
  fileName: string,
) => {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
