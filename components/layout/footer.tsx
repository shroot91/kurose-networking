export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-sm text-muted">
        <p>
          Basado en{" "}
          <span className="font-semibold text-foreground">
            &quot;Computer Networking: A Top-Down Approach&quot;
          </span>{" "}
          de James Kurose y Keith Ross
        </p>
        <p className="mt-1">Material educativo — Solo con fines de aprendizaje</p>
      </div>
    </footer>
  );
}
