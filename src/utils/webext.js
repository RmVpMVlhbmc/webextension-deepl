function loadMessages() {
  document
    .querySelectorAll('[data-message]')
    .forEach((e) => (e.textContent = browser.i18n.getMessage(e.dataset.message)))
}

async function getStorage(key) {
  return await browser.storage.local.get(key)
}

function setStorage(key, value) {
  return browser.storage.local.set({
    [key]: value
  })
}

function loadStyle(href = './third_party/extension.css') {
  if (navigator.userAgent.includes('Firefox') === false) {
    const style = document.createElement('link')

    style.rel = 'stylesheet'
    style.href = href

    document.head.appendChild(style)
  }
}

export { loadMessages, getStorage, setStorage, loadStyle }
