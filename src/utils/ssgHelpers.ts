import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';
import { appRouter } from '../server/api/root.router';
import { createInnerTRPCContext } from '../server/api/trpc';
export default createProxySSGHelpers({
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
})