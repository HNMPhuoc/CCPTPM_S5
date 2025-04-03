const slugify = require('slugify');
const removeAccents = require('remove-accents');
function createSlug(name) {
    const normalized = removeAccents(name);
    return slugify(normalized, {
        lower: true,  
        strict: true, 
        remove: /[*+~.()'"!:@]/g
    });
}

module.exports = { createSlug };