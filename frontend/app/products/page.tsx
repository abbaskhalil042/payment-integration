import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

// TODO: replace with API call (e.g. await fetch("/api/products"))
const products: Product[] = [
  { id: "1", name: "Wireless Headphones", price: 129, category: "Audio", image: "https://placehold.co/600x600/zinc/white?text=Headphones" },
  { id: "2", name: "Smart Watch", price: 249, category: "Wearables", image: "https://placehold.co/600x600/zinc/white?text=Watch" },
  { id: "3", name: "Mechanical Keyboard", price: 159, category: "Accessories", image: "https://placehold.co/600x600/zinc/white?text=Keyboard" },
  { id: "4", name: "4K Monitor", price: 449, category: "Displays", image: "https://placehold.co/600x600/zinc/white?text=Monitor" },
  { id: "5", name: "USB-C Hub", price: 59, category: "Accessories", image: "https://placehold.co/600x600/zinc/white?text=Hub" },
  { id: "6", name: "Ergonomic Mouse", price: 79, category: "Accessories", image: "https://placehold.co/600x600/zinc/white?text=Mouse" },
  { id: "7", name: "Desk Lamp", price: 89, category: "Home", image: "https://placehold.co/600x600/zinc/white?text=Lamp" },
  { id: "8", name: "Portable Speaker", price: 99, category: "Audio", image: "https://placehold.co/600x600/zinc/white?text=Speaker" },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            JustPay
          </Link>
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            <li>
              <Link href="/products" className="text-foreground">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-foreground">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              All products
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {products.length} items
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-sm text-muted-foreground"
            >
              Sort by
            </label>
            <select
              id="sort"
              className="h-8 rounded-md border bg-background px-2 text-sm"
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="aspect-square w-full bg-muted object-cover"
              />
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {p.category}
                </p>
                <h2 className="mt-1 text-sm font-semibold">{p.name}</h2>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-semibold">${p.price}</span>
                  <Button size="sm">Add to cart</Button>
                </div>
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
