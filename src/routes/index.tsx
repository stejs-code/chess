import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class={"max-w-3xl m-auto"}>
      <h1 class={"mt-8 text-7xl mb-4"}>Hi 👋</h1>
      <p>
        <a class={"text-sky-400 text-xl underline underline-offset-2"} href="/puzzle">Happy puzzling!</a>
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome",
};
