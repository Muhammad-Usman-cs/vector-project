module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                                    to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(16px)', opacity: '0' },     to: { transform: 'translateY(0)',       opacity: '1' } },
      },
      animation: {
        fadeIn:  'fadeIn 0.15s ease',
        slideUp: 'slideUp 0.2s ease',
      },
    },
  },
  plugins: [],
};
