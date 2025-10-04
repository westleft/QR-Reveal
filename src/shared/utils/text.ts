import { notify } from './notify'

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    notify(chrome.i18n.getMessage('content_copied_to_clipboard'))
  } catch (error) {
    console.error('Error copying text:', error)
  }
}
