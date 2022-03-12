export function localeDate(dateISO: string, locale = 'vi-VN') {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateISO))
}
