export type Rect = { x: number, y: number, width: number, height: number }

export function cropBase64Image(base64: string, rect: Rect) {
  return new Promise<string>((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = rect.width
      canvas.height = rect.height

      const ctx = canvas.getContext('2d')!

      const scaleX = img.width / document.documentElement.scrollWidth
      const scaleY = img.height / document.documentElement.scrollHeight

      const scaledRect = {
        x: rect.x * scaleX,
        y: rect.y * scaleY,
        width: rect.width * scaleX,
        height: rect.height * scaleY,
      }
      ctx.drawImage(
        img,
        scaledRect.x,
        scaledRect.y,
        scaledRect.width,
        scaledRect.height,
        0,
        0,
        rect.width,
        rect.height,
      )

      resolve(canvas.toDataURL('image/png'))
    }
    img.src = base64
  })
}
