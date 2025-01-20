// export const baseUrl = 'http://localhost:8000/api/v1'
export const baseUrl = 'https://video-sharing-tfhr.onrender.com/api/v1'

export function formatTimeAgo(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    const intervals = [
        { label: "year", seconds: 60 * 60 * 24 * 365 },
        { label: "month", seconds: 60 * 60 * 24 * 30 },
        { label: "week", seconds: 60 * 60 * 24 * 7 },
        { label: "day", seconds: 60 * 60 * 24 },
        { label: "hour", seconds: 60 * 60 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now"; // For very small time differences
}
