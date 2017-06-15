let actions = [];
let currentStep = 0;

class Actions {
	static addAction(act) {
		actions.length = currentStep;
		actions[actions.length] = act;
		this.stepForward();
	}

	static doActions() {
		for (let i = 0; i < currentStep; i++) {
			if (actions[i].points && actions[i].points.length) {
				for (let j = 1; j < actions[i].points.length; j++) {
					actions[i].cb(actions[i].points[j - 1], actions[i].points[j], actions[i].color, actions[i].lineWidth, actions[i].fills);
				}
			} else {
				actions[i].cb();
			}
		}
	}

	static stepBack() {
		if (currentStep - 1 >= 0) currentStep--;
	}

	static stepForward() {
		if (currentStep + 1 <= actions.length) currentStep++;
	}

	static getActions() {
		return actions.slice(0, currentStep);
	}

	static setActions(newActions) {
		actions = newActions.slice(0, newActions.length);
		currentStep = actions.length;
	}

	static isNext() {
		return currentStep < actions.length;
	}

	static isPrev() {
		return currentStep > 0;
	}
}

export default Actions;