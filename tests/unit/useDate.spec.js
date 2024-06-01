import useDate from "@/composables/useDate"

describe('UseDate - ', () => {

    const dateString = '2024-01-01T03:00:00Z'
    const datetimeMock = new Date(dateString).toISOString()

    it('range - should have the correct time interval of 1 hour in timestamps', () => {
        
        const { range } = useDate(datetimeMock)

        expect(range.from).toBe(1704078000)

        expect(range.to).toBe(1704081600)


    })


    it('formatDate - should return the correct format in month/day/year, hour:minutes', () => {
        
        const { formatDate } = useDate(datetimeMock)

        const formattedDate = formatDate(datetimeMock)
        const expectedDate = '01/01/2024, 00:00'
        

        expect(formattedDate).toBe(expectedDate)


    })

})