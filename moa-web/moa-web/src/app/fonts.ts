import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/PretendardVariable.woff2',
      weight: '45 920', // Pretendard Variable 범위
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});
