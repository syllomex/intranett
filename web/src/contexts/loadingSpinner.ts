import { createContext, useContext } from "react";

const LoadingSpinnerContext = createContext<any>(null);

function useLoadingSpinner() {
  const { loadingSpinner, setLoadingSpinner } = useContext(
    LoadingSpinnerContext
  );

  return { loadingSpinner, setLoadingSpinner };
}

export { LoadingSpinnerContext, useLoadingSpinner };
