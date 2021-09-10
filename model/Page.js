const Page = function(data) {
    this.data = data
    this.error = []
}

Page.prototype.update = function() {
    return new Promise(async(resolve, reject) => {
        if (this.data.title === "") { this.error.push("the title should not be empry")}
        if (this.error.length) {
            reject(this.error)
        } else {
            console.log(this.data)
            resolve()
        }
    })
}

module.exports = Page