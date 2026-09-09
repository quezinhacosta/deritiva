/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#FDF2F4',
    surface: '#FCE4EC',
    card: '#FFFFFF',
    text: '#1B4332',
    textSecondary: '#2D6A4F',
    textMuted: '#52796F',
    tint: '#2D6A4F',
    accent: '#40916C',
    buttonBackground: '#2D6A4F',
    buttonText: '#FFFFFF',
    success: '#2D6A4F',
    error: '#D90429',
    warning: '#D4A373',
    border: '#E8B4B8',
    icon: '#2D6A4F',
    tabIconDefault: '#74A892',
    tabIconSelected: '#1B4332',
  },
  dark: {
    background: '#240016',
    surface: '#380024',
    card: '#4A0033',
    text: '#D8F3DC',
    textSecondary: '#B7E4C7',
    textMuted: '#95D5B2',
    tint: '#74C69D',
    accent: '#52B788',
    buttonBackground: '#52B788',
    buttonText: '#1B4332',
    success: '#74C69D',
    error: '#FF758F',
    warning: '#FFE3A8',
    border: '#5C1043',
    icon: '#74C69D',
    tabIconDefault: '#52796F',
    tabIconSelected: '#D8F3DC',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
