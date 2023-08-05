import { create } from 'zustand';

interface IScore {
	score: number;
	setScore: (score: number) => void;

	highScore: number;
	setHighScore: (highScore: number) => void;

	username: string;
	setUsername: (username: string) => void;

	channelUsername: string;
	setChannelUsername: (channelUsername: string) => void;
}

export const useScore = create<IScore>((set) => ({
	score: 0,
	setScore: (score: number) => set({ score }),

	highScore: 0,
	setHighScore: (highScore: number) => set({ highScore }),

	username: 'By: DannielTp',
	setUsername: (username: string) => set({ username }),

	channelUsername: '',
	setChannelUsername: (channelUsername: string) => set({ channelUsername })
}));
