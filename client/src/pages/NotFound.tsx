import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="mx-4 w-full max-w-lg border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardContent className="pb-8 pt-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-blue-100" />
              <AlertCircle className="relative h-16 w-16 text-blue-700" />
            </div>
          </div>
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[.18em] text-blue-700">RapOt / Nuevo modelo de ciudad</p>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">404</h1>
          <h2 className="mb-4 text-xl font-semibold text-slate-700">Esta ruta todavía no forma parte del modelo.</h2>
          <p className="mb-8 leading-relaxed text-slate-600">
            La página que buscas no existe o aún está en construcción.
            <br />
            Regresa al inicio para continuar explorando RapOt.
          </p>
          <Button onClick={handleGoHome} className="rounded-lg bg-blue-700 px-6 py-2.5 text-white shadow-md transition-all duration-200 hover:bg-blue-800 hover:shadow-lg">
            <Home className="mr-2 h-4 w-4" />
            Volver a RapOt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
