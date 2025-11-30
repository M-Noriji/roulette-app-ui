// Figma asset module declarations
declare module 'figma:asset/*' {
  const content: string;
  export default content;
}

// Vite asset imports
declare module '*.png' {
  const content: string;
  export default content;
}

// Audio imports
declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

// Suppress TypeScript errors for figma:asset imports
declare namespace NodeJS {
  interface Module {
    [key: string]: any;
  }
}
