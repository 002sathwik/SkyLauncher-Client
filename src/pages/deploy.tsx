import { Landing } from "@/components/landing";
import { BackgroundLines } from "@/components/ui/background-lines";
import axios from "axios";
import { useState } from "react";

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL || "http://localhost:3000";

export default function Home() {
  const [key, setKey] = useState<string>("");
  const [secure, setSecure] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDeployment = async () => {
    try {
      setChecking(true);
      console.log(key);
      const res = await axios.post(`${BACKEND_UPLOAD_URL}/security`, {
        key: key,
      });
      console.log(res.data);

      if (res.data.status === "success") {
        setSecure(true);
        setChecking(false);
      } else {
        setSecure(false);
        setError("Invalid Key");
        setChecking(false);
      }
    } catch (error) {
      console.error(error);
      setChecking(false);
    }
  };

  const isValidKey = key.trim() !== "";

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-full relative bg-gray-950">
      {/* SkyLauncher logo */}
      <a href="/" className="z-20"> {/* Ensure higher z-index for logo */}
        <div className="absolute top-4 left-4 mt-2 spicy-rice-regular bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-200 dark:from-neutral-300 dark:to-white text-4xl">
          SkyLauncher
        </div>
      </a>


      {!secure && (
        <div className="flex items-center justify-center h-screen">  
          <div className="z-10 w-full max-w-md bg-gray-900 text-white p-4 rounded">
            <h2 className="text-xl spicy-rice-regular md:text-4xl mb-5">Enter Security Key</h2>
            <p className="rowdies-light mb-3">Enter the Security Key, If Not Contact Owner for the key</p>
            <div className="space-y-4">
              <div className="space-y-2 rowdies-light">
                <label htmlFor="password">Sky Security Key</label>
                <input
                  id="password"
                  type="password"
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="security key"
                  className="w-full p-2 border border-gray-400 rounded text-black pointer"
                />
              </div>
              <button
                onClick={handleDeployment}
                disabled={!isValidKey || checking}
                className="w-full bg-black text-white p-2 rounded rowdies-light"
                type="submit"
              >
                {checking ? "Checking..." : error ? `Invalid` : "Enter"}
              </button>
            </div>
          </div>
        </div>

      )}

      {/* Secure Content */}
      {secure && (
        <div className="flex-grow flex items-center justify-center py-10">
          <Landing />
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 flex items-center justify-center text-xs text-center space-x-2 rowdies-light">
        <p>--MADE USING AWS-S3, AWS-SQS, VERCEL, REDIS, NODE, NEXT, TS --</p>
      </footer>
    </BackgroundLines>
  );
}
