import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-3 place-items-center py-20 md:py-32 gap-4">
      <div className="text-center lg:text-start space-y-6 mx-auto lg:col-span-2">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              Freelance
            </span>{" "}
            Smarter <br></br>
          </h1>{" "}
          Send a{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              WaveIn
            </span>{" "}
           
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Wave in allows you to get paid in real time for your work with just a simple link ! 
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/create-wavein">
          <Button className="w-full md:w-1/3">Get Started</Button>
          </Link>
          <a
            rel="noreferrer noopener"
            href="https://github.com/alexastro01/wavein"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10 flex justify-center lg:justify-end lg:col-span-1">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
