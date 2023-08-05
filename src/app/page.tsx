'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
	const [channels, setChannels] = useState<string[]>([]);
	const [url, setUrl] = useState<string>('');

	return (
		<div className='flex flex-col bg-[#21262d] w-screen h-screen justify-center items-center gap-5'>
			<label
				htmlFor='names'
				className='text-[#ffe144] text-xl px-2 md:text-3xl text-center font-bold'
			>
				Enter the channel names separated by commas.
			</label>

			<input
				placeholder='Ej: dannieltp,rothiotome'
				id='names'
				className='w-[300px] md:w-[500px] h-[50px] bg-[#2b303b] text-[#6441a5] text-2xl font-bold text-center rounded'
				onChange={(e) => {
					setChannels(e.target.value.replaceAll(' ', '').split(','));
				}}
			/>

			<button
				onClick={() => setUrl(channels.join('/'))}
				className='bg-[#ffe144] py-3 px-4 rounded'
			>
				START
			</button>

			{url && (
				<div className='flex flex-row flex-wrap items-center justify-center gap-5'>
					<h2 className='bg-[#2b303b] text-[#ffe144] p-3 rounded text-center font-bold'>
						Use this link in your OBS: <br />
						<button
							className='flex flex-row gap-2 items-center justify-center text-[#6441a5]'
							onClick={() => {
								navigator.clipboard.writeText(
									`https://numerica.dannieltp.com/${url}`
								);

								alert('Copied to clipboard.');
							}}
						>
							<Image
								src='/copyIcon.svg'
								width={15}
								height={15}
								alt='Copy icon'
							/>
							https://numerica.dannieltp.com/{url}
						</button>
					</h2>

					<div>
						<div className='bg-[#2b303b] text-[#ffe144] p-3 rounded text-center font-bold [&>h2>span]:text-[#6441a5]'>
							<h2>
								Width: <span>450px</span>
							</h2>
							<h2>
								Height: <span>450px</span>
							</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
