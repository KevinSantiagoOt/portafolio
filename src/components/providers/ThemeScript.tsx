export const THEME_STORAGE_KEY = "theme";

export type Theme = "dark" | "light";

// Se ejecuta antes del primer pintado: aplica el tema guardado sin parpadeo.
const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
