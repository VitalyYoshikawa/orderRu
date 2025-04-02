export default (number: number): string => {
    return Intl.NumberFormat('ru-RU').format(number)
}
