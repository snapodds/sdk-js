import { Inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { DOCUMENT } from '../tokens/document-token';
import { ManipulatedImage } from './manipulated-image';

@Injectable({
  providedIn: 'root',
})
export class ImageManipulationService {
  constructor(private readonly logger: LoggerService, @Inject(DOCUMENT) private readonly document: Document) {}

  /**
   * Creates an image from the `source` based on which part is visible in the viewfinder.
   * @param source: the webcams video stream
   * @param viewFinder: the viewfinder from which the image should be cropped
   * @param scaleFactor: the factor the user has zoomed into the image
   * @param maxDimension: the max dimension of the resulting image
   */
  cropAndResizeImage(
    source: HTMLVideoElement,
    viewFinder: HTMLElement,
    scaleFactor: number,
    maxDimension: number
  ): Promise<ManipulatedImage> {
    let sx = 0;
    let sy = 0;
    let sourceWidth = source.videoWidth;
    let sourceHeight = source.videoHeight;

    if (this.shouldCrop(scaleFactor, source, viewFinder)) {
      ({ sx, sy, sourceWidth, sourceHeight } = this.crop(source, viewFinder, scaleFactor));
    }

    let preferredWidth = sourceWidth;
    let preferredHeight = sourceHeight;

    if (this.shouldDownscale(preferredWidth, preferredHeight, maxDimension)) {
      ({ preferredWidth, preferredHeight } = this.downscale(preferredWidth, preferredHeight, maxDimension));
    }

    const canvas = this.document.createElement('canvas');
    canvas.width = preferredWidth;
    canvas.height = preferredHeight;

    const renderingContext = canvas.getContext('2d');
    renderingContext?.drawImage(source, sx, sy, sourceWidth, sourceHeight, 0, 0, preferredWidth, preferredHeight);

    return this.createImageFromCanvas(canvas);
  }

  /**
   * Determines if parts of the image should be cropped.
   *
   * @param scaleFactor: the factor the user has zoomed into the image
   * @param source: the webcams video stream
   * @param viewFinder: the viewfinder from which the image should be cropped
   * @private
   */
  private shouldCrop(scaleFactor: number, source: HTMLVideoElement, viewFinder: HTMLElement) {
    return scaleFactor > 1 || source !== viewFinder;
  }

  /**
   * Crops the part of the image which is visible beneath the viewfinder
   * @param source: the webcams video stream
   * @param viewFinder: the viewfinder from which the image should be cropped
   * @param scaleFactor: the factor the user has zoomed into the image
   * @private
   */
  private crop(
    source: HTMLVideoElement,
    viewFinder: HTMLElement,
    scaleFactor: number
  ): { sx: number; sy: number; sourceWidth: number; sourceHeight: number } {
    const videoScale = Math.max(source.videoWidth / source.clientWidth, source.videoHeight / source.clientHeight);

    let sourceWidth = Math.floor((viewFinder.clientWidth * videoScale) / scaleFactor);
    let sourceHeight = Math.floor((viewFinder.clientHeight * videoScale) / scaleFactor);

    let sx = Math.floor((source.videoWidth - sourceWidth) / 2);
    let sy = Math.floor((source.videoHeight - sourceHeight) / 2);

    if (sx < 0) {
      sx = 0;
      sourceWidth = source.videoWidth;
    } else if (sy < 0) {
      sy = 0;
      sourceHeight = source.videoHeight;
    }
    return {
      sx,
      sy,
      sourceWidth,
      sourceHeight,
    };
  }

  /**
   * Converts an canvas element into an image blob with additional image metadata
   * @param canvas: the canvas element where the image is rendered
   * @param mimeType: the mime type of the resulting image
   * @param quality: the jpeg compression quality
   * @private
   */
  private createImageFromCanvas(
    canvas: HTMLCanvasElement,
    mimeType = 'image/jpeg',
    quality = 0.9
  ): Promise<ManipulatedImage> {
    return new Promise<ManipulatedImage>((resolve, reject) => {
      try {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                blob,
                mimeType,
                width: canvas.width,
                height: canvas.height,
              });
            } else {
              const errorMessage = 'Canvas returned empty blob';
              this.logger.error('Image manipulation failed', errorMessage);
              reject(errorMessage);
            }
          },
          mimeType,
          quality
        );
      } catch (error) {
        this.logger.error('Image manipulation failed', error);
        reject(error);
      }
    });
  }

  /**
   * Determines if an image needs to be resized as it is larger than the max allowed dimension
   * @param sourceWidth
   * @param sourceHeight
   * @param maxDimension
   * @private
   */
  private shouldDownscale(sourceWidth: number, sourceHeight: number, maxDimension: number) {
    return (sourceWidth > sourceHeight && sourceWidth > maxDimension) || sourceHeight > maxDimension;
  }

  /**
   * Calculates the resized width and height of an image
   * @param sourceWidth
   * @param sourceHeight
   * @param maxDimension
   * @private
   */
  private downscale(sourceWidth: number, sourceHeight: number, maxDimension: number) {
    let preferredWidth = sourceWidth;
    let preferredHeight = sourceHeight;

    if (preferredWidth > preferredHeight && preferredWidth > maxDimension) {
      preferredHeight = Math.floor((maxDimension * preferredHeight) / preferredWidth);
      preferredWidth = maxDimension;
    } else if (preferredHeight > maxDimension) {
      preferredWidth = Math.floor((maxDimension * preferredWidth) / preferredHeight);
      preferredHeight = maxDimension;
    }

    return { preferredWidth, preferredHeight };
  }
}
