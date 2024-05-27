export default function dateFormatter(date: Date): string {
  const now = new Date();
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const dateStartOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const nowStartOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const timeDifference = nowStartOfDay.getTime() - dateStartOfDay.getTime();

  if (timeDifference < oneDayInMillis && timeDifference >= 0) {
    // Format as "Today, HH:MM AM/PM"
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return `Today, ${date.toLocaleTimeString('en-US', timeOptions)}`;
  } else if (
    timeDifference < 2 * oneDayInMillis &&
    timeDifference >= oneDayInMillis
  ) {
    return 'Yesterday';
  } else {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', dateOptions);
  }
}
