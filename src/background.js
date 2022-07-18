import deepl from './utils/deepl.js'

browser.contextMenus.create({
  id: 'translate',
  title: browser.i18n.getMessage('contextMenuTranslate'),
  contexts: ['selection']
})

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case 'translate':
      const o = await browser.storage.local.get(['free', 'token', 'target'])

      try {
        var r = await deepl(o.token, o.free, info.selectionText, o.target)
      } catch (e) {
        browser.runtime.openOptionsPage()

        break
      }

      let t = ''
      for (const i of r['translations']) {
        t += i['text'].replace(/./g, (c) =>
          c.charCodeAt(0).toString().padStart(5, '0')
        )
      }

      browser.tabs.executeScript({
        code: `alert('${t}'.replace(/.{5}/g, c => String.fromCharCode(parseInt(c))))`
      })

      break
  }
})
