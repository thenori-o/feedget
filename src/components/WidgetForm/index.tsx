import { useState } from "react";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";

export const feedbackTypes = {
	BUG: {
		title: 'Problem',
		image: {
			source: bugImageUrl,
			alt: 'Image of a bug'
		},
	},
	IDEA: {
		title: 'Idea',
		image: {
			source: ideaImageUrl,
			alt: 'Image of an lamp'
		},
	},
	OTHER: {
		title: 'Others',
		image: {
			source: thoughtImageUrl,
			alt: 'Image of a thought bubble'
		},
	},
};

export type FeedBackType = keyof typeof feedbackTypes;

export function WidgetForm() {
	const [feedbackType, setFeedbackType] = useState<FeedBackType | null>(null);
	const [feedbackSent, setFeedbackSent] = useState(false);

	function handleRestartFeedback() {
		setFeedbackType(null);
		setFeedbackSent(false);
	}

	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"
		>
			{feedbackSent ? (
				<FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
			) : (
				<>
					{!feedbackType ? (
						<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
					) : (
						<FeedbackContentStep
							onFeedbackSent={() => setFeedbackSent(true)}
							feedbackType={feedbackType}
							onFeedbackRestartRequested={handleRestartFeedback}
						/>
					)}
				</>
			)}

			<footer className="text-xs text-neutral-400">
				Made by <a className="underline underline-offset-2" href="https://github.com/thenori-o">@thenori-o</a>
			</footer>
		</div>
	);
}