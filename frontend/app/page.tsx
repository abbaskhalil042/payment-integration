import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Fast checkout", body: "One-tap payments built for conversion." },
  { title: "Global ready", body: "Accept 135+ currencies out of the box." },
  { title: "Transparent fees", body: "Flat pricing with no hidden costs." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            JustPay
          </Link>
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            <li>
              <Link href="/products" className="hover:text-foreground">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-foreground">
                Profile
              </Link>
            </li>
          </ul>
          <Button size="lg" nativeButton={false} render={<Link href="/profile" />}>
            Sign in
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Payments, made just simple.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Accept payments, manage customers, and grow revenue — all from one
            clean dashboard.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/products" />}>
              Shop now
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/profile" />}
            >
              My account
            </Button>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} JustPay</span>
          <span>v0.1</span>
        </div>
      </footer>
    </div>
  );
}
