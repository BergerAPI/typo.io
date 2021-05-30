<script>
  import Router from "svelte-spa-router";
  import Nav from "./components/Navigation.svelte";
  import App from "./pages/App.page.svelte";
  import User from "./pages/User.page.svelte";

  /**
   * All routes
   */
  const navConfig = [
    {
      iconPath: "public/ico/game.svg",
      object: App,
      path: "/",
    },
    {
      iconPath: "public/ico/user.svg",
      object: User,
      path: "/user",
    },
  ];

  const routerObject = {};
  navConfig.forEach((route) => (routerObject[route.path] = route.object));
</script>

<Nav {navConfig} />

<Router routes={routerObject} />
