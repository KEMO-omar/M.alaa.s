import React, { Component, ErrorInfo,components
https://github.com/KEMO-omar/M.alaa.s/tree/main/src/components ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-amber-200 shadow-xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-stone-900 font-heading">
              حدث خطأ بسيط في الصفحة
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              اضغط على الزرار تحت لإعادة تحميل الصفحة والاحتفال بأبو علاء الغالي 🎂
            </p>
            {this.state.error && (
              <pre className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-left text-stone-600 font-mono overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => {
                try {
                  localStorage.removeItem('m_alaa_favorites');
                  localStorage.removeItem('m_alaa_wishes_v2');
                } catch {}
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة تحميل الموقع 🔄</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
