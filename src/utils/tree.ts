// eslint-disable-next-line import/no-extraneous-dependencies
import { chain } from 'ramda';

export function flattenTrees<T extends { children?: T[] }>(trees: T[] = []): T[] {
    return chain((node) => {
        const children = node.children || [];
        return [node, ...flattenTrees(children)];
    }, trees);
}
