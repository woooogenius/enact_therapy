// src/MainPanel.js
import React, { useState } from 'react';
import WizardPanels from '@enact/sandstone/WizardPanels';
import Skinnable from '@enact/sandstone/Skinnable';
import Slottable from '@enact/ui/Slottable';
import AudioPlayer from './AudioPlayer';
import Dashboard from './Dashboard';
import css from '../App/App.module.less';
import Button from '@enact/sandstone/Button';
import Account from './Account';

const MainPanel = () => {
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		<div style={{ width: '100%', height: '100%', }}>
			<AudioPlayer />
			<div style={{ position: 'absolute', top: '60px', right: '50px' }}>
				<Button size='small' onClick={() => setCurrentStep(1)}>Next</Button>
			</div>
		</div>,
		<div style={{ width: '100%', height: '100%', }}>
			<Dashboard />
			<div style={{ position: 'absolute', top: '60px', right: '50px' }}>
				<Button size='small' onClick={() => setCurrentStep(0)}>Back</Button>
				<Button size='small' onClick={() => setCurrentStep(2)}>Next</Button>
			</div>
		</div>,
		<div style={{ width: '100%', height: '100%', }}>
			<Account />
			<div style={{ position: 'absolute', top: '60px', right: '50px' }}>
				<Button size='small' onClick={() => setCurrentStep(0)}>Home</Button>
				<Button size='small' onClick={() => setCurrentStep(1)}>Back</Button>
			</div>
		</div>
	];

	return (
		<WizardPanels
			current={0}
			nextButtonVisibility="auto"
			prevButtonVisibility="auto"
			onNextClick={() => setCurrentStep(prev => (prev + 1) % steps.length)}
			onPrevClick={() => setCurrentStep(prev => (prev - 1 + steps.length) % steps.length)}
			total={2}
		>


			{steps[currentStep]}


		</WizardPanels>

	);
};

export default Skinnable(MainPanel);
