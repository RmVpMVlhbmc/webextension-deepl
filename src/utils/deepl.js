const apiFree = 'https://api-free.deepl.com/v2/translate'
const apiPro = 'https://api.deepl.com/v2/translate'

export default async (key, free, text, target) => {
  const url = new URL(free ? apiFree : apiPro)

  url.searchParams.set('auth_key', key)
  url.searchParams.set('text', text)
  url.searchParams.set('target_lang', target)

  const res = await fetch(url)

  if (res.ok !== true) {
    switch (res.status) {
      case 400:
        throw new Error(chrome.i18n.getMessage('deeplErrorInvalidParameter'))
      case 403:
        throw new Error(chrome.i18n.getMessage('deeplErrorInvalidToken'))
      default:
        throw new Error(chrome.i18n.getMessage('deeplErrorUnknown'))
    }
  } else {
    return await res.json()
  }
}
