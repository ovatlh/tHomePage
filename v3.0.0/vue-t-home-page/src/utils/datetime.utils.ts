export function fnGetHourFormatedWithUTC(utc = 0, isFormat24H = false): string {
	const time = new Date();
	const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60 * 1000);
	const timeResult = new Date(timeUTC.getTime() + utc * 60 * 60 * 1000);
	const format = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: !isFormat24H,
	} as const;
	const timeFormated = timeResult.toLocaleTimeString(undefined, format);
	return timeFormated;
}
