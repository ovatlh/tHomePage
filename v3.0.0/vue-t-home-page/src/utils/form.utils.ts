const _data: any = {
	debounceTimeouts: {
		template: {
			timeout: null,
			delay: 500,
		},
	},
};

export function fnDebounce(fn: any, key: string = "", delay: number = 500) {
	if (!key) {
		return;
	}
	if (!_data.debounceTimeouts[key]) {
		_data.debounceTimeouts[key] = { ..._data.debounceTimeouts.template };
	}
	_data.debounceTimeouts[key].delay = delay;
	if (_data.debounceTimeouts[key].timeout) {
		clearTimeout(_data.debounceTimeouts[key].timeout);
	}
	_data.debounceTimeouts[key].timeout = setTimeout(async () => {
		try {
			await fn();
		} catch (error) {
			console.error(`utils: Error in debounce function for key "${key}":`, error);
		}
		_data.debounceTimeouts[key].timeout = null;
	}, delay);
}
