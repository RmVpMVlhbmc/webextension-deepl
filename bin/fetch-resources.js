import fs from 'fs'
import stream from 'stream'
import util from 'util'

import fetch from 'node-fetch'

const MOZILLA_BUILDS_API =
  'https://hg.mozilla.org/mozilla-central/json-firefoxreleases?platform=win64'
const MOZILLA_FILE_BASEURL = 'https://hg.mozilla.org/mozilla-central/raw-file'
const UNPKG_BASEURL = 'https://unpkg.com'

async function main() {
  const mozillaBuilds = await (await fetch(MOZILLA_BUILDS_API)).json()

  const config = JSON.parse(fs.readFileSync('resources.json'))

  for (const m of config['mozilla']) {
    await fetchMozillaResource(
      mozillaBuilds['builds'][0]['node'],
      MOZILLA_FILE_BASEURL,
      m['from'],
      m['to']
    )
  }

  for (const u of config['unpkg']) {
    await fetchUnpkgResource(UNPKG_BASEURL, u['from'], u['to'])
  }
}

async function fetchMozillaResource(build, baseurl, from, to) {
  const r = await fetch(`${baseurl}/${build}/${from}`)

  if (r.ok === true) {
    const p = util.promisify(stream.pipeline)

    await p(r.body, fs.createWriteStream(to))
  } else {
    throw new Error('HTTP Error.')
  }
}

async function fetchUnpkgResource(baseurl, from, to) {
  const r = await fetch(`${baseurl}/${from['package']}/${from['file']}`)

  if (r.ok === true) {
    const p = util.promisify(stream.pipeline)

    await p(r.body, fs.createWriteStream(to))
  } else {
    throw new Error('HTTP Error.')
  }
}

await main()
