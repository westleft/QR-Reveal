import { expect, describe, it } from 'vitest'
import { detectQRCodeFromImage } from '../detect'

describe('detectQRCodeFromImage', () => {
  it('should return the QR code text', () => {
    const image = new Image()
    image.src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    const result = detectQRCodeFromImage(image)
    expect(result).toBe('https://www.google.com')
  })
})