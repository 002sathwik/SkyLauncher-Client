
import { Landing } from "@/components/landing";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import Image from "next/image";


const links = [{
  title: "Deploy Now",
  icon: (
    <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  href: "/deploy",
},
{
  title: "Learn More",
  icon: (
    <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  href: "#",
},

{
  title: "GitHub",
  icon: (
    <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
  ),
  href: "#",
},
];

export default function Home() {
  return (

    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-screen relative bg-gray-950">
    
      <div className="absolute top-4 left-4 bg-white bg-opacity-20 backdrop-blur-lg text-white text-xs font-bold py-1 px-2 rounded border border-white border-opacity-30">
        Development Mode
      </div>


      <h2 className="spicy-rice-regular bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-200 dark:from-neutral-300 dark:to-white text-4xl md:text-4xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        SkyLauncher <br /> Deployment
      </h2>
      <p className="max-w-xl rowdies-light mx-auto text-sm md:text-lg text-neutral-100 dark:text-neutral-300 text-center mb-2">
        Deploy your React app effortlessly with a single click, and get it live.
      </p>

      <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
      />
      <footer className="absolute bottom-4 left-0 right-0 flex items-center justify-center text-xs text-center space-x-2 rowdies-light">
        <p>--MADE USING AWS-S3, AWS-SQS, VERCEL, REDIS, NODE, TS --</p>
      </footer>


    </BackgroundLines>




  );
}
