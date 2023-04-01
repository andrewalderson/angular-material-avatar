import { InjectionToken } from '@angular/core';

/**
 * Default function used to get the users initials from their name
 * @param name The name to get the initials from
 * @returns the initials as a string
 */
export const defaultInitialsFunction = (name: string) => {
  const parts = name.split(' ');
  let initials = parts[0].charAt(0);
  if (parts.length > 1) {
    initials += parts.at(-1)?.charAt(0);
  }
  return initials;
};

type AvatarColors = (name?: string) => {
  background: string;
  foreground: string;
};

// these colors are the 700 values from the material color spec
// the default contrast for all is white
const COLOR_TABLE = [
  '#D32F2F',
  '#C2185B',
  '#7B1FA2',
  '#512DA8',
  '#303F9F',
  '#1976D2',
  '#0288D1',
  '#0097A7',
  '#00796B',
  '#388E3C',
  '#689F38',
  '#AFB42B',
  '#FBC02D',
  '#FFA000',
  '#F57C00',
  '#E64A19',
  '#5D4037',
  '#616161',
  '#455A64',
];

/**
 * Default function to get a color based from a string
 * @param name The name to hash to create / select a color
 * @returns An object containing foreground and background color
 */
export const defaultColorsFunction = (name?: string) => {
  if (!name) {
    return { background: 'transparent', foreground: '#ffffff' };
  }
  let hashCode = 0;
  for (let i = name.length - 1; i >= 0; i--) {
    const ch = name.charCodeAt(i);
    const shift = i % 8;
    // eslint-disable-next-line no-bitwise
    hashCode ^= (ch << shift) + (ch >> (8 - shift));
  }
  return {
    background: COLOR_TABLE[hashCode % COLOR_TABLE.length],
    foreground: '#ffffff',
  };
};

export const AVATAR_INITIALS_FUNCTION = new InjectionToken<
  (name: string) => string
>('avatarInitialsFunction', {
  providedIn: 'root',
  factory: () => defaultInitialsFunction,
});

export const AVATAR_COLORS_FUNCTION = new InjectionToken<AvatarColors>(
  'avatarColorsFunction',
  { providedIn: 'root', factory: () => defaultColorsFunction }
);
