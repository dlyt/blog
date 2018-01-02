let route = function () {
    console.log(2)
    const a = 1
    return a
}
route.apply(route, function () {
    console.log(1)
})
route()