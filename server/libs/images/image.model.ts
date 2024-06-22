export type TobjimageSize = {
  strHeight: number;
  strWidth: number;
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
