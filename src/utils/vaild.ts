import jsQR from "jsqr"

// Types
interface QRCodeResult {
  success: boolean;
  data?: string;
  error?: string;
}

interface ImageProcessingConfig {
  crossOrigin: string;
  inversionAttempts: "dontInvert" | "attemptBoth" | "invertFirst";
}

// Constants
const DEFAULT_CONFIG: ImageProcessingConfig = {
  crossOrigin: 'anonymous',
  inversionAttempts: "dontInvert",
};

// Error messages
const ERROR_MESSAGES = {
  CANVAS_CONTEXT_FAILED: 'Could not get canvas context',
  IMAGE_LOAD_FAILED: 'Failed to load image',
  NO_QR_CODE_FOUND: 'No QR code found in image',
} as const;

/**
 * Creates a canvas element and gets its 2D context
 * @returns CanvasRenderingContext2D or null if failed
 */
function createCanvasContext(): CanvasRenderingContext2D | null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    console.error(ERROR_MESSAGES.CANVAS_CONTEXT_FAILED);
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
async function loadImage(imageUrl: string, config: ImageProcessingConfig): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = config.crossOrigin;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(ERROR_MESSAGES.IMAGE_LOAD_FAILED));
    
    img.src = imageUrl;
  });
}

/**
 * Processes image data to detect QR code
 * @param imageData - Image data from canvas
 * @param config - QR detection configuration
 * @returns QR code data if found, null otherwise
 */
function detectQRCode(imageData: ImageData, config: ImageProcessingConfig): string | null {
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: config.inversionAttempts,
  });
  
  return code ? code.data : null;
}

/**
 * Sends QR code detection result to background script
 * @param qrData - Detected QR code data
 * @param imageUrl - Original image URL
 */
function notifyBackgroundScript(qrData: string, imageUrl: string): void {
  chrome.runtime.sendMessage({
    action: 'qrCodeDetected',
    content: qrData,
    data: {
      imageUrl: imageUrl
    }
  });
}

/**
 * Validates if the given image URL contains a QR code
 * @param imageUrl - URL of the image to analyze
 * @param config - Optional configuration for image processing
 * @returns Promise<QRCodeResult> - Result object with success status and data/error
 */
async function validateQRCode(
  imageUrl: string, 
  config: Partial<ImageProcessingConfig> = {}
): Promise<QRCodeResult> {
  try {    
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    
    // Create canvas context
    const ctx = createCanvasContext();
    if (!ctx) {
      return {
        success: false,
        error: ERROR_MESSAGES.CANVAS_CONTEXT_FAILED
      };
    }
    
    // Load image
    const img = await loadImage(imageUrl, finalConfig);
    
    // Set canvas dimensions and draw image
    const canvas = ctx.canvas;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // Get image data and detect QR code
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qrData = detectQRCode(imageData, finalConfig);
    
    if (!qrData) {
      console.log(ERROR_MESSAGES.NO_QR_CODE_FOUND);
      return {
        success: false,
        error: ERROR_MESSAGES.NO_QR_CODE_FOUND
      };
    }

    notifyBackgroundScript(qrData, imageUrl);
    
    return {
      success: true,
      data: qrData
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error detecting QR code:', errorMessage);
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

export { validateQRCode, type QRCodeResult, type ImageProcessingConfig }
