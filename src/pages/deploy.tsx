
import { Landing } from "@/components/landing";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { FloatingDock } from "@/components/ui/floating-dock";





export default function Home() {
    return (


    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-full relative bg-gray-950">
      <a href="/">
        <div className="absolute top-4 left-4 mt-2 spicy-rice-regular bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-200 dark:from-neutral-300 dark:to-white text-4xl">
          SkyLauncher
        </div>
      </a>

      {/* Added spacing around the Landing component */}
      <div className="flex-grow flex items-center justify-center py-10">
        <Landing />
      </div>

      <footer className="absolute bottom-4 left-0 right-0 flex items-center justify-center text-xs text-center space-x-2 rowdies-light">
        <p>--MADE USING AWS-S3, AWS-SQS, VERCEL, REDIS, NODE, TS --</p>
      </footer>
    </BackgroundLines>
  );
}



