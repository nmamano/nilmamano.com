"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Info } from "lucide-react"
import Image from "next/image"
import { topics } from "./topics"


export default function Beyond100() {
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set())
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set())
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [completionDates, setCompletionDates] = useState<Record<string, string>>({})
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; content: string }>({
    show: false,
    x: 0,
    y: 0,
    content: "",
  })

  useEffect(() => {
    // Load completed problems from localStorage
    const saved = localStorage.getItem("beyond100-completed")
    if (saved) {
      const parsed: string[] = JSON.parse(saved)
      const completed = new Set<string>(parsed)
      setCompletedProblems(completed)
      setTotalCompleted(completed.size)

      // Calculate completed topics
      const completedTopicSet = new Set<string>()
      topics.forEach((topic, index) => {
        const allProblemsCompleted = topic.problems.every((problem) => completed.has(problem.id))
        if (allProblemsCompleted) {
          completedTopicSet.add(index.toString())
        }
      })
      setCompletedTopics(completedTopicSet)
    }

    const savedDates = localStorage.getItem("beyond100-completion-dates")
    if (savedDates) {
      setCompletionDates(JSON.parse(savedDates))
    }
  }, [])

  const toggleProblem = (problemId: string) => {
    const newCompleted = new Set(completedProblems)
    const newDates = { ...completionDates }

    if (newCompleted.has(problemId)) {
      newCompleted.delete(problemId)
      delete newDates[problemId]
    } else {
      newCompleted.add(problemId)
      newDates[problemId] = new Date().toLocaleDateString()
    }

    setCompletedProblems(newCompleted)
    setCompletionDates(newDates)
    setTotalCompleted(newCompleted.size)
    localStorage.setItem("beyond100-completed", JSON.stringify([...newCompleted]))
    localStorage.setItem("beyond100-completion-dates", JSON.stringify(newDates))

    // Update topic completion status
    const newCompletedTopics = new Set(completedTopics)
    topics.forEach((topic, index) => {
      const allProblemsCompleted = topic.problems.every((problem) => newCompleted.has(problem.id))
      if (allProblemsCompleted) {
        newCompletedTopics.add(index.toString())
      } else {
        newCompletedTopics.delete(index.toString())
      }
    })
    setCompletedTopics(newCompletedTopics)
  }

  const toggleTopic = (topicIndex: number) => {
    const topic = topics[topicIndex]
    const allProblemsCompleted = topic.problems.every((problem) => completedProblems.has(problem.id))

    const newCompleted = new Set(completedProblems)
    const newCompletedTopics = new Set(completedTopics)
    const newDates = { ...completionDates }

    if (allProblemsCompleted) {
      // Uncheck all problems in this topic
      topic.problems.forEach((problem) => {
        newCompleted.delete(problem.id)
        delete newDates[problem.id]
      })
      newCompletedTopics.delete(topicIndex.toString())
    } else {
      // Check all problems in this topic
      const currentDate = new Date().toLocaleDateString()
      topic.problems.forEach((problem) => {
        newCompleted.add(problem.id)
        if (!newDates[problem.id]) {
          newDates[problem.id] = currentDate
        }
      })
      newCompletedTopics.add(topicIndex.toString())
    }

    setCompletedProblems(newCompleted)
    setCompletedTopics(newCompletedTopics)
    setTotalCompleted(newCompleted.size)
    localStorage.setItem("beyond100-completed", JSON.stringify([...newCompleted]))
    localStorage.setItem("beyond100-completion-dates", JSON.stringify(newDates))
    setCompletionDates(newDates)
  }

  const handleMouseEnter = (event: React.MouseEvent, problemId: string) => {
    if (completedProblems.has(problemId) && completionDates[problemId]) {
      const rect = event.currentTarget.getBoundingClientRect()
      setTooltip({
        show: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        content: `Completed: ${completionDates[problemId]}`,
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, content: "" })
  }

  const totalProblems = topics.reduce((sum, topic) => sum + topic.problems.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Header */}
      <div className="shadow-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            {/* Title with book icon */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image
                src="/nil10/images/book-icon.png"
                alt="Beyond Cracking the Coding Interview Book Icon"
                width={80}
                height={80}
                className="hidden sm:block"
              />
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-800 bg-clip-text text-transparent tracking-tight">
                BEYOND 100
              </h1>
              <Image
                src="/nil10/images/book-icon.png"
                alt="Beyond Cracking the Coding Interview Book Icon"
                width={80}
                height={80}
                className="hidden sm:block"
              />
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The 100 essential problems from <strong>Beyond Cracking the Coding Interview</strong> to be interview
              ready.
            </p>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-gray-700">
                  {totalCompleted} / {totalProblems} completed
                </span>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(totalCompleted / totalProblems) * 100}%` }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
              >
                <a
                  href="https://www.amazon.com/dp/195570600X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Image src="/nil10/images/book-icon.png" alt="Book Icon" width={24} height={24} />
                  Buy the Book on Amazon
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="https://bctci.co/discord" target="_blank" rel="noopener noreferrer">
                  Join the Discord
                </a>
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Info className="h-4 w-4" />
              <span>
                Checked off problems are saved locally in browser storage. Coming soon: cloud sync across devices.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Accordion type="multiple" className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <AccordionItem
              key={topic.name}
              value={topic.name}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-3 w-full">
                  <Checkbox
                    checked={completedTopics.has(topicIndex.toString())}
                    onCheckedChange={() => toggleTopic(topicIndex)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <AccordionTrigger className="flex flex-1 items-center justify-between p-0 text-left hover:no-underline">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {topicIndex + 1}. {topic.name}
                    </h3>
                    <div className="flex items-center gap-2 ml-3">
                      <span className="text-sm text-gray-500">
                        {topic.problems.filter((p) => completedProblems.has(p.id)).length} / {topic.problems.length}
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(topic.problems.filter((p) => completedProblems.has(p.id)).length / topic.problems.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </AccordionTrigger>
                </div>
              </div>
              <AccordionContent className="px-6 pb-3">
                <div className="space-y-2">
                  {topic.problems.map((problem, problemIndex) => (
                    <div
                      key={problem.id}
                      className={`flex items-center gap-3 p-2 rounded-md border transition-all duration-300 relative overflow-hidden ${
                        completedProblems.has(problem.id)
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      {/* Animated background sweep */}
                      {completedProblems.has(problem.id) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-300 to-green-100 animate-sweep"></div>
                      )}

                      <div className="relative z-10 flex items-center gap-3 w-full">
                        <div className="relative">
                          <Checkbox
                            id={problem.id}
                            checked={completedProblems.has(problem.id)}
                            onCheckedChange={() => toggleProblem(problem.id)}
                            onMouseEnter={(e) => handleMouseEnter(e, problem.id)}
                            onMouseLeave={handleMouseLeave}
                            className={`data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 transition-all duration-300 ${
                              completedProblems.has(problem.id) ? "animate-burst" : ""
                            }`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={problem.id}
                            className={`font-medium cursor-pointer transition-all duration-300 text-sm ${
                              completedProblems.has(problem.id)
                                ? "text-green-800 line-through opacity-75"
                                : "text-gray-900"
                            }`}
                          >
                            {problem.name}
                          </label>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1 h-7 bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                          >
                            <a href={problem.aiInterviewerLink} target="_blank" rel="noopener noreferrer">
                              AI Interviewer
                            </a>
                          </Button>

                          {problem.leetcodeLink && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="text-xs px-2 py-1 h-7 bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100"
                            >
                              <a href={problem.leetcodeLink} target="_blank" rel="noopener noreferrer">
                                LeetCode
                              </a>
                            </Button>
                          )}
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

      {/* Footer */}
      <footer className="border-t border-white/20 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/nil10/images/book-icon.png"
              alt="Beyond Cracking the Coding Interview Book Icon"
              width={40}
              height={40}
            />
            <p className="text-gray-600">Master these 100 problems and you'll be ready for any coding interview.</p>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.amazon.com/dp/195570600X"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-bold"
            >
              Get the Book
            </a>
            <a
              href="https://bctci.co/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Join Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}


