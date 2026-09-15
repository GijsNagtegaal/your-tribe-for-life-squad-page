/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    // Returns true if the slug is only numbers
    return /^\d{2}-\d{2}$/.test(param);
}