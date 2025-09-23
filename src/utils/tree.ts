// eslint-disable-next-line import/no-extraneous-dependencies
import { ascend, chain } from 'ramda';

import { AppRouteObject } from '@/types/router';

export function flattenTrees<T extends { children?: T[] }>(trees: T[] = []): T[] {
    return chain((node) => {
        const children = node.children || [];
        return [node, ...flattenTrees(children)];
    }, trees);
}

/**
 * return menu routes
 */
export const menuFilter = (items: AppRouteObject[]) => {
    return items
        .filter((item) => {
            const show = item.meta?.key;
            if (show && item.children) {
                item.children = menuFilter(item.children);
            }
            return show;
        })
        .sort(ascend((item) => item.sortValue || Infinity));
};
