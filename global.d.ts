declare module '*.png' {
  const value: number; // require('...') returns a number for static resources
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '*.otf' {
  const value: number;
  export default value;
}

declare module '*.ttf' {
  const value: number;
  export default value;
}