import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/ui/sheet"


export function Hero() {
  return (
    <div className="container flex items-center justify-between p-24">
      <div className="py-20">
        <h1 className="text-8xl font-black">
          POCIŤTE <br />
          <span className="text-foreground">SEBEJISTOTU,</span> <br />
          <span className="text-foreground">VYVÁŽENOST</span> <br />
          <span className="text-foreground">A KLID</span> <br />S JÍDLEM
        </h1>
        <p className="text-lg">
          Get started by editing <code>pages/index.js</code>
        </p>
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div>TO BE IMAGE</div>
    </div>
  )
}
