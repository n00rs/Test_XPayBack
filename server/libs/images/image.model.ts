export type TobjimageSize = {
  intHeight: number;
  intWidth: number;
};

export type TobjSaveImageParams = {
  strId: string;
  strImageName: string;
  arrThumbSize: TobjimageSize[];
  strBase64: string;
};

export type TobjGetImagesParams = {
  strId: string;
  strImageName?: string;
};
