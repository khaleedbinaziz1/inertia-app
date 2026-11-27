import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { GitHub, Database, Shield, Server, Loader2, Search, X } from "lucide-react";

export default function Home() {
  const [repoName, setRepoName] = useState("");
  const [repoDesc, setRepoDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showSupabase, setShowSupabase] = useState(false);
  const [showVercel, setShowVercel] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const createRepo = async () => {
    if (!repoName.trim()) {
      toast({
        title: "Error",
        description: "Repository name is required",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      // Create GitHub repository
      const ghResponse = await fetch("/api/github/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: repoName, description: repoDesc || undefined }),
      });

      const ghData = await ghResponse.json();
      if (!ghResponse.ok) throw new Error(ghData.message || "Failed to create GitHub repo");

      toast({
        title: "Success",
        description: `GitHub repository "${repoName}" created!`,
      });

      // Open Supabase setup
      setShowSupabase(true);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create repository",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="w-full max-w-2xl bg-background p-8 rounded-xl shadow-xl border border-border/40">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Create GitHub Repository</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-400 mb-6">
              Generate a new repository on GitHub, configure Supabase backend, and deploy to Vercel.
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="repo-name">Repository Name</Label>
                <Input
                  id="repo-name"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="my-awesome-app"
                  required
                />
              </div>

              <div>
                <Label htmlFor="repo-desc">Description (optional)</Label>
                <Input
                  id="repo-desc"
                  value={repoDesc}
                  onChange={(e) => setRepoDesc(e.target.value)}
                  placeholder="A description of your app"
                />
              </div>
            </div>

            <div>
              <Button
                onClick={createRepo}
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? (
                  <Loader2 className="mr-2 h-4 w-4" />
                ) : null}
                Create Repository
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supabase Setup Section */}
      {showSupabase && (
        <div className="w-full max-w-2xl bg-background p-8 rounded-xl shadow-xl border border-border/40 mt-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Connect Supabase</CardTitle>
            </CardContent>
            <CardContent>
              <p className="text-neutral-400 mb-6">
                Set up Supabase backend for your new repository.
              </p>

              <Button
                onClick={() => setShowSupabase(false)}
                className="w-full mb-4 flex items-center justify-between gap-2"
              >
                <X className="h-4 w-4" />
                Close
              </Button>

              <div className="space-y-4">
                <div>
                  <Label>Supabase Project URL</Label>
                  <Input
                    placeholder="https://xyz.supabase.co"
                    readOnly
                    className="bg-neutral-900/50"
                  />
                  <Button
                    onClick={() => setShowVercel(true)}
                    className="mt-2 w-full"
                  >
                    <Server className="mr-2 h-4 w-4" />
                    Deploy to Vercel
                  </Button>
                </div>

                <AlertDialog>
                  <AlertDialogContent>
                    <AlertDialogTitle>Delete Repository?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will delete the GitHub repository and Supabase project. This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogAction>Cancel</AlertDialogAction>
                    <AlertDialogAction
                      onClick={() => {
                        // Handle deletion
                        toast({
                          title: "Deleted",
                          description: "Repository deleted successfully",
                        });
                        setShowSupabase(false);
                        setShowVercel(false);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vercel Status */}
      {showVercel && (
        <div className="w-full max-w-2xl bg-background p-8 rounded-xl shadow-xl border border-border/40 mt-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Vercel Deployment</CardTitle>
            </CardContent>
            <CardContent>
              <p className="text-neutral-400 mb-6">
                Your application is ready for deployment.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={() => setShowVercel(false)}
                  className="w-full mb-4 flex items-center justify-between gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>

                <div>
                  <p className="text-sm text-neutral-500">
                    Click below to deploy your Next.js app to Vercel
                  </p>
                  <Button
                    onClick={() => {
                      // Trigger Vercel deployment
                      toast({
                        title: "Deploying to Vercel",
                        description: "Your app is being deployed...",
                      });
                      setShowVercel(false);
                    }}
                    className="w-full"
                  >
                    <Loader2 className="mr-2 h-4 w-4" />
                    Deploy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}