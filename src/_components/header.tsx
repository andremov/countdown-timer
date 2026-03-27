import locale from "~/utils/locale.json";
import type LocaleStrings from "~/utils/types";
import { LogoIcon } from "~/_components/logo-icon";

type HeaderPropsType = {
  lang?: "en" | "es";
};

export default function Header(props: HeaderPropsType) {
  const { lang = "en" } = props;
  const localeStrings = locale[lang] as LocaleStrings;

  return (
    <div className="relative mx-auto flex w-full max-w-screen-md items-center justify-center gap-2">
      <LogoIcon className="size-10 rotate-12 text-walnut" />
      <h1 className="text-center font-serif text-2xl font-bold text-walnut">
        {localeStrings.title}
      </h1>
    </div>
  );
}
