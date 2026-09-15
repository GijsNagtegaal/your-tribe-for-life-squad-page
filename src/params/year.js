/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    // Returns true if the slug is only numbers
    return /^\d{4}$/.test(param);
}