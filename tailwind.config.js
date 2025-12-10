/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          400: '#EF4444',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
        },
        info: '#3B82F6',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#DC2626',
        zone: {
          critical: '#B91C1C',
          warning: '#F59E0B',
          secure: '#15803D',
          offline: '#64748B',
          active: '#0284C7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'heading-xl': ['32px', '38px'],
        'heading-lg': ['26px', '32px'],
        'heading-md': ['22px', '28px'],
        'heading-sm': ['18px', '24px'],
        'body-lg': ['16px', '24px'],
        'body-md': ['14px', '20px'],
        'body-sm': ['12px', '16px'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '10px',
        xl: '14px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.16)',
        panel: '0 2px 6px rgba(0,0,0,0.20)',
        dropdown: '0 4px 12px rgba(0,0,0,0.25)',
      },
    },
  },
};
