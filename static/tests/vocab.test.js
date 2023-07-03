const mod = require('../vocab_functions')

test('Test Options Unsuitable', () => {
    let array = [1,2,3,4]
    let array2 = [1,1,2,3]
    expect(mod.checkDuplicates(array)).toBe(false);
    expect(mod.checkDuplicates(array2)).toBe(true);
});