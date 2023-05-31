type _RGB = `rgb(${number}, ${number}, ${number})`;
type _RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type _HEX = `#${string}`;

type Color = _RGB | _RGBA | _HEX;
