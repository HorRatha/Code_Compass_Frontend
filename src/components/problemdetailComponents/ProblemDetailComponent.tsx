"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Share, RotateCcw } from "lucide-react";
import ProblemDescription from "./problemsImpl/problem-description";
import { MonacoEditor } from "@/components/problemdetailComponents/problemsImpl/monaco-editor";
import { useGetProblemQuery } from "@/lib/services/problem/problemApi";
import TestAndOutputPanel from "./problemsImpl/code-output";
import Loader from "../loader/LoaderComponent";
interface ProblemDetailsProps {
  problemId: number;
}

export default function ProblemDetailsComponent({ problemId }: ProblemDetailsProps) {
  const router = useRouter();
  const { data, error, isLoading } = useGetProblemQuery(problemId);

  // Your original code templates
  const codeTemplates: Record<string, string> = {
    javascript: `function solve() {

  // code your life's compass here

}
  
solve();`,
    python: `def main():    
    # code your life's compass here

if __name__ == "__main__":
    main()
`,
    java: `import java.util.*;
import java.lang.*;
import java.io.*;

class CodeCompass
{
    public static void main(String[] args) throws java.lang.Exception
    {
        // code your life's compass here

    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    // code your life's compass here

    return 0;
}`,
  };

  // Initialize state only once using your templates
  const [language, setLanguage] = useState<keyof typeof codeTemplates>("cpp");
  const [code, setCode] = useState(codeTemplates["cpp"]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = (newLanguage: keyof typeof codeTemplates) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage]);
  };
  

  if (isLoading) return <Loader />;
  if (error || !data) return <div className="p-4 rounded bg-red-100 text-red-800">Error loading problem, could be not found. Please try again later.</div>;

  

  return (
    <div className="flex flex-col h-full min-h-0 bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="/CodeCompassDM.png"
              alt="Logo"
              fill
              className="object-contain bg-black p-1"
              onClick={() => router.push("/problemset")}
            />
          </div>
          <h6 className="font-semibold text-foreground text-sm sm:text-base">CodeCompass</h6>
        </div>
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm"><Share className="w-4 h-4 mr-1 sm:mr-2" /> Share</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
          {/* Problem Description Panel */}
          <Panel
            defaultSize={isMobile ? 40 : 35} // Slightly larger on mobile for readability, narrower on desktop for balance
            minSize={isMobile ? 30 : 25}     // Ensures problem description remains usable but not overly dominant
            collapsible={true}               // Allow collapsing for focus on editor
          >
            <ProblemDescription problem={data} />
          </Panel>

          <PanelResizeHandle
            className={`bg-border hover:bg-accent transition-colors ${isMobile ? "h-2 w-full" : "w-2 h-full"
              }`}
          />

          {/* Code Editor and Output Panel */}
          <Panel
            defaultSize={isMobile ? 60 : 65} // Larger editor space on desktop for coding comfort
            minSize={isMobile ? 40 : 35}     // Prevents editor from becoming too cramped
          >
            <PanelGroup direction="vertical">
              {/* Code Editor */}
              <Panel
                defaultSize={isMobile ? 60 : 70} // Prioritize editor space, similar to LeetCode’s focus on coding area
                minSize={isMobile ? 35 : 50}     // Ensure sufficient coding space
              >
                <div className="h-full flex flex-col">
                  <div className="p-3 border-b border-border flex items-center justify-between bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
                        <span className="text-black font-bold text-xs">
                          {language === "javascript"
                            ? "JS"
                            : language === "python"
                              ? "PY"
                              : language === "java"
                                ? "JA"
                                : "C++"}
                        </span>
                      </div>
                      <span className="font-medium text-sm">Code Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCode(codeTemplates[language])}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <select
                        className="bg-background border border-border rounded px-2 py-1 text-sm focus:outline-none"
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[300px]"> {/* Increased min-height for better editor usability */}
                    <MonacoEditor
                      value={code}
                      onChange={(v) => setCode(v || "")}
                      language={language}
                      showThemeSelector
                    />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-border hover:bg-accent transition-colors" />

              {/* Output / Test Cases */}
              <Panel
                defaultSize={isMobile ? 40 : 30} // Slightly larger on mobile for test case visibility
                minSize={isMobile ? 25 : 20}     // Ensures output is always accessible
                className="flex flex-col"
              >
                <TestAndOutputPanel problem={data} code={code} language={language} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
