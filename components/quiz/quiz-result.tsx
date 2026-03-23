"use client";

import type { QuizQuestion } from "@/types/quiz";
import { Check, X, RotateCcw, Trophy } from "lucide-react";

interface QuizResultProps {
  score: number;
  total: number;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  chapterTitle: string;
  onReset: () => void;
}

export function QuizResult({
  score,
  total,
  questions,
  answers,
  chapterTitle,
  onReset,
}: QuizResultProps) {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Excelente! Dominas este capítulo perfectamente.";
    if (percentage >= 80) return "Muy bien! Tienes una sólida comprensión del material.";
    if (percentage >= 60) return "Buen trabajo. Repasa los temas donde fallaste.";
    return "Necesitas repasar el capítulo. No te desanimes, inténtalo de nuevo!";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-8 space-y-8">
      {/* Score header */}
      <div className="text-center">
        <div className="inline-flex rounded-full bg-accent/10 p-4 mb-4">
          <Trophy className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">Resultados: {chapterTitle}</h3>
        <p className="text-muted text-sm">{getMessage()}</p>
      </div>

      {/* Score visual */}
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">{score}/{total}</p>
          <p className="text-sm text-muted mt-1">Respuestas correctas</p>
        </div>
        <div className="h-16 w-px bg-border" />
        <div className="text-center">
          <p className="text-5xl font-bold text-accent">{percentage}%</p>
          <p className="text-sm text-muted mt-1">Puntuación</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ${
            percentage >= 80
              ? "bg-green-500"
              : percentage >= 60
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Question breakdown */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted uppercase tracking-wider">
          Detalle por pregunta
        </p>
        {questions.map((q, i) => {
          const isCorrect = answers[q.id] === q.correctAnswerId;
          return (
            <div
              key={q.id}
              className="flex items-start gap-3 py-2 border-b border-border last:border-0"
            >
              {isCorrect ? (
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-muted leading-relaxed">
                <span className="font-medium text-foreground">P{i + 1}:</span>{" "}
                {q.question}
              </p>
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar Quiz
        </button>
      </div>
    </div>
  );
}
