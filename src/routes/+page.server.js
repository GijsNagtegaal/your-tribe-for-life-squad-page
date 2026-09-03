export async function load() {
    const res = await fetch("https://fdnd.directus.app/items/person?fields=*,role.role_id.name&filter[squads][squad_id][cohort][_eq]=2627");
    const data = await res.json();

    const personsWithSlugs = data.data.map(person => {

        const slug = person.name 
            ? person.name.toLowerCase().replaceAll(' ', '-') 
            : 'unknown';
            
        return {
            ...person,
            slug
        };
    });

    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some */
    const teachersRoles = ['squad leader', 'tribe leader', 'co-teacher'];

    return {
        persons: personsWithSlugs
    }
}