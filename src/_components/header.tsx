import locale from "~/utils/locale.json";
import type LocaleStrings from "~/utils/types";

type HeaderPropsType = {
  lang?: "en" | "es";
};

export default function Header(props: HeaderPropsType) {
  const { lang = "en" } = props;
  const localeStrings = locale[lang] as LocaleStrings;

  return (
    <div className="relative mx-auto flex w-full max-w-screen-md items-center justify-center">
      <h1 className="mb-4 text-center text-2xl font-bold">
        {localeStrings.title}
      </h1>
    </div>
  );
}
