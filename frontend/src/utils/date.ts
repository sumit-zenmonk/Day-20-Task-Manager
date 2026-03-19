export function getCurrentDateString(dateInput?: any): string {
    try {
        const date = dateInput ? new Date(dateInput) : new Date();
        if (isNaN(date.getTime())) return "unavailable";
        return date.toISOString().replace('T', ' ').split('.')[0];
    } catch {
        return "unavailable";
    }
}
