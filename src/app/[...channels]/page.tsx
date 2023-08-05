'use client';

import { useState, useEffect } from 'react';
import { useScore } from '@/components/useScore';
import tmi from 'tmi.js';

interface IChannelPage {
	params: {
		channels: string[];
	};
}

export default function ChannelPage({ params: { channels } }: IChannelPage) {
	const {
		score,
		setScore,
		highScore,
		setHighScore,
		username,
		setUsername,
		channelUsername,
		setChannelUsername
	} = useScore();

	const [client, setClient] = useState<tmi.Client | null>(null);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		if (!channels) return;

		const client = new tmi.Client({
			channels: channels
		});

		client.connect();
		setClient(client);

		return () => {
			client.disconnect();
		};
	}, [channels]);

	useEffect(() => {
		if (!client) return;

		client.on('message', (channel, tags, message) => {
			const regex = new RegExp(/^[0-9]+$/);

			if (regex.test(message)) {
				if (tags.username === username && score !== 0) return;
				if (score == 0 && message != '1') return;

				setChannelUsername(channel.replace('#', ''));

				if (parseInt(message) === score + 1) {
					setError(false);

					setScore(parseInt(message));
					setUsername(tags.username || 'Nombre desconocido');

					if (parseInt(message) > highScore) {
						setHighScore(parseInt(message));
					}
				} else {
					setUsername(tags.username || 'Nombre desconocido');
					setScore(0);
					setError(true);
				}
			}
		});

		return () => {
			client.removeAllListeners();
		};
	}, [client, score]);

	return (
		<div className='w-screen h-screen bg-transparent font-bold text-5xl flex flex-col justify-center items-center'>
			<div className='w-[450px] h-[450px] flex flex-col bg-[#2b303be1] shadow-md items-center justify-center gap-10'>
				<h1 className='text-[#ffe144]'>HIGH SCORE: {highScore}</h1>

				<div className='w-[200px] h-[200px] bg-[#b9a3e3] text-[#6f4cb1] flex justify-center items-center rounded-full'>
					{score}
				</div>

				{!error ? (
					<p className='capitalize text-[#ffe144] text-4xl text-center'>
						{username} <br />
						{score != 0 && channels.length > 1 && (
							<span>Channel: {channelUsername}</span>
						)}
					</p>
				) : (
					<p className='text-red-400 text-4xl'>
						Error of: <span className='capitalize'>{username}</span> <br />
						{channels.length > 1 && <span>Channel: {channelUsername}</span>}
					</p>
				)}
			</div>
		</div>
	);
}
