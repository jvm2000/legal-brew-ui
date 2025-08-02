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

  return {
    formatDate,
    formatTime,
  }
}