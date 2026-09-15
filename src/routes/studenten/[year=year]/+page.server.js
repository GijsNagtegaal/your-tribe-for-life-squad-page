export async function load() {

    const res = await fetch("https://fdnd.directus.app/items/person?fields=*,role.role_id.name&filter[squads][squad_id][cohort][_eq]=2627&limit=-1");
    const data = await res.json();

    const students = data.data.filter(person => {
        if (!person.role) return false;
        return person.role.some(r => r.role_id?.name === 'student');
    });

    return { students };
}