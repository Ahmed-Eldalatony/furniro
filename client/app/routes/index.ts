import { type RouteConfig, route } from "@react-router/dev/routes";


export default [
  route("", "./home.tsx"),
  route("create", "./create.tsx"),
] satisfies RouteConfig;



// import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome";
//
// export function meta({ }: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }
//
// export function loader({ context }: Route.LoaderArgs) {
//   return { message: "Hello from Vercel" };
// }
//
// export default function Home({ loaderData }: Route.ComponentProps) {
//   return <Welcome message={ loaderData.message } />;
// }
