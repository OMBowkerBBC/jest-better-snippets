const snippets = require('../snippets/snippets.code-snippets.json');

describe('snippets test suite', () => {

    let keys;

    beforeAll(() => keys = Object.keys(snippets))

    it('should contain at least one snippet', () => {
        expect(keys.length).toBeGreaterThan(0)
    })

    it('should always have a prefix, body and description attribute for each object', () => {
        keys.forEach((item) => {
            expect(snippets[item]).toHaveProperty('prefix')
            expect(snippets[item]).toHaveProperty('body')
            expect(snippets[item]).toHaveProperty('description')
        });
    })

    it.each(['prefix', 'body'])('should always have a %s attribute that is of type array', (attr) => {
        keys.forEach((item) => expect(Array.isArray(snippets[item][attr])).toBeTruthy())
    })

    it('should have no duplicate keys', () => {
        const allPrefixes = [].concat.apply([], keys.map((item) => snippets[item]['prefix']))
        const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
        expect(findDuplicates(allPrefixes)).toHaveLength(0)
    })
    
    it('should always have a tabstop in the body', () => {
        keys.forEach((item) => expect(snippets[item]['body'].join("")).toMatch(/\$\d/))
    })

    it('should have corresponding name in description attribute', () => {
        keys.forEach((item) => {
            const keyword = item.split("-")[0]
            expect(snippets[item]['description']).toContain(keyword)
        })
    })

    it('should have corresponding name in body attribute', () => {
        keys.forEach((item) => {
            const keyword = item.split("-")[0]
            expect(snippets[item]['body'].join("")).toContain(keyword)
        })
    })

})