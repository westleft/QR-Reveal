/**
 * valid parent element is image.
 * include img, canvas, svg, background-image.
 * @param el element
 */
export function vaildIsImage(el: HTMLElement): boolean {
  let isImage = false

  const tag = el.tagName.toLowerCase()
  const imageTags = new Set(['img', 'canvas', 'svg', 'image'])

  isImage = imageTags.has(tag) && (tag !== 'img' || !!(el as HTMLImageElement).src)

  if (!isImage) {
    const bgi = getComputedStyle(el).backgroundImage
    isImage = !!bgi && bgi !== 'none'
  }

  return isImage
}
