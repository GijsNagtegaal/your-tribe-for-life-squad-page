export async function load() {

    const res = await fetch("https://fdnd.directus.app/items/person?fields=*,role.role_id.name&filter[squads][squad_id][cohort][_eq]=2627&limit=-1");
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

    const teacherRoles = ['co-teacher', 'tribe leader', 'squad leader'];
    
    const teachersArray = personsWithSlugs.filter(person => {
        if (!person.role) return false;
        return person.role.some(r => teacherRoles.includes(r.role_id?.name));
    });
    
    return { 
        persons: personsWithSlugs, 
        teachers: teachersArray 
    };
}