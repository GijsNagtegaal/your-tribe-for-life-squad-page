<script>
    let favColor = "#D7961E";
    let favColor1 = "#1ED760";
    let favColor2 = "#f1f1f1";
    let favColor3 = "#1EB2D7";
</script>

<section>
    <!-- This will be replaced with a for loop -->
    <article>
        <figure>
            <img src="https://infinigeek.com/assets/keeping-your-laptop-from-overheating-tech-repair-diy-tips.png" alt="">
            <figcaption>
                <h3>The blowdryers</h3> 
            </figcaption>
        </figure>
        <ul>
            <li><p style="--favcolor: {favColor};">Gijs</p></li>
            <li><p style="--favcolor: {favColor1};">Thomas</p></li>
            <li><p style="--favcolor: {favColor2};">Roxy</p></li>
        </ul>
    </article>

    <article>
        <figure>
            <img src="https://infinigeek.com/assets/keeping-your-laptop-from-overheating-tech-repair-diy-tips.png" alt="">
            <figcaption>
                <h3>The blowdryers</h3> 
            </figcaption>
        </figure>
        <ul>
            <li><p style="--favcolor: {favColor1};">Gijs</p></li>
            <li><p style="--favcolor: {favColor3};">Thomas</p></li>
            <li><p style="--favcolor: {favColor};">Roxy</p></li>
        </ul>
    </article>
</section>

<style>

    section {
        display: flex;
        overflow-x: auto;
        margin: 1rem;
        gap: 3rem;
    }

    article {
        max-width: 400px;
        height: fit-content;
    }

    figure {
        margin: 0;
        display: flex;
        position: relative;

        img {
            width: 10rem;
            height: 10rem;
            aspect-ratio: 1/1;
            object-fit: cover;
        }

        figcaption {
            display: flex;
            width: 100%;
            background-color: var(--transparent);
            position: absolute;
            left: 0;
            bottom: 0;

            h3 {
                display: flex;
                margin: .5rem 0;
                color: var(---text);
            }
        }
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 1rem 0;
        list-style: none;
        line-break: normal;
        gap: 0.5rem;

        p {
            margin: 0;
            display: flex;
            justify-content: center;
            background: var(--favcolor);
            border-radius: var(--border-small);
            color: var(--inverted-text);
            font-weight: bold;
            padding: 0rem 0.5rem;
        }
    }
    
</style>