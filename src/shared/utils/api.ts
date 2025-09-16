import { BackgroundMessageAction } from '../types'

function matchRegex(regex: RegExp, html: string) {
  const match = html.match(regex)
  return match?.[1]?.trim()
}

export async function fetchWebsite(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    const html = await response.text()
    const title = matchRegex(/<title[^>]*>([^<]+)<\/title>/i, html)
    const description = matchRegex(/<meta name="description" content="([^"]+)"/i, html)
    const image = matchRegex(/<meta property="og:image" content="([^"]+)"/i, html)

    return {
      title,
      description,
      image,
    }
  } catch (error) {
    console.error('error：', error)
    throw error
  }
}

export async function getScreenImage() {
  const image = await chrome.runtime.sendMessage({
    action: BackgroundMessageAction.CaptureVisibleTab,
  })
  return image
}
