import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function UIComponentsPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-heading font-bold">Component Gallery</h1>
        <p className="text-muted-foreground">A visual index of all shadcn/ui components configured with the brand theme.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Typography</h2>
        <div className="space-y-4">
          <h1 className="text-4xl font-heading font-bold">Heading 1 (Playfair)</h1>
          <h2 className="text-3xl font-heading font-semibold">Heading 2 (Playfair)</h2>
          <h3 className="text-2xl font-heading font-semibold">Heading 3 (Playfair)</h3>
          <p className="text-base font-sans">Body text (Manrope). The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm text-muted-foreground font-sans">Muted text. The quick brown fox jumps over the lazy dog.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Forms</h2>
        <div className="max-w-sm space-y-4">
          <Input placeholder="Input field..." />
          <Button className="w-full">Submit</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content. Lorem ipsum dolor sit amet.</p>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
