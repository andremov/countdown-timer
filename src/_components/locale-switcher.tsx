import Link from "next/link";

export default function LocaleSwitcher({
  lang = "en",
}: {
  lang?: "en" | "es";
}) {
  return (
    <div className="absolute left-1/2 top-5 flex -translate-x-1/2 rounded-md border border-sand">
      <Link
        href={"/en"}
        className={
          (lang === "en" ? "bg-sand font-semibold" : "") + " px-3 py-1 transition-colors duration-200 hover:bg-cream-tinted"
        }
      >
        EN
      </Link>

      <Link
        href={"/es"}
        className={
          (lang === "es" ? "bg-sand font-semibold" : "") + " px-3 py-1 transition-colors duration-200 hover:bg-cream-tinted"
        }
      >
        ES
      </Link>
    </div>
  );
}
