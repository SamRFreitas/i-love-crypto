import useDate from "@/composables/useDate"

describe('UseDate - ', () => {

    const dateString = '2024-01-01T03:00:00Z'
    const datetime = new Date(dateString)
    const datetimeString = datetime.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    const datetimeMock = new Date(datetimeString)

    it('range - should have the correct time interval of 1 hour in timestamps', () => {
        
        const { range } = useDate(datetimeMock)

        // These variables `expectedFrom` and `expectedTo` need to be initialized based on the datetime mock because different machines
        // could have issues due to different time zones.
        // This problem arises from GitHub Actions when running the tests and encountering different time zones,
        // which causes errors in actions.

        const expectedFrom = Math.floor(datetimeMock.getTime() / 1000)
        const expectedTo = expectedFrom + 3600

        expect(range.from).toBe(expectedFrom)

        expect(range.to).toBe(expectedTo)


    })


    it('formatDate - should return the correct format in month/day/year, hour:minutes', () => {
        
        const { formatDate } = useDate(datetimeMock)

        const formattedDate = formatDate(datetimeMock)
        const expectedDate = '01/01/2024, 00:00'
        

        expect(formattedDate).toBe(expectedDate)


    })

})