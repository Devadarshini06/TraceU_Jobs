// ==============================|| DEFAULT THEME - TYPOGRAPHY ||============================== //

export const FONT_INTER = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;

export default function Typography(fontFamily = FONT_INTER) {
  const activeFont = fontFamily || FONT_INTER;
  return {
    htmlFontSize: 16,
    fontFamily: activeFont,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    fontWeightExtraBold: 700,
    fontWeightBlack: 800,

    // Main Page Heading (H1): 24px | 700
    h1: {
      fontFamily: activeFont,
      fontWeight: 700,
      fontSize: '1.5rem', // 24px
      lineHeight: 1.33,
      letterSpacing: '-0.3px'
    },

    // Section Heading (H2): 18px | 600
    h2: {
      fontFamily: activeFont,
      fontWeight: 600,
      fontSize: '1.125rem', // 18px
      lineHeight: 1.4,
      letterSpacing: '-0.2px'
    },

    // Card Heading (H3): 16px | 600
    h3: {
      fontFamily: activeFont,
      fontWeight: 600,
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      letterSpacing: '-0.2px'
    },

    // Subsection Heading: 14px | 600
    h4: {
      fontFamily: activeFont,
      fontWeight: 600,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5
    },

    h5: {
      fontFamily: activeFont,
      fontWeight: 600,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5
    },

    // Sidebar Navigation / Subsection: 14px | 500
    h6: {
      fontFamily: activeFont,
      fontWeight: 500,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.57
    },

    // Body Text: 14px | 400
    body1: {
      fontFamily: activeFont,
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.57
    },

    // Table Content / Secondary Body Text: 13-14px | 400
    body2: {
      fontFamily: activeFont,
      fontSize: '0.8125rem', // 13px
      fontWeight: 400,
      lineHeight: 1.5
    },

    // Subsection Heading: 14px | 600
    subtitle1: {
      fontFamily: activeFont,
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: 1.57
    },

    // Form Labels / Subtitle: 13px | 500
    subtitle2: {
      fontFamily: activeFont,
      fontSize: '0.8125rem', // 13px
      fontWeight: 500,
      lineHeight: 1.5
    },

    // Helper Text / Breadcrumbs / Tooltip Text: 12px | 400
    caption: {
      fontFamily: activeFont,
      fontWeight: 400,
      fontSize: '0.75rem', // 12px
      lineHeight: 1.66
    },

    // Table Column Headers: 12px | 600
    overline: {
      fontFamily: activeFont,
      lineHeight: 1.66,
      fontSize: '0.75rem', // 12px
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'none'
    },

    // Button Text: 14px | 600
    button: {
      fontFamily: activeFont,
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      textTransform: 'none'
    }
  };
}
