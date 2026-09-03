export async function load() {
    const res = await fetch("https://fdnd.directus.app/items/person?fields=*&filter[squads][squad_id][cohort][_eq]=2627");
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

    return {persons: personsWithSlugs }
}