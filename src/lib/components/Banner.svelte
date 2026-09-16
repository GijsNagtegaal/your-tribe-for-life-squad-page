<script>
    import image from "$lib/assets/FDND.png";
</script>

<article>
    <figure>
        <img src={image} alt="FDND" />
    </figure>

    <header>
        <p>#FDND-HVA</p>
        <h4>Frontend design &amp; development</h4>
    </header>
</article>

<style>
    article {
        display: flex;
        align-items: center;
        height: 4.3125rem;

        figure {
            width: 3.1875rem;
            height: 3.1875rem;
            margin: 0;
            flex-shrink: 0;

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: var(--border-radius-xs);
            }
        }
        
        header {
            margin-left: 0.625rem;

            p {
                margin: 0;
                color: var(--color-neutral-dark);
                font-size: var(--font-size-body-xs);
                line-height: 12px;
                font-weight: var(--font-weight-regular);
            }

            h4 {
                margin: 0;
                color: var(--text);
                line-height: 25px;
                font-weight: var(--font-weight-bold);
                letter-spacing: -0.8px;
            }
        }
    }
</style>
