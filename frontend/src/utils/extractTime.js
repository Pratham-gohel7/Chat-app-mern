export function extractTime(dateString) {
	const date = new Date(dateString);
	const dt = padZero(date.getDate());
	const mon = padZero(date.getMonth());
	const y = padZero(date.getFullYear()).substring(2,4);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());

	return `${dt}/${mon}/${y} ${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}