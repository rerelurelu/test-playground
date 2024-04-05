import { SEARCH_ADDRESS_ENDPOINT } from './constans'

type AddressDetails = {
  pref: string
  address: string
  city: string
  town: string
  fullAddress: string
}

export const searchAddress = async (
  zipcode: string,
): Promise<{ data?: AddressDetails }> => {
  const response = await fetch(`${SEARCH_ADDRESS_ENDPOINT}/?zipcode=${zipcode}`)

  if (!response.ok) return { data: undefined }
  return response.json()
}
