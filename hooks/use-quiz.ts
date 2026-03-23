"use client";

import { useState, useCallback, useMemo } from "react";
import type { QuizQuestion } from "@/types/quiz";

export function useQuiz(questions: QuizQuestion[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const currentQuestion = questions[currentIndex];

  const selectAnswer = useCallback(
    (questionId: string, optionId: string) => {
      if (revealed.has(questionId)) return;
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      setRevealed((prev) => new Set(prev).add(questionId));
    },
    [revealed]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const score = useMemo(() => {
    return questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswerId ? 1 : 0);
    }, 0);
  }, [answers, questions]);

  const isComplete = revealed.size === questions.length;

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setRevealed(new Set());
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    revealed,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    score,
    isComplete,
    reset,
  };
}
