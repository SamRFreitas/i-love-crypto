export default (api) => ({

    fetchSimplePrice: async ({cryptoID, currencyForCryptoValue}) => {
        
        const queryParams = {
            ids: `ids=${cryptoID}`,
            vs_currencies: `&vs_currencies=${currencyForCryptoValue}`
        }

        const response = await api.get(`/simple/price?${queryParams.ids}${queryParams.vs_currencies}`)

        console.log(response)

    },

    fetchHistoricalDataWithTimeRange: async ({cryptoID, currencyForCryptoValue, range}) => {
        
        const pathParams = {
            id: cryptoID
        }

        const queryParams = {
            vs_currencies: `vs_currency=${currencyForCryptoValue}`,
            from: `&from=${range.from}`,
            to: `&to=${range.to}`
        }

        const response = await api.get(`/coins/${pathParams.id}/market_chart/range?${queryParams.vs_currencies}${queryParams.from}${queryParams.to}`)

        console.log(response)

    }

})