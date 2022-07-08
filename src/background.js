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
        const r = await deepl(o.token, o.free, info.selectionText, o.target)

        let t = ''
        for (const i of r['translations']) {
          t += i['text']
        }
  
        browser.tabs.executeScript({
          code: `alert(\`${t}\`)`
        })
      } catch (e) {
        browser.runtime.openOptionsPage()
      }



      break
  }
})
