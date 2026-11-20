import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

/** Prevents a render failure from leaving the user with a blank white screen. */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Application render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-paper text-ink p-6 sm:p-10 font-mono text-xs space-y-4">
          <h1 className="font-sans font-bold text-lg">Something went wrong while rendering this page</h1>
          <pre className="whitespace-pre-wrap rounded-lg border border-red-300 bg-red-50 p-4 text-red-900 overflow-auto">
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white font-sans font-semibold text-sm"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
