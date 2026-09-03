<script>
    let {persons = [] } = $props();
    // const persons = data.persons;
</script>

<section>
{#each persons as persons}
    <article>
        <ul>
            <li><p>{persons.name}</p></li>
        </ul>
    </article>
{/each}

    <article>
        <figure>
           
        </figure>
        <h3>jaar 1</h3>
    </article>
</section>