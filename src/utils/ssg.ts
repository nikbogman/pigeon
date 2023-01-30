import superjson from "superjson";
import { appRouter } from "../server/api/root";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createInnerTRPCContext } from '../server/api/trpc';
export default createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
});