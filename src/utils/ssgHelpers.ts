import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';
import { appRouter } from '../server/api/root';
export default function (ctx: any = {}) {
    return createProxySSGHelpers({
        router: appRouter,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ctx,
        transformer: superjson,
    })
}