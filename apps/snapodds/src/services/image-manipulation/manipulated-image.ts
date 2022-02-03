export type ManipulatedImage = {
  /**
   * The image blob
   */
  blob: Blob;

  /**
   * The images mime type
   */
  mimeType: string;

  /**
   * The images width
   */
  width: number;

  /**
   * The images height
   */
  height: number;
};
