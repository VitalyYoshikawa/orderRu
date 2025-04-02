interface Rating {
    5: string | number
    4: string | number
    3: string | number
    2: string | number
    1: string | number
}

export default (ratings: Rating): number => {
    const totalSum = Object.entries(ratings).reduce((acc, [score, count]) => {
        return acc + (parseInt(score) * parseInt(count))
    }, 0)
    const totalCount = Object.values(ratings).reduce((acc, count) => acc + parseInt(count), 0)

    return isNaN(totalSum / totalCount) ? 0 : totalSum / totalCount
}
