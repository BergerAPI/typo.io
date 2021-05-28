<script>

    export let navConfig

</script>

<nav class="flex">
    <div class="flex">
        <h2 id="logo">Typo.io</h2>

        {#each navConfig as route}
            <div class="route flex">
                <img src={route.iconPath} alt="routeIcon"/>
            </div>
        {/each}
    </div>

    <div class="fastSettings">

    </div>

</nav>


<style>
    nav {
        max-width: 500px;
        margin: 0 auto;
        justify-content: space-around;
    }

    .route{

    }

    #logo {
        margin-right: 10px;
        color: dodgerblue;
    }

    .flex {
        display: flex;
        align-items: center;
    }

</style>