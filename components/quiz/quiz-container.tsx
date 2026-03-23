"use client";

import { useQuiz } from "@/hooks/use-quiz";
import type { QuizQuestion } from "@/types/quiz";
import { QuizQuestionCard } from "./quiz-question";
import { QuizResult } from "./quiz-result";
import { RotateCcw } from "lucide-react";

interface QuizContainerProps {
  questions: QuizQuestion[];
  chapterTitle: string;
}

export function QuizContainer({ questions, chapterTitle }: QuizContainerProps) {
  const quiz = useQuiz(questions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Pregunta {quiz.currentIndex + 1} de {quiz.totalQuestions}
        </p>
        {quiz.isComplete && (
          <button
            onClick={quiz.reset}
            className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-500"
          style={{ width: `${(quiz.revealed.size / quiz.totalQuestions) * 100}%` }}
        />
      </div>

      {quiz.isComplete ? (
        <QuizResult
          score={quiz.score}
          total={quiz.totalQuestions}
          questions={questions}
          answers={quiz.answers}
          chapterTitle={chapterTitle}
          onReset={quiz.reset}
        />
      ) : (
        <QuizQuestionCard
          question={quiz.currentQuestion}
          selectedAnswer={quiz.answers[quiz.currentQuestion.id]}
          isRevealed={quiz.revealed.has(quiz.currentQuestion.id)}
          onSelect={(optionId) =>
            quiz.selectAnswer(quiz.currentQuestion.id, optionId)
          }
          onNext={quiz.nextQuestion}
          isLast={quiz.currentIndex === quiz.totalQuestions - 1}
        />
      )}
    </div>
  );
}
