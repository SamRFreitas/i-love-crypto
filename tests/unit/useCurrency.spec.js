import useCurrency from "@/composables/useCurrency"

describe('UseCurrency - ', () => {

    const amountMock = 100.000
    const { formatCryptoValueIn } = useCurrency()

    it('formatCryptoValueIn - should return the value with the default two digits', () => {
        
        const expectedValue = formatCryptoValueIn('usd', amountMock)

        expect(expectedValue).toBe('$ 100.00')

    })

    it('formatCryptoValueIn - should return the value with five digits', () => {
        
        const expectedValue = formatCryptoValueIn('usd', amountMock, 5)

        expect(expectedValue).toBe('$ 100.0')

    })


})