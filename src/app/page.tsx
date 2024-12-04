import CountdownTimer from "~/_components/countdown-timer";
import LocaleSwitcher from "~/_components/locale-switcher";

export default function HomePage() {
  return (
    <main className="h-screen max-h-screen pb-4 pt-16">
      <LocaleSwitcher />
      <CountdownTimer />
    </main>
  );
}
