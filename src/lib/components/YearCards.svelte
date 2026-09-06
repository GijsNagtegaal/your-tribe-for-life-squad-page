<script>
  import jaar1 from "$lib/assets/jaar1.jpg";
  import jaar2 from "$lib/assets/jaar2.jpg";

  let { persons = [] } = $props();
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
</section>

<section>
  <article>
    <a href="/playlist/jaar1">
      <img src={jaar1} alt="Jaar 1" />
      <span>Jaar 1</span>
    </a>
    <h2>Jaar 1</h2>
    <p>
      42 Leden<br />
      2025–2026
    </p>
  </article>

  <article>
    <a href="/playlist/jaar2">
      <img src={jaar2} alt="Jaar 2" />
      <span>Jaar 2</span>
    </a>
    <h2>Jaar 2</h2>
    <p>
      36 Leden<br />
      2026–2027
    </p>
  </article>
</section>

<style>
  section {
    display: flex;
    flex-wrap: nowrap;
    margin: 1rem;
    gap: 1.5rem;
  }

  article {
    position: relative;
    display: grid;
    grid-template-rows: auto auto;
    vertical-align: top;
    max-width: 300px;

    h2,
    p {
      grid-area: 2 / 1;
      margin: 0 0 12px;
    }

    h2 {
      display: block;
      font-weight: var(--font-weight-medium);
      opacity: 1;

      transition: opacity 0.35s ease;
    }
    p {
      margin: 0;
      display: block;
      color: #aaa;
      line-height: 1.2;
      transform: translateY(-15px);
      opacity: 0;

      transition:
        transform 0.35s ease,
        opacity 0.35s ease;
    }

    a {
      position: relative;
      cursor: pointer;
      display: block;
      max-width: 300px;
      margin: 0;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      span {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: var(--font-size-body-xs);
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
  }

  a::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
  }

  article:hover a::after {
    background: rgba(0, 0, 0, 0.55);
  }

  article:hover a span {
    opacity: 1;
  }

  article:hover h2 {
    opacity: 0;
  }

  article:hover p {
    transform: translateY(0);
    opacity: 1;
  }
</style>
