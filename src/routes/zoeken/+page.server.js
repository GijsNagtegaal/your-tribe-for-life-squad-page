export async function load() {
    const res = await fetch("https://fdnd.directus.app/items/person?fields=*,role.role_id.name&filter[squads][squad_id][cohort][_eq]=2627");
    const data = await res.json();

    const personsWithSlugs = data.data.map(person => ({
        ...person,
        slug: person.name
            ? person.name.toLowerCase().replaceAll(' ', '-')
            : 'unknown'
    }));

    return { persons: personsWithSlugs };
}