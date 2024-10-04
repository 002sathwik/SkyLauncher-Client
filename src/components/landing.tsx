import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const BACKEND_UPLOAD_URL = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL || "http://localhost:3000";
const githubUrlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\.git$/;
export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleDeployment = async () => {
    try {
      setUploading(true);
      const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
        repoUrl: repoUrl,
      });
      setUploadId(res.data.id);
      setUploading(false);

      // Check deployment status periodically
      const interval = setInterval(async () => {
        const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`);
        if (response.data.status === "deployed") {
          clearInterval(interval);
          setDeployed(true);
        }
      }, 3000);
    } catch (error) {
      setUploading(false);
      console.error("Deployment failed:", error);
    }
  };
  const isValidRepoUrl = githubUrlPattern.test(repoUrl);

  return (
    <>
      <div className="absolute top-4 left-4">
        <h1 className="text-4xl font-bold spicy-rice-regular  text-white">SKYLAUNCHER..</h1>
      </div>
      <main className="flex flex-col items-center justify-center h-screen p-4 relative  line-clamp-2 spicy-rice-regular ">
        <Card className="w-full max-w-md bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Deploy your GitHub Repository</CardTitle>
            <CardDescription>Enter the URL of your GitHub repository to deploy it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github-url">GitHub Repository URL</Label>
                <Input
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repo.git"
                />
              </div>
              <Button
                onClick={handleDeployment}
                disabled={!isValidRepoUrl || uploadId !== "" || uploading}
                className="w-full bg-black text-white"
                variant="outline"
                type="submit"
              >
                {uploading ? "Uploading..." : uploadId ? `Deploying (${uploadId})` : "Upload"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {deployed && (
          <Card className="w-full max-w-md mt-8 bg-gray-900 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Deployment Status</CardTitle>
              <CardDescription>Your website is successfully deployed!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="deployed-url">Deployed URL</Label>
                <Input
                  id="deployed-url"
                  readOnly
                  type="url"
                  value={`http://${uploadId}.sky.com:3001/index.html`}
                />
              </div>
              <br />
              <Button className="w-full bg-black text-white" variant="outline" asChild>
                <a href={`http://${uploadId}.sky.com:3001/index.html`} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
