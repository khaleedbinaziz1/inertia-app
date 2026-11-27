import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GitHub, Database, Shield, Search, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [repos, setRepos] = useState<Array<{ id: number; name: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewRepo, setShowNewRepo] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchRepos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/github/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRepos(data.repos || []);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch repositories",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch repositories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewRepo = () => {
    setShowNewRepo(true);
  };

  const handleRepoCreated = () => {
    fetchRepos();
    setShowNewRepo(false);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="w-full max-w-3xl bg-background p-8 rounded-xl shadow-xl border border-border/40">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Repositories
          </h1>
          <p className="text-neutral-400">
            Manage your GitHub repositories and Supabase backends
          </p>
        </header>

        <Button onClick={createNewRepo} className="w-full mb-4">
          <GitHub className="mr-2 h-4 w-4" />
          Create New Repository
        </Button>

        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="mx-auto h-8 w-8 text-neutral-500 mb-3" />
            <p className="text-neutral-400">Loading repositories...</p>
          </div>
        )}

        <div className="space-y-4">
          {repos.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto text-neutral-500 mb-3" />
              <p className="text-neutral-500">No repositories yet</p>
              <p className="text-neutral-400 text-sm">
                Create your first repository to get started
              </p>
            </div>
          )}

          {repos.map((repo) => (
            <Card key={repo.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitHub className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-300 font-medium">{repo.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-neutral-500"
                >
                  <Search className="mr-1 h-4 w-4" />
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}