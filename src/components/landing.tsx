
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import confetti from "canvas-confetti"; // Import the confetti library


const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL ;


const githubUrlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;

interface ConfettiButtonProps {
  children: React.ReactNode;
  [key: string]: any; 
}

interface ConfettiButtonHandle {
  triggerConfetti: () => void;
}

const ConfettiButton = forwardRef<ConfettiButtonHandle, ConfettiButtonProps>((props, ref) => {
  const triggerConfetti = () => {

    confetti({
      particleCount: 100,
      angle: 90,
      spread: 70, 
      startVelocity: 30, 
      decay: 0.9, 
      gravity: 0.4, 
      scalar: 1,
    });
  };

  useImperativeHandle(ref, () => ({
    triggerConfetti,
  }));

  return null; 
});

export function Landing() {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [uploadId, setUploadId] = useState<string>("");
  const[deployId,setDeployId]=useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [deployed, setDeployed] = useState<boolean>(false);
  const confettiRef = useRef<{ triggerConfetti: () => void } | null>(null); 

  const handleDeployment = async () => {
    try {
      setUploading(true);
      const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
        repoUrl: repoUrl,
      });
      setUploadId(res.data.id);
      setUploading(false);

      
      const interval = setInterval(async () => {
        try {
            const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`);
            console.log(response.data);
            setDeployId(response.data.Body)
            if (deployId === uploadId) {
                clearInterval(interval);  
                setDeployed(true);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
                console.log('403 error: Backend processing time taking longer, retrying...');
                // Continue polling despite the 403 error, don't clear interval
            } else {
                console.error('Unexpected error while polling status:', error);
                clearInterval(interval);  // Stop polling if there's an unexpected error
            }
        }
    }, 3000);
    
    } catch (error) {
      setUploading(false);
      console.error("Deployment failed:", error);
    }
  };

  const isValidRepoUrl: boolean = githubUrlPattern.test(repoUrl);

  useEffect(() => {
    if (deployed && confettiRef.current) {
      confettiRef.current.triggerConfetti();
    }
  }, [deployed]);

  return (
    <main className="flex flex-col items-center justify-center h-full mt-10 mb-5 p-2 relative">
      <div className={`flex flex-col lg:flex-row justify-center items-center gap-8 w-full max-w-4xl`}>
        <div className="w-full max-w-md bg-gray-900 text-white p-4 rounded">
          <h2 className="text-xl spicy-rice-regular md:text-4xl mb-5">Add GitHub Repo Url</h2>
          <p className="rowdies-light mb-3 ">Enter the GitHub  URL  repository to deploy it ,only react ,react+vite and html/css/js apps can be deployed</p>
          <div className="space-y-4">
            <div className="space-y-2 rowdies-light">
              <label htmlFor="github-url ">GitHub Repository URL</label>
              <input
                id="github-url"
                type="url"
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repo.git"
                className="w-full p-2 border border-gray-400 rounded text-black"
              />
            </div>
            <button
              onClick={handleDeployment}
              disabled={!isValidRepoUrl || uploadId !== "" || uploading}
              className="w-full bg-black text-white p-2 rounded rowdies-light"
              type="submit"
            >
              {uploading ? "Uploading..." : uploadId ? `Deploying (${uploadId})` : "Upload"}
            </button>
          </div>
        </div>

        {deployed && (
          <div className="w-full max-w-md bg-gray-900 text-white p-4 rounded">
            <h2 className="text-xl spicy-rice-regular md:text-4xl mb-4">App Deployment Status</h2>
            <p className="rowdies-light mb-3 ">Your website is successfully deployed! and can be accesed anywhere </p>
            <div className="space-y-2 rowdies-light">
              <label htmlFor="deployed-url">Deployed URL</label>
              <input
                id="deployed-url"
                readOnly
                type="url"
                value={`http://${uploadId}.${process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL}/index.html`}
                className="w-full p-2 border border-gray-400 rounded text-black"
              />
            </div>
            <br />
            <button className="w-full bg-black text-white p-2 rounded rowdies-light">
              <a href={`http://${uploadId}.${process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL}/index.html`} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </button>
          </div>
        )}
      </div>


      {deployed && (
        <div className="absolute bottom-10">
          <ConfettiButton ref={confettiRef} /> 
        </div>
      )}
    </main>
  );
}
