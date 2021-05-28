<script>
    import Router, {location} from "svelte-spa-router"
    import Nav from "./components/Nav.component.svelte"
    import App from "./pages/App.page.svelte"
</script>

<Router routes={{
    "/": App
}}/>

<Nav/>