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
import { GitHub, Database, Shield, Loader2, X } from "lucide-react";

export default function SupabasePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const connectSupabase = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would connect to Supabase with OAuth
      // and set up the project with RLS policies
      toast({
        title: "Supabase Connected",
        description: "Your project is now connected to Supabase!",
      });
      setShowConnect(false);
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to connect Supabase",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="w-full max-w-3xl bg-background p-8 rounded-xl shadow-xl border border-border/40">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Supabase Backend
          </h1>
          <p className="text-neutral-400">
            Connect your GitHub repository to a Supabase backend with Row Level Security
          </p>
        </header>

        <Button
          onClick={() => setShowConnect(true)}
          className="w-full mb-4 flex items-center justify-between gap-2"
        >
          <Database className="h-4 w-4" />
          Connect Supabase
        </Button>

        {showConnect && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Connect to Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400 mb-6">
                Enter your Supabase project credentials to backend your app with a
                fully managed PostgreSQL database, authentication, and RLS policies.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-500">
                    Supabase Project URL
                  </p>
                  <input
                    type="text"
                    placeholder="https://your-project.supabase.co"
                    className="w-full px-4 py-3 rounded-xl border border-border/40 background-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <p className="text-sm text-neutral-500">
                    Supabase Anonymous Key
                  </p>
                  <input
                    type="text"
                    placeholder "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpVC..."
                    className="w-full px-4 py-3 rounded-xl border border-border/40 background-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button
                  onClick={connectSupabase}
                  className="w-full"
                >
                  <Loader2 className="mr-2 h-4 w-4" />
                  Connect
                </Button>

                <Button
                  onClick={() => setShowConnect(false)}
                  className="w-full mt-2 flex items-center justify-between gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}