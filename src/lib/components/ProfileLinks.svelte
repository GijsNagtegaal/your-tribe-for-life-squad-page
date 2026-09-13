<script>
    let { person } = $props();

    let githubUrl = $derived.by(() => {
        const githubHandle = person?.github_handle?.trim();

        if (!githubHandle) return null;
        if (githubHandle.startsWith('http://') || githubHandle.startsWith('https://')) {
            return githubHandle;
        }

        return `https://github.com/${githubHandle.replace(/^@/, '')}`;
    });
</script>

<section>
    {#if person}
        <h4>Linkjes</h4>
            <ul>
            {#if person?.github_handle}
                <li>
                    <a class="link github" href={githubUrl}>

                        <span>Github 
                            <span class="icon">
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.46696 12.8179C2.13363 13.8179 2.13363 11.1512 0.800293 10.8179M10.1336 14.8179V12.2379C10.1586 11.92 10.1157 11.6004 10.0076 11.3004C9.89959 11.0004 9.72891 10.7269 9.50696 10.4979C11.6003 10.2646 13.8003 9.47124 13.8003 5.83124C13.8001 4.90046 13.4421 4.00538 12.8003 3.33124C13.1042 2.51692 13.0827 1.61681 12.7403 0.817911C12.7403 0.817911 11.9536 0.584578 10.1336 1.80458C8.60563 1.39046 6.99495 1.39046 5.46696 1.80458C3.64696 0.584578 2.86029 0.817911 2.86029 0.817911C2.51788 1.61681 2.49639 2.51692 2.80029 3.33124C2.15371 4.01038 1.79531 4.91355 1.80029 5.85124C1.80029 9.46458 4.00029 10.2579 6.09363 10.5179C5.87429 10.7446 5.70514 11.0148 5.59717 11.3112C5.4892 11.6075 5.44483 11.9233 5.46696 12.2379V14.8179" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </span>

                        <span class="arrow">›</span>
                    </a>
                </li>
            {/if}
            {#if person?.website}
                <li>
                    <a class="link website" href="{person?.website}">

                    <span>Website
                        <span class="icon">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1334 7.46672C14.1334 11.1486 11.1486 14.1334 7.46672 14.1334M14.1334 7.46672C14.1334 3.78482 11.1486 0.800049 7.46672 0.800049M14.1334 7.46672H0.800049M7.46672 14.1334C3.78482 14.1334 0.800049 11.1486 0.800049 7.46672M7.46672 14.1334C9.13424 12.3078 10.0819 9.93869 10.1334 7.46672C10.0819 4.99474 9.13424 2.62562 7.46672 0.800049M7.46672 14.1334C5.7992 12.3078 4.85155 9.93869 4.80005 7.46672C4.85155 4.99474 5.7992 2.62562 7.46672 0.800049M0.800049 7.46672C0.800049 3.78482 3.78482 0.800049 7.46672 0.800049" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </span>

                    <span class="arrow">›</span>
                    </a>
                </li>
            {/if}
            </ul>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        width: 100vw;
        max-width: 500px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: var(--spacing-md);

        ul {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--spacing-md);
            margin: 0 ;
            padding: 0;

            li {
                text-align: center;
          
            .link {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 2px var(--spacing-md);
                border-radius: var(--border-radius-sm);
                text-decoration: none;
                color: var(--text);
                
                transition:
                    transform 150ms ease;


                &:hover {
                    transform: translateY(-2px);
                }
                @media (max-width: 300px) {
                    .icon {
                        display: none;
                    }
                }
                @media (max-width: 230px) {
                    .arrow {
                        display: none;
                    }
                }
            }

            .github {
                background: #3474df;
            }

            .website {
                background: #d9411e;
            }

            .icon {
                margin-left: var(--spacing-xs);
                font-size: 1.4em;
                font-weight: var(--font-weight-regular);
                vertical-align: -0.08em;
            }

            .arrow {
                font-size: 2rem;
                line-height: 0.5;
            }
        }
        }
    }
</style>
