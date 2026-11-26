// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project imports
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode = 'light', presetColor = 'default', customPrimary = null) {
  const colors = presetPalettes;
  const isDark = mode === 'dark';

  let greyPrimary = isDark
    ? [
        '#18181b', // 0
        '#27272a', // 50
        '#3f3f46', // 100
        '#52525b', // 200
        '#71717a', // 300
        '#a1a1aa', // 400
        '#d4d4d8', // 500
        '#e4e4e7', // 600
        '#f4f4f5', // 700
        '#fafafa', // 800
        '#ffffff' // 900
      ]
    : [
        '#ffffff',
        '#fafafa',
        '#f5f5f5',
        '#f0f0f0',
        '#d9d9d9',
        '#bfbfbf',
        '#8c8c8c',
        '#595959',
        '#262626',
        '#141414',
        '#000000'
      ];
  let greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  let greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors, presetColor, mode);

  // If a custom primary brand color was chosen in Settings (e.g. #530EF0, #2563EB, etc.)
  if (customPrimary) {
    paletteColor.primary = {
      ...paletteColor.primary,
      lighter: customPrimary + '15',
      100: customPrimary + '2b',
      200: customPrimary + '4d',
      light: customPrimary + '80',
      400: customPrimary + 'b3',
      main: customPrimary,
      dark: customPrimary,
      700: customPrimary,
      darker: customPrimary,
      contrastText: '#ffffff'
    };
  }

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: isDark ? '#f8fafc' : paletteColor.grey[700],
        secondary: isDark ? '#94a3b8' : paletteColor.grey[500],
        disabled: isDark ? '#64748b' : paletteColor.grey[400]
      },
      action: {
        disabled: isDark ? '#475569' : paletteColor.grey[300]
      },
      divider: isDark ? '#334155' : paletteColor.grey[200],
      background: {
        paper: isDark ? '#1e293b' : paletteColor.grey[0],
        default: isDark ? '#0f172a' : paletteColor.grey.A50
      }
    }
  });
}
