"use client";

import type { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { Check, X, ChevronRight } from "lucide-react";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  selectedAnswer?: string;
  isRevealed: boolean;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  isLast: boolean;
}

export function QuizQuestionCard({
  question,
  selectedAnswer,
  isRevealed,
  onSelect,
  onNext,
  isLast,
}: QuizQuestionCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <h3 className="text-lg font-semibold text-foreground leading-relaxed">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === question.correctAnswerId;

          let style = "border-border hover:border-accent/50 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer";
          if (isRevealed) {
            if (isCorrect) {
              style = "border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950/30";
            } else if (isSelected && !isCorrect) {
              style = "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950/30";
            } else {
              style = "border-border opacity-60";
            }
          } else if (isSelected) {
            style = "border-accent bg-accent/5";
          }

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              disabled={isRevealed}
              className={cn(
                "w-full text-left rounded-lg border-2 p-4 transition-all flex items-start gap-3",
                style
              )}
            >
              <span
                className={cn(
                  "shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                  isRevealed && isCorrect
                    ? "border-green-500 bg-green-500 text-white"
                    : isRevealed && isSelected && !isCorrect
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-slate-300 dark:border-slate-600 text-muted"
                )}
              >
                {isRevealed && isCorrect ? (
                  <Check className="h-3.5 w-3.5" />
                ) : isRevealed && isSelected && !isCorrect ? (
                  <X className="h-3.5 w-3.5" />
                ) : (
                  option.id.toUpperCase()
                )}
              </span>
              <span className="text-sm leading-relaxed text-foreground">{option.text}</span>
            </button>
          );
        })}
      </div>

      {isRevealed && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-800 p-4 animate-fade-in-up">
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Explicación: </span>
            {question.explanation}
          </p>
        </div>
      )}

      {isRevealed && !isLast && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Siguiente Pregunta
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {isRevealed && isLast && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Ver Resultados
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
