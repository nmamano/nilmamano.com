"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Info, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import toolManifest from "./tool_manifest.json";
import problemManifest from "./problem_manifest.json";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

// Utility function to convert problem name to slug
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Get problem slug from problem manifest
const getProblemSlug = (problemName: string): string | null => {
  // Try to find exact match first
  for (const [slug, problem] of Object.entries(problemManifest)) {
    if (problem.name === problemName) {
      return slug;
    }
  }
  // Fallback to slugifying the name
  return slugify(problemName);
};

// Get URL for a problem
const getProblemUrl = (problemName: string): string => {
  const slug = getProblemSlug(problemName);
  return `https://start.interviewing.io/beyond-ctci/solution/${slug}`;
};

interface Tool {
  id: string;
  name: string;
  description: string;
  primaryProblem: string | null;
  otherProblems: string[];
  bookChapter: string | null;
  chapterNumber: number | null;
  bookId: number | null;
  extraCredit: boolean;
}

interface ToolCategory {
  name: string;
  chapterNumber: number;
  tools: Tool[];
  allExtraCredit: boolean;
}

export default function Toolset() {
  const [completedTools, setCompletedTools] = useState<Set<string>>(new Set());
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [completionDates, setCompletionDates] = useState<
    Record<string, string>
  >({});
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    show: false,
    x: 0,
    y: 0,
    content: "",
  });
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isExtendedMode, setIsExtendedMode] = useState(true);
  const { toast } = useToast();

  // Process tools from manifest
  const categories: ToolCategory[] = useMemo(() => {
    const toolMap = new Map<string, ToolCategory>();

    for (const [toolId, toolData] of Object.entries(toolManifest)) {
      // Filter out tools without Primary Problem
      if (!toolData["Primary Problem"]) {
        continue;
      }

      const tool: Tool = {
        id: toolId,
        name: toolData.Name,
        description: toolData.Description,
        primaryProblem: toolData["Primary Problem"],
        otherProblems: toolData["Other Problems"] || [],
        bookChapter: toolData.book_chapter || null,
        chapterNumber: toolData.chapter_number || null,
        bookId: toolData.book_id ?? null,
        extraCredit: toolData["Extra Credit"] || false,
      };

      const categoryName = tool.bookChapter || "Other";
      const chapterNum = tool.chapterNumber ?? 999;

      if (!toolMap.has(categoryName)) {
        toolMap.set(categoryName, {
          name: categoryName,
          chapterNumber: chapterNum,
          tools: [],
          allExtraCredit: true, // Will be recalculated later
        });
      }

      toolMap.get(categoryName)!.tools.push(tool);
    }

    // Sort tools within each category by bookId, then by name, and check if all are extra credit
    for (const category of toolMap.values()) {
      category.tools.sort((a, b) => {
        // First sort by bookId (null values come last)
        if (a.bookId === null && b.bookId === null) {
          return a.name.localeCompare(b.name);
        }
        if (a.bookId === null) return 1;
        if (b.bookId === null) return -1;
        if (a.bookId !== b.bookId) {
          return a.bookId - b.bookId;
        }
        // If bookIds are equal, sort by name
        return a.name.localeCompare(b.name);
      });
      // Check if all tools in this category are extra credit
      category.allExtraCredit =
        category.tools.length > 0 &&
        category.tools.every((tool) => tool.extraCredit);
    }

    // Convert to array and sort by chapter number
    let sortedCategories = Array.from(toolMap.values()).sort((a, b) => {
      if (a.chapterNumber !== b.chapterNumber) {
        return a.chapterNumber - b.chapterNumber;
      }
      return a.name.localeCompare(b.name);
    });

    // Move "Problem-Solving Boosters" to the end (before "Other")
    const problemSolvingBoosters = sortedCategories.find(
      (c) => c.name === "Problem-Solving Boosters"
    );
    const otherCategory = sortedCategories.find((c) => c.name === "Other");
    const restCategories = sortedCategories.filter(
      (c) => c.name !== "Problem-Solving Boosters" && c.name !== "Other"
    );

    // Reassemble: rest categories + (Problem-Solving Boosters if exists) + (Other if exists)
    sortedCategories = [...restCategories];
    if (problemSolvingBoosters) {
      sortedCategories.push(problemSolvingBoosters);
    }
    if (otherCategory) {
      sortedCategories.push(otherCategory);
    }

    // Assign continuous display numbers starting at 1
    sortedCategories.forEach((category, index) => {
      category.chapterNumber = index + 1;
    });

    return sortedCategories;
  }, []);

  useEffect(() => {
    // Load completed tools from localStorage
    const saved = localStorage.getItem("toolset-completed");
    if (saved) {
      const parsed: string[] = JSON.parse(saved);
      const completed = new Set<string>(parsed);
      setCompletedTools(completed);
      setTotalCompleted(completed.size);
    }

    const savedDates = localStorage.getItem("toolset-completion-dates");
    if (savedDates) {
      setCompletionDates(JSON.parse(savedDates));
    }

    // Load mode preference from localStorage
    const savedMode = localStorage.getItem("toolset-mode");
    if (savedMode !== null) {
      setIsExtendedMode(savedMode === "extended");
    }
  }, []);

  // Save mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("toolset-mode", isExtendedMode ? "extended" : "core");
  }, [isExtendedMode]);

  const toggleTool = (toolId: string) => {
    const newCompleted = new Set(completedTools);
    const newDates = { ...completionDates };

    if (newCompleted.has(toolId)) {
      newCompleted.delete(toolId);
      delete newDates[toolId];
    } else {
      newCompleted.add(toolId);
      newDates[toolId] = new Date().toLocaleDateString();
    }

    setCompletedTools(newCompleted);
    setCompletionDates(newDates);
    setTotalCompleted(newCompleted.size);
    localStorage.setItem(
      "toolset-completed",
      JSON.stringify([...newCompleted])
    );
    localStorage.setItem("toolset-completion-dates", JSON.stringify(newDates));
  };

  const toggleCategory = (categoryName: string) => {
    // Use visible categories for toggling, so we only toggle visible tools
    const category = visibleCategories.find((c) => c.name === categoryName);
    if (!category) return;

    const allVisibleToolsCompleted = category.tools.every((tool) =>
      completedTools.has(tool.id)
    );

    const newCompleted = new Set(completedTools);
    const newDates = { ...completionDates };

    if (allVisibleToolsCompleted) {
      // Uncheck all visible tools in this category
      category.tools.forEach((tool) => {
        newCompleted.delete(tool.id);
        delete newDates[tool.id];
      });
    } else {
      // Check all visible tools in this category
      const currentDate = new Date().toLocaleDateString();
      category.tools.forEach((tool) => {
        newCompleted.add(tool.id);
        if (!newDates[tool.id]) {
          newDates[tool.id] = currentDate;
        }
      });
    }

    setCompletedTools(newCompleted);
    setTotalCompleted(newCompleted.size);
    localStorage.setItem(
      "toolset-completed",
      JSON.stringify([...newCompleted])
    );
    localStorage.setItem("toolset-completion-dates", JSON.stringify(newDates));
    setCompletionDates(newDates);
  };

  const handleMouseEnter = (event: React.MouseEvent, toolId: string) => {
    if (completedTools.has(toolId) && completionDates[toolId]) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltip({
        show: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        content: `Completed: ${completionDates[toolId]}`,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: "" });
  };

  const handleInfoHover = (event: React.MouseEvent, description: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content: description,
    });
  };

  const copyLearningPrompt = (toolName: string, description: string) => {
    const text = `Teach me this concept as it applies to DSA interviews: ${toolName}

Wanted outcome: ${description}

Format:

1. Start with a BRIEF overview, giving context, intuitive explanations, or real-world analogies only if relevant.
2. Explain the concept, keeping it practical to interviews.
3. Show one or two small examples. Use pseudocode if relevant.
4. End with a SHORT "Why this matters in interviews" section.
5. Optional: link DIRECTLY relevant free LeetCode problems or NeetCode videos.`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Learning prompt copied to clipboard",
    });
  };

  // Filter categories and tools based on mode
  const visibleCategories = useMemo(() => {
    let filtered: ToolCategory[];
    if (isExtendedMode) {
      filtered = categories.map((category) => ({ ...category }));
    } else {
      // Basic mode: filter out extra credit categories and tools
      filtered = categories
        .filter((category) => !category.allExtraCredit)
        .map((category) => ({
          ...category,
          tools: category.tools.filter((tool) => !tool.extraCredit),
        }))
        .filter((category) => category.tools.length > 0); // Remove empty categories
    }
    // Renumber visible categories to be continuous starting at 1
    return filtered.map((category, index) => ({
      ...category,
      chapterNumber: index + 1,
    }));
  }, [categories, isExtendedMode]);

  // Compute category completion based on visible tools only
  const completedCategories = useMemo(() => {
    const completed = new Set<string>();
    visibleCategories.forEach((category) => {
      const allVisibleToolsCompleted = category.tools.every((tool) =>
        completedTools.has(tool.id)
      );
      if (allVisibleToolsCompleted && category.tools.length > 0) {
        completed.add(category.name);
      }
    });
    return completed;
  }, [visibleCategories, completedTools]);

  const visibleTotalTools = visibleCategories.reduce(
    (sum, category) => sum + category.tools.length,
    0
  );

  const visibleCompletedTools = visibleCategories.reduce(
    (sum, category) =>
      sum + category.tools.filter((t) => completedTools.has(t.id)).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Override dialog overlay for this page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.4) !important;
        }
        .dark [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.7) !important;
        }
      `,
        }}
      />
      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-900 dark:bg-slate-800 text-white dark:text-gray-100 text-sm rounded-lg shadow-lg whitespace-normal max-w-md pointer-events-none border border-slate-700"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-slate-800"></div>
        </div>
      )}

      {/* Header */}
      <div className="shadow-sm border-b border-white/20 dark:border-slate-700/50 relative">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Theme Toggle and About Button - Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsHowToUseOpen(true)}
              className="rounded-full text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              About
            </Button>
            <ThemeToggle />
          </div>
          <div className="text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-7xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-800 dark:from-teal-400 dark:via-cyan-400 dark:to-teal-600 bg-clip-text text-transparent tracking-tight mb-2">
              TOOLKIT-{visibleTotalTools}
            </h1>
            <p className="text-base md:text-2xl italic font-medium bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 dark:from-teal-400 dark:via-cyan-400 dark:to-teal-500 bg-clip-text text-transparent mb-6">
              A new way to do coding interview prep
            </p>

            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              The essential DSA tools and techniques for interviews -
              <br />
              with problems from{" "}
              <strong>Beyond Cracking the Coding Interview</strong>.
            </p>

            {/* Mode Toggle */}
            <div className="flex items-start justify-center gap-4 mb-6 relative">
              <div className="flex flex-col items-center w-32">
                <button
                  onClick={() => setIsExtendedMode(false)}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  type="button"
                >
                  <Image
                    src="/toolkit/basic.png"
                    alt="Basic mode"
                    width={72}
                    height={72}
                    className={`rounded-xl border-2 border-orange-200 ${
                      !isExtendedMode
                        ? "opacity-100"
                        : "opacity-50 transition-opacity"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-center gap-0.5 mt-2">
                  <span
                    className={`text-sm md:text-lg font-medium ${!isExtendedMode ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    Core
                  </span>
                  <span className="text-xs md:text-base italic text-gray-600 dark:text-gray-400">
                    (recommended)
                  </span>
                </div>
              </div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 flex items-center h-[72px]">
                <Switch
                  checked={isExtendedMode}
                  onCheckedChange={setIsExtendedMode}
                  className="bg-white border-gray-300 data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-gray-300 [&>span]:bg-white"
                />
              </div>
              <div className="flex flex-col items-center w-32">
                <button
                  onClick={() => setIsExtendedMode(true)}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  type="button"
                >
                  <Image
                    src="/toolkit/extended.png"
                    alt="Extended mode"
                    width={72}
                    height={72}
                    className={`rounded-xl border-2 border-orange-200 ${
                      isExtendedMode
                        ? "opacity-100"
                        : "opacity-50 transition-opacity"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm md:text-lg font-medium mt-2 ${isExtendedMode ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}
                >
                  Expert
                </span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span
                  className="text-sm md:text-lg font-semibold text-gray-700 dark:text-gray-200"
                  suppressHydrationWarning
                >
                  {visibleCompletedTools} / {visibleTotalTools} Tools Acquired
                </span>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${visibleTotalTools > 0 ? (visibleCompletedTools / visibleTotalTools) * 100 : 0}%`,
                  }}
                  suppressHydrationWarning
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Accordion type="multiple" className="space-y-4">
          {visibleCategories.map((category) => (
            <AccordionItem
              key={category.name}
              value={category.name}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 relative">
                <div className="flex items-center gap-3 w-full">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="flex items-center z-10 relative"
                  >
                    <Checkbox
                      checked={completedCategories.has(category.name)}
                      onCheckedChange={() => toggleCategory(category.name)}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                  </div>
                  <AccordionTrigger className="flex flex-1 items-center justify-between p-0 pr-6 text-left hover:no-underline absolute inset-0 w-full h-full">
                    <div className="flex flex-1 items-center justify-between pl-[60px] pr-0 py-4">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        {`${category.chapterNumber}. `}
                        {category.name}
                        {category.allExtraCredit && (
                          <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                            Extra Credit
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-3 ml-3 mr-4">
                        <span
                          className="text-sm text-gray-500 dark:text-gray-400"
                          suppressHydrationWarning
                        >
                          {
                            category.tools.filter((t) =>
                              completedTools.has(t.id)
                            ).length
                          }{" "}
                          / {category.tools.length}
                        </span>
                        <div className="w-16 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-green-500 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                category.tools.length > 0
                                  ? (category.tools.filter((t) =>
                                      completedTools.has(t.id)
                                    ).length /
                                      category.tools.length) *
                                    100
                                  : 0
                              }%`,
                            }}
                            suppressHydrationWarning
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                </div>
              </div>
              <AccordionContent className="px-6 pb-3">
                <div className="space-y-2">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className={`flex items-center gap-3 p-2 rounded-md border transition-all duration-300 relative overflow-hidden ${
                        completedTools.has(tool.id)
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                          : "bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-sm"
                      }`}
                    >
                      {/* Animated background sweep */}
                      {completedTools.has(tool.id) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-300 to-green-100 dark:from-green-900/30 dark:via-green-800/30 dark:to-green-900/20 animate-sweep"></div>
                      )}

                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="relative flex items-center flex-shrink-0">
                            <Checkbox
                              id={tool.id}
                              checked={completedTools.has(tool.id)}
                              onCheckedChange={() => toggleTool(tool.id)}
                              onMouseEnter={(e) => handleMouseEnter(e, tool.id)}
                              onMouseLeave={handleMouseLeave}
                              className={`data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 transition-all duration-300 ${
                                completedTools.has(tool.id)
                                  ? "animate-burst"
                                  : ""
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <label
                              htmlFor={tool.id}
                              className={`font-medium cursor-pointer transition-all duration-300 text-sm ${
                                completedTools.has(tool.id)
                                  ? "text-green-800 dark:text-green-300"
                                  : "text-gray-900 dark:text-gray-100"
                              }`}
                            >
                              {tool.name}
                            </label>
                            {tool.extraCredit && (
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded flex-shrink-0">
                                Extra Credit
                              </span>
                            )}
                            <Info
                              className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-help flex-shrink-0"
                              onMouseEnter={(e) =>
                                handleInfoHover(e, tool.description)
                              }
                              onMouseLeave={handleMouseLeave}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 flex-shrink-0 sm:flex-nowrap">
                          {tool.primaryProblem && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="text-xs px-2 py-1 h-7 bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                            >
                              <a
                                href={getProblemUrl(tool.primaryProblem)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                                onMouseEnter={(e) => {
                                  if (!tool.primaryProblem) return;
                                  const rect =
                                    e.currentTarget.getBoundingClientRect();
                                  setTooltip({
                                    show: true,
                                    x: rect.left + rect.width / 2,
                                    y: rect.top - 10,
                                    content: tool.primaryProblem,
                                  });
                                }}
                                onMouseLeave={handleMouseLeave}
                              >
                                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                Sample problem
                              </a>
                            </Button>
                          )}

                          {tool.otherProblems.length > 0 && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-7 bg-orange-50 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50"
                                onClick={() => setOpenModal(tool.id)}
                              >
                                Extra problems
                              </Button>
                              <Dialog
                                open={openModal === tool.id}
                                onOpenChange={(open) =>
                                  setOpenModal(open ? tool.id : null)
                                }
                              >
                                <DialogContent
                                  className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                                  onOpenAutoFocus={(e) => e.preventDefault()}
                                >
                                  <DialogHeader>
                                    <DialogTitle className="text-gray-900 dark:text-gray-100">
                                      Extra Problems for {tool.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-2 mt-4">
                                    {tool.otherProblems.map((problemName) => (
                                      <a
                                        key={problemName}
                                        href={getProblemUrl(problemName)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-3 rounded-md border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors bg-white dark:bg-slate-800"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {problemName}
                                          </span>
                                          <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1 h-7 bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 flex items-center gap-1"
                            onClick={() =>
                              copyLearningPrompt(tool.name, tool.description)
                            }
                          >
                            <Copy className="h-3 w-3 flex-shrink-0" />
                            Learning prompt
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* How to Use Modal */}
      <Dialog open={isHowToUseOpen} onOpenChange={setIsHowToUseOpen}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg text-gray-900 dark:text-gray-100">
              About / How to Use
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-gray-700 dark:text-gray-300">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Philosophy
                </h4>
                <p className="text-xs md:text-sm">
                  TOOLKIT-X shares BCtCI's philosophy: to be ready for
                  interviews, don't memorize problems - build a{" "}
                  <strong>toolkit</strong> of reusable techniques, recipes, and
                  concepts.
                  <br />
                  <br />
                  Read the{" "}
                  <a
                    href="/blog/toolkit-x"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium no-underline"
                  >
                    Toolkit-X blog post
                  </a>{" "}
                  for more.
                </p>
              </div>
              <div>
                <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Core vs Expert Mode
                </h4>
                <p className="text-xs md:text-sm">
                  The <strong>Core toolkit</strong> is well-rounded and designed
                  to get you interview-ready.
                  <br />
                  <br />
                  If you acquire every Core tool, you can switch to the expanded{" "}
                  <strong>Expert toolkit</strong>, but be aware of diminishing
                  returns.
                </p>
              </div>
              <div>
                <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  'Acquiring' tools
                </h4>
                <p className="text-xs md:text-sm">
                  Each tool has a <strong>Sample Problem</strong> from BCtCI
                  that demonstrates its use. Click to view the statement and
                  solution (explanation + code in multiple languages).
                  <br />
                  <br />
                  Before reading the solution, launch our{" "}
                  <strong>AI interviewer to try the question yourself</strong> -
                  and then compare your approach. Active learning is key!
                  <br />
                  <br />
                  The BCtCI platform requires an account, but{" "}
                  <strong>all content and the AI interviewer are free</strong>.
                  <br />
                  <br />
                  By default, skip the <strong>Extra Problems</strong>. The goal
                  isn't to solve them all -{" "}
                  <strong>this is not a Problem List</strong> where you have to
                  solve all the problems to check off the tool (Completionists,
                  I'm looking at you!) But if one problem isn't enough, check
                  out these optional problems using the same tool. <br />
                  <br />
                  To supplement our materials, click the{" "}
                  <strong>Learning prompt</strong> button to copy a prompt you
                  can paste directly into ChatGPT or other AIs asking it to
                  explain the concept.
                  <br />
                  <br />
                  <strong>Tip:</strong> as you learn new tools, add them to your{" "}
                  <a
                    href="/blog/bctci-free-resources#practice-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline"
                  >
                    cheat sheet
                  </a>{" "}
                  in your own words.
                </p>
              </div>
              <div>
                <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Tracking Progress
                </h4>
                <p className="text-xs md:text-sm">
                  Mark tools as you learn them. Complete all tools in a category
                  to mark the category as done. Your progress is saved locally
                  in your browser - no login required.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-white/20 dark:border-slate-700/50 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://www.amazon.com/dp/195570600X"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-bold"
            >
              Get the Book
            </a>
            <a
              href="https://bctci.co/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold"
            >
              Join Discord
            </a>
            <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
              Created by{" "}
              <a
                href="https://nilmamano.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium no-underline"
              >
                Nil Mamano
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
