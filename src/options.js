import {
  loadMessages,
  getStorage,
  setStorage,
  loadStyle
} from './utils/webext.js'

const save = document.getElementById('save')
const options = [
  document.getElementById('free'),
  document.getElementById('token'),
  document.getElementById('target')
]

async function loadStorage() {
  for (const i of options) {
    if (i.tagName === 'INPUT' && i.type === 'checkbox') {
      var type = 'checked'
    } else if (i.tagName === 'INPUT' && i.type === 'text' || i.tagName === 'SELECT') {
      var type = 'value'
    }
    i[type] = (await getStorage(i['id']))[i['id']]
  }
}

function saveStorage() {
  for (const i of options) {
    if (i.tagName === 'INPUT' && i.type === 'checkbox') {
      var type = 'checked'
    } else if (i.tagName === 'INPUT' && i.type === 'text' || i.tagName === 'SELECT') {
      var type = 'value'
    }
    setStorage(i['id'], i[type])
  }
}

loadMessages()
loadStorage()
loadStyle()

save.addEventListener('click', saveStorage)
