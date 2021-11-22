/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { LoggerService } from '../logger/logger.service';
import { DOCUMENT } from '../tokens/document-token';

import { ImageManipulationService } from './image-manipulation.service';
import { ManipulatedImage } from './manipulated-image';

describe('ImageManipulationService', () => {
  let service: ImageManipulationService;
  let logger: MockProxy<LoggerService>;
  let document: MockProxy<Document>;
  let canvas: MockProxy<HTMLCanvasElement>;
  let renderingContext: MockProxy<CanvasRenderingContext2D>;

  const blob: Blob = new Blob();

  beforeEach(() => {
    logger = mock<LoggerService>();
    document = mock<Document>();
    canvas = mock<HTMLCanvasElement>();
    renderingContext = mock<CanvasRenderingContext2D>();

    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerService, useValue: logger },
        { provide: DOCUMENT, useValue: document },
      ],
    });

    service = TestBed.inject(ImageManipulationService);

    canvas.getContext.mockReturnValue(renderingContext);
    document.createElement.mockReturnValue(canvas);
    canvas.toBlob.mockImplementation((cb) => cb(blob));
  });

  describe('landscape', () => {
    const source: MockProxy<HTMLVideoElement> = createHTMLVideoElement(640, 360);
    const viewFinder = createHTMLElement(320, 180);

    it('should resize a video from 640px to 320px', async () => {
      const croppedImage: ManipulatedImage = await service.cropAndResizeImage(source, source, 1, 320);

      expect(renderingContext.drawImage).toHaveBeenCalledWith(source, 0, 0, 640, 360, 0, 0, 320, 180);
      expect(croppedImage).toEqual(createManipulatedImage(320, 180));
    });

    it('should scale image by factor 2', async () => {
      const croppedImage: ManipulatedImage = await service.cropAndResizeImage(source, source, 2, 320);

      expect(renderingContext.drawImage).toHaveBeenCalledWith(source, 160, 90, 320, 180, 0, 0, 320, 180);
      expect(croppedImage).toEqual(createManipulatedImage(320, 180));
    });

    it('should crop from center, scale and offset', async () => {
      const croppedImage: ManipulatedImage = await service.cropAndResizeImage(source, source, 2, 320);

      expect(renderingContext.drawImage).toHaveBeenCalledWith(source, 160, 90, 320, 180, 0, 0, 320, 180);
      expect(croppedImage).toEqual(createManipulatedImage(320, 180));
    });

    it('should crop the viewfinder from center', async () => {
      const croppedImage: ManipulatedImage = await service.cropAndResizeImage(source, viewFinder, 1, 320);

      expect(renderingContext.drawImage).toHaveBeenCalledWith(source, 160, 90, 320, 180, 0, 0, 320, 180);
      expect(croppedImage).toEqual(createManipulatedImage(320, 180));
    });

    it('should crop the viewfinder from center and scale by 2', async () => {
      const croppedImage: ManipulatedImage = await service.cropAndResizeImage(source, viewFinder, 2, 320);

      expect(renderingContext.drawImage).toHaveBeenCalledWith(source, 240, 135, 160, 90, 0, 0, 160, 90);
      expect(croppedImage).toEqual(createManipulatedImage(160, 90));
    });
  });

  describe('portrait', () => {
    const source: MockProxy<HTMLVideoElement> = createHTMLVideoElement(360, 640);
    const viewFinder = createHTMLElement(360, 203);

    it('should crop the viewFinder from center', async () => {
      const croppedImage: ManipulatedImage = await service.cropAndResizeImage(source, viewFinder, 1, 320);

      expect(renderingContext.drawImage).toHaveBeenCalledWith(source, 0, 218, 360, 203, 0, 0, 320, 180);
      expect(croppedImage).toEqual(createManipulatedImage(320, 180));
    });
  });

  describe('error handling', () => {
    const source: MockProxy<HTMLVideoElement> = createHTMLVideoElement(640, 480);

    it('should throw an error if blob conversion fails', async () => {
      const errorMessage = 'Blob conversion failed';

      canvas.toBlob.mockImplementation(() => {
        throw errorMessage;
      });

      await service.cropAndResizeImage(source, source, 1, 320).catch((error) => {
        expect(logger.error).toHaveBeenCalledWith('Image manipulation failed', errorMessage);
        expect(error).toBe(errorMessage);
      });
    });

    it('should throw an error if blob is empty', async () => {
      canvas.toBlob.mockImplementation((cb) => cb(null));

      await service.cropAndResizeImage(source, source, 1, 320).catch((error) => {
        const errorMessage = 'Canvas returned empty blob';

        expect(logger.error).toHaveBeenCalledWith('Image manipulation failed', errorMessage);
        expect(error).toBe(errorMessage);
      });
    });
  });

  function createHTMLVideoElement(videoWidth: number, videoHeight: number): MockProxy<HTMLVideoElement> {
    const videoElement: MockProxy<HTMLVideoElement> = mock<HTMLVideoElement>();
    (videoElement as any).videoWidth = videoWidth;
    (videoElement as any).videoHeight = videoHeight;
    (videoElement as any).clientWidth = videoWidth;
    (videoElement as any).clientHeight = videoHeight;
    return videoElement;
  }

  function createHTMLElement(elementWidth: number, elementHeight: number): MockProxy<HTMLElement> {
    const htmlElement: MockProxy<HTMLElement> = mock<HTMLElement>();
    (htmlElement as any).clientWidth = elementWidth;
    (htmlElement as any).clientHeight = elementHeight;
    return htmlElement;
  }

  function createManipulatedImage(imageWidth: number, imageHeight: number): ManipulatedImage {
    return {
      blob,
      mimeType: 'image/jpeg',
      width: imageWidth,
      height: imageHeight,
    };
  }
});
