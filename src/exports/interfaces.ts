export interface TextInput {
  commands: string;
}

export interface Position {
  x: number;
  y: number;
}
export interface Start {
  position: Position;
  orientation: string;
}
export interface Instructions {
  commands: Array<string>;
  start: Start;
}

// export interface StringArray {
//   [index: number]: string;
// }

export interface StringArray {
  address: string[];
}

export interface SanitizedText {
  [index: number]: Array<string>;
}

