export const useFormat = () => {
  function formatDate(dateInput: string | Date) {
    const date = new Date(dateInput)
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function formatTime(timeInput: string | Date) {
    let date: Date

    if (typeof timeInput === 'string') {
      const today = new Date()
      const [hour, minute] = timeInput.split(':')
      date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), +hour, +minute)
    } else {
      date = new Date(timeInput)
    }

    return date.toLocaleTimeString('en-PH', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  function formatDateString(dateStr: string | null): string {
    if (!dateStr) return ''

    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return ''

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  return {
    formatDate,
    formatTime,
    formatDateString
  }
}