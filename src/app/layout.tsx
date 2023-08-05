import './globals.css';
import { Signika_Negative } from 'next/font/google';

const signika = Signika_Negative({ subsets: ['latin'] });

export const metadata = {
	title: 'Numerica | By DannielTp',
	description: "Numerica's Game by DannielTp inspired by the rothiotome game."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={signika.className}>
			<body>{children}</body>
		</html>
	);
}
