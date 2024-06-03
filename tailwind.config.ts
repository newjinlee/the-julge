import tailwindConfig from 'tailwindcss';

const config: tailwindConfig.Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
      },
      colors: {
        'The-julge-black': '#111322',
        'The-julge-gray-50': '#7D7986',
        'The-julge-gray-40': '#A4A1AA',
        'The-julge-gray-30': '#CBC9CF',
        'The-julge-gray-20': '#E5E4E7',
        'The-julge-gray-10': '#F2F2F3',
        'The-julge-gray-5': '#FAFAFA',
        'The-julge-red-40': '#FF4040',
        'The-julge-red-30': '#FF8D72',
        'The-julge-red-20': '#FFAF9B',
        'The-julge-red-10': '#FFEBE7',
        'The-julge-blue-20': '#0080FF',
        'The-julge-blue-10': '#CCE6FF',
        'The-julge-green-20': '#20A81E',
        'The-julge-green-10': '#D4F7D4',
        'The-julge-kakao': '#FEE500',
      },
    },
  },
  plugins: [],
};

export default config;
