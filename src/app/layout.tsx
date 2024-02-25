import { SparklesCore } from '@/components/ui/sparkles';
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
			<body>
				<div className='w-full absolute inset-0 h-screen'>
					<SparklesCore
						id='tsparticlesfullpage'
						background='transparent'
						minSize={0.6}
						maxSize={1.4}
						particleDensity={100}
						className='w-full h-full'
						particleColor='#FFFFFF'
					/>
				</div>

				{children}
			</body>
		</html>
	);
}
