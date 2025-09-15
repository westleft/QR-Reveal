import type { Rect } from '@/core/services/crop'
import { cropBase64Image } from '@/core/services'
import { getScreenImage } from '@/shared/utils'

export function useSelectArea() {
  const selectionBox = createSelectionBox()
  applyInitialStyles(selectionBox)

  let startX = 0
  let startY = 0
  let initialized = false
  let previousUserSelect = ''

  const onMouseMove = (e: MouseEvent) => {
    const currentX = e.pageX
    const currentY = e.pageY

    updateCursorMask(selectionBox, currentX, currentY)

    const x = Math.min(startX, currentX)
    const y = Math.min(startY, currentY)
    const w = Math.abs(startX - currentX)
    const h = Math.abs(startY - currentY)

    updateSelectionBox(selectionBox, { x, y, width: w, height: h })
  }

  const onMouseUp = async (e: MouseEvent) => {
    const endX = e.pageX
    const endY = e.pageY

    const rect: Rect = computeRect(startX, startY, endX, endY)
    // eslint-disable-next-line no-console
    console.log('選取框座標:', rect)

    cleanupAfterSelection(selectionBox, onMouseMove, onMouseUp)
    restoreUserSelect(previousUserSelect)

    requestAnimationFrame(async () => {
      const image = await getScreenImage()
      const base64 = await cropBase64Image(image, rect)
      // eslint-disable-next-line no-console
      console.log(base64)
    })
  }

  const onMouseDown = (e: MouseEvent) => {
    if (initialized) {
      return
    }
    initialized = true

    startX = e.pageX
    startY = e.pageY

    previousUserSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'

    updateSelectionBox(selectionBox, { x: startX, y: startY, width: 0, height: 0 })
    selectionBox.hidden = false

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp, { once: true })
  }

  document.addEventListener('mousedown', onMouseDown)

  function destroy() {
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    restoreUserSelect(previousUserSelect)
    if (selectionBox.parentNode) {
      selectionBox.parentNode.removeChild(selectionBox)
    }
  }

  return { destroy }
}

function createSelectionBox() {
  const div = document.createElement('div')
  div.id = 'selection'
  document.body.appendChild(div)
  return div
}

function applyInitialStyles(div: HTMLDivElement) {
  div.style.border = '2px dashed #4a90e2'
  div.style.background = 'rgba(74, 144, 226, 0.2)'
  div.style.pointerEvents = 'none'
  div.style.position = 'absolute'
  div.style.zIndex = '99997'
  // 以透明底 + mask 來呈現滑鼠圓形聚焦效果
  div.style.background = 'transparent'
  div.hidden = true
}

function updateCursorMask(div: HTMLDivElement, x: number, y: number) {
  const mask = `radial-gradient(circle at ${x}px ${y}px, transparent 0, transparent 50px, #000 50px)`
  // @ts-expect-error - webkit prefix for Safari
  div.style.webkitMask = mask
  div.style.mask = mask
}

function updateSelectionBox(div: HTMLDivElement, rect: Rect) {
  div.style.left = `${rect.x}px`
  div.style.top = `${rect.y}px`
  div.style.width = `${rect.width}px`
  div.style.height = `${rect.height}px`
}

function computeRect(startX: number, startY: number, endX: number, endY: number): Rect {
  // + 2 為選取框的邊框寬度
  return {
    x: Math.min(startX, endX) + 2,
    y: Math.min(startY, endY) + 2,
    width: Math.abs(startX - endX),
    height: Math.abs(startY - endY),
  }
}

function cleanupAfterSelection(
  selectionBox: HTMLDivElement,
  onMouseMove: (e: MouseEvent) => void,
  onMouseUp: (e: MouseEvent) => void,
) {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  selectionBox.hidden = true
}

function restoreUserSelect(previous: string) {
  document.body.style.userSelect = previous || ''
}
