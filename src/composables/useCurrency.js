export default () => {
    
    const formatCryptoValueIn = (currency, value, digits = 2) => {

        if (currency == 'usd') {

            return `$ ${value.toFixed(digits)}`

        }

    }

    return { formatCryptoValueIn }
}
