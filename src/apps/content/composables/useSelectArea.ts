import type { Rect } from '@/core/services/crop'
import { cropBase64Image } from '@/core/services'
import { getScreenImage } from '@/shared/utils'

export function useSelectArea(callback: (base64: string) => void) {
  const selectionBox = createSelectionBox()
  applyInitialStyles(selectionBox)

  let startX = 0
  let startY = 0
  let initialized = false
  let previousUserSelect = ''

  const onMouseMove = (e: MouseEvent) => {
    const currentX = e.clientX
    const currentY = e.clientY

    updateCursorMask(selectionBox, currentX, currentY)

    const x = Math.min(startX, currentX)
    const y = Math.min(startY, currentY)
    const w = Math.abs(startX - currentX)
    const h = Math.abs(startY - currentY)

    updateSelectionBox(selectionBox, { x, y, width: w, height: h })
  }

  const onMouseUp = async (e: MouseEvent) => {
    const endX = e.clientX
    const endY = e.clientY

    const rect: Rect = computeRect(startX, startY, endX, endY)

    // console.log('選取框座標:', rect)

    cleanupAfterSelection(selectionBox, onMouseMove, onMouseUp)
    restoreUserSelect(previousUserSelect)

    requestAnimationFrame(async () => {
      const image = await getScreenImage()
      const base64 = await cropBase64Image(image, rect)
      callback(base64)
    })
  }

  const onMouseDown = (e: MouseEvent) => {
    if (initialized) {
      return
    }
    initialized = true

    startX = e.clientX
    startY = e.clientY

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
  div.style.cssText = `
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    cursor: crosshair;
    position: fixed;
    mask-image: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
    mask-size: 0px 0px, 100%;
    mask-position: 0px 0px, 0;
    mask-repeat: no-repeat;
    mask-composite: exclude;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
  `
}

function updateCursorMask(div: HTMLDivElement, x: number, y: number) {
  // const mask = `radial-gradient(circle at ${x}px ${y}px, transparent 0, transparent 50px, #000 50px)`
  const maskSize = `${200}px ${200}px, 100% 100%`
  const maskPosition = `${x}px ${y}px, 0`
  div.style.maskSize = maskSize
  div.style.maskPosition = maskPosition
}

function updateSelectionBox(div: HTMLDivElement, rect: Rect) {
  const maskSize = `${rect.width}px ${rect.height}px, 100% 100%`
  const maskPosition = `${rect.x}px ${rect.y}px, 0`
  div.style.maskSize = maskSize
  div.style.maskPosition = maskPosition
  // div.style.left = `${rect.x}px`
  // div.style.top = `${rect.y}px`
  // div.style.width = `${rect.width}px`
  // div.style.height = `${rect.height}px`
}

function computeRect(startX: number, startY: number, endX: number, endY: number): Rect {
  return {
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
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
