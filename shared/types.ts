export interface Color {
  colorName: string;
  hexCode: string;
}
export interface Palette {
  paletteName: string;
  id: number;
  colors: Color[];
}
