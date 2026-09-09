<script>
    let { size = "14px" } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 12 12" width={size}>
    <rect class="bar bar-1" x="0.5" y="0" width="2.5" height="12" fill="#1ED760" />
    <rect class="bar bar-2" x="4.75" y="0" width="2.5" height="12" fill="#1ED760" />
    <rect class="bar bar-3" x="9" y="0" width="2.5" height="12" fill="#1ED760" />
</svg>

<style>
    .bar {
        transform-origin: bottom;
        transform-box: fill-box;
        animation: moveitbabyy 1s infinite ease-in-out;
    }

    .bar-1 {
        animation-duration: 1.1s;
    }

    .bar-2 {
        animation-duration: 1.3s;
        animation-delay: -0.2s;
    }

    .bar-3 {
        animation-duration: 1.2s;
        animation-delay: -0.5s;
    }

    @keyframes moveitbabyy {
        0%, 100% {
            transform: scaleY(0.25);
        }
        50% {
            transform: scaleY(1);
        }
    }
</style>