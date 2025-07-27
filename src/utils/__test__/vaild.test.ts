import { beforeEach, describe, expect, it, vi } from 'vitest'
import { vaildIsURL, validateQRCode } from '../vaild'

// 建立 mock function 外部可控制
const mockDecode = vi.fn()

vi.mock('@zxing/library', () => {
  return {
    BrowserQRCodeReader: vi.fn().mockImplementation(() => ({
      decodeFromImageElement: mockDecode,
    })),
  }
})

describe('validateQRCode', () => {
  beforeEach(() => {
    mockDecode.mockReset()
  })

  it('解析成功', async () => {
    mockDecode.mockResolvedValueOnce({
      getText: () => 'https://example.com',
    })

    const { success } = await validateQRCode('https://example.com/qr.png')
    expect(success).toBe(true)
  })
})

describe('vaildIsURL', () => {
  it('解析正確網址', () => {
    const result = vaildIsURL('https://www.google.com')
    expect(result).toBe(true)
  })

  it('解析錯誤網址', () => {
    const result = vaildIsURL('not a valid URL')
    expect(result).toBe(false)
  })
})
