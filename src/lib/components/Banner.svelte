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
        height: 69px;
        padding: 0 29px;

        figure {
            width: 51px;
            height: 51px;
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
            margin-left: 10px;

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
