<script>
    import GithubIcon from "$lib/components/icons/GithubIcon.svelte";
    import WebIcon from "$lib/components/icons/WebIcon.svelte";

    let { person } = $props();

    let githubUrl = $derived.by(() => {
        const githubHandle = person?.github_handle?.trim();

        if (!githubHandle) return null;
        if (
            githubHandle.startsWith("http://") ||
            githubHandle.startsWith("https://")
        ) {
            return githubHandle;
        }

        return `https://github.com/${githubHandle.replace(/^@/, "")}`;
    });
</script>

{#if person}
    <h4>Links</h4>
    <section>
        <ul class:single-link={!person?.github_handle || !person?.website}>
            {#if person?.github_handle}
                <li>
                    <a class="github" href={githubUrl}>
                        <span>Github</span>
                        <span class="icon">
                            <GithubIcon />
                        </span>
                        <span class="arrow">›</span>
                    </a>
                </li>
            {/if}
            {#if person?.website}
                <li>
                    <a class="website" href={person?.website}>
                        <span>Website</span>
                        <span class="icon">
                            <WebIcon />
                        </span>
                        <span class="arrow">›</span>
                    </a>
                </li>
            {/if}
        </ul>
    </section>
{/if}

<style>
    h4 {
        width: min(100%, 468px);
        margin: 0 auto var(--spacing-sm);
    }

    section {
        width: 100%;
        display: flex;
        justify-content: center;

        ul {
            width: min(100%, 468px);
            display: flex;
            gap: var(--spacing-md);
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                flex: 1;
                margin: 0;
                padding: 0;

                a {
                    width: 100%;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    padding: 0 var(--spacing-md);
                    border-radius: var(--border-radius-sm);
                    text-decoration: none;
                    font-size: var(--font-size-body-sm);
                    font-weight: var(--font-weight-medium);

                    transition:
                        transform 0.15s ease,
                        opacity 0.15s ease;
                }

                a:hover {
                    transform: translateY(-2px);
                    opacity: 0.9;
                }

                .github {
                    background: #3478dc;
                }

                .website {
                    background: #e43e1d;
                }

                .icon {
                    display: none;
                    align-items: center;
                    justify-content: center;
                    margin-left: var(--spacing-sm);
                }

                .arrow {
                    display: none;
                    margin-left: auto;
                    font-size: var(--font-size-h2);
                    font-weight: var(--font-weight-regular);
                    line-height: 1;
                }

                .single-link & {
                    a {
                        width: min(100%, 234px);  
                    }

                    .icon {
                        display: flex;
                    }

                    .arrow {
                        display: flex;
                    }
                }

                @media (min-width: 275px) {
                    &:not(.single-link) .icon {
                        display: flex;
                    }
                }
                @media (min-width: 250px) {
                    &:not(.single-link) .arrow {
                        display: flex;
                    }
                }
            }
        }
    }
</style>
