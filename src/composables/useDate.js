export default (datetime) => {
    const formatDateTimeToUNIXTimestamp = () => {

        const date = new Date(datetime)

        const unixTimeSeconds = Math.floor(date.getTime() / 1000)

        return unixTimeSeconds

    }

    const add1HourTimeIntervalToUnixTimeSeconds = () => {
        return unixTimeSeconds + 60 * 60
    }

    const formatDate = (datetimeToFormat) => {

        const date = new Date(datetimeToFormat)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')

        const formatedDate = `${month}/${day}/${year}, ${hours}:${minutes}`
   
        return formatedDate
        
    }

    const unixTimeSeconds = formatDateTimeToUNIXTimestamp(datetime)

    const range = {
        from: unixTimeSeconds,
        to: add1HourTimeIntervalToUnixTimeSeconds(unixTimeSeconds),
    }

    return { range, formatDate }
}
