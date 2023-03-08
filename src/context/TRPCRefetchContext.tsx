import { createContext, useContext } from "react";

export type ContextType = {
    refetch: () => Promise<unknown>
};

export const TRPCRefetchContext = createContext<ContextType>({
    refetch: async () => null
});

export const TRPCRefetchContextProvider: React.FC<{
    refetch: () => Promise<unknown>
    children: React.ReactNode
}> = (props) => <TRPCRefetchContext.Provider value={{ refetch: props.refetch }}>
    {props.children}
</TRPCRefetchContext.Provider>

export function useContextValue() {
    const context = useContext(TRPCRefetchContext);
    if (context === undefined)
        throw new Error('useValue must be used within a ValueProvider');
    return context;
}