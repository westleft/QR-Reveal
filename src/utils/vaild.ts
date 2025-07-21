import jsQR from "jsqr"

// Types
interface QRCodeResult {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * Creates a canvas element and gets its 2D context
 * @returns CanvasRenderingContext2D or null if failed
 */
function createCanvasContext(): CanvasRenderingContext2D | null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    console.error('createCanvasContext failed');
    return null;
  }
  
  return ctx;
}

/**
 * Loads an image from URL with proper error handling
 * @param imageUrl - URL of the image to load
 * @param config - Image processing configuration
 * @returns Promise that resolves with the loaded image or rejects with error
 */
async function loadImage(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Error'));
    
    img.src = imageUrl;
  });
}

/**
 * Processes image data to detect QR code
 * @param imageData - Image data from canvas
 * @param config - QR detection configuration
 * @returns QR code data if found, null otherwise
 */
function detectQRCode(imageData: ImageData): string | null {
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  
  return code ? code.data : null;
}

/**
 * Validates if the given image URL contains a QR code
 * @param imageUrl - URL of the image to analyze
 * @param config - Optional configuration for image processing
 * @returns Promise<QRCodeResult> - Result object with success status and data/error
 */
async function validateQRCode(
  imageUrl: string, 
): Promise<QRCodeResult> {
  try {
    // Create canvas context
    const ctx = createCanvasContext();
    if (!ctx) {
      return {
        success: false,
        error: 'Canvas Context Failed'
      };
    }
    
    // Load image
    const img = await loadImage(imageUrl);
    
    // Set canvas dimensions and draw image
    const canvas = ctx.canvas;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // Get image data and detect QR code
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qrData = detectQRCode(imageData);

    if (!qrData) {
      return {
        success: false,
        error: 'No QR Code Found'
      };
    }
    
    return {
      success: true,
      data: qrData
    };

  } catch (error) {
    return {
      success: false,
      error: 'error'
    };
  }
}

export { validateQRCode }
