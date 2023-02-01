import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson';
import { appRouter } from '../server/api/root';
export default function (ctx: any = {}) {
    return createProxySSGHelpers({
        router: appRouter,
        ctx,
        transformer: superjson,
    })
}