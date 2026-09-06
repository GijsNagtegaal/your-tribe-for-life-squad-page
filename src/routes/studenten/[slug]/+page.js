export async function load({ fetch, params }) {

    const res = await fetch("https://fdnd.directus.app/items/person?fields=*&filter[squads][squad_id][cohort][_eq]=2627");
    const data = await res.json();

    const matchedPerson = data.data.find(person => {
        if (!person.name) return false;
        
        const slug = person.name.toLowerCase().replaceAll(' ', '-');
        return slug === params.slug;
    });

    return {
        person: matchedPerson || null
    };
}